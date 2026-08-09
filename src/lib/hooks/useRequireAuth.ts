"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useMounted } from "./useMounted";

/** Redirects to /login (preserving the current path) once mounted, if no user is logged in. */
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useMounted();
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (mounted && !currentUser) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, currentUser, pathname, router]);

  return { currentUser, ready: mounted && !!currentUser };
}
