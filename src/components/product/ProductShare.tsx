"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { FacebookIcon, WhatsappIcon } from "@/components/ui/SocialIcon";

export default function ProductShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: WhatsappIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: FacebookIcon },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to fall back to.
    }
  };

  const iconButtonClasses =
    "flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:-translate-y-0.5";

  return (
    <div className="flex items-center gap-3 border-t border-brand-100 pt-5">
      <span className="text-xs font-semibold uppercase tracking-wide text-espresso/60">Share</span>
      <div className="flex items-center gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className={iconButtonClasses}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy product link"
          className={iconButtonClasses}
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={1.75} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  );
}
