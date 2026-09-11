"use client";

import { useState, type FormEvent } from "react";
import { Tag, X, Loader2, Info } from "lucide-react";
import { useCouponStore } from "@/lib/stores/couponStore";
import type { CouponValidationResult } from "@/lib/api/coupons";

export default function CouponInput({
  result,
  loading,
  error,
}: {
  result: CouponValidationResult | null;
  loading: boolean;
  error: string | null;
}) {
  const appliedCode = useCouponStore((state) => state.code);
  const applyCoupon = useCouponStore((state) => state.apply);
  const clearCoupon = useCouponStore((state) => state.clear);
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    applyCoupon(input.trim());
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={1.75} />
          {loading ? (
            <span className="flex items-center gap-1.5 text-espresso/60">
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
              Checking {appliedCode}…
            </span>
          ) : result ? (
            <span className="font-medium text-espresso">
              {result.code} applied
            </span>
          ) : (
            <span className="font-medium text-amber-700">{error ?? "This coupon is no longer valid."}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            clearCoupon();
            setInput("");
          }}
          aria-label="Remove coupon"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-espresso/40 transition-colors duration-200 hover:bg-espresso/10 hover:text-espresso cursor-pointer"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder="Coupon code"
          className="min-w-0 flex-1 rounded-lg border border-brand-200 px-3.5 py-2.5 text-sm uppercase text-espresso outline-none transition-colors duration-200 placeholder:normal-case placeholder:text-espresso/35 focus:border-brand-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 rounded-lg bg-espresso px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-espresso/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>
      {error && (
        <div className="flex items-start gap-1.5 rounded-lg bg-pastel-yellow-soft px-3 py-2 text-xs font-medium text-amber-800">
          <Info className="h-3.5 w-3.5 shrink-0 translate-y-px" strokeWidth={2} />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
