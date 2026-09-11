import Link from "next/link";
import type { Announcement } from "@/lib/types/catalog";

export default function AnnouncementBar({ announcement }: { announcement: Announcement | null }) {
  if (!announcement) return null;

  return (
    <div className="bg-espresso text-cream-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] sm:text-xs font-medium tracking-wide lg:px-8">
        <span>{announcement.text}</span>
        {announcement.linkHref && (
          <Link
            href={announcement.linkHref}
            className="shrink-0 font-semibold text-brand-300 underline decoration-brand-300/50 underline-offset-2 transition-colors duration-200 hover:text-brand-200"
          >
            {announcement.linkLabel ?? "Shop Now"}
          </Link>
        )}
      </div>
    </div>
  );
}
