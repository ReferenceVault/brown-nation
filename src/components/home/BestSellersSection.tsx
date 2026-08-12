"use client";

import { useRef } from "react";
import { getBestsellers } from "@/lib/repositories/products";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CarouselArrow from "@/components/ui/CarouselArrow";

const bestsellers = getBestsellers();

const SCROLL_AMOUNT = 290;
const CARD_GAP = 16;

export default function BestSellersSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *");
    const amount = card ? card.offsetWidth + CARD_GAP : SCROLL_AMOUNT;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
      <SectionHeading title="Best Sellers" />

      <div className="flex items-center gap-3 sm:gap-4">
        <CarouselArrow direction="left" onClick={() => scroll(-1)} className="shrink-0" />

        <div
          ref={scrollerRef}
          className="flex flex-1 gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <CarouselArrow direction="right" onClick={() => scroll(1)} className="shrink-0" />
      </div>
    </section>
  );
}
