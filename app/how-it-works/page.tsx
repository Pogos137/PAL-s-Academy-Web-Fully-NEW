import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Method from "@/components/sections/Method";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Four quiet steps from the first call to a measurable grade jump.",
  alternates: { canonical: "/how-it-works" }
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">The process</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Calm in. Confident out.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              We don&rsquo;t reinvent tutoring. We just do four boring things very, very well.
            </p>
          </Reveal>
        </div>
      </section>

      <Method />

      <section className="relative bg-ivory py-24">
        <div className="container-luxe text-center">
          <Reveal>
            <Link href="/booking" className="btn btn-gold">
              <Sparkles className="h-4 w-4" />
              Book your free consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
