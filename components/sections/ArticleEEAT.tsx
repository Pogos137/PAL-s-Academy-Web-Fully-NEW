import Link from "next/link";
import { ShieldCheck } from "lucide-react";

/**
 * EEAT signals for blog posts (see SEO/AEO audit, June 2026).
 *
 * `ArticleByline` is the visible authorship line shown in the article header.
 * `ArticleExpertise` is the credential footer rendered at the end of every post.
 *
 * Both state only what is true and documented elsewhere on the site (the tutor
 * vetting standard mirrors /faq and /careers): PAL's Academy is the
 * organizational author, content is written against the Ontario curriculum by
 * course code, and tutors score 90+ in what they teach. No individual bylines
 * until tutors are onboarded with real, verifiable credentials.
 */

export function ArticleByline() {
  return <span className="text-ink-100/70">By the PAL&rsquo;s Academy team</span>;
}

export function ArticleExpertise() {
  return (
    <aside className="mt-14 rounded-2xl border border-ink-100 bg-ivory-50 p-7">
      <div className="flex items-start gap-4">
        <div className="inline-flex shrink-0 rounded-xl border border-gold-200 bg-gold-50 p-3 text-gold-600">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="eyebrow">About this guide</div>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            Written by the PAL&rsquo;s Academy team, working from the Ontario curriculum by
            course code. Our tutors each scored 90 or above in the courses they teach and are
            interviewed and reference-checked before they meet a student — the same standard
            behind every session we run.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            Have a question about your student&rsquo;s course?{" "}
            <Link
              href="/booking"
              className="font-medium text-gold-600 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
            >
              Book a free consultation
            </Link>{" "}
            or read{" "}
            <Link
              href="/about"
              className="font-medium text-gold-600 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
            >
              how we work
            </Link>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}
