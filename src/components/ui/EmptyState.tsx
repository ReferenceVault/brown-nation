import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-16 text-center shadow-card">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
        <Icon className="h-7 w-7 text-brand-400" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-serif text-lg font-semibold text-espresso">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-espresso/60">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-2 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
