"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, PackageX } from "lucide-react";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import { useMounted } from "@/lib/hooks/useMounted";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import OrderDetailCard from "@/components/account/OrderDetailCard";

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const mounted = useMounted();
  const order = useOrdersStore((state) => state.getOrderById(orderId));

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <EmptyState
          icon={PackageX}
          title="Order not found"
          description="We couldn't find that order. It may have been placed in a different browser."
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
          Thank you  your order <span className="font-semibold text-espresso">#{order.id}</span> has been placed.
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
