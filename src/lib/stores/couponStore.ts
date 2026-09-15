"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CouponState = {
  code: string | null;
  apply: (code: string) => void;
  clear: () => void;
};

/**
 * Only the applied *code* persists — the discount itself is always re-derived
 * from the backend (see useCouponDetails) so a stale/tampered amount can
 * never be trusted or displayed.
 */
export const useCouponStore = create<CouponState>()(
  persist(
    (set) => ({
      code: null,
      apply: (code) => set({ code: code.trim().toUpperCase() }),
      clear: () => set({ code: null }),
    }),
    { name: "brown-nation-coupon" }
  )
);
