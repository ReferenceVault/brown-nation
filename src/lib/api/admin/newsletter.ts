import type { NewsletterSubscriber } from "@/lib/types/admin";
import { apiFetch } from "../client";
import type { Paginated } from "../types";
import { toQueryString } from "../queryString";

export type SubscriberListParams = {
  page?: number;
  limit?: number;
};

export function listSubscribers(params: SubscriberListParams = {}) {
  return apiFetch<Paginated<NewsletterSubscriber>>(`/newsletter/subscribers${toQueryString(params)}`);
}

export function deleteSubscriber(id: string) {
  return apiFetch<{ message: string }>(`/newsletter/subscribers/${id}`, { method: "DELETE" });
}
