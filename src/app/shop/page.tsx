import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/repositories/products";
import { getAllCategories } from "@/lib/repositories/categories";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopFilters, { type SortOption } from "@/components/shop/ShopFilters";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { sortProducts } from "@/lib/utils/sort";

export const metadata: Metadata = {
  title: "Shop All Chocolates | Brown Nation Chocolates",
  description: "Browse handcrafted chocolates made with premium ingredients — bars, truffles, and gifting boxes.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const products = sortProducts(getAllProducts(), (sort as SortOption) || "featured");
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <div className="mt-4 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">Shop All Chocolates</h1>
        <p className="mt-2 max-w-xl text-sm sm:text-base text-espresso/60">
          Handcrafted in small batches with premium ingredients — no preservatives, ever.
        </p>
      </div>

      <Suspense fallback={null}>
        <ShopFilters categories={categories} />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
