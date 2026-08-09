"use client";

import { useParams } from "next/navigation";
import { PackageX } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import OrderDetailCard from "@/components/account/OrderDetailCard";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, ready } = useRequireAuth();
  const order = useOrdersStore((state) => state.getOrderById(id));

  if (!ready || !currentUser) return null;

  if (!order || order.userId !== currentUser.id) {
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
          { label: `#${order.id}` },
        ]}
      />
      <h1 className="mt-4 mb-8 font-serif text-2xl sm:text-3xl font-bold text-espresso">Order #{order.id}</h1>
      <OrderDetailCard order={order} />
    </div>
  );
}
