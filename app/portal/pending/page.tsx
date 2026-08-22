import Link from "next/link";
import { Hourglass } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Awaiting approval",
  robots: { index: false, follow: false }
};

export default async function PendingPage() {
  const user = await getCurrentUser();
  const firstName = user?.fullName?.split(" ")[0] || "scholar";

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-hero pt-40 text-ivory">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />
      <div className="container-luxe relative">
        <div className="mx-auto max-w-xl rounded-3xl border border-ivory/10 bg-ink-700/40 p-10 text-center backdrop-blur-md shadow-luxe">
          <Hourglass className="mx-auto h-10 w-10 animate-float text-gold-300" />
          <h1 className="mt-6 font-serif text-3xl text-ivory">Thanks, {firstName}.</h1>
          <p className="mt-3 text-sm text-ink-200">
            Your account is pending admin approval. We review every request personally,
            usually within 24 hours. You&rsquo;ll receive an email the moment your portal
            is unlocked.
          </p>
          <div className="gold-rule mx-auto mt-8" />
          <p className="mt-4 text-[10px] uppercase tracking-wider2 text-ink-300">
            PAL&rsquo;s Academy is intentionally small.
          </p>
          <Link href="/" className="btn btn-ghost-dark mt-8">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
