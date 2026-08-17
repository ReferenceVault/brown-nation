import type { AdminOrder, AdminOrderStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type OrderListParams = {
  page?: number;
  limit?: number;
  status?: AdminOrderStatus;
};

export function listOrders(params: OrderListParams = {}) {
  return apiFetch<Paginated<AdminOrder>>(`/orders${toQueryString(params)}`);
}

export function getOrder(id: string) {
  return apiFetch<AdminOrder>(`/orders/${id}`);
}

export function updateOrderStatus(id: string, status: AdminOrderStatus, note?: string) {
  return apiFetch<AdminOrder>(`/orders/${id}/status`, { method: "PATCH", body: { status, note } });
}
