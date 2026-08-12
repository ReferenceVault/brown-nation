import type { LucideIcon } from "lucide-react";
import { Sparkles, Baby, Gift, Gem, PartyPopper } from "lucide-react";
import type { Category } from "@/lib/types/catalog";

export type CategoryMeta = {
  id: string;
  icon: LucideIcon;
  bg: string;
  badgeBg: string;
  iconColor: string;
};

export const categories: Category[] = [
  {
    id: "flavored",
    slug: "flavored",
    name: "Flavored Chocolates",
    subtitle: "Mini bites, medium & full bars",
    description:
      "Playful, indulgent flavor combinations — from Arabian kunafa to saffron cream — folded into handcrafted milk and dark chocolate.",
    heroImage: "/products/arabian-kunafa-royale.jpg",
  },
  {
    id: "kids",
    slug: "kids",
    name: "Kids Chocolates",
    subtitle: "Fun, tasty & loved by kids",
    description:
      "Bright, fun, bar-only treats made with the same premium cocoa as everything else we make — just sized and shaped for smaller hands.",
    heroImage: "/products/galaxy-swirl-bar.jpg",
  },
  {
    id: "customized",
    slug: "customized",
    name: "Customized Chocolates",
    subtitle: "Made just for you",
    description:
      "Signature gift bars and celebration collections, personalized for your special moments, just the way you want.",
    heroImage: "/products/signature-gift-bar.jpg",
  },
  {
    id: "dark",
    slug: "dark",
    name: "Dark Chocolate",
    subtitle: "Rich, bold & indulgent",
    description:
      "Single-origin cocoa, slow-conched and tempered by hand for a rich, intense snap in every bar.",
    heroImage: "/products/midnight-noir.jpg",
  },
  {
    id: "designer",
    slug: "designer",
    name: "Designer & Theme Chocolate Bars",
    subtitle: "Made for every occasion",
    description:
      "Edible-printed and hand-finished theme bars — birthdays, anniversaries, love letters, and signature artisan editions.",
    heroImage: "/products/artisan-signature-bar.jpg",
  },
];

export const categoryMeta: CategoryMeta[] = [
  { id: "flavored", icon: Sparkles, bg: "bg-pastel-yellow", badgeBg: "bg-white", iconColor: "text-amber-500" },
  { id: "kids", icon: Baby, bg: "bg-pastel-purple", badgeBg: "bg-white", iconColor: "text-purple-500" },
  { id: "customized", icon: Gift, bg: "bg-pastel-teal", badgeBg: "bg-white", iconColor: "text-teal-600" },
  { id: "dark", icon: Gem, bg: "bg-pastel-peach", badgeBg: "bg-white", iconColor: "text-orange-600" },
  { id: "designer", icon: PartyPopper, bg: "bg-pastel-pink", badgeBg: "bg-white", iconColor: "text-pink-500" },
];

export function getCategoryMeta(categoryId: string): CategoryMeta {
  return categoryMeta.find((meta) => meta.id === categoryId) ?? categoryMeta[0];
}
