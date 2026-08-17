"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides } from "@/data/heroSlides";
import Button from "@/components/ui/Button";
import CarouselArrow from "@/components/ui/CarouselArrow";

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  const goTo = useCallback((i: number) => {
    setIndex((i + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, goTo]);

  return (
    <section
      className="relative overflow-hidden transition-colors duration-700"
      style={{
        background: `linear-gradient(120deg, ${slide.palette.from}, ${slide.palette.to})`,
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-10 pb-20 sm:pt-14 sm:pb-24 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-16 lg:pb-28">
        {/* Text content */}
        <div className="relative z-10 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">
                {slide.eyebrow}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-espresso">
                {slide.headingLine1}
              </h1>
              <h2 className="font-script text-4xl sm:text-5xl lg:text-6xl text-brand-500 leading-tight">
                {slide.headingLine2}{" "}
                <span aria-hidden className="text-3xl sm:text-4xl">
                  ♡
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm sm:text-base text-espresso/70 leading-relaxed">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/shop" variant="filled" icon={<span aria-hidden>→</span>}>
                  {slide.primaryCta}
                </Button>
                <Button href="/shop" variant="outline">
                  {slide.secondaryCta}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-10 flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? "w-7 bg-brand-500" : "w-2.5 bg-brand-300/60 hover:bg-brand-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={slide.image}
                  alt="Brown Nation Chocolates"
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden sm:flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-card">
                <span className="font-serif text-2xl text-brand-500">100%</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows: scoped to the image on stacked (mobile/tablet) layouts */}
          <div className="absolute inset-x-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between lg:hidden">
            <CarouselArrow direction="left" onClick={() => goTo(index - 1)} />
            <CarouselArrow direction="right" onClick={() => goTo(index + 1)} />
          </div>
        </div>
      </div>

      {/* Arrows: full-bleed, vertically centered on the two-column desktop layout */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-between px-6 lg:flex">
        <div className="pointer-events-auto">
          <CarouselArrow direction="left" onClick={() => goTo(index - 1)} />
        </div>
        <div className="pointer-events-auto">
          <CarouselArrow direction="right" onClick={() => goTo(index + 1)} />
        </div>
      </div>
    </section>
  );
}
