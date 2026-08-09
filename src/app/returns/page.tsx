import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Returns & Refunds | Brown Nation Chocolates",
  description: "Our returns and refunds policy for damaged or incorrect orders.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Returns & Refunds" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Returns & Refunds</h1>
      <p className="mt-4 text-sm sm:text-base text-espresso/70 leading-relaxed">
        Because our chocolates are perishable and made fresh to order, we&apos;re unable to accept returns for
        change of mind. That said, if something&apos;s wrong with your order, we want to make it right.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-serif text-lg font-semibold text-espresso">Damaged or Defective Items</h2>
          <p className="mt-2 text-sm text-espresso/65 leading-relaxed">
            Contact us within 48 hours of delivery with your order number and a photo of the issue. We&apos;ll
            arrange a replacement or a full refund to your original payment method.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-serif text-lg font-semibold text-espresso">Wrong Item Received</h2>
          <p className="mt-2 text-sm text-espresso/65 leading-relaxed">
            If your order doesn&apos;t match what you ordered, let us know within 48 hours of delivery and
            we&apos;ll send the correct item at no extra cost.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="font-serif text-lg font-semibold text-espresso">Custom & Personalized Orders</h2>
          <p className="mt-2 text-sm text-espresso/65 leading-relaxed">
            Printed bars, message boxes, and other personalized items can&apos;t be resold, so these are only
            eligible for a replacement if there&apos;s a defect or printing error on our end.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Button href="/contact" variant="filled">
          Report an Issue
        </Button>
      </div>
    </div>
  );
}
