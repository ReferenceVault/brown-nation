"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setSortOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sortOpen]);

  const onSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setSortOpen(false);
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

      <div ref={sortRef} className="relative w-fit">
        <button
          type="button"
          onClick={() => setSortOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-3.5 py-2 text-xs font-medium text-espresso outline-none transition-colors duration-200 hover:border-brand-400 cursor-pointer"
        >
          {sortLabels[currentSort]}
          <ChevronDown
            className={`h-3.5 w-3.5 text-espresso/60 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>

        {sortOpen && (
          <div className="absolute left-0 sm:left-auto sm:right-0 top-full z-10 mt-2 w-52 max-w-[calc(100vw-2rem)] rounded-xl border border-brand-100 bg-white py-2 shadow-soft">
            {Object.entries(sortLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onSortChange(value)}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 cursor-pointer ${
                  currentSort === value
                    ? "bg-brand-50 font-medium text-brand-600"
                    : "text-espresso/80 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
