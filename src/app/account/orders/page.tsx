"use client";

import { useMemo } from "react";
import { PackageOpen } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import OrderCard from "@/components/account/OrderCard";
import EmptyState from "@/components/ui/EmptyState";

export default function OrdersPage() {
  const { currentUser, ready } = useRequireAuth();
  const allOrders = useOrdersStore((state) => state.orders);
  const orders = useMemo(
    () => (currentUser ? allOrders.filter((order) => order.userId === currentUser.id) : []),
    [allOrders, currentUser]
  );

  if (!ready || !currentUser) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "My Account", href: "/account" }, { label: "Orders" }]}
      />
      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">My Orders</h1>

      {orders.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          description="Once you place an order, you'll be able to track it here."
          actionLabel="Shop Now"
          actionHref="/shop"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
