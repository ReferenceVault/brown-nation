import { Suspense } from "react";
import VerifyEmailPanel from "@/components/auth/VerifyEmailPanel";

export const metadata = {
  title: "Verify Email | Brown Nation Chocolates",
};

export default function VerifyEmailPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <Suspense fallback={null}>
        <VerifyEmailPanel />
      </Suspense>
    </div>
  );
}
