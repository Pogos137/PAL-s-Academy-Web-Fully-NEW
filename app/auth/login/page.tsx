import { Suspense } from "react";
import { LoginForm } from "@/components/portal/AuthForms";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
