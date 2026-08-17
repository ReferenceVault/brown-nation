"use client";

import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useToastStore } from "@/lib/stores/toastStore";
import { useMounted } from "@/lib/hooks/useMounted";

export default function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);
  const mounted = useMounted();

  if (!mounted || toasts.length === 0) return null;

  return createPortal(
    <div className="fixed right-4 top-[76px] z-[60] flex w-full max-w-sm flex-col gap-2.5 sm:right-5">
      {toasts.map((toast) => {
        const isSuccess = toast.variant === "success";
        return (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in flex items-start gap-2.5 rounded-xl bg-white p-3.5 shadow-lg ring-1 ring-espresso/5"
          >
            {isSuccess ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" strokeWidth={1.75} />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" strokeWidth={1.75} />
            )}
            <p className="flex-1 pt-0.5 text-sm font-medium text-espresso">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="text-espresso/40 transition-colors duration-200 hover:text-espresso cursor-pointer"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}
