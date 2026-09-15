"use client";

import { useEffect, useRef, useState } from "react";
import { useCouponStore } from "@/lib/stores/couponStore";
import { useToastStore } from "@/lib/stores/toastStore";
import { validateCoupon, type CouponValidationResult } from "@/lib/api/coupons";
import { ApiError } from "@/lib/api/errors";
import { formatINR } from "@/lib/utils/currency";
import type { CartDetailLine } from "./useCartDetails";

type CouponDetailsState = {
  result: CouponValidationResult | null;
  loading: boolean;
  error: string | null;
};

/**
 * Re-validates the persisted coupon code against the current cart lines on
 * every change (item added/removed, quantity changed) — the discount is
 * never trusted from a previous response, only ever from the latest
 * server-computed one. Silently drops the code if it stops validating (e.g.
 * expired, or the cart no longer meets the minimum).
 */
export function useCouponDetails(lines: CartDetailLine[]) {
  const code = useCouponStore((state) => state.code);
  const clearCoupon = useCouponStore((state) => state.clear);
  const showToast = useToastStore((state) => state.show);
  const [state, setState] = useState<CouponDetailsState>({ result: null, loading: false, error: null });
  const requestId = useRef(0);
  // Tracks which code we've already celebrated, so re-validating the same
  // applied coupon on every cart change (quantity edits, etc.) doesn't
  // re-fire the "you saved ₹X" toast each time — only a genuinely new apply does.
  const celebratedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!code || lines.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ result: null, loading: false, error: null });
      celebratedCodeRef.current = null;
      return;
    }

    const id = ++requestId.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    validateCoupon(
      code,
      lines.map((line) => ({
        productId: line.productId,
        variantId: line.variantId,
        quantity: line.quantity,
      }))
    )
      .then((result) => {
        if (requestId.current !== id) return;
        setState({ result, loading: false, error: null });
        if (celebratedCodeRef.current !== result.code) {
          celebratedCodeRef.current = result.code;
          showToast(`🎉 Coupon applied! You saved ${formatINR(Number(result.discountAmount))}.`);
        }
      })
      .catch((err: unknown) => {
        if (requestId.current !== id) return;
        clearCoupon();
        celebratedCodeRef.current = null;
        const message = err instanceof ApiError ? err.message : "Could not apply this coupon.";
        setState({ result: null, loading: false, error: message });
        showToast(message, "info");
      });
    // `lines` is a freshly-derived array each render, so key off its actual
    // content (ids/quantities) rather than referential identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, JSON.stringify(lines.map((l) => [l.productId, l.variantId, l.quantity]))]);

  return state;
}
