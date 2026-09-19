import { useAuthStore } from "@/lib/stores/authStore";
import { useToastStore } from "@/lib/stores/toastStore";
import { ApiError } from "./errors";
import type { ApiEnvelope } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// Once a real session (not just an anonymous visitor) turns out to be
// unrecoverable, send the user to log back in — but only once, even if
// several requests fail with 401 around the same time. A fresh page load
// (which the redirect below causes) naturally resets this for next time.
let sessionExpiredHandled = false;

function handleSessionExpired(): void {
  if (sessionExpiredHandled) return;
  sessionExpiredHandled = true;

  useToastStore.getState().show("Your session expired. Please log in again.", "error");

  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
    const target = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    // A hard redirect, not router.push: this runs in a plain module with no
    // guaranteed router context, and a full reload guarantees no stale
    // in-memory state from the dead session survives into the next page.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = `/login?redirect=${encodeURIComponent(target)}`;
  }
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  /** Skip attaching the Authorization header (public endpoints). */
  skipAuth?: boolean;
  /** Internal: set when retrying after a token refresh, to avoid infinite loops. */
  _isRetry?: boolean;
};

// Dedupes concurrent refresh attempts triggered by parallel 401s.
let refreshPromise: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) return false;

      try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        const body = (await res.json()) as ApiEnvelope<{
          accessToken: string;
          refreshToken: string;
        }>;
        if (!res.ok || !body.success) return false;

        useAuthStore.getState().setTokens(body.data.accessToken, body.data.refreshToken);
        return true;
      } catch {
        return false;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, skipAuth, _isRetry } = options;
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = {};
  // FormData bodies (file uploads) must NOT get an explicit Content-Type —
  // the browser sets one with the correct multipart boundary itself.
  if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";

  // Tracks whether this call believed it had a session at all, so a 401 from
  // an anonymous call (no token to begin with) doesn't get treated as an
  // "expired session" — that's just an unauthenticated visitor, not a logout.
  let hadSession = false;
  if (!skipAuth) {
    const { accessToken, refreshToken } = useAuthStore.getState();
    hadSession = Boolean(accessToken || refreshToken);
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "Could not reach the server. Is it running?", 0);
  }

  // Access token expired mid-session: refresh once and retry the original call.
  if (res.status === 401 && !skipAuth && !_isRetry) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return apiFetch<T>(path, { ...options, _isRetry: true });
    }
    useAuthStore.getState().clearSession();
    // Only a call that believed it was authenticated counts as a session
    // expiring — an anonymous call 401ing (no token was ever sent) just
    // means "not logged in", which callers handle in their own UI.
    if (hadSession) {
      handleSessionExpired();
    }
  }

  let json: ApiEnvelope<T> | undefined;
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // No JSON body (e.g. 204, or a non-API error page).
  }

  if (!res.ok || !json || !json.success) {
    const error = json && !json.success ? json.error : undefined;
    throw new ApiError(
      error?.code ?? "UNKNOWN_ERROR",
      error?.message ?? `Request failed with status ${res.status}`,
      res.status,
      error?.details,
    );
  }

  return json.data;
}
