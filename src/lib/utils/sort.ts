import type { Product } from "@/lib/types/catalog";
import type { SortOption } from "@/components/shop/ShopFilters";

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.variants[0].price - b.variants[0].price);
    case "price-desc":
      return sorted.sort((a, b) => b.variants[0].price - a.variants[0].price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}
