import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className="text-espresso/60 transition-colors duration-200 hover:text-brand-500">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-espresso">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-espresso/30" strokeWidth={2} />}
        </span>
      ))}
    </nav>
  );
}
