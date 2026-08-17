import { apiFetch } from "./client";

export function subscribeToNewsletter(email: string) {
  return apiFetch<{ message: string }>("/newsletter/subscribe", {
    method: "POST",
    body: { email },
    skipAuth: true,
  });
}
