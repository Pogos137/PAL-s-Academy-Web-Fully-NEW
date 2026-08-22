import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getSubject, subjectSlugs } from "@/lib/subjects-content";
import { getLocation } from "@/lib/locations-content";
import { intersectionsForSubjectSlug, intersectionPath } from "@/lib/intersections-content";

type Params = { subject: string };

// Prerender all subject pages at build time.
export function generateStaticParams(): Params[] {
  return subjectSlugs.map((subject) => ({ subject }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = getSubject(params.subject);
  if (!s) return {};
  return buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/subjects/${s.slug}`
  });
}

export default function SubjectPage({ params }: { params: Params }) {
  const s = getSubject(params.subject);
  if (!s) notFound();

  const path = `/subjects/${s.slug}`;
  const related = s.related
    .map((slug) => getSubject(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  // City × subject intersection pages that target this subject (e.g. chemistry
  // → /tutoring/toronto/chemistry). Drives subject → high-intent local pages.
  const cityLinks = intersectionsForSubjectSlug(s.slug);

  // Service + FAQPage + BreadcrumbList in one graph for this page.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: s.serviceType,
        name: `${s.subject} Tutoring — PAL's Academy`,
        description: s.metaDescription,
        url: siteUrl(path),
        areaServed: "Greater Toronto Area",
        provider: {
          "@type": "EducationalOrganization",
          name: "PAL's Academy",
          url: siteUrl("/")
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Subjects", item: siteUrl("/subjects") },
          { "@type": "ListItem", position: 3, name: `${s.subject} Tutoring`, item: siteUrl(path) }
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
              <Link href="/subjects" className="transition-colors hover:text-gold-300">
                Subjects
              </Link>
              <span className="px-2 text-gold-300/60">/</span>
              <span className="text-ink-100/90">{s.subject}</span>
            </nav>
            <div className="eyebrow text-gold-300">{s.eyebrow}</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              {s.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">{s.heroIntro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/booking" className="btn btn-gold group">
                Book free consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn btn-ghost-dark">
                Talk to us
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
              {s.subject}, by course code.
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.topics.map((t) => (
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

      {/* WHY IT MATTERS */}
      <section className="relative overflow-hidden bg-ink-50 py-24">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <div className="eyebrow">Why it matters</div>
                <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">{s.whyTitle}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                {s.whyBody.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT CHANGES — outcome cards */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">What changes</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Real understanding, <span className="text-gold-300 italic">not a quick patch.</span>
              </h2>
            </div>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {s.outcomes.map((o, i) => (
              <StaggerItem key={o.title}>
                <div className="card-luxe h-full">
                  <div className="font-serif text-3xl text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-ink-800">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{o.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">Common questions</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                {s.subject} tutoring, answered.
              </h2>
            </div>
          </Reveal>
          <Stagger className="mx-auto mt-12 grid max-w-3xl gap-5">
            {s.faqs.map(({ q, a }) => (
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

      {/* TUTORING BY CITY — city × subject intersection links */}
      {cityLinks.length > 0 && (
        <section className="relative bg-ink-50 py-24">
          <div className="container-luxe">
            <Reveal>
              <div className="eyebrow">{s.subject} tutoring by city</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                {s.subject} tutoring across the GTA
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {cityLinks.map((c) => {
                const loc = getLocation(c.citySlug);
                if (!loc) return null;
                return (
                  <StaggerItem key={c.citySlug}>
                    <Link
                      href={intersectionPath(c)}
                      className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                    >
                      <div className="eyebrow">{loc.region}</div>
                      <h3 className="mt-4 font-serif text-2xl text-ink-800">
                        {s.subject} tutor {loc.city}
                      </h3>
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
      )}

      {/* RELATED SUBJECTS — internal linking */}
      {related.length > 0 && (
        <section className="relative bg-ivory py-24">
          <div className="container-luxe">
            <Reveal>
              <div className="eyebrow">Explore more subjects</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">Often paired with</h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/subjects/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                  >
                    <div className="eyebrow">{r.eyebrow}</div>
                    <h3 className="mt-4 font-serif text-2xl text-ink-800">{r.subject} tutoring</h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                      Explore
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
                you can act on. No pressure, no pitch.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/booking" className="btn btn-gold group">
                  Book your free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/subjects" className="btn btn-ghost-dark">
                  See all subjects
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
