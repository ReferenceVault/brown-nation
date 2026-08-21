"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  const goPrev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-50 shadow-card">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-espresso shadow-soft backdrop-blur transition-colors duration-200 hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-espresso shadow-soft backdrop-blur transition-colors duration-200 hover:bg-white cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2.5">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors duration-200 cursor-pointer ${
                active === i ? "border-brand-500" : "border-transparent hover:border-brand-200"
              }`}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
