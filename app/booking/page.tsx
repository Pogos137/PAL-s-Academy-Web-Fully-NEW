import Link from "next/link";
import { Calendar, Check, Clock, Lock, Shield } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Calendly from "@/components/sections/Calendly";
import LeadForm from "@/components/sections/LeadForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Free Consultation",
  description:
    "Book a free 20-minute tutoring consultation with PAL's Academy in the GTA. We'll diagnose where the gap really is and outline a weekly plan — no pressure, no pitch.",
  path: "/booking"
});

const guarantees = [
  { icon: Clock, label: "20 minutes" },
  { icon: Shield, label: "No pitch" },
  { icon: Calendar, label: "Pick your slot" },
  { icon: Lock, label: "Private call" }
];

const stack = [
  "A real diagnosis of where your student is actually losing marks",
  "A weekly plan you could start Monday — even without us",
  "A tutor match preview based on subject, temperament, and schedule",
  "Transparent pricing and the perks bundled into our packages"
];

export default function BookingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || null;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Free 20-minute consultation</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl text-ivory sm:text-6xl lg:text-7xl">
              One short call. A grade plan that already works.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-100/90">
              You walk away with a clear diagnosis, a weekly plan, and a tutor preview —
              whether you book with us or not. That&rsquo;s the trade.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory/10 pt-8 text-ivory/90">
            {guarantees.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 text-gold-300" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE STACK + LEAD FORM */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <div className="eyebrow">What you get on the call</div>
              <h2 className="display mt-6 text-4xl text-ink-800 sm:text-5xl">
                A short conversation that&rsquo;s worth the time, every time.
              </h2>
              <ul className="mt-8 space-y-4">
                {stack.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-gold-50">
                      <Check className="h-3 w-3 text-gold-600" />
                    </span>
                    <span className="text-ink-600">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-6">
                <div className="eyebrow">A note from the founder</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Most families call us after trying two or three things that didn&rsquo;t
                  stick. The reason this works is boring: same tutor, every week, with a
                  plan we revisit. The call is where we figure out whether that&rsquo;s
                  what your student actually needs.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink-100 bg-ivory-50 p-8 shadow-luxe sm:p-10">
              <div className="text-[10px] uppercase tracking-wider2 text-gold-500">Step 1</div>
              <h3 className="mt-2 font-serif text-3xl text-ink-800">Tell us about your student</h3>
              <p className="mt-2 text-sm text-ink-500">
                We read every reply personally. Takes about 60 seconds.
              </p>
              <div className="mt-6">
                <LeadForm source="booking" />
              </div>
              <p className="mt-6 text-center text-sm text-ink-500">
                Prefer to call? Reach us at{" "}
                <a
                  href="tel:+14377774828"
                  className="font-medium text-gold-600 underline-offset-4 hover:underline"
                >
                  (437) 777-4828
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CALENDLY */}
      <section className="relative bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[10px] uppercase tracking-wider2 text-gold-500">Step 2</div>
              <h2 className="display mt-2 text-4xl text-ink-800 sm:text-5xl">
                Choose a time that fits your week.
              </h2>
              <p className="mt-4 text-ink-500">
                All times in your local timezone. You can reschedule with one click.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-4xl">
              <Calendly url={calendlyUrl} />
              <p className="mt-4 text-center text-xs text-ink-400">
                Powered by Calendly · Calls happen on Google Meet
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAY/PACKAGE TEASER */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow text-gold-300">Ready to skip the call?</div>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                Already sure? Reserve your tutor today.
              </h2>
              <p className="mt-4 max-w-md text-ink-200">
                If you already know what your student needs, you can lock in a package and
                start within the week. We&rsquo;ll match the tutor inside 48 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn btn-gold">
                  View packages
                </Link>
                <Link href="/testimonials" className="btn btn-ghost-dark">
                  Read parent stories
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ivory/10 bg-ink-700/50 p-8 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="font-serif text-2xl">Quarterly Plan</div>
                <span className="rounded-full border border-gold-300 px-3 py-1 text-[10px] uppercase tracking-wider2 text-gold-300">
                  Most chosen
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-ink-100">
                {[
                  "12 weekly 60-min sessions",
                  "Same verified tutor throughout",
                  "Monthly parent recap",
                  "Bonus perks discussed at consultation"
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 text-gold-300" /> {l}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="btn btn-gold mt-8 w-full">
                See pricing & checkout
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
