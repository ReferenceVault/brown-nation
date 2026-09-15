import type { ApiEnvelope } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// Catalog data is admin-edited, not real-time — cache it for a short window so
// repeat navigations don't re-hit the DB on every click, then revalidate.
const CATALOG_REVALIDATE_SECONDS = 60;

/**
 * Fetch wrapper for @Public() backend endpoints (no auth, no refresh-token
 * dance) — safe to call from both server components and client components.
 */
export async function publicFetch<T>(
  path: string,
  options: { cache?: boolean } = {}
): Promise<T> {
  const { cache = true } = options;
  let res: Response;
  try {
    res = await fetch(
      `${API_BASE_URL}${path}`,
      cache
        ? { next: { revalidate: CATALOG_REVALIDATE_SECONDS } }
        // Admin toggles for these are expected to take effect immediately
        // rather than trading correctness for the shared catalog cache.
        : { cache: "no-store" }
    );
  } catch {
    throw new Error("Could not reach the server. Is the backend running?");
  }

  let json: ApiEnvelope<T> | undefined;
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // No JSON body.
  }

  if (!res.ok || !json || !json.success) {
    const error = json && !json.success ? json.error : undefined;
    throw new Error(error?.message ?? `Request failed with status ${res.status}`);
  }

  return json.data;
}
