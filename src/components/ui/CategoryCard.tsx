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
      className={`group flex flex-col sm:flex-row sm:h-full gap-3 rounded-2xl p-3 ${meta.bg} shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft`}
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:w-20 sm:shrink-0 md:w-24">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={category.heroImage}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, 96px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          />
        </div>
        <span
          className={`absolute -top-3 -right-3 sm:-top-2 sm:-right-2 flex h-10 w-10 sm:h-6 sm:w-6 items-center justify-center rounded-full ${meta.badgeBg} shadow-md`}
        >
          <Icon className={`h-5 w-5 sm:h-3 sm:w-3 ${meta.iconColor}`} strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <h3 className="font-serif text-base sm:text-sm md:text-base font-semibold leading-tight text-espresso line-clamp-2">
          {category.name}
        </h3>
        <p className="text-xs sm:text-[11px] md:text-xs text-espresso/70 leading-snug line-clamp-1">{category.subtitle}</p>

        <span className="mt-1.5 self-start whitespace-nowrap rounded-md bg-espresso px-2.5 py-1.5 sm:px-2 sm:py-1 text-[10px] sm:text-[9px] font-semibold uppercase text-white transition-colors duration-300 group-hover:bg-brand-600">
          Shop Now
        </span>
      </div>
    </Link>
  );
}
