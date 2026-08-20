import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FaqItem from "@/components/marketing/FaqItem";

export const metadata: Metadata = {
  title: "FAQs | Brown Nation Chocolates",
  description: "Answers to common questions about ingredients, storage, shipping, and customization.",
};

const faqs = [
  {
    question: "What ingredients do you use?",
    answer:
      "Premium cocoa, real butter and cream, and natural flavorings  no artificial preservatives. Full ingredient lists are on every product page.",
  },
  {
    question: "How should I store my chocolates?",
    answer:
      "Keep them in a cool, dry place away from direct sunlight, ideally 18–20°C. In hot weather, refrigerate and bring back to room temperature before eating for the best texture.",
  },
  {
    question: "How long do they stay fresh?",
    answer:
      "Best enjoyed within 4–6 weeks of purchase. Truffles and cream-based fillings have a shorter window than bars  check the product page for specifics.",
  },
  {
    question: "Can I customize a bar or box?",
    answer:
      "Yes  printed photo bars, personalized message boxes, and bespoke gift hampers are all available. See our Custom Orders page to get started.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes, we ship pan-India. Orders above ₹999 ship free; see our Shipping & Delivery page for delivery timelines.",
  },
  {
    question: "What if I receive the wrong product?",
    answer:
      "Reach out within 48 hours of delivery with your order number and a photo of the product received, and we'll send the correct item at no extra cost. We don't offer returns or refunds otherwise. See our Returns & Refunds page for details.",
  },
  {
    question: "How do I track my order?",
    answer:
      "If you're logged in, your orders and their status are always visible under My Orders. You can also look up an order by ID on our Track Order page.",
  },
];

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-sm sm:text-base text-espresso/60">
        Can&apos;t find what you&apos;re looking for?{" "}
        <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
          Get in touch
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </div>
  );
}
