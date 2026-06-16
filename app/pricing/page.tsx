import Link from "next/link";
import {
  Check,
  Clock,
  FileText,
  Gift,
  Info,
  LifeBuoy,
  MessageCircle,
  Repeat,
  Shield,
  Star,
  Users
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import FaqAccordion from "@/components/sections/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing & Packages",
  description:
    "Transparent monthly tutoring prices in the GTA — Starter $200, Core $360, Intensive $480, PAL's Circle $120/mo. Verified tutors, all CAD, cancel any time. Book free.",
  path: "/pricing"
});

type Tier = {
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  sessions: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    tagline: "Try the cadence",
    price: "$200",
    cadence: "/ month",
    sessions: "1 weekly 1-on-1",
    bullets: [
      "Same verified tutor each week",
      "60-min Google Meet sessions",
      "Lesson notes after every call",
      "Cancel any time"
    ],
    cta: "Start with Starter"
  },
  {
    name: "Core",
    tagline: "The signature plan",
    price: "$360",
    cadence: "/ month",
    sessions: "2 weekly 1-on-1",
    bullets: [
      "Same verified tutor each week",
      "Mid-month parent check-in",
      "Priority scheduling for tests",
      "Best value per session"
    ],
    cta: "Start with Core",
    highlight: true
  },
  {
    name: "Intensive",
    tagline: "For ambitious goals",
    price: "$480",
    cadence: "/ month",
    sessions: "3 weekly 1-on-1",
    bullets: [
      "Same tutor, locked schedule",
      "Weekly written progress note",
      "Exam-prep mode at term-end",
      "Strongest grade lift, fastest"
    ],
    cta: "Start Intensive"
  }
];

// PAL's Circle lives in its own section below the 1-on-1 trio (it is an
// entry-point group option, not a peer of the premium 1:1 plans) but is still
// included in the pricing structured data below.
const circle: Tier = {
  name: "PAL's Circle",
  tagline: "Group sessions",
  price: "$120",
  cadence: "/ month",
  sessions: "1 weekly group of 3–4",
  bullets: [
    "Same subject & grade level",
    "Curated, capped at 4 students",
    "Collaborative learning + accountability",
    "Lowest entry point to the academy"
  ],
  cta: "Join a Circle"
};

const perks = [
  {
    icon: MessageCircle,
    name: "On-Call",
    price: "+$30 / month",
    body: "Your tutor responds to student messages outside session hours, within 24 hours."
  },
  {
    icon: Shield,
    name: "Exam Shield",
    price: "+$45 / month",
    body: "One 90-minute emergency exam-prep session, bookable with 48 hours notice."
  },
  {
    icon: FileText,
    name: "Progress Pulse",
    price: "+$15 / month",
    body: "A monthly written progress report covering performance, gaps closed, and next focus."
  },
  {
    icon: LifeBuoy,
    name: "Priority Booking",
    price: "+$20 / month",
    body: "Book one extra session within 72 hours notice — for when life or exams escalate."
  },
  {
    icon: Repeat,
    name: "Flex Reschedule",
    price: "+$15 / month",
    body: "Reschedule a session with as little as 12 hours notice, up to twice per month."
  }
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Private tutoring",
  name: "Private Tutoring — PAL's Academy",
  provider: {
    "@type": "EducationalOrganization",
    name: "PAL's Academy",
    url: siteUrl("/")
  },
  areaServed: "Greater Toronto Area",
  url: siteUrl("/pricing"),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tutoring Packages",
    itemListElement: [...tiers, circle].map((t) => ({
      "@type": "Offer",
      name: t.name,
      description: `${t.sessions} — ${t.tagline}`,
      price: t.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "CAD",
      url: siteUrl("/pricing"),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: t.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "CAD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON"
        }
      }
    }))
  }
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Honest, monthly pricing</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Honest pricing. <span className="text-gold-300 italic">No contracts, no surprises.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Three core 1-on-1 plans plus a small-group Circle. The same verified tutors, the
              same standard of care across every plan — only cadence changes. Add PAL&rsquo;s
              Plus perks to fit your week.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIERS — leave breathing room above for the floating badge */}
      <section className="relative bg-ivory pt-20 pb-24">
        <div className="container-luxe">
          <Reveal>
            <p className="mx-auto mb-14 max-w-xl text-center text-sm italic text-ink-500">
              Not sure where to start? Core is the plan we recommend most — two sessions a week
              is usually enough to move a grade, without overcommitting before you&rsquo;ve seen
              the results.
            </p>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((t) => (
              <StaggerItem key={t.name}>
                <div
                  className={
                    "relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 " +
                    (t.highlight
                      ? "mt-8 border-gold-300 bg-ink-900 text-ivory shadow-luxe hover:-translate-y-1 md:mt-0"
                      : "border-ink-100 bg-ivory-50 text-ink-800 hover:border-gold-300 hover:shadow-luxe")
                  }
                >
                  {t.highlight && (
                    <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-ink-900 shadow-md">
                      <Star className="h-3 w-3" /> Most chosen
                    </span>
                  )}
                  <div className={"eyebrow " + (t.highlight ? "text-gold-300" : "")}>
                    {t.tagline}
                  </div>
                  <h3 className="mt-4 font-serif text-3xl">{t.name}</h3>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span
                      className={
                        "font-serif text-5xl " +
                        (t.highlight ? "text-gold-300" : "text-ink-800")
                      }
                    >
                      {t.price}
                    </span>
                    <span className={t.highlight ? "text-ink-200" : "text-ink-400"}>
                      {t.cadence}
                    </span>
                  </div>
                  <div
                    className={
                      "mt-1 text-xs uppercase tracking-wider2 " +
                      (t.highlight ? "text-gold-300" : "text-ink-400")
                    }
                  >
                    {t.sessions}
                  </div>

                  <ul className="mt-7 space-y-3 text-sm">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check
                          className={
                            "mt-0.5 h-4 w-4 shrink-0 " +
                            (t.highlight ? "text-gold-300" : "text-gold-500")
                          }
                        />
                        <span className={t.highlight ? "text-ink-100" : "text-ink-600"}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 mt-auto pt-6">
                    <Link
                      href="/booking"
                      className={"btn w-full " + (t.highlight ? "btn-gold" : "btn-ink")}
                    >
                      {t.cta}
                    </Link>
                    <p
                      className={
                        "mt-3 text-center text-[11px] " +
                        (t.highlight ? "text-ink-300" : "text-ink-400")
                      }
                    >
                      Cancel any time. No contracts. No lock-in.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Urgency note — honest capacity constraint (#14) */}
          <Reveal>
            <div className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-xl border border-gold-300 bg-gold-50/60 px-5 py-4 text-sm text-ink-700">
              <Info className="mt-0.5 h-4 w-4 flex-none text-gold-600" aria-hidden="true" />
              <p>
                Tutor availability is limited. Booking a free consultation holds your spot in the
                matching queue — sessions begin once your tutor is matched.
              </p>
            </div>
          </Reveal>

          {/* Referral callout — promoted out of the fine print (#8) */}
          <Reveal>
            <div className="mx-auto mt-6 flex max-w-2xl items-start gap-4 rounded-2xl border border-[#114E40]/15 bg-[#E1F5EE] px-6 py-5">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#114E40]" />
              <p className="text-sm leading-relaxed text-ink-700">
                <span className="font-medium text-ink-800">Refer a family</span> and receive one
                complimentary session — applied to your next billing cycle automatically.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAL'S PLUS ADD-ONS */}
      <section className="relative overflow-hidden bg-ink-50 py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow justify-center">PAL&rsquo;s Plus</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Add only what{" "}
                <span className="text-gold-600 italic">moves the needle.</span>
              </h2>
              <p className="mt-5 text-ink-600">
                Most families who add perks take the bundle. Everything is month-to-month —
                pause or remove at any time.
              </p>
            </div>
          </Reveal>

          {/* PRIMARY — the bundle */}
          <Reveal>
            <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl border-2 border-gold-300 bg-ivory shadow-luxe">
              <div className="grid gap-8 p-8 sm:grid-cols-[1.4fr_1fr] sm:items-center sm:p-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider2 text-ink-900">
                    <Star className="h-3 w-3" /> Most families add this
                  </div>
                  <h3 className="mt-4 font-serif text-3xl text-ink-800">PAL&rsquo;s Plus Bundle</h3>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    {[
                      "On-Call — tutor replies between sessions",
                      "Exam Shield — one emergency exam-prep session",
                      "Progress Pulse — monthly written report"
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3 text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end sm:text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-5xl text-gold-600">+$75</span>
                    <span className="text-ink-400">/ month</span>
                  </div>
                  <div className="text-sm text-ink-500 line-through">$90 individually</div>
                  <span className="mt-1 rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider2 text-gold-700">
                    Save $15 vs choosing individually
                  </span>
                  <Link href="/booking" className="btn btn-gold mt-5 w-full sm:w-auto">
                    Add the bundle
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* SECONDARY — individual add-ons, reduced visual weight */}
          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="text-center text-[11px] uppercase tracking-wider2 text-ink-400">
                Or add individually
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {perks.map(({ icon: Icon, name, price, body }) => (
                  <div
                    key={name}
                    className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ivory p-4"
                  >
                    <div className="rounded-lg border border-gold-200 bg-gold-50 p-2 text-gold-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-serif text-lg text-ink-800">{name}</span>
                        <span className="text-[10px] uppercase tracking-wider2 text-gold-600">
                          {price}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-ink-500">
                Not sure which to add? We&rsquo;ll recommend the right combination during your{" "}
                <Link
                  href="/booking"
                  className="font-medium text-gold-600 underline-offset-4 hover:underline"
                >
                  free consultation
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESCHEDULING POLICY */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div>
              <div className="eyebrow">Rescheduling policy</div>
              <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">
                Life happens. The plan flexes.
              </h2>
              <p className="mt-5 max-w-xl text-ink-600">
                Every student gets standard rescheduling free. For families whose weeks shift
                often, Flex Reschedule gives a wider runway.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2 lg:w-[520px]">
              <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
                  <Clock className="h-4 w-4" /> Standard · included
                </div>
                <h3 className="mt-3 font-serif text-xl text-ink-800">48-hour notice</h3>
                <p className="mt-2 text-sm text-ink-600">
                  Reschedule freely with at least 48 hours notice. Less than 48 hours and the
                  session is forfeited for that week.
                </p>
              </div>
              <div className="rounded-2xl border border-gold-300 bg-gradient-to-br from-ivory-50 to-gold-50 p-6">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-700">
                  <Repeat className="h-4 w-4" /> Flex · +$15/mo
                </div>
                <h3 className="mt-3 font-serif text-xl text-ink-800">12-hour notice</h3>
                <p className="mt-2 text-sm text-ink-600">
                  Reschedule with as little as 12 hours notice, up to twice per month — for
                  weeks that simply won&rsquo;t cooperate.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GROUP CALLOUT */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="eyebrow text-gold-300">PAL&rsquo;s Circle · Group option</div>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                Not ready for 1-on-1? Start with a Circle.
              </h2>
              <p className="mt-5 max-w-md text-ink-200">
                A curated group of 3–4 students at the same grade and subject — the lowest entry
                point to the PAL&rsquo;s Academy standard, and the kind of room where good
                students push each other into being better ones.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/booking" className="btn btn-gold">
                  Join a Circle
                </Link>
                <Link href="/subjects" className="btn btn-ghost-dark">
                  See subjects offered
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ivory/10 bg-ink-700/50 p-8 backdrop-blur">
              <Users className="h-6 w-6 text-gold-300" />
              <div className="mt-4 font-serif text-2xl">$120 / month per student</div>
              <ul className="mt-6 space-y-3 text-sm text-ink-100">
                {[
                  "1 weekly small-group session",
                  "Same subject and grade level",
                  "Curated cohorts, max 4 students",
                  "Identical tutor screening as 1-on-1"
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 text-gold-300" /> {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — addresses pricing objections before the final commitment */}
      <FaqAccordion
        eyebrow="Pricing questions"
        heading="The questions families ask before they commit."
        tone="ink-50"
      />

      {/* FINE PRINT */}
      <section className="relative bg-ivory py-20">
        <div className="container-luxe">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-sm text-ink-500">
              All prices in CAD, billed monthly upfront via Interac e-Transfer (PayPal as
              backup). No sessions are scheduled until payment is confirmed. Cancel any time —
              no contracts, no lock-in.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
