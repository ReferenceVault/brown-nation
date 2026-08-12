import type { Metadata } from "next";
import Image from "next/image";
import { Sprout, Hand, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { trustFeatures } from "@/data/trustFeatures";

export const metadata: Metadata = {
  title: "About Us | Brown Nation Chocolates",
  description:
    "The story behind Brown Nation Chocolates  handcrafted, small-batch, and made with premium ingredients.",
};

const process = [
  {
    icon: Sprout,
    title: "Source",
    description: "We choose premium cocoa and ingredients first  flavor and quality come before cost.",
  },
  {
    icon: Hand,
    title: "Handcraft",
    description: "Every bar is tempered, filled, and finished by hand in small batches, never mass-produced.",
  },
  {
    icon: Truck,
    title: "Ship Fresh",
    description: "Orders are packed and shipped close to the day they're made, so it reaches you at its best.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

        <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">Our Story</h1>
            <div className="mt-5 flex flex-col gap-4 text-sm sm:text-base text-espresso/70 leading-relaxed">
              <p>
                Brown Nation Chocolates started as a small kitchen experiment  tempering, folding, and
                tasting until every bar felt right. We&apos;re still doing the same thing today, just at a
                slightly larger table.
              </p>
              <p>
                Every bar, truffle, and gift box is handcrafted in small batches with premium ingredients and
                no preservatives. No shortcuts, no mass production  just cocoa, care, and a lot of patience.
              </p>
              <p>
                Whether it&apos;s a flavor experiment like our Arabian Kunafa Royale or an intense
                single-origin Midnight Noir, our goal is the same: every bite should feel like it was made
                just for you.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1493925410384-84f842e616fb"
              alt="Hands holding fresh cocoa beans"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-cream-100 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading eyebrow="Our Promise" title="What We Stand For" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {trustFeatures.map(({ icon: Icon, title, subtitle, bg, iconColor }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-2.5 rounded-2xl bg-white p-4 text-center shadow-card"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.75} />
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-espresso">{title}</h3>
                <p className="text-[11px] sm:text-xs text-espresso/60 leading-snug">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:px-8">
        <SectionHeading eyebrow="How It's Made" title="From Bean to Bar" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {process.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative rounded-2xl bg-white p-6 shadow-card">
              <span className="font-serif text-4xl font-bold text-brand-100">0{i + 1}</span>
              <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-espresso">{title}</h3>
              <p className="mt-1.5 text-sm text-espresso/60 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-espresso-dark">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 py-14 text-center sm:py-16 lg:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Ready to Taste the Difference?
          </h2>
          <p className="max-w-md text-sm text-cream-100/70">
            Browse our handcrafted bars, truffles, and gift boxes  made fresh, shipped with care.
          </p>
          <Button href="/shop" variant="filled">
            Shop All Chocolates
          </Button>
        </div>
      </div>
    </div>
  );
}
