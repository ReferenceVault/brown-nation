import type { AdminOrder, AdminOrderStatus, AdminShippingAddress } from "@/lib/types/admin";
import { apiFetch } from "./client";
import type { Paginated } from "./types";
import { toQueryString } from "./queryString";

export type CreateOrderInput = {
  shippingAddress: AdminShippingAddress;
  billingAddress?: AdminShippingAddress;
};

export function createOrder(data: CreateOrderInput) {
  return apiFetch<AdminOrder>("/orders", { method: "POST", body: data });
}

export type OrderListParams = {
  page?: number;
  limit?: number;
  status?: AdminOrderStatus;
};

/** Backend scopes this to the current user's own orders (admins get everyone's). */
export function listMyOrders(params: OrderListParams = {}) {
  return apiFetch<Paginated<AdminOrder>>(`/orders${toQueryString(params)}`);
}

export function getOrder(id: string) {
  return apiFetch<AdminOrder>(`/orders/${id}`);
}
