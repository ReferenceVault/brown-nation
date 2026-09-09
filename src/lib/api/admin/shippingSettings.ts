import type { ShippingSettings } from "@/lib/types/catalog";
import { apiFetch } from "../client";

export type ShippingSettingsInput = {
  flatFee: number;
  freeThreshold: number;
};

export function getShippingSettings() {
  return apiFetch<ShippingSettings>("/shipping-settings", { skipAuth: true });
}

export function updateShippingSettings(data: ShippingSettingsInput) {
  return apiFetch<ShippingSettings>("/shipping-settings", { method: "PATCH", body: data });
}
