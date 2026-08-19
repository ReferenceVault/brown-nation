"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signup = useAuthStore((state) => state.signup);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirect = searchParams.get("redirect");
  const loginHref = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError("Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.");
      return;
    }

    setSubmitting(true);
    const result = await signup({ email, password, firstName, lastName, phone: phone || undefined });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(redirect ? `/verify-email?pending=1&redirect=${encodeURIComponent(redirect)}` : "/verify-email?pending=1");
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Create Your Account</h1>
      <p className="mt-2 text-sm text-espresso/60">Save your details for faster checkout and order tracking.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jane"
          />
          <TextField
            label="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <TextField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <Button type="submit" variant="filled" className="mt-2 w-full" disabled={submitting}>
          {submitting ? "Creating Account…" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-espresso/60">
        Already have an account?{" "}
        <Link href={loginHref} className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
