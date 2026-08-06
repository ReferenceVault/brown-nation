import type { LucideIcon } from "lucide-react";
import { Leaf, HeartHandshake, Gift, Sprout, ShieldCheck } from "lucide-react";

export type TrustFeature = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bg: string;
  iconColor: string;
};

export const trustFeatures: TrustFeature[] = [
  {
    icon: Leaf,
    title: "Premium Ingredients",
    subtitle: "Finest quality ingredients sourced with care",
    bg: "bg-pastel-yellow-soft",
    iconColor: "text-brand-600",
  },
  {
    icon: HeartHandshake,
    title: "Handcrafted",
    subtitle: "Made in small batches with love",
    bg: "bg-pastel-pink-soft",
    iconColor: "text-rose-500",
  },
  {
    icon: Gift,
    title: "Custom Made",
    subtitle: "Personalized chocolates for every occasion",
    bg: "bg-pastel-teal-soft",
    iconColor: "text-teal-600",
  },
  {
    icon: Sprout,
    title: "No Preservatives",
    subtitle: "Pure, natural & chemical free",
    bg: "bg-pastel-purple-soft",
    iconColor: "text-violet-500",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    subtitle: "Hygienic, safe & made with care",
    bg: "bg-pastel-pink-soft",
    iconColor: "text-red-500",
  },
];
