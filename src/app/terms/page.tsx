import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | Brown Nation Chocolates",
  description: "Terms and conditions for using Brown Nation Chocolates.",
};

const sections = [
  {
    title: "Orders & Pricing",
    body: "All prices are listed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to limit order quantities.",
  },
  {
    title: "Product Information",
    body: "We describe ingredients and allergens as accurately as possible, but our kitchen also handles nuts, dairy, and gluten  please check product pages carefully if you have allergies.",
  },
  {
    title: "Account Responsibility",
    body: "You're responsible for keeping your account credentials secure and for all activity under your account.",
  },
  {
    title: "Intellectual Property",
    body: "All site content  including photography, copy, and the Brown Nation Chocolates name and logo  belongs to us and may not be reused without permission.",
  },
  {
    title: "Limitation of Liability",
    body: "We aren't liable for indirect or incidental damages arising from the use of this site or our products, beyond the value of the order in question.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-espresso/50">Last updated: August 2026</p>

      <div className="mt-8 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-serif text-lg font-semibold text-espresso">{section.title}</h2>
            <p className="mt-2 text-sm text-espresso/70 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-espresso/60">
        Questions about these terms?{" "}
        <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
