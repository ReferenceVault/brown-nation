import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Brown Nation Chocolates",
  description: "How Brown Nation Chocolates collects, uses, and protects your information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you create an account or place an order, we collect your name, email address, phone number, and shipping address. We do not collect or store payment card details directly  that's handled by our payment provider.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, communicate order updates, respond to enquiries, and  if you opt in  send occasional offers and new-flavor announcements. We don't sell your data to third parties.",
  },
  {
    title: "Cookies & Local Storage",
    body: "We use browser storage to keep your cart, account session, and order history working smoothly between visits. This data stays in your browser and isn't shared with third parties.",
  },
  {
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of your personal data at any time by contacting us.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this policy from time to time. Continued use of the site after changes means you accept the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Privacy Policy</h1>
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
        Questions about your data?{" "}
        <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
