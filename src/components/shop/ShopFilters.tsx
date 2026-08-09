"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types/catalog";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
};

export default function ShopFilters({
  categories,
  activeCategorySlug,
}: {
  categories: Category[];
  activeCategorySlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") as SortOption) || "featured";

  const onSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
            !activeCategorySlug
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-brand-200 text-espresso/70 hover:border-brand-400 hover:text-brand-600"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop/${category.slug}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
              activeCategorySlug === category.slug
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-brand-200 text-espresso/70 hover:border-brand-400 hover:text-brand-600"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-fit rounded-lg border border-brand-200 bg-white px-3.5 py-2 text-xs font-medium text-espresso outline-none focus:border-brand-400 cursor-pointer"
      >
        {Object.entries(sortLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
