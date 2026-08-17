import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import CategorySection from "@/components/home/CategorySection";
import BestSellersSection from "@/components/home/BestSellersSection";
import StatsBar from "@/components/home/StatsBar";
import { fetchAllCategories } from "@/lib/api/public/categories";
import { listProducts } from "@/lib/api/public/products";

const BESTSELLERS_LIMIT = 10;

export default async function Home() {
  const [categories, { items: products }] = await Promise.all([
    fetchAllCategories(),
    listProducts({ limit: BESTSELLERS_LIMIT }),
  ]);

  return (
    <>
      <Hero />
      <FeatureStrip />
      <CategorySection categories={categories} />
      <BestSellersSection products={products} />
      <StatsBar />
    </>
  );
}
