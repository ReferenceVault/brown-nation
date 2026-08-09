"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="h-10 w-10 text-teal-600" strokeWidth={1.5} />
        <p className="font-semibold text-espresso">Message sent!</p>
        <p className="text-sm text-espresso/60">We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card">
      <TextField label="Name" required placeholder="Your name" />
      <TextField label="Email" type="email" required placeholder="you@example.com" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-espresso">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="How can we help?"
          className="rounded-lg border border-brand-200 px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400"
        />
      </div>
      <Button type="submit" variant="filled" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
