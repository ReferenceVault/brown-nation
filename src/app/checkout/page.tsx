"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { useCatalogStore } from "@/lib/stores/catalogStore";
import { useCartDetails } from "@/lib/hooks/useCartDetails";
import { useMounted } from "@/lib/hooks/useMounted";
import { syncServerCart } from "@/lib/api/cart";
import { createOrder } from "@/lib/api/orders";
import { initiatePayment, verifyPayment } from "@/lib/api/payments";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/utils/razorpay";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { ShippingAddress } from "@/lib/types/order";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong. Please try again.";
}

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useMounted();
  const currentUser = useAuthStore((state) => state.currentUser);
  const clearCart = useCartStore((state) => state.clear);
  const { lines, subtotal } = useCartDetails();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Catalog loads async (see SiteChrome); until it settles, `lines` may look
  // empty even when the cart genuinely has items, so don't treat that as
  // "empty cart" and bounce the user to /cart before we actually know.
  const catalogStatus = useCatalogStore((state) => state.status);
  const catalogReady = catalogStatus === "loaded" || catalogStatus === "error";

  useEffect(() => {
    if (!mounted) return;
    if (!currentUser) {
      router.replace("/login?redirect=/checkout");
      return;
    }
    if (!catalogReady) return;
    if (lines.length === 0 && !submitting) {
      router.replace("/cart");
    }
  }, [mounted, currentUser, catalogReady, lines.length, submitting, router]);

  const handlePlaceOrder = async (address: ShippingAddress) => {
    if (!currentUser) return;
    setSubmitting(true);
    setError(null);

    try {
      // The local cart (useCartStore) is instant-UI-only; reconcile it with
      // the server cart, which is what order creation actually reads from.
      await syncServerCart(lines.map((line) => ({ productId: line.productId, quantity: line.quantity })));

      const order = await createOrder({ shippingAddress: address });
      const { payment } = await initiatePayment(order.id);

      if (payment.provider === "MOCK") {
        // Mock provider marks the payment SUCCESS synchronously server-side
        // — nothing left to confirm client-side.
        clearCart();
        router.push(`/checkout/confirmation/${order.id}`);
        return;
      }

      if (payment.provider !== "RAZORPAY") {
        throw new Error(`Unsupported payment provider: ${payment.provider}`);
      }
      if (!RAZORPAY_KEY_ID) {
        throw new Error("Payment is not configured (missing NEXT_PUBLIC_RAZORPAY_KEY_ID).");
      }

      await loadRazorpayScript();

      openRazorpayCheckout({
        key: RAZORPAY_KEY_ID,
        amount: Math.round(Number(payment.amount) * 100),
        currency: payment.currency,
        order_id: payment.providerPaymentId,
        name: "Brown Nation Chocolates",
        description: `Order ${order.orderNumber}`,
        prefill: {
          name: address.fullName,
          email: currentUser.email,
          contact: address.phone,
        },
        theme: { color: "#d9822b" },
        handler: async (response) => {
          try {
            await verifyPayment(order.id, response);
            clearCart();
            router.push(`/checkout/confirmation/${order.id}`);
          } catch (err) {
            setError(
              `Payment succeeded but we couldn't confirm it automatically (${errorMessage(err)}). Check My Orders in a minute, or contact support.`
            );
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setError("Payment was cancelled. Your order is saved — you can try paying again.");
          },
        },
      });
    } catch (err) {
      setError(errorMessage(err));
      setSubmitting(false);
    }
  };

  if (!mounted || !currentUser || !catalogReady || lines.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">Checkout</h1>

      {error && (
        <p className="mb-6 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>
      )}

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
