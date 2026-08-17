"use client";

import { useState, type ReactNode } from "react";
import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  destructive = true,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  /** Extra content rendered between the description and the action buttons (e.g. radio options). */
  children?: ReactNode;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (submitting) return;
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      setSubmitting(false);
      onClose();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {description && <div className="text-sm text-espresso/70">{description}</div>}

      {children && <div className="mt-4">{children}</div>}

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-6 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="rounded-lg border-2 border-espresso/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-espresso transition-colors duration-300 hover:bg-espresso hover:text-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={submitting}
          className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
            destructive ? "bg-red-500 hover:bg-red-600" : "bg-brand-500 hover:bg-brand-600"
          }`}
        >
          {submitting ? "Working…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
