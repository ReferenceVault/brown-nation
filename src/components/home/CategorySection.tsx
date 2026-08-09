import { categories, getCategoryMeta } from "@/data/categories";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 pb-4 sm:pt-24 lg:px-8">
      <SectionHeading title="Choose Your Indulgence" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} meta={getCategoryMeta(category.id)} />
        ))}
      </div>
    </section>
  );
}
