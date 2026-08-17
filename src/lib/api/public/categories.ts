import type { Category } from "@/lib/types/catalog";
import type { Paginated } from "../types";
import { publicFetch } from "./client";

export async function fetchAllCategories(): Promise<Category[]> {
  const { items } = await publicFetch<Paginated<Category>>("/categories?limit=100&status=ACTIVE");
  return items;
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await fetchAllCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}
