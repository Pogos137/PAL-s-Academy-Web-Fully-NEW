import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/faq-content";

export const metadata = buildMetadata({
  title: "Tutoring FAQ | Pricing, Sessions & Policies",
  description:
    "Answers on PAL's Academy pricing, packages, scheduling and rescheduling policy for Toronto and GTA tutoring students. Book a free consultation.",
  path: "/faq"
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a }
  }))
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Questions, answered</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              The things families ask us first.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Straight answers about how we work, online sessions, subjects, and how tutoring with
              PAL&rsquo;s Academy actually works across the Greater Toronto Area.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Stagger className="mx-auto grid max-w-3xl gap-5">
            {faqs.map(({ q, a }) => (
              <StaggerItem key={q}>
                <article className="rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-colors hover:border-gold-300">
                  <h2 className="font-serif text-xl text-ink-800 sm:text-2xl">{q}</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{a}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-16 text-center">
              <p className="text-ink-600">Still have a question?</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/booking" className="btn btn-gold">
                  Book a free consultation
                </Link>
                <Link href="/contact" className="btn btn-ink">
                  Send us a message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
