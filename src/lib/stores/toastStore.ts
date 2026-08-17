"use client";

import { create } from "zustand";

export type ToastVariant = "success" | "error";
export type Toast = { id: number; message: string; variant: ToastVariant };

type ToastState = {
  toasts: Toast[];
  show: (message: string, variant?: ToastVariant) => void;
  dismiss: (id: number) => void;
};

let nextId = 0;
const TOAST_DURATION_MS = 3500;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  show: (message, variant = "success") => {
    const id = ++nextId;
    set((state) => ({ toasts: [...state.toasts, { id, message, variant }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, TOAST_DURATION_MS);
  },

  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
