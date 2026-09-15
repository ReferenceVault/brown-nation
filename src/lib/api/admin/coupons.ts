import type { AdminCoupon, CouponDiscountType, CouponStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type CouponListParams = {
  page?: number;
  limit?: number;
  status?: CouponStatus;
  search?: string;
};

export type CouponInput = {
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  startsAt?: string;
  expiresAt?: string;
  usageLimit?: number;
  perCustomerLimit?: number;
  status?: CouponStatus;
  applicableCategoryIds?: string[];
  applicableProductIds?: string[];
};

export function listCoupons(params: CouponListParams = {}) {
  return apiFetch<Paginated<AdminCoupon>>(`/coupons${toQueryString({ limit: 100, ...params })}`);
}

export function getCoupon(id: string) {
  return apiFetch<AdminCoupon>(`/coupons/${id}`);
}

export function createCoupon(data: CouponInput) {
  return apiFetch<AdminCoupon>("/coupons", { method: "POST", body: data });
}

export function updateCoupon(id: string, data: Partial<CouponInput>) {
  return apiFetch<AdminCoupon>(`/coupons/${id}`, { method: "PATCH", body: data });
}

export function deleteCoupon(id: string) {
  return apiFetch<{ message: string }>(`/coupons/${id}`, { method: "DELETE" });
}
