import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types/catalog";
import type { CategoryMeta } from "@/data/categories";

export default function CategoryCard({
  category,
  meta,
}: {
  category: Category;
  meta: CategoryMeta;
}) {
  const Icon = meta.icon;

  return (
    <Link
      href={`/shop/${category.slug}`}
      className={`group flex items-center gap-4 rounded-2xl p-3 sm:p-4 ${meta.bg} shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft`}
    >
      <div className="relative shrink-0">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-xl">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          />
        </div>
        <span
          className={`absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full ${meta.badgeBg} shadow-md`}
        >
          <Icon className="h-4 w-4 text-espresso" strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso leading-tight">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-espresso/70 leading-snug">{category.subtitle}</p>

        <span className="mt-2 self-start rounded-md bg-espresso px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors duration-300 group-hover:bg-brand-600">
          Shop Now
        </span>
      </div>
    </Link>
  );
}
