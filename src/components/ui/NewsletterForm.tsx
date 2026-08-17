"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { useToastStore } from "@/lib/stores/toastStore";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const showToast = useToastStore((state) => state.show);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const { message } = await subscribeToNewsletter(email);
      showToast(message, "success");
      setEmail("");
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full min-w-0 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-cream-100/40 outline-none transition-colors duration-200 focus:border-brand-400"
      />
      <button
        type="submit"
        disabled={submitting}
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center rounded-lg bg-brand-500 px-3.5 py-2.5 text-white transition-colors duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        <Send className="h-4 w-4" strokeWidth={2} />
      </button>
    </form>
  );
}
