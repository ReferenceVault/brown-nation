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

export type AdminUpdateUserInput = {
  role?: UserRole;
  status?: UserStatus;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export function updateUserAdmin(id: string, data: AdminUpdateUserInput) {
  return apiFetch<AdminUser>(`/users/${id}`, { method: "PATCH", body: data });
}

/** Sets the user's password directly (no current password needed) and ends their other sessions. */
export function setUserPassword(id: string, password: string) {
  return apiFetch<{ message: string }>(`/users/${id}/password`, {
    method: "PATCH",
    body: { password },
  });
}

export function deleteUser(id: string, deleteOrders: boolean) {
  return apiFetch<{ message: string }>(`/users/${id}${toQueryString({ deleteOrders })}`, {
    method: "DELETE",
  });
}
