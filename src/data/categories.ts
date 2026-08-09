import type { LucideIcon } from "lucide-react";
import { Sparkles, Baby, Gift, Gem } from "lucide-react";
import type { Category } from "@/lib/types/catalog";

export type CategoryMeta = {
  id: string;
  icon: LucideIcon;
  bg: string;
  badgeBg: string;
};

export const categories: Category[] = [
  {
    id: "flavored",
    slug: "flavored",
    name: "Flavored Chocolates",
    subtitle: "Mini pieces & Full bars",
    description:
      "Playful, indulgent flavor combinations — from kunafa to rose pistachio — folded into handcrafted milk and dark chocolate.",
    heroImage: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8",
  },
  {
    id: "kids",
    slug: "kids",
    name: "Kids Chocolates",
    subtitle: "Delicious bars kids love",
    description:
      "Bright, fun, and made with the same premium cocoa as everything else we make — just sized and shaped for smaller hands.",
    heroImage: "https://images.unsplash.com/photo-1622873904690-76c655368668",
  },
  {
    id: "customized",
    slug: "customized",
    name: "Customized Chocolates",
    subtitle: "Personalized just for you",
    description:
      "Printed bars, message boxes, and photo chocolates — handcrafted for birthdays, weddings, and every occasion worth celebrating.",
    heroImage: "https://images.unsplash.com/photo-1687795097254-f019f9d7fd17",
  },
  {
    id: "dark",
    slug: "dark",
    name: "Dark Chocolate",
    subtitle: "Rich, intense & timeless",
    description:
      "Single-origin cocoa, slow-conched and tempered by hand for a rich, intense snap in every bar.",
    heroImage: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908",
  },
];

export const categoryMeta: CategoryMeta[] = [
  { id: "flavored", icon: Sparkles, bg: "bg-pastel-yellow", badgeBg: "bg-rose-500" },
  { id: "kids", icon: Baby, bg: "bg-pastel-purple", badgeBg: "bg-white" },
  { id: "customized", icon: Gift, bg: "bg-pastel-teal", badgeBg: "bg-white" },
  { id: "dark", icon: Gem, bg: "bg-pastel-peach", badgeBg: "bg-rose-500" },
];

export function getCategoryMeta(categoryId: string): CategoryMeta {
  return categoryMeta.find((meta) => meta.id === categoryId) ?? categoryMeta[0];
}
