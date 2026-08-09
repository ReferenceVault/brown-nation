import Image from "next/image";
import { formatINR } from "@/lib/utils/currency";
import type { CartDetailLine } from "@/lib/hooks/useCartDetails";
import { SHIPPING_FLAT_RATE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function OrderSummary({ lines, subtotal }: { lines: CartDetailLine[]; subtotal: number }) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="font-serif text-lg font-semibold text-espresso">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
        {lines.map((line) => (
          <div key={`${line.productId}-${line.variantId}`} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <Image src={line.product.images[0]} alt={line.product.name} fill sizes="48px" className="object-cover" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-espresso text-[10px] font-semibold text-white">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-espresso line-clamp-1">{line.product.name}</p>
              <p className="text-xs text-espresso/50">{line.variant.label}</p>
            </div>
            <p className="text-sm font-semibold text-espresso">{formatINR(line.lineTotal)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 border-t border-brand-100 pt-4 text-sm">
        <div className="flex justify-between text-espresso/70">
          <span>Subtotal</span>
          <span className="font-medium text-espresso">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-espresso/70">
          <span>Shipping</span>
          <span className="font-medium text-espresso">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-brand-100 pt-2.5 text-base font-bold text-espresso">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>
    </div>
  );
}
