import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug } from "@/lib/repositories/categories";
import { getProductsByCategory } from "@/lib/repositories/products";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopFilters, { type SortOption } from "@/components/shop/ShopFilters";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { sortProducts } from "@/lib/utils/sort";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} | Brown Nation Chocolates`,
    description: category.description,
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
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = sortProducts(getProductsByCategory(category.id), (sort as SortOption) || "featured");
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
      />

      <div className="mt-4 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">{category.name}</h1>
        <p className="mt-2 max-w-xl text-sm sm:text-base text-espresso/60">{category.description}</p>
      </div>

      <Suspense fallback={null}>
        <ShopFilters categories={categories} activeCategorySlug={category.slug} />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
