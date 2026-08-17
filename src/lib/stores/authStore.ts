"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types/user";
import * as authApi from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";

type AuthResult = { ok: true } | { ok: false; error: string };

type SignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  signup: (data: SignupInput) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  /** Used internally by the API client after a silent token refresh. */
  setTokens: (accessToken: string, refreshToken: string) => void;
  /** Used internally by the API client when the session can no longer be refreshed. */
  clearSession: () => void;
};

function errorMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      accessToken: null,
      refreshToken: null,

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

      clearSession: () => set({ currentUser: null, accessToken: null, refreshToken: null }),

      signup: async (data) => {
        try {
          const { user, tokens } = await authApi.signup(data);
          set({
            currentUser: user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          return { ok: true };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },

      login: async (email, password) => {
        try {
          const { user, tokens } = await authApi.login(email, password);
          set({
            currentUser: user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          return { ok: true };
        } catch (err) {
          return { ok: false, error: errorMessage(err) };
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          // Best-effort: still clear the local session even if the revoke call fails.
        }
        set({ currentUser: null, accessToken: null, refreshToken: null });
      },
    }),
    { name: "brown-nation-auth" }
  )
);
