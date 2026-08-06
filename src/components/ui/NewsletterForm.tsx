"use client";

import { Send } from "lucide-react";

export default function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex items-center gap-2">
      <input
        type="email"
        required
        placeholder="Your email address"
        className="w-full min-w-0 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-cream-100/40 outline-none transition-colors duration-200 focus:border-brand-400"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center rounded-lg bg-brand-500 px-3.5 py-2.5 text-white transition-colors duration-300 hover:bg-brand-600 cursor-pointer"
      >
        <Send className="h-4 w-4" strokeWidth={2} />
      </button>
    </form>
  );
}
