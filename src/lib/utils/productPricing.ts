import type { Product } from "@/lib/types/catalog";

/**
 * The range of prices a product is actually sold at. When the plain Bar
 * isn't sold (sellsBar is false), its price field is just a placeholder —
 * excluded here so it can't skew the displayed range.
 */
export function productPriceRange(product: Product): { price: number; maxPrice: number } {
  const basePrice = Number(product.price);
  const variantPrices = product.variants.map((v) => Number(v.price));
  const allPrices =
    product.sellsBar || variantPrices.length === 0 ? [basePrice, ...variantPrices] : variantPrices;
  return { price: Math.min(...allPrices), maxPrice: Math.max(...allPrices) };
}
