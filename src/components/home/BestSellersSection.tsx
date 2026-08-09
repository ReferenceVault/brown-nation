"use client";

import { useRef } from "react";
import { getBestsellers } from "@/lib/repositories/products";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CarouselArrow from "@/components/ui/CarouselArrow";

const bestsellers = getBestsellers();

const SCROLL_AMOUNT = 290;

export default function BestSellersSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8">
      <SectionHeading title="Best Sellers" />

      <div className="relative flex items-center gap-3 sm:gap-4">
        <CarouselArrow
          direction="left"
          onClick={() => scroll(-1)}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 sm:static sm:translate-y-0 shrink-0"
        />

        <div
          ref={scrollerRef}
          className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <CarouselArrow
          direction="right"
          onClick={() => scroll(1)}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 sm:static sm:translate-y-0 shrink-0"
        />
      </div>
    </section>
  );
}
