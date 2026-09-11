"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import type { PromoBanner } from "@/lib/types/catalog";
import { useToastStore } from "@/lib/stores/toastStore";
import Button from "@/components/ui/Button";

export default function PromoBannerSection({ banner }: { banner: PromoBanner | null }) {
  const showToast = useToastStore((state) => state.show);
  const [copied, setCopied] = useState(false);

  if (!banner) return null;

  const copyCode = async () => {
    if (!banner.couponCode) return;
    try {
      await navigator.clipboard.writeText(banner.couponCode);
      setCopied(true);
      showToast(`Copied "${banner.couponCode}" to clipboard.`);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast("Could not copy the code — please copy it manually.", "error");
    }
  };

  return (
    <section className="bg-espresso">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
        <div className="text-center lg:text-left">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
            {banner.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
            {banner.heading}
          </h2>
          <p className="mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base text-cream-100/80 leading-relaxed">
            {banner.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Button href={banner.ctaHref} variant="filled">
              {banner.ctaLabel}
            </Button>
            {banner.couponCode && (
              <button
                type="button"
                onClick={copyCode}
                aria-label={`Copy coupon code ${banner.couponCode}`}
                className="flex items-center gap-2.5 rounded-lg border-2 border-dashed border-white/40 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/5 cursor-pointer"
              >
                Code: {banner.couponCode}
                {copied ? (
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2} />
                ) : (
                  <Copy className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                )}
              </button>
            )}
          </div>
        </div>

        {banner.image && (
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl shadow-soft lg:max-w-none">
            <Image
              src={banner.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
