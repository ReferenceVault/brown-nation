import type { PromoBanner } from "@/lib/types/catalog";
import type { Paginated } from "../types";
import { publicFetch } from "./client";

export async function fetchActivePromoBanners(): Promise<PromoBanner[]> {
  const { items } = await publicFetch<Paginated<PromoBanner>>(
    "/promo-banners?limit=1&status=ACTIVE"
  );
  return items;
}
