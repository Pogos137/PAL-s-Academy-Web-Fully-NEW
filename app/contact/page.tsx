import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/sections/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with PAL's Academy.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Contact</div>
            <h1 className="display mt-6 max-w-3xl text-balance text-5xl sm:text-6xl">
              Say hello.
            </h1>
            <p className="mt-6 max-w-xl text-ink-100/90">
              The fastest way to reach us is the form — every submission is read by a
              human inside one business day.
            </p>
            <p className="mt-4 text-sm text-ink-200">
              Email ·{" "}
              <a
                href="mailto:palseduacademy@gmail.com"
                className="text-gold-300 underline-offset-4 hover:underline"
              >
                palseduacademy@gmail.com
              </a>{" "}
              · Greater Toronto Area
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <div className="mx-auto max-w-xl rounded-3xl border border-ink-100 bg-ivory-50 p-8 shadow-luxe sm:p-10">
            <LeadForm source="contact" />
          </div>
          <div className="mt-12 text-center text-sm text-ink-500">
            Looking to apply as a tutor?{" "}
            <Link href="/careers" className="text-gold-600 underline-offset-4 hover:underline">
              Visit the careers page.
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
