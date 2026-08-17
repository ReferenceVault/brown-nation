import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";

export default function StatCard({
  icon: Icon,
  label,
  value,
  href,
  loading = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  loading?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50">
        <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        {loading ? (
          <Skeleton className="h-7 w-14" />
        ) : (
          <p className="text-2xl font-bold text-espresso">{value}</p>
        )}
        <p className="mt-1 text-xs text-espresso/50">{label}</p>
      </div>
    </Link>
  );
}
