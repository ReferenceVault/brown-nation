"use client";

import { useMemo } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import { useCatalogStore } from "@/lib/stores/catalogStore";
import { getProductById } from "@/lib/repositories/products";
import type { Product } from "@/lib/types/catalog";

export type CartDetailLine = {
  productId: string;
  quantity: number;
  product: Product;
  lineTotal: number;
};

export function useCartDetails() {
  const items = useCartStore((state) => state.items);
  // Subscribed reactively (not a one-off getState() read) so cart lines resolve
  // once the catalog finishes loading, even if it wasn't ready when this hook
  // first ran (e.g. landing directly on /cart before the fetch resolves).
  const products = useCatalogStore((state) => state.products);

  const lines = useMemo<CartDetailLine[]>(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          productId: item.productId,
          quantity: item.quantity,
          product,
          lineTotal: Number(product.price) * item.quantity,
        };
      })
      .filter((line): line is CartDetailLine => line !== null);
    // `products` isn't read directly above — getProductById reads it via
    // getState() — but it must stay a dependency so this recomputes once the
    // catalog finishes loading instead of being stuck on a stale empty result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, products]);

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return { lines, subtotal, itemCount };
}
