import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchAllCategories, fetchCategoryBySlug } from "@/lib/api/public/categories";
import { listProducts } from "@/lib/api/public/products";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopFilters, { type SortOption } from "@/components/shop/ShopFilters";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { toApiSort } from "@/lib/utils/sort";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await fetchCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} | Brown Nation Chocolates`,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { category: slug } = await params;
  const { sort } = await searchParams;
  const category = await fetchCategoryBySlug(slug);
  if (!category) notFound();

  const sortOption = (sort as SortOption) || "featured";
  const [{ items: products }, categories] = await Promise.all([
    listProducts({ categoryId: category.id, limit: 100, ...toApiSort(sortOption) }),
    fetchAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
      />

      <div className="mt-4 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-xl text-sm sm:text-base text-espresso/60">{category.description}</p>
        )}
      </div>

      <Suspense fallback={null}>
        <ShopFilters categories={categories} activeCategorySlug={category.slug} />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
