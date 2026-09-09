import type { ShippingSettings } from "@/lib/types/catalog";
import { publicFetch } from "./client";

export async function fetchShippingSettings(): Promise<ShippingSettings> {
  return publicFetch<ShippingSettings>("/shipping-settings");
}
