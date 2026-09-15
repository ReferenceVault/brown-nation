import type { AdminPromoBanner, PromoBannerStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type PromoBannerListParams = {
  page?: number;
  limit?: number;
  status?: PromoBannerStatus;
};

export type PromoBannerInput = {
  eyebrow: string;
  heading: string;
  description: string;
  couponCode?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  order?: number;
  status?: PromoBannerStatus;
};

export function listPromoBanners(params: PromoBannerListParams = {}) {
  return apiFetch<Paginated<AdminPromoBanner>>(`/promo-banners${toQueryString({ limit: 100, ...params })}`, {
    skipAuth: true,
  });
}

export function getPromoBanner(id: string) {
  return apiFetch<AdminPromoBanner>(`/promo-banners/${id}`, { skipAuth: true });
}

export function createPromoBanner(data: PromoBannerInput) {
  return apiFetch<AdminPromoBanner>("/promo-banners", { method: "POST", body: data });
}

export function updatePromoBanner(id: string, data: Partial<PromoBannerInput>) {
  return apiFetch<AdminPromoBanner>(`/promo-banners/${id}`, { method: "PATCH", body: data });
}

export function deletePromoBanner(id: string) {
  return apiFetch<{ message: string }>(`/promo-banners/${id}`, { method: "DELETE" });
}
