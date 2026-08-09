"use client";

import { ShoppingBag } from "lucide-react";
import { useCartDetails } from "@/lib/hooks/useCartDetails";
import { useMounted } from "@/lib/hooks/useMounted";
import CartLineItem from "@/components/cart/CartLineItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function CartPage() {
  const mounted = useMounted();
  const { lines, subtotal } = useCartDetails();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">Your Cart</h1>

      {!mounted ? null : lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added any chocolates yet — go find your new favorite."
          actionLabel="Shop Now"
          actionHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-card lg:col-span-2">
            {lines.map((line) => (
              <CartLineItem key={`${line.productId}-${line.variantId}`} line={line} />
            ))}
          </div>
          <div>
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      )}
    </div>
  );
}
