import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, HelpCircle, X as XIcon } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/marketing/ContactForm";
import { contactDetails } from "@/data/footer";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcon";

export const metadata: Metadata = {
  title: "Contact Us | Brown Nation Chocolates",
  description: "Get in touch with Brown Nation Chocolates.",
};

const socials = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

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

          <div className="rounded-2xl bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-espresso">Follow Us</p>
            <div className="mt-3 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
