"use client";

import { useState } from "react";
import { initiatePayment, verifyPayment } from "@/lib/api/payments";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/utils/razorpay";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong. Please try again.";
}

type PayNowOrder = { id: string; orderNumber: string };
type PayNowPrefill = { name?: string; email?: string; contact?: string };

/** Drives payment for an existing order — used both right after checkout and
 * to retry payment later on an order still Pending/unpaid. */
export function usePayNow(order: PayNowOrder, prefill: PayNowPrefill, onSuccess: () => void) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async () => {
    setPaying(true);
    setError(null);

    try {
      const { payment } = await initiatePayment(order.id);

      if (payment.provider === "MOCK") {
        // Mock provider marks the payment SUCCESS synchronously server-side.
        onSuccess();
        setPaying(false);
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
        prefill,
        theme: { color: "#d9822b" },
        handler: async (response) => {
          try {
            await verifyPayment(order.id, response);
            onSuccess();
          } catch (err) {
            setError(
              `Payment succeeded but we couldn't confirm it automatically (${errorMessage(err)}). Refresh in a minute, or contact support.`
            );
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
    } catch (err) {
      setError(errorMessage(err));
      setPaying(false);
    }
  };

  return { pay, paying, error };
}
