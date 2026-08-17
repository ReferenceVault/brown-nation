"use client";

import { PackageOpen } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { listMyOrders } from "@/lib/api/orders";
import { useAsync } from "@/lib/hooks/useAsync";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import OrderCard from "@/components/account/OrderCard";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";

export default function OrdersPage() {
  const { currentUser, ready } = useRequireAuth();
  const { data, loading } = useAsync(
    () => listMyOrders({ limit: 50 }),
    [currentUser?.id]
  );

  if (!ready || !currentUser) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "My Account", href: "/account" }, { label: "Orders" }]}
      />
      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">My Orders</h1>

      {loading && !data ? (
        <div className="flex justify-center py-10">
          <Spinner size={24} />
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          description="Once you place an order, you'll be able to track it here."
          actionLabel="Shop Now"
          actionHref="/shop"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {data.items.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
