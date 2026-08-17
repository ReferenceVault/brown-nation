"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirect = searchParams.get("redirect");
  const signupHref = redirect ? `/signup?redirect=${encodeURIComponent(redirect)}` : "/signup";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (redirect) {
      router.push(redirect);
      return;
    }

    const role = useAuthStore.getState().currentUser?.role;
    router.push(role === "ADMIN" ? "/admin" : "/account");
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Welcome Back</h1>
      <p className="mt-2 text-sm text-espresso/60">Log in to view your orders and checkout faster.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
          placeholder="••••••••"
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <Button type="submit" variant="filled" className="mt-2 w-full" disabled={submitting}>
          {submitting ? "Logging In…" : "Log In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-espresso/60">
        New here?{" "}
        <Link href={signupHref} className="font-semibold text-brand-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
