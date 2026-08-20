import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import CategorySection from "@/components/home/CategorySection";
import BestSellersSection from "@/components/home/BestSellersSection";
import StatsBar from "@/components/home/StatsBar";
import { fetchAllCategories } from "@/lib/api/public/categories";
import { listProducts } from "@/lib/api/public/products";
import { fetchActiveHeroSlides } from "@/lib/api/public/heroSlides";

const BESTSELLERS_LIMIT = 10;

export default async function Home() {
  const [categories, { items: products }, heroSlides] = await Promise.all([
    fetchAllCategories(),
    listProducts({ limit: BESTSELLERS_LIMIT, isBestSeller: true }),
    fetchActiveHeroSlides(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <FeatureStrip />
      <CategorySection categories={categories} />
      <BestSellersSection products={products} />
      <StatsBar />
    </>
  );
}
