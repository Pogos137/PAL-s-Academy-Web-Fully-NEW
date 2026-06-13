import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import CTA from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";
import { articlesByNewest } from "@/lib/articles-content";

export const metadata = buildMetadata({
  title: "Guides & Resources",
  description:
    "Honest, expert guides for Ontario students and parents — course breakdowns, study strategy, and university prep for Grade 9–12 and first-year university. From PAL's Academy.",
  path: "/blog"
});

export default function BlogIndexPage() {
  const [featured, ...rest] = articlesByNewest;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Guides &amp; Resources</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Clear answers to the questions families actually ask.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Course breakdowns, study strategy, and university prep for Ontario students in
              Grade 9&ndash;12 and first-year university — written in plain language, with no
              hype and no quick fixes. Just what actually moves a mark.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="relative bg-ivory pt-24 pb-6">
        <div className="container-luxe">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 rounded-3xl border border-ink-100 bg-ivory-50 p-8 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe lg:grid-cols-[1.3fr_1fr] lg:p-10"
            >
              <div className="flex flex-col">
                <div className="eyebrow">{featured.category} · Latest</div>
                <h2 className="mt-4 font-serif text-3xl text-ink-800 sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-600">{featured.excerpt}</p>
                <div className="mt-auto flex items-center gap-x-5 pt-8 text-sm text-ink-500">
                  <time dateTime={featured.publishedISO}>{featured.publishedLabel}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-500/70" />
                    {featured.readMinutes} min read
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-600">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section className="relative bg-ivory pt-10 pb-24">
        <div className="container-luxe">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <StaggerItem key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                >
                  <div className="eyebrow">{a.category}</div>
                  <h3 className="mt-4 font-serif text-2xl text-ink-800">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{a.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-ink-500">
                      <Clock className="h-4 w-4 text-gold-500/70" />
                      {a.readMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-2 font-medium text-gold-600">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA />
    </>
  );
}
