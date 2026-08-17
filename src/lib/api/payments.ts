import type { AdminOrder } from "@/lib/types/admin";
import { apiFetch } from "./client";

export type PaymentIntent = {
  payment: {
    id: string;
    orderId: string;
    provider: string;
    providerPaymentId: string;
    amount: string;
    currency: string;
    status: string;
  };
  clientSecret?: string;
};

export function initiatePayment(orderId: string) {
  return apiFetch<PaymentIntent>(`/payments/${orderId}/initiate`, { method: "POST" });
}

export type RazorpayVerifyParams = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

/** Returns the order with its payment status confirmed, so the caller doesn't need a second fetch. */
export function verifyPayment(orderId: string, params: RazorpayVerifyParams) {
  return apiFetch<AdminOrder>(`/payments/${orderId}/verify`, { method: "POST", body: params });
}
