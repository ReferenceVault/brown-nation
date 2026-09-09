"use client";

import Link from "next/link";
import { formatINR } from "@/lib/utils/currency";
import { DEFAULT_FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_FLAT_RATE } from "@/lib/constants";
import { fetchShippingSettings } from "@/lib/api/public/shippingSettings";
import { useAsync } from "@/lib/hooks/useAsync";

export default function CartSummary({
  subtotal,
  checkoutHref = "/checkout",
}: {
  subtotal: number;
  checkoutHref?: string;
}) {
  const { data: settings } = useAsync(fetchShippingSettings, []);
  const freeThreshold = settings ? Number(settings.freeThreshold) : DEFAULT_FREE_SHIPPING_THRESHOLD;
  const flatRate = settings ? Number(settings.flatFee) : DEFAULT_SHIPPING_FLAT_RATE;

  const shipping = subtotal >= freeThreshold ? 0 : flatRate;
  const total = subtotal + shipping;
  const remainingForFreeShipping = freeThreshold - subtotal;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="font-serif text-lg font-semibold text-espresso">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between text-espresso/70">
          <span>Subtotal</span>
          <span className="font-medium text-espresso">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-espresso/70">
          <span>Shipping</span>
          <span className="font-medium text-espresso">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
        </div>
      </div>

      {remainingForFreeShipping > 0 && (
        <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700">
          Add {formatINR(remainingForFreeShipping)} more for free shipping.
        </p>
      )}

      <div className="mt-4 flex justify-between border-t border-brand-100 pt-4 text-base font-bold text-espresso">
        <span>Total</span>
        <span>{formatINR(total)}</span>
      </div>

      <Link
        href={checkoutHref}
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
