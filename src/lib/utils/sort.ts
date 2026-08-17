import type { SortOption } from "@/components/shop/ShopFilters";
import type { ProductListParams } from "@/lib/api/public/products";

/** Maps a storefront sort option to the backend's actual sortBy/sortOrder query params. */
export function toApiSort(sort: SortOption): Pick<ProductListParams, "sortBy" | "sortOrder"> {
  if (sort === "price-asc") return { sortBy: "price", sortOrder: "asc" };
  if (sort === "price-desc") return { sortBy: "price", sortOrder: "desc" };
  return {};
}
