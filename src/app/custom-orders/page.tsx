import type { Metadata } from "next";
import { MessageSquare, Palette, PackageCheck } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProductsByCategory } from "@/lib/repositories/products";

export const metadata: Metadata = {
  title: "Custom Orders | Brown Nation Chocolates",
  description: "Printed bars, personalized message boxes, and photo chocolates for every occasion.",
};

const steps = [
  {
    icon: Palette,
    title: "Choose a Base",
    description: "Pick a bar, box, or truffle set from our Customized Chocolates collection.",
  },
  {
    icon: MessageSquare,
    title: "Tell Us the Details",
    description: "Share your photo, message, or design request at checkout or via our contact form.",
  },
  {
    icon: PackageCheck,
    title: "We Handcraft & Ship",
    description: "Your order is printed or hand-finished, packed carefully, and shipped fresh.",
  },
];

export default function CustomOrdersPage() {
  const customizedProducts = getProductsByCategory("customized");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Custom Orders" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Custom Orders</h1>
      <p className="mt-4 max-w-xl text-sm sm:text-base text-espresso/70 leading-relaxed">
        From printed photo bars to fully personalized message boxes, our Customized Chocolates collection is
        built for birthdays, anniversaries, and every celebration in between. Browse ready-to-order options
        below, or reach out for a fully bespoke design.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/shop/customized" variant="filled">
          Shop Customized Chocolates
        </Button>
        <Button href="/contact" variant="outline">
          Request a Bespoke Order
        </Button>
      </div>

      <div className="mt-14 sm:mt-16">
        <SectionHeading eyebrow="Simple Process" title="How It Works" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, i) => (
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

      <div className="mt-14 sm:mt-16">
        <SectionHeading eyebrow="Ready to Order" title="Popular Customizations" />
        <ProductGrid products={customizedProducts} />
      </div>
    </div>
  );
}
