"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { CartDetailLine } from "@/lib/hooks/useCartDetails";
import { useCartStore } from "@/lib/stores/cartStore";
import QuantityStepper from "@/components/ui/QuantityStepper";
import PriceTag from "@/components/ui/PriceTag";

export default function CartLineItem({ line }: { line: CartDetailLine }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const price = Number(line.product.price);

  return (
    <div className="flex items-center gap-4 border-b border-brand-100 py-4 last:border-b-0">
      <Link href={`/product/${line.product.slug}`} className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg">
        <Image src={line.product.images[0]} alt={line.product.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${line.product.slug}`}>
          <h3 className="text-sm font-semibold text-espresso line-clamp-1 hover:text-brand-600">
            {line.product.name}
          </h3>
        </Link>
        <div className="mt-2">
          <PriceTag price={price} size="sm" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          aria-label={`Remove ${line.product.name} from cart`}
          onClick={() => removeItem(line.productId)}
          className="text-espresso/35 transition-colors duration-200 hover:text-red-500 cursor-pointer"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
        <QuantityStepper
          size="sm"
          quantity={line.quantity}
          min={line.product.minOrderQuantity > 1 ? line.product.minOrderQuantity : 0}
          max={line.product.stockQuantity}
          onChange={(q) => updateQuantity(line.productId, q)}
        />
      </div>
    </div>
  );
}
