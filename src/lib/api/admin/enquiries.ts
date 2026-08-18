import type { AdminEnquiry, EnquiryStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type EnquiryListParams = {
  page?: number;
  limit?: number;
  status?: EnquiryStatus;
};

export function listEnquiries(params: EnquiryListParams = {}) {
  return apiFetch<Paginated<AdminEnquiry>>(`/enquiries${toQueryString({ limit: 100, ...params })}`);
}

export function getEnquiry(id: string) {
  return apiFetch<AdminEnquiry>(`/enquiries/${id}`);
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  return apiFetch<AdminEnquiry>(`/enquiries/${id}`, { method: "PATCH", body: { status } });
}

export function deleteEnquiry(id: string) {
  return apiFetch<{ message: string }>(`/enquiries/${id}`, { method: "DELETE" });
}
