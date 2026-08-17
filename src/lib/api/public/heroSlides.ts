import type { HeroSlide } from "@/lib/types/catalog";
import type { Paginated } from "../types";
import { publicFetch } from "./client";

export async function fetchActiveHeroSlides(): Promise<HeroSlide[]> {
  const { items } = await publicFetch<Paginated<HeroSlide>>("/hero-slides?limit=100&status=ACTIVE");
  return items;
}
