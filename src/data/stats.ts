import type { LucideIcon } from "lucide-react";
import { Truck, ShieldCheck, Headset, Star } from "lucide-react";

export type Stat = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export const stats: Stat[] = [
  { icon: Truck, title: "Fast Delivery", subtitle: "Across India" },
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% Safe & Secure" },
  { icon: Headset, title: "24x7 Support", subtitle: "We're here to help" },
  { icon: Star, title: "5000+ Happy Customers", subtitle: "Thank you for trusting us" },
];
