import type { Metadata } from "next";
import { MessageSquare, Palette, PackageCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import ProductGrid from "@/components/shop/ProductGrid";
import { listProducts } from "@/lib/api/public/products";
import { fetchCategoryBySlug } from "@/lib/api/public/categories";

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

export default async function CustomOrdersPage() {
  const category = await fetchCategoryBySlug("customized-chocolates");
  const customizedProducts = category ? (await listProducts({ categoryId: category.id, limit: 100 })).items : [];
  const heroImage = category?.image || customizedProducts[0]?.images[0] || "/products/printed-bar.jpg";

  return (
    <div>
      <PageHero
        image={heroImage}
        eyebrow="Made Just For You"
        title="Custom Orders"
        description="From printed photo bars to fully personalized message boxes, our Customized Chocolates collection is built for birthdays, anniversaries, and every celebration in between."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Custom Orders" }]}
      >
        <Button href="/shop/customized-chocolates" variant="filled">
          Shop Customized Chocolates
        </Button>
        <Button href="/contact" variant="outline-light">
          Request a Bespoke Order
        </Button>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:px-8">
        <div>
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
    </div>
  );
}
