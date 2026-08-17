"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { useMounted } from "./useMounted";

/**
 * Redirects to /login once mounted if there's no session, or to / if the
 * logged-in user isn't an admin. Mirrors useRequireAuth's guard pattern.
 */
export function useRequireAdmin() {
  const router = useRouter();
  const mounted = useMounted();
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (!mounted) return;
    if (!currentUser) {
      router.replace("/login?redirect=%2Fadmin");
    } else if (currentUser.role !== "ADMIN") {
      router.replace("/");
    }
  }, [mounted, currentUser, router]);

  return { currentUser, ready: mounted && !!currentUser && currentUser.role === "ADMIN" };
}
