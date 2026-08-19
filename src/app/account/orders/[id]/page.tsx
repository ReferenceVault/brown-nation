"use client";

import { useParams } from "next/navigation";
import { PackageX } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { getOrder } from "@/lib/api/orders";
import { useAsync } from "@/lib/hooks/useAsync";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import OrderDetailCard from "@/components/account/OrderDetailCard";
import StatusBadge from "@/components/ui/StatusBadge";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, ready } = useRequireAuth();
  const { data: order, loading } = useAsync(() => getOrder(id), [id]);

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
    </div>
  );
}
