"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/lib/api/errors";

type AsyncState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

// Keeps `loading` true for at least this long after the request starts, so a
// fast response (a few tens of ms, common now that admin list queries are
// optimized) doesn't flash the loading skeleton too briefly to register.
const MIN_LOADING_MS = 350;

/** Runs `fn` whenever `deps` change, tracking loading/error/data state. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = Date.now();

    // Reset to a loading state for the new deps before the fetch resolves —
    // React's own docs use this exact pattern (see "Fetching data" at
    // react.dev/learn/you-might-not-need-an-effect).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    const settle = (apply: () => void) => {
      if (cancelled) return;
      const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
      if (remaining <= 0) {
        apply();
        setLoading(false);
        return;
      }
      delayTimer = setTimeout(() => {
        if (cancelled) return;
        apply();
        setLoading(false);
      }, remaining);
    };

    fn()
      .then((result) => settle(() => setData(result)))
      .catch((err: unknown) =>
        settle(() =>
          setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again."),
        ),
      );

    return () => {
      cancelled = true;
      if (delayTimer) clearTimeout(delayTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { data, error, loading, reload };
}
