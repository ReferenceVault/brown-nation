import { apiFetch } from "../client";

export function submitEnquiry(data: { name: string; email: string; message: string }) {
  return apiFetch<{ message: string }>("/enquiries", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}
