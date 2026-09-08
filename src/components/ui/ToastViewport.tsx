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
    <div className="fixed top-[76px] left-4 right-4 z-[60] flex flex-col gap-2.5 sm:left-auto sm:right-5 sm:w-full sm:max-w-sm">
      {toasts.map((toast) => {
        const isSuccess = toast.variant === "success";
        return (
          <div
            key={toast.id}
            role="status"
            className={`animate-toast-in flex items-start gap-2.5 rounded-xl border-l-4 p-3.5 shadow-lg ring-1 ${
              isSuccess
                ? "border-teal-600 bg-pastel-green-soft ring-teal-700/10"
                : "border-rose-600 bg-pastel-pink-soft ring-rose-700/10"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-700" strokeWidth={1.75} />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-700" strokeWidth={1.75} />
            )}
            <p
              className={`flex-1 pt-0.5 text-sm font-medium ${
                isSuccess ? "text-teal-800" : "text-rose-800"
              }`}
            >
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className={`shrink-0 transition-colors duration-200 cursor-pointer ${
                isSuccess ? "text-teal-700/50 hover:text-teal-800" : "text-rose-700/50 hover:text-rose-800"
              }`}
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
