import { Suspense } from "react";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create Account | Brown Nation Chocolates",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
