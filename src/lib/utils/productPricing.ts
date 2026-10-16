import type { Product } from "@/lib/types/catalog";

/** The range of prices a product is sold at, across its base price and any Cavity/Hamper variants. */
export function productPriceRange(product: Product): { price: number; maxPrice: number } {
  const basePrice = Number(product.price);
  const variantPrices = product.variants.map((v) => Number(v.price));
  const allPrices = [basePrice, ...variantPrices];
  return { price: Math.min(...allPrices), maxPrice: Math.max(...allPrices) };
}
