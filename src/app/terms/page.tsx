import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | Brown Nation Chocolates",
  description: "Terms and conditions for using Brown Nation Chocolates.",
};

type Block = { type: "p"; text: string } | { type: "list"; items: string[] };
type Section = { title: string; blocks: Block[] };

const sections: Section[] = [
  {
    title: "1. Acceptance of Terms",
    blocks: [
      {
        type: "p",
        text: "By using this website or purchasing from Brown Nation Chocolates, you confirm that you have read, understood, and agreed to these Terms and Conditions. If you do not agree, please do not use our services.",
      },
    ],
  },
  {
    title: "2. About Our Products",
    blocks: [
      {
        type: "p",
        text: "Brown Nation Chocolates offers artisanal, handcrafted chocolates made in small batches. Due to the handmade nature of our products, slight variations in appearance, design, and colour may occur. These variations are natural and do not affect quality.",
      },
    ],
  },
  {
    title: "3. Orders",
    blocks: [
      {
        type: "p",
        text: "All orders placed through our website, social media, or direct communication are subject to acceptance and availability.",
      },
      {
        type: "p",
        text: "We reserve the right to refuse or cancel any order at our discretion, including but not limited to:",
      },
      {
        type: "list",
        items: [
          "Product unavailability",
          "Errors in pricing or product information",
          "Suspicious or fraudulent activity",
        ],
      },
    ],
  },
  {
    title: "4. Pricing and Payments",
    blocks: [
      {
        type: "p",
        text: "All prices are listed in the applicable currency and are subject to change without prior notice.",
      },
      {
        type: "p",
        text: "Orders must be paid in full before processing unless otherwise agreed. We accept payment methods as specified at checkout or during order confirmation.",
      },
    ],
  },
  {
    title: "5. Customized Orders",
    blocks: [
      {
        type: "p",
        text: "Customized chocolates are made based on customer specifications, including flavour, design, and message.",
      },
      { type: "p", text: "Important conditions for custom orders:" },
      {
        type: "list",
        items: [
          "Custom orders cannot be returned, replaced, or refunded once production has begun",
          "Design approvals (if shared) must be confirmed by the customer",
          "Minor variations may occur due to handcrafted production",
          "Custom orders may require additional processing time",
        ],
      },
    ],
  },
  {
    title: "6. Shipping and Delivery",
    blocks: [
      {
        type: "p",
        text: "We aim to deliver orders within the estimated timeframe provided at the time of purchase. However, delivery timelines may vary due to:",
      },
      {
        type: "list",
        items: ["Location", "Weather conditions", "Courier delays", "Festive or peak seasons"],
      },
      {
        type: "p",
        text: "Brown Nation Chocolates is not responsible for delays caused by third-party delivery services.",
      },
      {
        type: "p",
        text: "Risk of product damage transfers to the customer once the order has been dispatched.",
      },
    ],
  },
  {
    title: "7. Cancellation Policy",
    blocks: [
      { type: "p", text: "Orders may be cancelled only before they are processed or dispatched." },
      { type: "p", text: "Customized orders cannot be cancelled once production has started." },
      {
        type: "p",
        text: "Refunds, if applicable, will be processed at our discretion and may take a reasonable time to reflect in the original payment method.",
      },
    ],
  },
  {
    title: "8. Returns and Refunds",
    blocks: [
      {
        type: "p",
        text: "Due to the perishable nature of chocolates, we do not accept returns, replacements, or refunds, except where the wrong product has been delivered.",
      },
      {
        type: "p",
        text: "If the wrong product is delivered, customers must report the issue within 48 hours of delivery with their order number and a photo of the product received; we will arrange for the correct item to be sent at no extra cost.",
      },
      { type: "p", text: "Customers are advised to review their orders carefully before confirming purchase." },
    ],
  },
  {
    title: "9. Product Storage and Consumption",
    blocks: [
      {
        type: "p",
        text: "Customers are responsible for proper storage of chocolates after delivery. We recommend storing products in a cool, dry place away from direct sunlight.",
      },
      {
        type: "p",
        text: "Brown Nation Chocolates is not responsible for product quality issues arising from improper storage after delivery.",
      },
    ],
  },
  {
    title: "10. Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All content on this website, including images, product designs, branding, text, and logos, is the property of Brown Nation Chocolates.",
      },
      { type: "p", text: "No content may be copied, reproduced, or used without prior written permission." },
    ],
  },
  {
    title: "11. User Responsibility",
    blocks: [
      { type: "p", text: "By using our services, you agree not to:" },
      {
        type: "list",
        items: [
          "Misuse the website or services",
          "Provide false information",
          "Attempt fraudulent transactions",
          "Copy or exploit our brand or content",
        ],
      },
    ],
  },
  {
    title: "12. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "Brown Nation Chocolates shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or services.",
      },
      { type: "p", text: "Our liability is limited to the value of the product purchased." },
    ],
  },
  {
    title: "13. Privacy",
    blocks: [
      {
        type: "p",
        text: "We respect your privacy and handle your personal information with care. Any data collected is used solely for order processing, communication, and service improvement.",
      },
      {
        type: "p",
        text: "We do not sell or share personal information with third parties except as required to process orders, payments, deliveries, or provide our services.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-espresso/50">Last updated: August 2026</p>

      <div className="mt-8 flex flex-col gap-7">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-serif text-lg font-semibold text-espresso">{section.title}</h2>
            <div className="mt-2 flex flex-col gap-2">
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className="text-sm text-espresso/70 leading-relaxed">
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="flex flex-col gap-1.5 pl-1">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-espresso/70 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
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
