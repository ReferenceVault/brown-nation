import type { LucideIcon } from "lucide-react";
import { Sparkles, Baby, Gift, Gem } from "lucide-react";

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  bg: string;
  badgeBg: string;
  thumbFrom: string;
  thumbTo: string;
};

export const categories: Category[] = [
  {
    id: "flavored",
    title: "Flavored Chocolates",
    subtitle: "Mini pieces & Full bars",
    icon: Sparkles,
    bg: "bg-pastel-yellow",
    badgeBg: "bg-rose-500",
    thumbFrom: "#8a5a2f",
    thumbTo: "#3f2413",
  },
  {
    id: "kids",
    title: "Kids Chocolates",
    subtitle: "Delicious bars kids love",
    icon: Baby,
    bg: "bg-pastel-purple",
    badgeBg: "bg-white",
    thumbFrom: "#c8a4d8",
    thumbTo: "#7a4f8e",
  },
  {
    id: "customized",
    title: "Customized Chocolates",
    subtitle: "Personalized just for you",
    icon: Gift,
    bg: "bg-pastel-teal",
    badgeBg: "bg-white",
    thumbFrom: "#3f2413",
    thumbTo: "#22140a",
  },
  {
    id: "dark",
    title: "Dark Chocolate",
    subtitle: "Rich, intense & timeless",
    icon: Gem,
    bg: "bg-pastel-peach",
    badgeBg: "bg-rose-500",
    thumbFrom: "#4a2b16",
    thumbTo: "#20120a",
  },
];
