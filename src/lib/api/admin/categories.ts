import type { AdminCategory, CategoryStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type CategoryListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: CategoryStatus;
};

export type CategoryInput = {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: CategoryStatus;
};

export function listCategories(params: CategoryListParams = {}) {
  return apiFetch<Paginated<AdminCategory>>(`/categories${toQueryString({ limit: 100, ...params })}`, {
    skipAuth: true,
  });
}

export function getCategory(id: string) {
  return apiFetch<AdminCategory>(`/categories/${id}`, { skipAuth: true });
}

export function createCategory(data: CategoryInput) {
  return apiFetch<AdminCategory>("/categories", { method: "POST", body: data });
}

export function updateCategory(id: string, data: Partial<CategoryInput>) {
  return apiFetch<AdminCategory>(`/categories/${id}`, { method: "PATCH", body: data });
}

export function deleteCategory(id: string) {
  return apiFetch<{ message: string }>(`/categories/${id}`, { method: "DELETE" });
}
