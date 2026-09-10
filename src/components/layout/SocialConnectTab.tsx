"use client";

import { useEffect, useState } from "react";
import { socialLinks } from "@/data/footer";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcon";

const socials = [
  { label: "Facebook", href: socialLinks.facebook, icon: FacebookIcon },
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
];

// Stays hidden until the hero's own CTAs (near the left edge) are scrolled
// past, so the tab never sits on top of them.
const SCROLL_REVEAL_THRESHOLD = 420;

/** Sticky left-edge tab linking out to social pages — visible on every storefront page. */
export default function SocialConnectTab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_REVEAL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-1/2 z-40 -translate-y-1/2 transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex flex-col overflow-hidden rounded-r-2xl shadow-soft">
        <span className="flex items-center justify-center bg-brand-500 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white [writing-mode:vertical-lr] rotate-180">
          Connect
        </span>
        <div className="flex flex-col items-center gap-1 bg-white px-2 py-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              tabIndex={visible ? 0 : -1}
              className="flex h-9 w-9 items-center justify-center rounded-full text-espresso/60 transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 hover:-translate-y-0.5"
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
