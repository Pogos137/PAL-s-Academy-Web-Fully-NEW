import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, GraduationCap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getSubject } from "@/lib/subjects-content";
import { getLocation } from "@/lib/locations-content";
import {
  getIntersection,
  intersectionParams,
  intersectionsForSubjectSlug,
  intersectionPath
} from "@/lib/intersections-content";

type Params = { city: string; subject: string };

// Prerender only the curated city × subject pairs (never all combinations).
export function generateStaticParams(): Params[] {
  return intersectionParams;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const x = getIntersection(params.city, params.subject);
  if (!x) return {};
  return buildMetadata({
    title: x.metaTitle,
    description: x.metaDescription,
    path: `/tutoring/${x.citySlug}/${x.subject}`
  });
}

export default function CitySubjectPage({ params }: { params: Params }) {
  const x = getIntersection(params.city, params.subject);
  if (!x) notFound();

  const subject = getSubject(x.subjectSlug);
  const location = getLocation(x.citySlug);
  if (!subject || !location) notFound();

  const path = `/tutoring/${x.citySlug}/${x.subject}`;
  // Same subject, other cities — sibling intersection links.
  const otherCities = intersectionsForSubjectSlug(x.subjectSlug).filter(
    (i) => i.citySlug !== x.citySlug
  );

  // Service (subject + areaServed=city) + FAQPage + BreadcrumbList in one graph.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: subject.serviceType,
        name: `${subject.subject} Tutoring in ${location.city} — PAL's Academy`,
        description: x.metaDescription,
        url: siteUrl(path),
        areaServed: { "@type": "City", name: location.city },
        provider: {
          "@type": "EducationalOrganization",
          name: "PAL's Academy",
          url: siteUrl("/")
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "CAD",
          lowPrice: "375",
          highPrice: "1125",
          offerCount: 3,
          availability: "https://schema.org/InStock",
          url: siteUrl("/pricing")
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: x.faqs.map(({ q, a }) => ({
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
          {
            "@type": "ListItem",
            position: 3,
            name: `${location.city} Tutoring`,
            item: siteUrl(`/tutoring/${location.slug}`)
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${subject.subject} Tutoring in ${location.city}`,
            item: siteUrl(path)
          }
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
              <Link
                href={`/tutoring/${location.slug}`}
                className="transition-colors hover:text-gold-300"
              >
                {location.city}
              </Link>
              <span className="px-2 text-gold-300/60">/</span>
              <span className="text-ink-100/90">{subject.subject}</span>
            </nav>
            <div className="eyebrow text-gold-300">
              Online · {location.city} · {subject.subject}
            </div>
            <h1 className="display mt-6 max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              {x.h1}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-ink-100/90">
              {x.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
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

      {/* WHAT WE COVER */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="eyebrow">What we cover</div>
            <h2 className="display mt-4 max-w-3xl text-4xl text-ink-800 sm:text-5xl">
              {subject.subject} in {location.city}, by course code.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subject.topics.map((t) => (
              <StaggerItem key={t}>
                <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ivory-50 p-5 transition-colors hover:border-gold-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span className="text-sm text-ink-700">{t}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* WHY IT MATTERS HERE */}
      <section className="relative overflow-hidden bg-ink-50 py-24">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <div className="eyebrow">Why it matters in {location.city}</div>
                <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">{subject.whyTitle}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                {subject.whyBody.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* local grounding: boards + universities for this city */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-ivory p-7">
              <div className="flex items-center gap-3 text-ink-800">
                <MapPin className="h-5 w-5 text-gold-500" />
                <h3 className="font-serif text-xl">School boards in {location.city}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {location.boards.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-ivory p-7">
              <div className="flex items-center gap-3 text-ink-800">
                <GraduationCap className="h-5 w-5 text-gold-500" />
                <h3 className="font-serif text-xl">Where {location.city} students aim</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {location.universities.map((u) => (
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

      {/* FAQ */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">Common questions</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                {subject.subject} tutoring in {location.city}, answered.
              </h2>
            </div>
          </Reveal>
          <Stagger className="mx-auto mt-12 grid max-w-3xl gap-5">
            {x.faqs.map(({ q, a }) => (
              <StaggerItem key={q}>
                <article className="rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-colors hover:border-gold-300">
                  <h3 className="font-serif text-xl text-ink-800">{q}</h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{a}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* GO DEEPER — internal linking */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="eyebrow">Go deeper</div>
            <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">Explore more</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <Link
                href={`/subjects/${subject.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
              >
                <div className="eyebrow">All of the GTA</div>
                <h3 className="mt-4 font-serif text-2xl text-ink-800">
                  {subject.subject} tutoring
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  The full {subject.subject.toLowerCase()} programme, course by course.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link
                href={`/tutoring/${location.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
              >
                <div className="eyebrow">{location.region}</div>
                <h3 className="mt-4 font-serif text-2xl text-ink-800">
                  All {location.city} tutoring
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Every subject we tutor for {location.city} students, Grade 9–12 and university.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
            {otherCities.map((o) => {
              const oLoc = getLocation(o.citySlug);
              if (!oLoc) return null;
              return (
                <StaggerItem key={o.citySlug}>
                  <Link
                    href={intersectionPath(o)}
                    className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                  >
                    <div className="eyebrow">{oLoc.region}</div>
                    <h3 className="mt-4 font-serif text-2xl text-ink-800">
                      {subject.subject} tutor {oLoc.city}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {subject.subject} tutoring for {oLoc.city} students, online.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display text-4xl sm:text-5xl">Start with a free consultation.</h2>
              <p className="mx-auto mt-6 max-w-xl text-ink-200">
                A short, honest conversation about where the gap in {subject.subject.toLowerCase()}{" "}
                actually is — and a weekly plan your {location.city} student can act on. No pressure,
                no pitch.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/booking" className="btn btn-gold group">
                  Book your free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href={`/tutoring/${location.slug}`} className="btn btn-ghost-dark">
                  All {location.city} subjects
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
