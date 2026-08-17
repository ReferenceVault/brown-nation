import type { AdminUser, UserRole, UserStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type UserListParams = {
  page?: number;
  limit?: number;
  role?: UserRole;
};

export function listUsers(params: UserListParams = {}) {
  return apiFetch<Paginated<AdminUser>>(`/users${toQueryString(params)}`);
}

export function getUser(id: string) {
  return apiFetch<AdminUser>(`/users/${id}`);
}

export function updateUserAdmin(id: string, data: { role?: UserRole; status?: UserStatus }) {
  return apiFetch<AdminUser>(`/users/${id}`, { method: "PATCH", body: data });
}

export function deleteUser(id: string, deleteOrders: boolean) {
  return apiFetch<{ message: string }>(`/users/${id}${toQueryString({ deleteOrders })}`, {
    method: "DELETE",
  });
}
