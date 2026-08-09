"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Guards against SSR/client hydration mismatches for state hydrated from localStorage (cart, auth, orders). */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
