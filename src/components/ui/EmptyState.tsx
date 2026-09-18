import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  /** "error" tints the icon red — use when this is standing in for a failed request, not a genuinely empty list. */
  tone?: "default" | "error";
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  tone = "default",
}: EmptyStateProps) {
  const actionClassName =
    "mt-2 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600 cursor-pointer";

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-16 text-center shadow-card">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          tone === "error" ? "bg-red-50" : "bg-brand-50"
        }`}
      >
        <Icon className={`h-7 w-7 ${tone === "error" ? "text-red-400" : "text-brand-400"}`} strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-serif text-lg font-semibold text-espresso">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-espresso/60">{description}</p>
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} onClick={onAction} className={actionClassName}>
          {actionLabel}
        </Link>
      ) : actionLabel && onAction ? (
        <button type="button" onClick={onAction} className={actionClassName}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
