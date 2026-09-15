import Hero from "@/components/home/Hero";
import PromoBannerSection from "@/components/home/PromoBannerSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import CategorySection from "@/components/home/CategorySection";
import BestSellersSection from "@/components/home/BestSellersSection";
import StatsBar from "@/components/home/StatsBar";
import { fetchAllCategories } from "@/lib/api/public/categories";
import { listProducts } from "@/lib/api/public/products";
import { fetchActiveHeroSlides } from "@/lib/api/public/heroSlides";
import { fetchActivePromoBanners } from "@/lib/api/public/promoBanners";

const BESTSELLERS_LIMIT = 10;

export default async function Home() {
  const [categories, { items: products }, heroSlides, promoBanners] = await Promise.all([
    fetchAllCategories(),
    listProducts({ limit: BESTSELLERS_LIMIT, isBestSeller: true }),
    fetchActiveHeroSlides(),
    fetchActivePromoBanners(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <PromoBannerSection banner={promoBanners[0] ?? null} />
      <FeatureStrip />
      <CategorySection categories={categories} />
      <BestSellersSection products={products} />
      <StatsBar />
    </>
  );
}
