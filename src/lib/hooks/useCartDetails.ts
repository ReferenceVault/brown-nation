"use client";

import { useMemo } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import { getProductById } from "@/lib/repositories/products";
import type { Product, ProductVariant } from "@/lib/types/catalog";

export type CartDetailLine = {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
};

export function useCartDetails() {
  const items = useCartStore((state) => state.items);

  const lines = useMemo<CartDetailLine[]>(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        const variant = product?.variants.find((v) => v.id === item.variantId);
        if (!product || !variant) return null;
        return {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          product,
          variant,
          lineTotal: variant.price * item.quantity,
        };
      })
      .filter((line): line is CartDetailLine => line !== null);
  }, [items]);

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return { lines, subtotal, itemCount };
}
