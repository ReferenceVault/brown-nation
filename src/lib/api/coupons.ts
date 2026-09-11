import type { CouponDiscountType } from "@/lib/types/admin";
import { apiFetch } from "./client";

export type CouponValidateItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type CouponValidationResult = {
  code: string;
  discountType: CouponDiscountType;
  discountValue: string;
  discountAmount: string;
  eligibleSubtotal: string;
};

export function validateCoupon(code: string, items: CouponValidateItem[]) {
  return apiFetch<CouponValidationResult>("/coupons/validate", {
    method: "POST",
    body: { code, items },
  });
}
