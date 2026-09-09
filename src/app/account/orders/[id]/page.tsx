"use client";

import { useParams } from "next/navigation";
import { PackageX } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getOrder } from "@/lib/api/orders";
import { useAsync } from "@/lib/hooks/useAsync";
import { usePayNow } from "@/lib/hooks/usePayNow";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import OrderDetailCard from "@/components/account/OrderDetailCard";
import StatusBadge from "@/components/ui/StatusBadge";

// Payment can still be retried in these statuses; SUCCESS is already paid,
// and CANCELLED orders shouldn't be paid at all.
const PAYABLE_ORDER_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING"];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, ready } = useRequireAuth();
  const { data: order, loading, reload } = useAsync(() => getOrder(id), [id]);

  const canPay = Boolean(
    order && order.paymentStatus !== "SUCCESS" && PAYABLE_ORDER_STATUSES.includes(order.status)
  );
  const { pay, paying, error: payError } = usePayNow(
    order ? { id: order.id, orderNumber: order.orderNumber } : { id: "", orderNumber: "" },
    {
      name: order?.shippingAddress.fullName,
      email: currentUser?.email,
      contact: order?.shippingAddress.phone,
    },
    reload
  );

  if (!ready || !currentUser) return null;

  if (loading && !order) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={24} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <EmptyState
          icon={PackageX}
          title="Order not found"
          description="We couldn't find this order on your account."
          actionLabel="View My Orders"
          actionHref="/account/orders"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: `#${order.orderNumber}` },
        ]}
      />
      <div className="mt-4 mb-8 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">
          Order #{order.orderNumber}
        </h1>
        <StatusBadge status={order.status} />
      </div>
      <OrderDetailCard order={order} />

      {canPay && (
        <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-espresso">Payment pending</p>
          <p className="mt-1 text-sm text-espresso/60">
            This order hasn&apos;t been paid yet. Complete payment to keep it moving.
          </p>
          {payError && <p className="mt-3 text-sm font-medium text-rose-600">{payError}</p>}
          <Button onClick={pay} disabled={paying} className="mt-4">
            {paying ? "Processing…" : "Pay Now"}
          </Button>
        </div>
      )}
    </div>
  );
}
