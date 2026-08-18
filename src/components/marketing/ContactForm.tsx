"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import TextField from "@/components/ui/TextField";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { submitEnquiry } from "@/lib/api/public/enquiries";
import { ApiError } from "@/lib/api/errors";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitEnquiry({ name, email, message });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
      <TextField
        label="Name"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        label="Message"
        required
        rows={4}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <Button type="submit" variant="filled" className="w-full" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
