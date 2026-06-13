import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, GraduationCap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getLocation, locationSlugs } from "@/lib/locations-content";
import { subjects } from "@/lib/subjects-content";

type Params = { city: string };

// Six most-requested subjects, surfaced on every city page as internal links
// into the subject landing pages (city → subject is a strong relevance signal).
const featuredSubjects = subjects.slice(0, 6);

// Prerender all city pages at build time.
export function generateStaticParams(): Params[] {
  return locationSlugs.map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const l = getLocation(params.city);
  if (!l) return {};
  return buildMetadata({
    title: l.metaTitle,
    description: l.metaDescription,
    path: `/tutoring/${l.slug}`
  });
}

export default function LocationPage({ params }: { params: Params }) {
  const l = getLocation(params.city);
  if (!l) notFound();

  const path = `/tutoring/${l.slug}`;
  const nearby = l.nearby
    .map((slug) => getLocation(slug))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  // Service (area-served) + FAQPage + BreadcrumbList in one graph for this page.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Private tutoring",
        name: `Private Tutoring in ${l.city} — PAL's Academy`,
        description: l.metaDescription,
        url: siteUrl(path),
        areaServed: { "@type": "City", name: l.city },
        provider: {
          "@type": "EducationalOrganization",
          name: "PAL's Academy",
          url: siteUrl("/")
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "CAD",
          price: "200",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "200",
            priceCurrency: "CAD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" }
          },
          availability: "https://schema.org/InStock",
          url: siteUrl("/pricing")
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: l.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Tutoring by city", item: siteUrl("/tutoring") },
          { "@type": "ListItem", position: 3, name: `${l.city} Tutoring`, item: siteUrl(path) }
        ]
      }
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-100/70">
              <Link href="/tutoring" className="transition-colors hover:text-gold-300">
                Tutoring by city
              </Link>
              <span className="px-2 text-gold-300/60">/</span>
              <span className="text-ink-100/90">{l.city}</span>
            </nav>
            <div className="eyebrow text-gold-300">{l.eyebrow}</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              {l.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">{l.heroIntro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/booking" className="btn btn-gold group">
                Book free consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pricing" className="btn btn-ghost-dark">
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCAL CONTEXT */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <div className="eyebrow">In {l.region}</div>
                <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                  Tutoring built for{" "}
                  <span className="text-gradient-gold italic">{l.city} students.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                {l.localBody.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* boards + universities */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-7">
              <div className="flex items-center gap-3 text-ink-800">
                <MapPin className="h-5 w-5 text-gold-500" />
                <h3 className="font-serif text-xl">School boards we work with</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {l.boards.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-7">
              <div className="flex items-center gap-3 text-ink-800">
                <GraduationCap className="h-5 w-5 text-gold-500" />
                <h3 className="font-serif text-xl">Universities students aim for</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {l.universities.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ONLINE */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">Why online works</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Same tutor quality, <span className="text-gradient-gold italic">no commute.</span>
              </h2>
            </div>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {l.highlights.map((h) => (
              <StaggerItem key={h.title}>
                <div className="card-luxe h-full">
                  <h3 className="font-serif text-2xl text-ink-800">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{h.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* POPULAR SUBJECTS — interlink to subject pages */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="eyebrow">Most-requested in {l.city}</div>
            <h2 className="display mt-4 max-w-3xl text-4xl text-ink-800 sm:text-5xl">
              Popular subjects for {l.city} students.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSubjects.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/subjects/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                >
                  <div className="eyebrow">{s.eyebrow}</div>
                  <h3 className="mt-4 font-serif text-2xl text-ink-800">
                    {s.subject} tutoring
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                    Explore {s.subject.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <div className="mt-12 text-center">
              <Link href="/subjects" className="btn btn-ink">
                See all subjects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">Common questions</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Tutoring in {l.city}, answered.
              </h2>
            </div>
          </Reveal>
          <Stagger className="mx-auto mt-12 grid max-w-3xl gap-5">
            {l.faqs.map(({ q, a }) => (
              <StaggerItem key={q}>
                <article className="rounded-2xl border border-ink-100 bg-ivory p-7 transition-colors hover:border-gold-300">
                  <h3 className="font-serif text-xl text-ink-800">{q}</h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{a}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* NEARBY CITIES — interlink */}
      {nearby.length > 0 && (
        <section className="relative bg-ivory py-24">
          <div className="container-luxe">
            <Reveal>
              <div className="eyebrow">More of the GTA</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">Nearby cities</h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {nearby.map((n) => (
                <StaggerItem key={n.slug}>
                  <Link
                    href={`/tutoring/${n.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                  >
                    <div className="eyebrow">{n.region}</div>
                    <h3 className="mt-4 font-serif text-2xl text-ink-800">
                      Tutoring in {n.city}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                      Explore {n.city}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display text-4xl sm:text-5xl">
                Start with a free consultation.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-ink-200">
                A short, honest conversation about where the gap actually is — and a weekly plan
                your {l.city} student can act on. No pressure, no pitch.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/booking" className="btn btn-gold group">
                  Book your free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/tutoring" className="btn btn-ghost-dark">
                  All GTA locations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
