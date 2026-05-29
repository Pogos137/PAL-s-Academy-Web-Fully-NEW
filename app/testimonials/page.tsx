import type { Metadata } from "next";
import Link from "next/link";
import { Quote, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Parent & Student Testimonials",
  description:
    "What families across the GTA say about PAL's Academy — grade jumps, confidence rebuilt, university doors opened.",
  alternates: { canonical: "/testimonials" }
};

const featured = {
  quote:
    "We tried two tutoring companies before PAL's. The difference was night and day — same tutor every week, a real plan, and a parent recap that actually told us what to do at home.",
  name: "Mei L.",
  detail: "Parent · Markham · Grade 11 → Grade 12"
};

const testimonials = [
  {
    quote:
      "Jumped from a 72 in Functions to a 94 in Calculus the next term. My tutor explained things the way I think, not the way the textbook is written.",
    name: "Jordan A.",
    detail: "Student · MCV4U",
    rating: 5
  },
  {
    quote:
      "First-year Chem at U of T was destroying me. I walked into the final calm for the first time all year.",
    name: "Sofia D.",
    detail: "Student · 1st-yr University",
    rating: 5
  },
  {
    quote:
      "What I appreciated most was the honesty. They told me in week two my son needed to redo Grade 10 math before they could properly support Grade 11. That kind of straight talk is rare.",
    name: "Daniel K.",
    detail: "Parent · Vaughan",
    rating: 5
  },
  {
    quote:
      "The weekly rhythm changed everything. My daughter stopped panicking the night before tests because she knew her tutor was going to walk her through it on Sunday.",
    name: "Priya N.",
    detail: "Parent · Mississauga",
    rating: 5
  },
  {
    quote:
      "I came in hating French. I left writing my Grade 12 oral exam without notes. Worth every dollar.",
    name: "Theo M.",
    detail: "Student · FSF4U",
    rating: 5
  },
  {
    quote:
      "Their tutor helped my son with his university applications on top of physics. We got into Waterloo Eng. I will never stop recommending them.",
    name: "Reema H.",
    detail: "Parent · Etobicoke",
    rating: 5
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
            <div className="eyebrow text-gold-300">In their own words</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              The reviews we&rsquo;d show our own families.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Real quotes from parents and students across the GTA. Some names abbreviated
              for privacy. No incentives, ever, in exchange for a review.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-3xl border border-ink-100 bg-ivory-50 p-12 shadow-luxe lg:p-20">
              <Quote className="h-12 w-12 text-gold-400" />
              <p className="mt-8 font-serif text-3xl leading-snug text-ink-800 sm:text-4xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold-200 to-gold-500" />
                <div>
                  <div className="font-medium text-ink-800">{featured.name}</div>
                  <div className="text-xs uppercase tracking-wider2 text-ink-400">
                    {featured.detail}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GRID */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="eyebrow mx-auto justify-center">More from the families</div>
              <h2 className="display mt-6 text-4xl text-ink-800 sm:text-5xl">
                A quiet pile of grade jumps.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <article className="card-luxe h-full">
                  <div className="flex items-center gap-1 text-gold-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold-100 to-gold-400" />
                    <div>
                      <div className="text-sm font-medium text-ink-800">{t.name}</div>
                      <div className="text-[11px] uppercase tracking-wider2 text-ink-400">
                        {t.detail}
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative text-center">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">Your story, written next.</h2>
            <Link href="/booking" className="btn btn-gold mt-10">
              Book your free consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
