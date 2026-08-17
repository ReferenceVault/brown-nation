import { useCatalogStore } from "@/lib/stores/catalogStore";
import type { Category } from "@/lib/types/catalog";

export function getAllCategories(): Category[] {
  return useCatalogStore.getState().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((category) => category.slug === slug);
}
