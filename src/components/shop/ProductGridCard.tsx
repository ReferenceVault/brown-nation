"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types/catalog";
import { useCartStore } from "@/lib/stores/cartStore";
import PriceTag from "@/components/ui/PriceTag";
import RatingStars from "@/components/ui/RatingStars";

export default function ProductGridCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const defaultVariant = product.variants[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
        />
        {product.isBestseller && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-brand-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
            Bestseller
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-espresso leading-snug line-clamp-1 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-espresso/55 line-clamp-1">{product.shortDescription}</p>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={12} />

        <div className="mt-1 flex items-center justify-between gap-2">
          <PriceTag price={defaultVariant.price} compareAtPrice={defaultVariant.compareAtPrice} size="sm" />
          <button
            onClick={() => addItem(product.id, defaultVariant.id)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-300 bg-brand-50 text-brand-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
