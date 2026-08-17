import type { LucideIcon } from "lucide-react";
import { Sparkles, Baby, Gift, Gem, PartyPopper } from "lucide-react";

/**
 * Presentational-only styling per category (icon, accent colors), keyed by
 * the real category slug from the backend. Category data itself (name,
 * description, image) comes from the API — see lib/repositories/categories.ts.
 */
export type CategoryMeta = {
  slug: string;
  icon: LucideIcon;
  bg: string;
  badgeBg: string;
  iconColor: string;
};

const categoryMeta: CategoryMeta[] = [
  { slug: "flavoured-chocolates", icon: Sparkles, bg: "bg-pastel-yellow", badgeBg: "bg-white", iconColor: "text-amber-500" },
  { slug: "kids-chocolates", icon: Baby, bg: "bg-pastel-purple", badgeBg: "bg-white", iconColor: "text-purple-500" },
  { slug: "customized-chocolates", icon: Gift, bg: "bg-pastel-teal", badgeBg: "bg-white", iconColor: "text-teal-600" },
  { slug: "dark-chocolate-bars", icon: Gem, bg: "bg-pastel-peach", badgeBg: "bg-white", iconColor: "text-orange-600" },
  { slug: "designer-theme-chocolate-bars", icon: PartyPopper, bg: "bg-pastel-pink", badgeBg: "bg-white", iconColor: "text-pink-500" },
];

const fallbackMeta: CategoryMeta = {
  slug: "",
  icon: Sparkles,
  bg: "bg-pastel-yellow",
  badgeBg: "bg-white",
  iconColor: "text-amber-500",
};

export function getCategoryMeta(slug: string): CategoryMeta {
  return categoryMeta.find((meta) => meta.slug === slug) ?? fallbackMeta;
}
