import type { AdminAnnouncement, AnnouncementStatus } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type AnnouncementListParams = {
  page?: number;
  limit?: number;
  status?: AnnouncementStatus;
};

export type AnnouncementInput = {
  text: string;
  linkLabel?: string;
  linkHref?: string;
  order?: number;
  status?: AnnouncementStatus;
};

export function listAnnouncements(params: AnnouncementListParams = {}) {
  return apiFetch<Paginated<AdminAnnouncement>>(`/announcements${toQueryString({ limit: 100, ...params })}`, {
    skipAuth: true,
  });
}

export function getAnnouncement(id: string) {
  return apiFetch<AdminAnnouncement>(`/announcements/${id}`, { skipAuth: true });
}

export function createAnnouncement(data: AnnouncementInput) {
  return apiFetch<AdminAnnouncement>("/announcements", { method: "POST", body: data });
}

export function updateAnnouncement(id: string, data: Partial<AnnouncementInput>) {
  return apiFetch<AdminAnnouncement>(`/announcements/${id}`, { method: "PATCH", body: data });
}

export function deleteAnnouncement(id: string) {
  return apiFetch<{ message: string }>(`/announcements/${id}`, { method: "DELETE" });
}
