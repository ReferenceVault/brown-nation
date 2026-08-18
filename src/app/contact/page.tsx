import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Clock, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/marketing/ContactForm";
import { contactDetails, socialLinks } from "@/data/footer";
import { InstagramIcon } from "@/components/ui/SocialIcon";

export const metadata: Metadata = {
  title: "Contact Us | Brown Nation Chocolates",
  description: "Get in touch with Brown Nation Chocolates.",
};

const instagramHandle = "@brownnation_mohini";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-espresso">Get in Touch</h1>
      <p className="mt-2 max-w-lg text-sm sm:text-base text-espresso/60">
        Questions about an order, bulk gifting, or just want to say hi? Send us a message and we&apos;ll get
        back to you soon.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-4">
          {contactDetails.phone && (
            <a
              href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pastel-pink-soft">
                <Phone className="h-5 w-5 text-rose-600" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-espresso">Phone</p>
                <p className="text-sm text-espresso/60">{contactDetails.phone}</p>
              </div>
            </a>
          )}

          {contactDetails.email && (
            <div className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                <Mail className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-semibold text-espresso">Email</p>
                <p className="text-sm text-espresso/60">{contactDetails.email}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pastel-teal-soft">
              <Clock className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-espresso">Response Time</p>
              <p className="text-sm text-espresso/60">We typically reply within 24–48 hours.</p>
            </div>
          </div>

          <Link
            href="/faqs"
            className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pastel-purple-soft">
              <HelpCircle className="h-5 w-5 text-violet-600" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-espresso">Have a quick question?</p>
              <p className="text-sm text-espresso/60">Check our FAQs first</p>
            </div>
          </Link>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pastel-peach-soft">
              <InstagramIcon className="h-5 w-5 text-orange-600" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-espresso">Follow us on Instagram</p>
              <p className="text-sm text-espresso/60">{instagramHandle}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
