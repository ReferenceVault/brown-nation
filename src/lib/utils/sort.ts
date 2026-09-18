import type { SortOption } from "@/components/shop/ShopFilters";
import type { ProductListParams } from "@/lib/api/public/products";

/** Maps a storefront sort option to the backend's actual query params. */
export function toApiSort(
  sort: SortOption
): Pick<ProductListParams, "sortBy" | "sortOrder" | "isBestSeller"> {
  if (sort === "price-asc") return { sortBy: "price", sortOrder: "asc" };
  if (sort === "price-desc") return { sortBy: "price", sortOrder: "desc" };
  if (sort === "best-sellers") return { isBestSeller: true };
  return {};
}
