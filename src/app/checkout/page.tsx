"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import { useCartDetails } from "@/lib/hooks/useCartDetails";
import { useMounted } from "@/lib/hooks/useMounted";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { ShippingAddress } from "@/lib/types/order";

const SIMULATED_PAYMENT_DELAY_MS = 1400;

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useMounted();
  const currentUser = useAuthStore((state) => state.currentUser);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const clearCart = useCartStore((state) => state.clear);
  const { lines, subtotal } = useCartDetails();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (!currentUser) {
      router.replace("/login?redirect=/checkout");
      return;
    }
    if (lines.length === 0 && !submitting) {
      router.replace("/cart");
    }
  }, [mounted, currentUser, lines.length, submitting, router]);

  const handlePlaceOrder = (address: ShippingAddress) => {
    if (!currentUser) return;
    setSubmitting(true);
    const items = lines.map((line) => ({
      productId: line.productId,
      productSlug: line.product.slug,
      variantId: line.variantId,
      name: line.product.name,
      variantLabel: line.variant.label,
      price: line.variant.price,
      quantity: line.quantity,
      image: line.product.images[0],
    }));

    setTimeout(() => {
      const order = createOrder(currentUser.id, items, address);
      clearCart();
      router.push(`/checkout/confirmation/${order.id}`);
    }, SIMULATED_PAYMENT_DELAY_MS);
  };

  if (!mounted || !currentUser || lines.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ShippingForm onPlaceOrder={handlePlaceOrder} submitting={submitting} />
        </div>
        <div>
          <OrderSummary lines={lines} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
