import { Suspense } from "react";
import { SignupForm } from "@/components/portal/AuthForms";

export const metadata = {
  title: "Request access",
  robots: { index: false, follow: false }
};

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
