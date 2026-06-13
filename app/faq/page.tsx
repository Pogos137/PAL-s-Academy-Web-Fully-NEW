import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about private tutoring with PAL's Academy in the GTA — pricing, online sessions, Ontario curriculum subjects, tutor vetting, and how to book a free consultation.",
  path: "/faq"
});

// Single source of truth: the visible page and the FAQPage schema below are
// both generated from this array, so they can never drift apart.
const faqs: { q: string; a: string }[] = [
  {
    q: "How much does private tutoring cost in Toronto?",
    a: "PAL's Academy tutoring starts at $120/month for a small-group PAL's Circle and runs from $200/month (Starter, one weekly 1-on-1) to $480/month (Intensive, three weekly 1-on-1). Every plan uses the same verified tutors and is billed monthly in CAD with no lock-in — you can cancel any time."
  },
  {
    q: "Is online tutoring as effective as in-person?",
    a: "For most students, yes. Sessions run live over Google Meet with a shared digital whiteboard, so the tutor and student work through problems together in real time. Going online also lets us match each student to the best tutor for their exact course rather than whoever happens to live nearby — and it removes commute time for busy families across the GTA."
  },
  {
    q: "What subjects do you tutor?",
    a: "We tutor math, sciences, English, French, and computer science for Grade 9–12 and first-year university. That includes Ontario course codes such as MCV4U Calculus & Vectors, MHF4U Advanced Functions, SCH4U Chemistry, SPH4U Physics, SBI4U Biology, ENG4U English, and ICS3U/4U Computer Science, plus first-year university calculus, biology, chemistry, physics, and programming."
  },
  {
    q: "Do you tutor Ontario curriculum courses?",
    a: "Yes. We work directly from the Ontario curriculum by course code, so a student's tutoring lines up with exactly what their teacher is assessing — the same units, expectations, and exam style their school uses."
  },
  {
    q: "How quickly will my child see grade improvement?",
    a: "It depends on the starting point and how deep the gaps run, so we never promise a number by a date. Most families see momentum within the first few weeks as confidence returns, and a clearer grade picture by the end of a reporting term. We're honest at the consultation about what's realistic for your student."
  },
  {
    q: "How are your tutors vetted?",
    a: "Every tutor has earned 90+ in the subject they teach (or its university equivalent), can explain a concept several different ways, and is interviewed and reference-checked before they ever meet a student. Your student keeps the same verified tutor each week rather than a rotating roster."
  },
  {
    q: "Can I switch tutors if it's not a good fit?",
    a: "Absolutely. Fit matters more than anything, so if the match isn't right we'll move your student to another tutor at no cost and no awkwardness — just tell us and we'll handle it."
  },
  {
    q: "Do you offer group sessions?",
    a: "Yes. PAL's Circle is a curated small group of three to four students at the same grade and subject, capped at four, for $120/month. It uses the same tutor screening as our 1-on-1 plans and is the most affordable way into the academy."
  },
  {
    q: "How does payment work?",
    a: "Plans are billed monthly, upfront, in CAD by Interac e-Transfer (with PayPal as a backup). No sessions are scheduled until payment is confirmed, and there's no long-term contract — you can pause or cancel between months."
  },
  {
    q: "Can we reschedule a session?",
    a: "Yes. Standard rescheduling is free with at least 48 hours' notice. Families whose weeks shift often can add Flex Reschedule for $15/month, which lets you move a session with as little as 12 hours' notice, up to twice a month."
  },
  {
    q: "Do you tutor university students?",
    a: "Yes — we support first-year university students in life sciences and quantitative subjects, including calculus, linear algebra, biology, chemistry, physics, and introductory programming in Python, Java, and C."
  },
  {
    q: "How do I book a free consultation?",
    a: "Book a free 20-minute consultation from our booking page. We'll talk through where the gap actually is, answer your questions, and outline a weekly plan — no pressure and no sales pitch."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a }
  }))
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Questions, answered</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              The things families ask us first.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Straight answers about pricing, online sessions, subjects, and how tutoring with
              PAL&rsquo;s Academy actually works across the Greater Toronto Area.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Stagger className="mx-auto grid max-w-3xl gap-5">
            {faqs.map(({ q, a }) => (
              <StaggerItem key={q}>
                <article className="rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-colors hover:border-gold-300">
                  <h2 className="font-serif text-xl text-ink-800 sm:text-2xl">{q}</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">{a}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-16 text-center">
              <p className="text-ink-600">Still have a question?</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/booking" className="btn btn-gold">
                  Book a free consultation
                </Link>
                <Link href="/contact" className="btn btn-ink">
                  Send us a message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
