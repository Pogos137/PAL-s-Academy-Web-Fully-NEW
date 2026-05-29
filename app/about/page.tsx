import type { Metadata } from "next";
import Link from "next/link";
import { Compass, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "About",
  description:
    "PAL's Academy is a private tutoring practice for ambitious Grade 9–12 and first-year university students across the Greater Toronto Area.",
  alternates: { canonical: "/about" }
};

const principles = [
  {
    icon: ShieldCheck,
    title: "One tutor. One plan.",
    body: "Every student is matched to a single verified tutor and follows a single weekly plan that survives the term. No rotating roster, no reset every month."
  },
  {
    icon: Compass,
    title: "Diagnose before we teach.",
    body: "Every engagement begins with a written diagnostic. We don't fix what isn't broken, and we don't paper over root-cause gaps with surface-level practice."
  },
  {
    icon: GraduationCap,
    title: "Hired for who they are.",
    body: "Tutors are interviewed for mastery of subject, calm in delivery, and follow-through with parents — not just transcripts. We turn away most applicants."
  },
  {
    icon: Sparkles,
    title: "Measured. Reported. Honest.",
    body: "Parents receive a monthly recap covering progress, gaps closed, and the next focus. We tell you what's working and what isn't — both equally."
  }
];

const facts = [
  { stat: "150+", label: "students served to date" },
  { stat: "92%", label: "of students lift one full letter grade" },
  { stat: "4.9/5", label: "average parent rating" },
  { stat: "<7%", label: "tutor acceptance rate" }
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">About PAL&rsquo;s Academy</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              A small academy, built around a single standard of care.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              PAL&rsquo;s Academy is a private tutoring practice serving ambitious Grade 9–12
              and first-year university students across the Greater Toronto Area. We exist
              because most tutoring is a marketplace — and a marketplace has no standards.
              Families deserve more than that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <div className="eyebrow">Our mission</div>
              <h2 className="display mt-5 text-4xl text-ink-800 sm:text-5xl">
                To make excellent tutoring{" "}
                <span className="text-gradient-gold italic">quietly reliable</span> — for
                every student we accept.
              </h2>
              <p className="mt-6 text-ink-600">
                We believe most students don&rsquo;t need a hack, a worksheet pack, or another
                app. They need calm, repeated hours with one person who&rsquo;s mastered the
                material, a weekly rhythm that survives midterms, and a parent kept honestly
                in the loop. That&rsquo;s the whole product. We&rsquo;ve built the academy to
                deliver that — and only that — well.
              </p>
              <p className="mt-4 text-ink-600">
                Every package we offer shares the same standard: verified tutors, lesson notes
                after every session, and a monthly written recap to parents. The only thing
                that changes between plans is cadence.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-10 shadow-luxe">
              <p className="font-serif text-2xl leading-snug text-ink-800">
                &ldquo;We charge for the boring discipline of doing it the same way every
                week. Same tutor. Same plan. Same parent recap. That&rsquo;s what actually
                lifts a grade — not a clever trick.&rdquo;
              </p>
              <div className="gold-rule mt-8" />
              <div className="mt-4 text-xs uppercase tracking-wider2 text-ink-500">
                Founder · PAL&rsquo;s Academy
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="eyebrow justify-center">How we operate</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Four standards we will not bend.
              </h2>
            </div>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="card-luxe h-full">
                  <div className="inline-flex rounded-xl border border-gold-200 bg-gold-50 p-3 text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-ink-800">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FACTS */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-ink-100 bg-ivory-50 px-8 py-12 sm:grid-cols-2 sm:px-12 lg:grid-cols-4">
              {facts.map(({ stat, label }) => (
                <div key={label}>
                  <div className="font-serif text-5xl text-gradient-gold">{stat}</div>
                  <div className="mt-2 text-xs uppercase tracking-wider2 text-ink-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="relative bg-ivory pb-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow">Who we serve</div>
              <h2 className="display mt-5 text-3xl text-ink-800 sm:text-4xl">
                Built for ambitious families across the GTA.
              </h2>
              <p className="mt-5 text-ink-600">
                Our students are Grade 9 through 12 and first-year university. They&rsquo;re
                preparing for IB, AP, university applications, or simply the kind of marks
                that keep options open. Sessions take place online via Google Meet — the same
                standard of care, whether you&rsquo;re in Etobicoke or East York.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="eyebrow">What we don&rsquo;t do</div>
              <h2 className="display mt-5 text-3xl text-ink-800 sm:text-4xl">
                The things we&rsquo;ve chosen not to be.
              </h2>
              <p className="mt-5 text-ink-600">
                We are not a tutor marketplace, a homework hotline, or a last-minute exam
                emergency room. We don&rsquo;t take on more students than our tutors can hold
                with care, and we don&rsquo;t accept families we can&rsquo;t genuinely help.
                The free consultation is where both sides decide.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative text-center">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">
              Talk to us about your student.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-200">
              20 minutes. Honest diagnosis. A plan you could start Monday — even if you
              don&rsquo;t book with us.
            </p>
            <Link href="/booking" className="btn btn-gold mt-10">
              Book free consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
