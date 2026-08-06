import type { Category } from "@/data/categories";
import ImagePlaceholder from "./ImagePlaceholder";

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl p-3 sm:p-4 ${category.bg} shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft`}
    >
      <div className="relative shrink-0">
        <ImagePlaceholder
          from={category.thumbFrom}
          to={category.thumbTo}
          className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full ${category.badgeBg} shadow-md`}
        >
          <Icon className="h-4 w-4 text-espresso" strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso leading-tight">
          {category.title}
        </h3>
        <p className="text-xs sm:text-sm text-espresso/70 leading-snug">{category.subtitle}</p>

        <button className="mt-2 self-start rounded-md bg-espresso px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-brand-600 cursor-pointer">
          Shop Now
        </button>
      </div>
    </div>
  );
}
