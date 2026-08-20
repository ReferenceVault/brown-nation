import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Returns & Refunds | Brown Nation Chocolates",
  description: "No returns or refunds, except when the wrong product is delivered.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Returns & Refunds" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Returns & Refunds</h1>
      <p className="mt-4 text-sm sm:text-base text-espresso/70 leading-relaxed">
        We do not offer returns or refunds on any orders. As our chocolates are handcrafted and made fresh
        to order, all sales are final.{" "}
        <span className="font-bold text-espresso">
          Only applicable in case the wrong product is delivered.
        </span>
      </p>

      <div className="mt-8">
        <Button href="/contact" variant="filled">
          Report an Issue
        </Button>
      </div>
    </div>
  );
}
