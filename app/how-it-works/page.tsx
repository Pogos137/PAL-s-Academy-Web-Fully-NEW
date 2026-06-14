import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import Method from "@/components/sections/Method";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  Sparkles,
  UserCheck,
  Video
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "Four simple steps to measurable grade improvement for GTA students: free consultation, verified tutor matching, weekly online sessions, and visible monthly progress.",
  path: "/how-it-works"
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">The process</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Calm in. Confident out.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              We don&rsquo;t reinvent tutoring. We just do four boring things very, very well.
            </p>
          </Reveal>
        </div>
      </section>

      <Method />

      {/* SECTION A — TUTOR VETTING */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="max-w-2xl">
              <div className="eyebrow">
                <UserCheck className="h-4 w-4" /> How we vet our tutors
              </div>
              <h2 className="display mt-5 text-4xl text-ink-800 sm:text-5xl">
                We don&rsquo;t list tutors. We match them.
              </h2>
              <p className="mt-5 text-ink-600">
                Every tutor passes a three-stage process before they ever meet a student. It is
                deliberately hard to get through — that is the point.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Subject-mastery screening",
                body: "A current educator verifies deep command of the exact course — 90+ in the subject, or its university equivalent, and the ability to explain a concept several different ways."
              },
              {
                n: "02",
                title: "Structured teaching trial",
                body: "A live trial session, not just an interview. We watch how they diagnose a gap, pace an explanation, and keep a hesitant student engaged."
              },
              {
                n: "03",
                title: "Onboarding to our framework",
                body: "Only then are they onboarded to our session structure and progress-tracking system — so every family gets the same standard of care, not a different experience per tutor."
              }
            ].map((s) => (
              <StaggerItem key={s.n}>
                <div className="h-full rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe">
                  <span className="font-serif text-4xl text-gradient-gold">{s.n}</span>
                  <h3 className="mt-5 font-serif text-2xl text-ink-800">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION B — A TYPICAL SESSION */}
      <section className="relative overflow-hidden bg-ink-50 py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <div className="eyebrow">
                <Video className="h-4 w-4" /> What a typical session looks like
              </div>
              <h2 className="display mt-5 text-4xl text-ink-800 sm:text-5xl">
                Sixty focused minutes, every week.
              </h2>
              <p className="mt-5 max-w-md text-ink-600">
                Sessions run live on Google Meet with a shared whiteboard. The shape is the same
                each week, so students always know what to expect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {[
                {
                  t: "First 5 minutes",
                  d: "Review the week — what landed, what didn't, what's coming up on the calendar."
                },
                {
                  t: "Next 45 minutes",
                  d: "Targeted concept work and problem practice on exactly what the student is being assessed on."
                },
                {
                  t: "Final 10 minutes",
                  d: "Set the week's task and send a short session note to parents, so you always know what happened."
                }
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex gap-5 rounded-2xl border border-ink-100 bg-ivory p-6"
                >
                  <div className="shrink-0 text-[11px] font-medium uppercase tracking-wider2 text-gold-600">
                    {row.t}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-600">{row.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION C — PROGRESS REPORT */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">
                <FileText className="h-4 w-4" /> The monthly progress report
              </div>
              <h2 className="display mt-5 text-4xl text-ink-800 sm:text-5xl">
                You always know where your student stands.
              </h2>
              <p className="mt-5 text-ink-600">
                Once a month, parents receive a written progress report. If we are not on track,
                we say so — and we course-correct proactively, before you have to ask.
              </p>
            </div>
          </Reveal>

          <Stagger className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              { h: "Topics covered", b: "Exactly what we worked through, mapped to the course." },
              { h: "Gaps identified", b: "Where the real weaknesses are — and which ones we've closed." },
              { h: "Confidence trajectory", b: "How the student is actually feeling about the subject, not just the marks." },
              { h: "Focus for next month", b: "The plan ahead, tied to upcoming tests, exams, or applications." }
            ].map((item) => (
              <StaggerItem key={item.h}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ink-100 bg-ivory-50 p-6">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <div>
                    <h3 className="font-serif text-xl text-ink-800">{item.h}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.b}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION D — FINAL CTA */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display text-4xl sm:text-5xl">Ready to start?</h2>
              <p className="mx-auto mt-6 max-w-xl text-ink-200">
                The first conversation is free, takes 20 minutes, and leaves you with a clear
                picture of where your student stands.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/booking" className="btn btn-gold group">
                  <Sparkles className="h-4 w-4" />
                  Book your free consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/pricing" className="btn btn-ghost-dark">
                  See pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
