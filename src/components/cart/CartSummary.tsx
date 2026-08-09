import Link from "next/link";
import { formatINR } from "@/lib/utils/currency";
import { SHIPPING_FLAT_RATE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CartSummary({
  subtotal,
  checkoutHref = "/checkout",
}: {
  subtotal: number;
  checkoutHref?: string;
}) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

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
