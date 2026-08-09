import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import CategorySection from "@/components/home/CategorySection";
import BestSellersSection from "@/components/home/BestSellersSection";
import StatsBar from "@/components/home/StatsBar";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <CategorySection />
      <BestSellersSection />
      <StatsBar />
    </>
  );
}
