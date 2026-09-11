"use client";

import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore, type ToastVariant } from "@/lib/stores/toastStore";
import { useMounted } from "@/lib/hooks/useMounted";

const VARIANT_STYLES: Record<
  ToastVariant,
  { container: string; icon: string; text: string; dismiss: string; Icon: typeof CheckCircle2 }
> = {
  success: {
    container: "border-teal-600 bg-pastel-green-soft ring-teal-700/10",
    icon: "text-teal-700",
    text: "text-teal-800",
    dismiss: "text-teal-700/50 hover:text-teal-800",
    Icon: CheckCircle2,
  },
  error: {
    container: "border-rose-600 bg-pastel-pink-soft ring-rose-700/10",
    icon: "text-rose-700",
    text: "text-rose-800",
    dismiss: "text-rose-700/50 hover:text-rose-800",
    Icon: AlertCircle,
  },
  info: {
    container: "border-amber-500 bg-pastel-yellow-soft ring-amber-700/10",
    icon: "text-amber-700",
    text: "text-amber-800",
    dismiss: "text-amber-700/50 hover:text-amber-800",
    Icon: Info,
  },
};

export default function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);
  const mounted = useMounted();

  if (!mounted || toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-[76px] left-4 right-4 z-[60] flex flex-col gap-2.5 sm:left-auto sm:right-5 sm:w-full sm:max-w-sm">
      {toasts.map((toast) => {
        const styles = VARIANT_STYLES[toast.variant];
        const Icon = styles.Icon;
        return (
          <div
            key={toast.id}
            role="status"
            className={`animate-toast-in flex items-start gap-2.5 rounded-xl border-l-4 p-3.5 shadow-lg ring-1 ${styles.container}`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${styles.icon}`} strokeWidth={1.75} />
            <p className={`flex-1 pt-0.5 text-sm font-medium ${styles.text}`}>{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className={`shrink-0 transition-colors duration-200 cursor-pointer ${styles.dismiss}`}
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
