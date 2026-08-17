"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Search, PackageX } from "lucide-react";
import { useAuthStore } from "@/lib/stores/authStore";
import { listMyOrders } from "@/lib/api/orders";
import { useMounted } from "@/lib/hooks/useMounted";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import OrderDetailCard from "@/components/account/OrderDetailCard";
import type { Order } from "@/lib/types/order";

export default function TrackOrderPage() {
  const mounted = useMounted();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [orderNumber, setOrderNumber] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = orderNumber.trim().replace(/^#/, "");
    setSearched(query);
    setOrder(null);
    if (!currentUser || !query) return;

    setSearching(true);
    try {
      const { items } = await listMyOrders({ limit: 100 });
      setOrder(items.find((o) => o.orderNumber.toLowerCase() === query.toLowerCase()) ?? null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Track Order" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Track Your Order</h1>
      <p className="mt-2 text-sm sm:text-base text-espresso/60">
        Enter your order number to check its status, or{" "}
        <Link href="/account/orders" className="font-semibold text-brand-600 hover:underline">
          view all your orders
        </Link>{" "}
        if you&apos;re logged in.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex items-end gap-3 rounded-2xl bg-white p-5 shadow-card">
        <div className="flex-1">
          <TextField
            label="Order Number"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. BN-20260816-EE2CDE11"
          />
        </div>
        <Button type="submit" variant="filled" icon={<Search className="h-4 w-4" />} disabled={searching}>
          {searching ? "Searching…" : "Track"}
        </Button>
      </form>

      {mounted && searched && !currentUser && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-card">
          <PackageX className="h-8 w-8 text-brand-300" strokeWidth={1.5} />
          <p className="text-sm font-medium text-espresso">Log in to track your order.</p>
          <Button href={`/login?redirect=/track-order`} variant="filled" className="mt-1">
            Log In
          </Button>
        </div>
      )}

      {mounted && searched && currentUser && !searching && (
        <div className="mt-6">
          {order ? (
            <>
              <h2 className="mb-3 font-serif text-lg font-semibold text-espresso">Order #{order.orderNumber}</h2>
              <OrderDetailCard order={order} />
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-card">
              <PackageX className="h-8 w-8 text-brand-300" strokeWidth={1.5} />
              <p className="text-sm font-medium text-espresso">
                No order found for &ldquo;{searched}&rdquo;.
              </p>
              <p className="text-xs text-espresso/50">Double-check the order number from your confirmation email.</p>
            </div>
          )}
        </div>
      )}

      {searching && (
        <div className="mt-6 flex justify-center">
          <Spinner size={24} />
        </div>
      )}
    </div>
  );
}
