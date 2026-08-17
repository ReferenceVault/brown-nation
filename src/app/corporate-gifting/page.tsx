import type { Metadata } from "next";
import Image from "next/image";
import { Users, Building2, PartyPopper, Ribbon, Palette, Truck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import { fetchProductBySlug } from "@/lib/api/public/products";

export const metadata: Metadata = {
  title: "Corporate Gifting | Brown Nation Chocolates",
  description: "Handcrafted chocolate hampers for corporate gifting and festive occasions.",
};

const useCases = [
  { icon: Users, title: "Team Gifting", description: "Celebrate milestones, birthdays, and wins with your team." },
  { icon: Building2, title: "Client Gifting", description: "Leave a lasting impression with clients and partners." },
  { icon: PartyPopper, title: "Festive Bulk Orders", description: "Diwali, New Year, and festive hampers at scale." },
];

const perks = [
  { icon: Palette, text: "Custom branding on request" },
  { icon: Ribbon, text: "Ribbon, card & packaging options" },
  { icon: Truck, text: "Pan-India delivery" },
];

export default async function CorporateGiftingPage() {
  const featured = await fetchProductBySlug("signature-designer-bar");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Corporate Gifting" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Corporate Gifting</h1>
      <p className="mt-4 max-w-xl text-sm sm:text-base text-espresso/70 leading-relaxed">
        Handcrafted chocolate hampers for clients, teams, and festive occasions  with custom branding,
        ribbon, and card options for bulk orders.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contact" variant="filled">
          Enquire for Bulk Orders
        </Button>
        <Button href="/shop/customized-chocolates" variant="outline">
          Browse Gifting Options
        </Button>
      </div>

      <div className="mt-14 sm:mt-16">
        <SectionHeading eyebrow="Perfect For" title="Gifting Made For Every Occasion" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {useCases.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
                <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-espresso">{title}</h3>
              <p className="text-sm text-espresso/60 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 sm:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            A Popular Starting Point
          </span>
          {featured && (
            <>
              <h2 className="mt-2 font-serif text-2xl font-bold text-espresso">{featured.name}</h2>
              <p className="mt-2 text-sm text-espresso/70 leading-relaxed line-clamp-3">{featured.description}</p>
              <div className="mt-3">
                {Number(featured.price) > 0 ? (
                  <PriceTag price={Number(featured.price)} size="lg" />
                ) : (
                  <span className="text-lg font-bold text-brand-600">Price on request</span>
                )}
              </div>
              <Button href={`/product/${featured.slug}`} variant="filled" className="mt-5">
                View {featured.name}
              </Button>
            </>
          )}

          <ul className="mt-8 flex flex-col gap-3">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm text-espresso/70">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pastel-teal-soft">
                  <Icon className="h-4 w-4 text-teal-700" strokeWidth={1.75} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {featured && (
          <div className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-soft">
            <Image
              src={featured.images[0]}
              alt={featured.name}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-14 sm:mt-16 rounded-2xl bg-espresso-dark px-6 py-10 text-center sm:py-12">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Planning a Bulk Order?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-cream-100/70">
          Tell us your quantity, timeline, and branding needs  we&apos;ll put together a quote for you.
        </p>
        <Button href="/contact" variant="filled" className="mt-5">
          Enquire Now
        </Button>
      </div>
    </div>
  );
}
