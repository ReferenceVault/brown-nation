import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log In | Brown Nation Chocolates",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
