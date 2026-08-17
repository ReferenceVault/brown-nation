import type { AdminHeroSlide, HeroSlideStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type HeroSlideListParams = {
  page?: number;
  limit?: number;
  status?: HeroSlideStatus;
};

export type HeroSlideInput = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image: string;
  paletteFrom?: string;
  paletteTo?: string;
  order?: number;
  status?: HeroSlideStatus;
};

export function listHeroSlides(params: HeroSlideListParams = {}) {
  return apiFetch<Paginated<AdminHeroSlide>>(`/hero-slides${toQueryString({ limit: 100, ...params })}`, {
    skipAuth: true,
  });
}

export function getHeroSlide(id: string) {
  return apiFetch<AdminHeroSlide>(`/hero-slides/${id}`, { skipAuth: true });
}

export function createHeroSlide(data: HeroSlideInput) {
  return apiFetch<AdminHeroSlide>("/hero-slides", { method: "POST", body: data });
}

export function updateHeroSlide(id: string, data: Partial<HeroSlideInput>) {
  return apiFetch<AdminHeroSlide>(`/hero-slides/${id}`, { method: "PATCH", body: data });
}

export function deleteHeroSlide(id: string) {
  return apiFetch<{ message: string }>(`/hero-slides/${id}`, { method: "DELETE" });
}
