import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What Families Can Expect",
  description:
    "PAL's Academy is a new, deliberately small tutoring practice in the GTA. We're accepting a founding cohort — here's the standard every family can expect, and our honest approach to reviews.",
  path: "/testimonials"
});

// What every family gets — verifiable commitments, not invented quotes. Mirrors
// the standards stated on /about and /faq.
const promises = [
  {
    title: "One tutor, one plan",
    body: "Your student keeps the same verified tutor every week and follows one weekly plan that survives the term — never a rotating roster."
  },
  {
    title: "Built on the Ontario curriculum",
    body: "We work by course code, so tutoring lines up with exactly what your student's teacher is assessing — the same units and expectations as their school."
  },
  {
    title: "A tutor who has mastered the material",
    body: "Every tutor scored 90+ in the course they teach, and is interviewed for clarity and reference-checked before they ever meet a student."
  },
  {
    title: "Notes after every session",
    body: "After each session your tutor sends written lesson notes, so you always know what was covered and what's next — without having to ask."
  },
  {
    title: "A monthly written recap",
    body: "Once a month you receive an honest recap: progress made, gaps closed, and the next focus. We tell you what's working and what isn't, equally."
  },
  {
    title: "An honest consultation first",
    body: "We start with a free 20-minute conversation — and if we're not the right fit for your student, we'll say so. No pressure, no pitch."
  }
];

export default function TestimonialsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Honest from day one</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              We&rsquo;d rather earn your review than write it.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              PAL&rsquo;s Academy is new, and deliberately small. Rather than invent quotes or
              inflate a star rating, we&rsquo;ll show you the standard we hold ourselves to —
              and let our founding families be the first to put it in their own words.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="eyebrow justify-center">What every family can expect</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                The standard, before the stories.
              </h2>
            </div>
          </Reveal>
          <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {promises.map((p) => (
              <StaggerItem key={p.title}>
                <article className="card-luxe h-full">
                  <div className="inline-flex rounded-xl border border-gold-200 bg-gold-50 p-2.5 text-gold-600">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-ink-800">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* HOW REVIEWS WILL WORK */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <Reveal>
              <div>
                <div className="eyebrow">How reviews will work here</div>
                <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                  Real, or not at all.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-ink-600">
                <p className="leading-relaxed">
                  As our founding families finish their first packages, we&rsquo;ll publish their
                  feedback here — in their own words, with first name and last initial only for
                  privacy, and never in exchange for an incentive.
                </p>
                <p className="leading-relaxed">
                  Until then, this page stays honest and empty of quotes. If a tutoring company
                  shows you a wall of perfect five-star reviews on day one, it&rsquo;s worth
                  asking where they came from. We&rsquo;d rather you judge us on the consultation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUNDING COHORT CTA */}
      <section className="relative bg-ivory pb-32 pt-8">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto grid max-w-4xl gap-10 rounded-3xl border border-ink-100 bg-ivory-50 p-12 shadow-luxe lg:grid-cols-[1.3fr_1fr] lg:items-center lg:p-16">
              <div>
                <div className="eyebrow">A founding opportunity</div>
                <h2 className="mt-5 font-serif text-3xl leading-snug text-ink-800 sm:text-4xl">
                  Be one of the first families.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-ink-600">
                  We&rsquo;re accepting a small founding cohort this semester. Founding families
                  receive our full attention, direct access to the founder, and a rate that locks
                  in permanently — and the first word on how this academy is remembered.
                </p>
              </div>
              <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider2 text-gold-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  Limited founding spots
                </div>
                <Link href="/booking" className="btn btn-gold group">
                  Book your free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
