import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Clock, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";
import { getArticle, articleSlugs } from "@/lib/articles-content";

type Params = { slug: string };

// Prerender every article at build time.
export function generateStaticParams(): Params[] {
  return articleSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return buildMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/blog/${a.slug}`
  });
}

// Parse inline [label](/path) markdown links into nodes. Internal links (those
// starting with "/") use next/link; everything else renders as plain text.
const LINK_RE = /\[([^\]]+)\]\((\/[^)]+)\)/g;

function renderParagraph(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <Link
        key={`${m.index}-${m[2]}`}
        href={m[2]}
        className="font-medium text-gold-600 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ArticlePage({ params }: { params: Params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const path = `/blog/${a.slug}`;
  const related = a.relatedArticles
    .map((slug) => getArticle(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: a.title,
        description: a.metaDescription,
        url: siteUrl(path),
        datePublished: a.publishedISO,
        dateModified: a.publishedISO,
        articleSection: a.category,
        inLanguage: "en-CA",
        image: siteUrl("/og"),
        author: { "@type": "Organization", name: SITE_NAME, url: siteUrl("/") },
        publisher: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          url: siteUrl("/"),
          logo: { "@type": "ImageObject", url: siteUrl("/logo-mark.svg") }
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": siteUrl(path) }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Guides", item: siteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: a.title, item: siteUrl(path) }
        ]
      }
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* HEADER */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-100/70">
              <Link href="/blog" className="transition-colors hover:text-gold-300">
                Guides
              </Link>
              <span className="px-2 text-gold-300/60">/</span>
              <span className="text-ink-100/90">{a.category}</span>
            </nav>
            <div className="eyebrow text-gold-300">{a.eyebrow}</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl">
              {a.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-100/70">
              <time dateTime={a.publishedISO}>{a.publishedLabel}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold-300/70" />
                {a.readMinutes} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <section className="relative bg-ivory py-20">
        <div className="container-luxe">
          <article className="mx-auto max-w-2xl">
            {/* lead */}
            <div className="space-y-5">
              {a.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-ink-700 first:text-xl first:text-ink-800"
                >
                  {renderParagraph(p)}
                </p>
              ))}
            </div>

            {/* the short version */}
            {a.keyTakeaways && a.keyTakeaways.length > 0 && (
              <div className="mt-12 rounded-2xl border border-ink-100 bg-ivory-50 p-7">
                <div className="eyebrow">The short version</div>
                <ul className="mt-4 space-y-3">
                  {a.keyTakeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* sections */}
            {a.sections.map((s) => (
              <div key={s.heading} className="mt-12">
                <h2 className="font-serif text-3xl text-ink-800">{s.heading}</h2>
                <div className="mt-4 space-y-5">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-ink-600">
                      {renderParagraph(p)}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* related at PAL's */}
            {a.related.length > 0 && (
              <div className="mt-14 rounded-2xl border border-gold-200 bg-gold-50/60 p-7">
                <div className="eyebrow">Related at PAL&rsquo;s Academy</div>
                <ul className="mt-4 space-y-3">
                  {a.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group inline-flex items-center gap-2 text-ink-800 transition-colors hover:text-gold-700"
                      >
                        <ArrowRight className="h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-1" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* back to hub */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-gold-600"
              >
                <ArrowLeft className="h-4 w-4" />
                All guides
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* KEEP READING */}
      {related.length > 0 && (
        <section className="relative bg-ink-50 py-24">
          <div className="container-luxe">
            <Reveal>
              <div className="eyebrow">Keep reading</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">More guides</h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                  >
                    <div className="eyebrow">{r.category}</div>
                    <h3 className="mt-4 font-serif text-2xl text-ink-800">{r.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{r.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                      Read guide
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
              <h2 className="display text-4xl sm:text-5xl">Start with a free consultation.</h2>
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
