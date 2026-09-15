import type { Announcement } from "@/lib/types/catalog";
import type { Paginated } from "../types";
import { publicFetch } from "./client";

export async function fetchActiveAnnouncement(): Promise<Announcement | null> {
  const { items } = await publicFetch<Paginated<Announcement>>(
    "/announcements?limit=1&status=ACTIVE"
  );
  return items[0] ?? null;
}
