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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const redirect = searchParams.get("redirect");
  const loginHref = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = signup(name, email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(searchParams.get("redirect") || "/account");
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Create Your Account</h1>
      <p className="mt-2 text-sm text-espresso/60">Save your details for faster checkout and order tracking.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <TextField
          label="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <Button type="submit" variant="filled" className="mt-2 w-full">
          Create Account
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
