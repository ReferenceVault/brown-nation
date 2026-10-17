import type { Product } from "@/lib/types/catalog";

/**
 * Whether the plain "Bar" is itself a purchasable option. Inferred, not
 * stored: a positive base price means Bar is for sale; a product with no
 * Cavity/Hamper options at all always falls back to Bar regardless (it's
 * the only thing there is to sell — see the admin form's required-fields
 * rule, which mirrors this exactly).
 */
function sellsBar(product: Product): boolean {
  return Number(product.price) > 0 || product.variants.length === 0;
}

/** The range of prices a product is actually sold at. */
export function productPriceRange(product: Product): { price: number; maxPrice: number } {
  const basePrice = Number(product.price);
  const variantPrices = product.variants.map((v) => Number(v.price));
  const allPrices = sellsBar(product) ? [basePrice, ...variantPrices] : variantPrices;
  return { price: Math.min(...allPrices), maxPrice: Math.max(...allPrices) };
}

/**
 * The photo to represent a product in a listing (grid card, related-product
 * card). When Bar isn't sold, the base images aren't what's actually being
 * sold, so prefer the first variant's own photo instead.
 */
export function productDisplayImage(product: Product): string | null {
  if (!sellsBar(product) && product.variants.length > 0) {
    return product.variants[0].image ?? product.images[0] ?? null;
  }
  return product.images[0] ?? null;
}

/**
 * The variant a "quick add" (no variant picker shown, e.g. a shop grid card)
 * should add — undefined means the plain Bar. When Bar isn't sold, there is
 * no unambiguous default unless there's exactly one variant to fall back on
 * — callers should route anywhere-but-that case to the product page instead
 * of guessing (see canQuickAddProduct).
 */
export function productQuickAddVariantId(product: Product): string | undefined {
  return !sellsBar(product) ? product.variants[0]?.id : undefined;
}

/** Whether a one-click "Add to Cart" (no variant picker) is unambiguous for this product. */
export function canQuickAddProduct(product: Product): boolean {
  return sellsBar(product) || product.variants.length <= 1;
}

/** The variant a product detail page should default to selecting — undefined means the plain Bar. */
export function productDefaultVariantId(product: Product): string | undefined {
  return !sellsBar(product) ? product.variants[0]?.id : undefined;
}

export { sellsBar as productSellsBar };
