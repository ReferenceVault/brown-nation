"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types/catalog";
import { useCartStore } from "@/lib/stores/cartStore";
import { useMounted } from "@/lib/hooks/useMounted";
import {
  productPriceRange,
  productDisplayImage,
  productQuickAddVariantId,
  canQuickAddProduct,
} from "@/lib/utils/productPricing";
import PriceTag from "@/components/ui/PriceTag";
import QuantityStepper from "@/components/ui/QuantityStepper";
import StarRating from "@/components/ui/StarRating";

export default function ProductGridCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const { price, maxPrice } = productPriceRange(product);
  const displayImage = productDisplayImage(product);
  const showHoverImage = displayImage === product.images[0] && product.images[1];
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : undefined;
  const outOfStock = product.stockQuantity <= 0;
  const priceOnRequest = price <= 0;
  const mounted = useMounted();
  // undefined when Bar is sold (quick-add = the base product); when it
  // isn't, this is the one variant that makes a one-click add unambiguous —
  // canQuickAdd below is false whenever there's more than one to choose from.
  const quickAddVariantId = productQuickAddVariantId(product);
  const canQuickAdd = canQuickAddProduct(product);
  const quantity = useCartStore(
    (state) =>
      state.items.find(
        (item) => item.productId === product.id && (item.variantId ?? null) === (quickAddVariantId ?? null)
      )?.quantity ?? 0
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-brand-50">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs font-medium text-espresso/40">
            {product.name}
          </div>
        )}
        {showHoverImage && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        {product.isBestSeller && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-amber-400 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-espresso shadow-md">
            Best Seller
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-2.5 top-2.5 rounded-md bg-espresso px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-espresso leading-snug line-clamp-1 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-espresso/55 line-clamp-1">{product.description}</p>
        {product.ratingCount > 0 && (
          <StarRating rating={product.averageRating} />
        )}

        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-2 sm:gap-y-1">
          {priceOnRequest ? (
            <span className="text-sm font-bold text-brand-600">Price on request</span>
          ) : (
            <PriceTag price={price} maxPrice={maxPrice} compareAtPrice={compareAtPrice} size="sm" />
          )}
          {priceOnRequest ? null : mounted && quantity > 0 ? (
            <QuantityStepper
              size="sm"
              quantity={quantity}
              min={product.minOrderQuantity > 1 ? product.minOrderQuantity : 0}
              max={product.stockQuantity}
              onChange={(q) => updateQuantity(product.id, q, quickAddVariantId)}
              className="w-full sm:w-auto"
            />
          ) : outOfStock ? (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-espresso/40">
              Out of Stock
            </span>
          ) : canQuickAdd ? (
            <button
              onClick={() => addItem(product.id, product.minOrderQuantity, quickAddVariantId)}
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex w-fit items-center justify-center gap-1.5 rounded-md border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white cursor-pointer sm:h-8 sm:w-8 sm:px-0 sm:py-0"
            >
              <span className="sm:hidden">Add to Cart</span>
              <ShoppingCart className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            </button>
          ) : (
            // Multiple variants and no plain Bar — there's no unambiguous
            // default to quick-add, so send the customer to pick one.
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex w-fit items-center justify-center rounded-md border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white"
            >
              View Options
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
