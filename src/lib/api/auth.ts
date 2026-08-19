import type { AdminUser } from "@/lib/types/admin";
import { apiFetch } from "./client";

export type AuthTokens = { accessToken: string; refreshToken: string };

export function login(email: string, password: string) {
  return apiFetch<{ user: AdminUser; tokens: AuthTokens }>("/auth/login", {
    method: "POST",
    body: { email, password },
    skipAuth: true,
  });
}

export function signup(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  return apiFetch<{ user: AdminUser; tokens: AuthTokens }>("/auth/signup", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export function logout() {
  return apiFetch<{ message: string }>("/auth/logout", { method: "POST" });
}

export function me() {
  return apiFetch<AdminUser>("/auth/me");
}

export function forgotPassword(email: string) {
  return apiFetch<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: { email },
    skipAuth: true,
  });
}

export function resetPassword(token: string, newPassword: string) {
  return apiFetch<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: { token, newPassword },
    skipAuth: true,
  });
}

export function verifyEmail(token: string) {
  return apiFetch<{ message: string }>("/auth/verify-email", {
    method: "POST",
    body: { token },
    skipAuth: true,
  });
}

export function resendVerificationEmail(email: string) {
  return apiFetch<{ message: string }>("/auth/resend-verification", {
    method: "POST",
    body: { email },
    skipAuth: true,
  });
}
