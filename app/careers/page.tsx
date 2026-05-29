import type { Metadata } from "next";
import { BookOpenCheck, Briefcase, Coins, HeartHandshake, Clock4, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import TutorApplicationForm from "@/components/sections/TutorApplicationForm";

export const metadata: Metadata = {
  title: "Careers — Become a PAL's Academy Tutor",
  description:
    "Join PAL's Academy as a verified tutor. Competitive pay, flexible weekly hours, ambitious students, and a teaching culture you'll be proud of.",
  alternates: { canonical: "/careers" }
};

const expectations = [
  {
    icon: BookOpenCheck,
    title: "Subject mastery, demonstrated",
    body: "You've earned 90+ in the subject you teach (or its university equivalent) and can explain it three different ways without hesitating."
  },
  {
    icon: HeartHandshake,
    title: "Patience as a craft",
    body: "You can sit with a student through confusion without rushing. You treat 16-year-olds like serious adults."
  },
  {
    icon: Clock4,
    title: "Weekly reliability",
    body: "You commit to a fixed weekly schedule with the families we match you to. No cancellations except in real emergencies."
  },
  {
    icon: ShieldCheck,
    title: "Vulnerable Sector Check",
    body: "We require a current Vulnerable Sector Police Check before your first session. We help you obtain it."
  }
];

const perks = [
  { icon: Coins, title: "Competitive hourly rate", body: "Tutors are paid above market for the GTA, weekly." },
  { icon: Briefcase, title: "Real coaching", body: "Pedagogy training, peer review, and a teaching playbook you'll actually use." },
  { icon: HeartHandshake, title: "Aligned families", body: "Pre-qualified students whose parents respect your time and expertise." }
];

export default function CareersPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Careers at PAL&rsquo;s Academy</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Teach for the kind of academy{" "}
              <span className="text-gradient-gold italic">you wish you&rsquo;d had.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              We&rsquo;re building a small, exacting roster of tutors for Grade 9–12 and
              first-year university students across the GTA. If you teach with patience
              and precision, we&rsquo;d like to meet you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPECTATIONS */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="max-w-2xl">
              <div className="eyebrow">What we expect</div>
              <h2 className="display mt-6 text-4xl text-ink-800 sm:text-5xl">
                The bar, made plain.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {expectations.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="card-luxe h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300 bg-gold-50 text-gold-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-ink-800">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PERKS */}
      <section className="relative bg-ink-900 py-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="max-w-2xl">
              <div className="eyebrow text-gold-300">What you get</div>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                We treat tutors the way we ask them to treat students.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {perks.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="card-dark h-full">
                  <Icon className="h-6 w-6 text-gold-300" />
                  <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="relative bg-ivory py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <div className="eyebrow">Apply</div>
              <h2 className="display mt-6 text-4xl text-ink-800 sm:text-5xl">
                The application.
              </h2>
              <p className="mt-6 text-ink-600">
                Takes about 6 minutes. We read every submission personally. If it&rsquo;s a
                fit, you&rsquo;ll hear from us within 7 business days to schedule a
                30-minute teaching interview.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-ink-500">
                <li>· Be honest about availability — we plan tutor rosters quarterly.</li>
                <li>· Specific examples beat polished phrasing.</li>
                <li>· If you don&rsquo;t have a Vulnerable Sector Check yet, apply anyway.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink-100 bg-ivory-50 p-8 shadow-luxe sm:p-10">
              <TutorApplicationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
