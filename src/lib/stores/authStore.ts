"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types/user";

/**
 * Mock auth for the demo/prototype phase  plaintext passwords in localStorage,
 * no server verification. Placeholder for Auth.js + a real database once the
 * admin/backend exists; not intended to hold real user credentials.
 */
type StoredUser = User & { password: string };

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthState = {
  currentUser: User | null;
  users: StoredUser[];
  signup: (name: string, email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      signup: (name, email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (get().users.some((user) => user.email === normalizedEmail)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const user: StoredUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: normalizedEmail,
          password,
        };
        set((state) => ({
          users: [...state.users, user],
          currentUser: { id: user.id, name: user.name, email: user.email },
        }));
        return { ok: true };
      },
      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const user = get().users.find((u) => u.email === normalizedEmail);
        if (!user || user.password !== password) {
          return { ok: false, error: "Invalid email or password." };
        }
        set({ currentUser: { id: user.id, name: user.name, email: user.email } });
        return { ok: true };
      },
      logout: () => set({ currentUser: null }),
    }),
    { name: "brown-nation-auth" }
  )
);
