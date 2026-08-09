import Link from "next/link";
import { Mail, MapPin, Phone, X as XIcon } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { customerCareLinks, contactDetails } from "@/data/footer";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcon";
import NewsletterForm from "@/components/ui/NewsletterForm";

const socials = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso-dark text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold text-white">Brown Nation</span>
              <span className="mt-0.5 text-[11px] tracking-[0.35em] text-brand-300 font-medium">
                — CHOCOLATES —
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-cream-100/70 leading-relaxed">
              Handcrafted chocolates made with premium ingredients, endless passion, and a whole
              lot of love — straight from our kitchen in India to your doorstep.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream-100 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-100/70 transition-colors duration-200 hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white">Customer Care</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {customerCareLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-100/70 transition-colors duration-200 hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-serif text-base font-semibold text-white">
              Stay Sweet, Stay Updated
            </h4>
            <p className="mt-4 text-sm text-cream-100/70 leading-relaxed">
              Subscribe for new flavors, festive offers &amp; 10% off your first order.
            </p>
            <NewsletterForm />

            <ul className="mt-6 flex flex-col gap-3">
              {contactDetails.phone && (
                <li className="flex items-center gap-2.5 text-sm text-cream-100/70">
                  <Phone className="h-4 w-4 shrink-0 text-brand-300" strokeWidth={1.75} />
                  {contactDetails.phone}
                </li>
              )}
              {contactDetails.email && (
                <li className="flex items-center gap-2.5 text-sm text-cream-100/70">
                  <Mail className="h-4 w-4 shrink-0 text-brand-300" strokeWidth={1.75} />
                  {contactDetails.email}
                </li>
              )}
              {contactDetails.address && (
                <li className="flex items-start gap-2.5 text-sm text-cream-100/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" strokeWidth={1.75} />
                  {contactDetails.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:justify-between">
          <p>© {year} Brown Nation Chocolates. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="transition-colors duration-200 hover:text-brand-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-brand-300">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
