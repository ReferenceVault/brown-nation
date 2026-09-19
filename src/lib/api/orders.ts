import type { AdminOrder, AdminOrderStatus, AdminShippingAddress } from "@/lib/types/admin";
import { apiFetch } from "./client";
import type { Paginated } from "./types";
import { toQueryString } from "./queryString";

export type CreateOrderInput = {
  shippingAddress: AdminShippingAddress;
  billingAddress?: AdminShippingAddress;
  couponCode?: string;
};

export function createOrder(data: CreateOrderInput) {
  return apiFetch<AdminOrder>("/orders", { method: "POST", body: data });
}

export type OrderListParams = {
  page?: number;
  limit?: number;
  status?: AdminOrderStatus;
};

/**
 * Always the signed-in user's own orders — `mine: true` forces this even for
 * an admin account, which otherwise gets every order in the system back from
 * this same endpoint (that's what the separate admin order list wants).
 */
export function listMyOrders(params: OrderListParams = {}) {
  return apiFetch<Paginated<AdminOrder>>(`/orders${toQueryString({ ...params, mine: true })}`);
}

export function getOrder(id: string) {
  return apiFetch<AdminOrder>(`/orders/${id}`);
}
