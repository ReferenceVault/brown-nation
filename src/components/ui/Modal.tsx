"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useMounted } from "@/lib/hooks/useMounted";

export default function Modal({
  open,
  onClose,
  title,
  children,
  className = "max-w-sm",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-espresso/40" onClick={onClose} />

      <div className={`relative w-full ${className} rounded-2xl bg-white p-5 shadow-2xl`}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-espresso">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-espresso/50 transition-colors duration-200 hover:text-espresso cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
