import type { ProductVariant } from "@/lib/types/catalog";

export function variantLabel(variant: ProductVariant): string {
  return variant.kind === "HAMPER" ? (variant.label ?? "Hamper") : `${variant.cavityCount} Cavity`;
}
