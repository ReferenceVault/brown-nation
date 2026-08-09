import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, PackageCheck, ThermometerSnowflake } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/lib/constants";
import { formatINR } from "@/lib/utils/currency";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Brown Nation Chocolates",
  description: "Shipping rates, delivery timelines, and packaging info for Brown Nation Chocolates.",
};

const points = [
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "We currently ship across India via trusted courier partners.",
  },
  {
    icon: Clock,
    title: "Processing Time",
    description: "Orders are handcrafted and packed within 1–2 business days before dispatch.",
  },
  {
    icon: PackageCheck,
    title: `Free Shipping Above ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    description: `Orders under ${formatINR(FREE_SHIPPING_THRESHOLD)} carry a flat ${formatINR(SHIPPING_FLAT_RATE)} shipping fee.`,
  },
  {
    icon: ThermometerSnowflake,
    title: "Weather-Safe Packaging",
    description: "Insulated packaging is used during warmer months to protect your chocolates in transit.",
  },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping & Delivery" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Shipping & Delivery</h1>
      <p className="mt-4 text-sm sm:text-base text-espresso/70 leading-relaxed">
        We handcraft and pack every order with care, so it arrives looking (and tasting) as good as it did
        when it left our kitchen.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {points.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
              <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-espresso">{title}</p>
              <p className="mt-0.5 text-sm text-espresso/60 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-espresso/60 leading-relaxed">
        Typical delivery takes 3–7 business days depending on your location. You&apos;ll receive updates on
        your order status under{" "}
        <Link href="/account/orders" className="font-semibold text-brand-600 hover:underline">
          My Orders
        </Link>{" "}
        once it ships.
      </p>
    </div>
  );
}
