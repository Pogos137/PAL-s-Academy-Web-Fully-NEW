// Single source of truth for FAQ content. Consumed by:
//  - app/faq/page.tsx        (full list + FAQPage structured data)
//  - components/sections/FaqAccordion.tsx (curated subset on home + pricing)
// Keeping one array means the visible copy and the schema can never drift.

export type Faq = { id: string; q: string; a: string };

export const faqs: Faq[] = [
  {
    id: "cost",
    q: "How much does private tutoring cost in Toronto?",
    a: "PAL's Academy is priced by package, billed upfront in CAD. One-on-one packages run from $375 for a Starter (5 sessions) through a $750 Core (10 sessions) to $1,125 for an Intensive (15 sessions). A small-group PAL's Circle is $420 per student. Every package uses the same verified tutors and the same standard."
  },
  {
    id: "online-effective",
    q: "Is online tutoring as effective as in-person?",
    a: "For most students, yes. Sessions run live over Google Meet with a shared digital whiteboard, so the tutor and student work through problems together in real time. Going online also lets us match each student to the best tutor for their exact course rather than whoever happens to live nearby — and it removes commute time for busy families across the GTA."
  },
  {
    id: "subjects",
    q: "What subjects do you cover?",
    a: "We tutor math, sciences, English, French, and computer science for Grade 9–12 and first-year university. That includes Ontario course codes such as MCV4U Calculus & Vectors, MHF4U Advanced Functions, SCH4U Chemistry, SPH4U Physics, SBI4U Biology, ENG4U English, and ICS3U/4U Computer Science, plus first-year university calculus, biology, chemistry, physics, and programming."
  },
  {
    id: "ontario-curriculum",
    q: "Do you tutor Ontario curriculum courses?",
    a: "Yes. We work directly from the Ontario curriculum by course code, so a student's tutoring lines up with exactly what their teacher is assessing — the same units, expectations, and exam style their school uses."
  },
  {
    id: "grade-levels",
    q: "What grade levels do you serve?",
    a: "We work with students in Grade 9 through 12 and first-year university. That spans Ontario high-school courses by code — MCV4U, SCH4U, SPH4U, SBI4U, MHF4U, ENG4U, ICS3U/4U and more — through to first-year university calculus, biology, chemistry, physics, and introductory programming."
  },
  {
    id: "results-speed",
    q: "How quickly will my student see results?",
    a: "It depends on the starting point and how deep the gaps run, so we never promise a number by a date. Most families see momentum within the first few weeks as confidence returns, and a clearer grade picture by the end of a reporting term. We're honest at the consultation about what's realistic for your student."
  },
  {
    id: "vetting",
    q: "How are your tutors vetted?",
    a: "Every tutor has earned 90+ in the subject they teach (or its university equivalent), can explain a concept several different ways, and is interviewed and reference-checked before they ever meet a student. Your student keeps the same verified tutor each week rather than a rotating roster."
  },
  {
    id: "switch-tutors",
    q: "Can we switch tutors if it's not a good fit?",
    a: "Absolutely. Fit matters more than anything, so if the match isn't right we'll move your student to another tutor at no cost and no awkwardness — just tell us and we'll handle it."
  },
  {
    id: "group",
    q: "Do you offer group sessions?",
    a: "Yes. PAL's Circle is a curated small group of three to four students at the same grade and subject, capped at four, offered as a 12-session package at $420 per student. It uses the same tutor screening as our 1-on-1 plans and is the most affordable way into the academy."
  },
  {
    id: "billing",
    q: "How is billing handled?",
    a: "Packages are billed in full upfront, in CAD by Interac e-Transfer (with PayPal as a backup). No sessions are scheduled until payment is confirmed. Optional PAL's Plus add-ons are billed monthly for the length of your active package."
  },
  {
    id: "minimum-commitment",
    q: "Is there a minimum commitment?",
    a: "The smallest commitment is a single Starter package — five 1-on-1 sessions for $375. There's no subscription and no long-term contract beyond the package you choose; when it's finished, you decide whether to continue."
  },
  {
    id: "cancel-session",
    q: "What if we need to cancel or reschedule a session?",
    a: "Standard rescheduling is free with at least 48 hours' notice. Families whose weeks shift often can add Flex Reschedule for $15/month, which lets you move a session with as little as 12 hours' notice, up to twice a month."
  },
  {
    id: "recorded",
    q: "Are sessions recorded?",
    a: "Not by default — we keep the call private to your student. After each session your tutor sends written lesson notes instead, so you can see what was covered. If you'd like a particular session recorded for the student to review later, just ask and we'll arrange it."
  },
  {
    id: "university",
    q: "Do you tutor university students?",
    a: "Yes — we support first-year university students in life sciences and quantitative subjects, including calculus, linear algebra, biology, chemistry, physics, and introductory programming in Python, Java, and C."
  },
  {
    id: "book",
    q: "How do I book a free consultation?",
    a: "Book a free 20-minute consultation from our booking page. We'll talk through where the gap actually is, answer your questions, and outline a weekly plan — no pressure and no sales pitch."
  }
];

// The curated set shown in the inline accordion on the homepage and pricing page
// (before the final CTA). Eight high-objection questions, in the order a hesitant
// parent tends to ask them.
const HOMEPAGE_FAQ_IDS = [
  "results-speed",
  "subjects",
  "grade-levels",
  "switch-tutors",
  "billing",
  "cancel-session",
  "recorded",
  "minimum-commitment"
] as const;

export const homepageFaqs: Faq[] = HOMEPAGE_FAQ_IDS.map(
  (id) => faqs.find((f) => f.id === id)!
);
