import type { Product } from "@/lib/types/catalog";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";
import { publicFetch } from "./client";

export type ProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: "name" | "price" | "createdAt" | "stockQuantity";
  sortOrder?: "asc" | "desc";
};

export function listProducts(params: ProductListParams = {}) {
  return publicFetch<Paginated<Product>>(`/products${toQueryString(params)}`);
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { items } = await listProducts({ limit: 100 });
  return items;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await publicFetch<Product>(`/products/slug/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}
