"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, PackageX } from "lucide-react";
import { getOrder } from "@/lib/api/orders";
import { useAsync } from "@/lib/hooks/useAsync";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import OrderDetailCard from "@/components/account/OrderDetailCard";

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, loading, error } = useAsync(() => getOrder(orderId), [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size={28} />
      </div>
    );
  }

  if (!order || error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <EmptyState
          icon={PackageX}
          title="Order not found"
          description={error ?? "We couldn't find that order."}
          actionLabel="Go to Shop"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:py-16 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-14 w-14 text-teal-600" strokeWidth={1.5} />
        <h1 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-espresso">Order Confirmed!</h1>
        <p className="mt-2 text-sm text-espresso/60">
          Thank you — your order <span className="font-semibold text-espresso">#{order.orderNumber}</span> has
          been placed.
        </p>
      </div>

      <div className="mt-8">
        <OrderDetailCard order={order} />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/account/orders" variant="outline">
          View My Orders
        </Button>
        <Button href="/shop" variant="filled">
          Continue Shopping
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-espresso/40">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
