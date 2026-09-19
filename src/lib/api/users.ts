import type { AdminUser } from "@/lib/types/admin";
import { apiFetch } from "./client";

export type UpdateMyProfileInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};

/** Name/phone only — changing email or password go through their own /auth endpoints. */
export function updateMyProfile(data: UpdateMyProfileInput) {
  return apiFetch<AdminUser>("/users/me", { method: "PATCH", body: data });
}
