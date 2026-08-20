import type { AdminProduct, ProductStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type ProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: ProductStatus | "ALL";
  sortBy?: "name" | "price" | "createdAt" | "stockQuantity";
  sortOrder?: "asc" | "desc";
};

export type ProductInput = {
  name: string;
  slug?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  images?: string[];
  categoryId: string;
  status?: ProductStatus;
  stockQuantity?: number;
  isBestSeller?: boolean;
  minOrderQuantity?: number;
};

export function listProducts(params: ProductListParams = {}) {
  return apiFetch<Paginated<AdminProduct>>(
    `/products${toQueryString({ status: "ALL", ...params })}`,
    { skipAuth: true },
  );
}

export function getProduct(id: string) {
  return apiFetch<AdminProduct>(`/products/${id}`, { skipAuth: true });
}

export function createProduct(data: ProductInput) {
  return apiFetch<AdminProduct>("/products", { method: "POST", body: data });
}

export function updateProduct(id: string, data: Partial<ProductInput>) {
  return apiFetch<AdminProduct>(`/products/${id}`, { method: "PATCH", body: data });
}

export function deleteProduct(id: string) {
  return apiFetch<{ message: string }>(`/products/${id}`, { method: "DELETE" });
}
