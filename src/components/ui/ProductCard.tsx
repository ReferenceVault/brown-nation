"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types/catalog";
import { useCartStore } from "@/lib/stores/cartStore";
import { useMounted } from "@/lib/hooks/useMounted";
import QuantityStepper from "./QuantityStepper";
import PriceTag from "./PriceTag";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : undefined;
  const outOfStock = product.stockQuantity <= 0;
  const priceOnRequest = price <= 0;
  const mounted = useMounted();
  const quantity = useCartStore(
    (state) => state.items.find((item) => item.productId === product.id)?.quantity ?? 0
  );

  return (
    <div className="group flex flex-shrink-0 w-full snap-center sm:w-[270px] items-center gap-5 sm:gap-3 rounded-xl bg-white p-2.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/product/${product.slug}`} className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
        />
      </Link>

      <div className="flex min-w-0 flex-col gap-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-espresso leading-snug line-clamp-2 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        {priceOnRequest ? (
          <span className="text-sm font-bold text-brand-600">Price on request</span>
        ) : (
          <PriceTag price={price} compareAtPrice={compareAtPrice} size="sm" />
        )}

        {priceOnRequest ? null : mounted && quantity > 0 ? (
          <div className="mt-1">
            <QuantityStepper
              size="sm"
              quantity={quantity}
              min={0}
              max={product.stockQuantity}
              onChange={(q) => updateQuantity(product.id, q)}
            />
          </div>
        ) : outOfStock ? (
          <span className="mt-1 w-fit text-xs font-semibold uppercase tracking-wide text-espresso/40">
            Out of Stock
          </span>
        ) : (
          <button
            onClick={() => addItem(product.id)}
            className="mt-1 inline-flex w-fit items-center justify-center gap-1.5 rounded-md border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white cursor-pointer"
          >
            Add to Cart
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
