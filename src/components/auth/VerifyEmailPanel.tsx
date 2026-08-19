"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import * as authApi from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

type Status = "idle" | "verifying" | "verified" | "error";

function errorMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
}

export default function VerifyEmailPanel() {
  const searchParams = useSearchParams();
  const currentUser = useAuthStore((state) => state.currentUser);

  const token = searchParams.get("token");
  const redirect = searchParams.get("redirect");
  const accountHref = redirect || "/account";

  const [status, setStatus] = useState<Status>(token ? "verifying" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [resendSent, setResendSent] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    authApi
      .verifyEmail(token)
      .then(() => setStatus("verified"))
      .catch((err) => {
        setError(errorMessage(err));
        setStatus("error");
      });
  }, [token]);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setError(null);
    try {
      await authApi.resendVerificationEmail(email);
      setResendSent(true);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setResending(false);
    }
  };

  if (status === "verifying") {
    return (
      <div className="mx-auto max-w-sm text-center">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Verifying your email…</h1>
      </div>
    );
  }

  if (status === "verified") {
    return (
      <div className="mx-auto max-w-sm text-center">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Email verified</h1>
        <p className="mt-2 text-sm text-espresso/60">Your email address has been verified successfully.</p>
        <Button href={accountHref} variant="filled" className="mt-6 w-full">
          Continue
        </Button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-sm text-center">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Verification link invalid</h1>
        <p className="mt-2 text-sm text-espresso/60">{error || "This verification link is invalid or has expired."}</p>

        <div className="mt-6 flex flex-col gap-3">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Button type="button" variant="filled" className="w-full" disabled={resending || !email} onClick={handleResend}>
            {resending ? "Sending…" : "Resend verification email"}
          </Button>
          {resendSent && <p className="text-sm font-medium text-brand-600">A new verification link has been sent.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm text-center">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">Check your email</h1>
      <p className="mt-2 text-sm text-espresso/60">
        We&apos;ve sent a verification link to your email address. Click the link to verify your account.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Button type="button" variant="outline" className="w-full" disabled={resending || !email} onClick={handleResend}>
          {resending ? "Sending…" : "Resend verification email"}
        </Button>
        {resendSent && <p className="text-sm font-medium text-brand-600">A new verification link has been sent.</p>}
      </div>

      <p className="mt-6 text-center text-sm text-espresso/60">
        <Link href={accountHref} className="font-semibold text-brand-600 hover:underline">
          Continue to your account
        </Link>
      </p>
    </div>
  );
}
