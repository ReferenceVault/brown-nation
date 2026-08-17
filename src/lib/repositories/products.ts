import { useCatalogStore } from "@/lib/stores/catalogStore";
import type { Product } from "@/lib/types/catalog";

export function getAllProducts(): Product[] {
  return useCatalogStore.getState().products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getAllProducts().filter((product) => product.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}

export function getFeaturedSelection(limit = 10): Product[] {
  return getAllProducts().slice(0, limit);
}
