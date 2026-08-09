"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Search, PackageX } from "lucide-react";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import { useMounted } from "@/lib/hooks/useMounted";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import OrderDetailCard from "@/components/account/OrderDetailCard";

export default function TrackOrderPage() {
  const mounted = useMounted();
  const getOrderById = useOrdersStore((state) => state.getOrderById);
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState<string | null>(null);

  const order = searched ? getOrderById(searched) : undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearched(orderId.trim().replace(/^#/, ""));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Track Order" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Track Your Order</h1>
      <p className="mt-2 text-sm sm:text-base text-espresso/60">
        Enter your order ID to check its status, or{" "}
        <Link href="/account/orders" className="font-semibold text-brand-600 hover:underline">
          view all your orders
        </Link>{" "}
        if you&apos;re logged in.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex items-end gap-3 rounded-2xl bg-white p-5 shadow-card">
        <div className="flex-1">
          <TextField
            label="Order ID"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. BN48404335"
          />
        </div>
        <Button type="submit" variant="filled" icon={<Search className="h-4 w-4" />}>
          Track
        </Button>
      </form>

      {mounted && searched && (
        <div className="mt-6">
          {order ? (
            <>
              <h2 className="mb-3 font-serif text-lg font-semibold text-espresso">Order #{order.id}</h2>
              <OrderDetailCard order={order} />
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-card">
              <PackageX className="h-8 w-8 text-brand-300" strokeWidth={1.5} />
              <p className="text-sm font-medium text-espresso">
                No order found for &ldquo;{searched}&rdquo;.
              </p>
              <p className="text-xs text-espresso/50">
                Double-check the order ID from your confirmation email, or log in to see all your orders.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
