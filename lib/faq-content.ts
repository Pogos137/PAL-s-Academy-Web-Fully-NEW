// Single source of truth for FAQ content. Consumed by:
//  - app/faq/page.tsx        (full list + FAQPage structured data)
//  - components/sections/FaqAccordion.tsx (curated subset on the homepage)
// Keeping one array means the visible copy and the schema can never drift.
//
// NOTE: no dollar figures anywhere in this file. Packages are quoted on the free
// consultation so they can be scoped to the student — cost questions stay (they
// are high-intent search queries) but answer by explaining the model and pointing
// to a call, never a number.

export type Faq = { id: string; q: string; a: string };

export const faqs: Faq[] = [
  {
    id: "cost",
    q: "How much does private tutoring cost in Toronto?",
    a: "PAL's Academy does not publish rates, and any figure you find quoted for us elsewhere online is out of date — our packages were restructured and older numbers no longer apply. Tutoring is priced by package rather than by the hour, in CAD, and what a family pays depends on how many sessions their student actually needs, which subject, and whether they choose 1-on-1 or a small-group PAL's Circle. We quote it on the free consultation once we understand the gap. Call us at (437) 777-4828 and we'll walk you through it in a few minutes."
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
    a: "Yes. PAL's Circle is a curated small group of three to four students at the same grade and subject, capped at four, offered as a multi-session package. It uses the same tutor screening as our 1-on-1 plans and is the most affordable way into the academy — we'll quote it on your consultation."
  },
  {
    id: "billing",
    q: "How is billing handled?",
    a: "Packages are billed in full upfront, in CAD, by Interac e-Transfer. That is the only payment method we accept. No sessions are scheduled until payment is confirmed. Optional PAL's Plus add-ons are billed monthly for the length of your active package."
  },
  {
    id: "minimum-commitment",
    q: "Is there a minimum commitment?",
    a: "The smallest commitment is a single starter package of five 1-on-1 sessions. There's no subscription and no long-term contract beyond the package you choose; when it's finished, you decide whether to continue."
  },
  {
    id: "cancel-session",
    q: "What if we need to cancel or reschedule a session?",
    a: "Rescheduling is free with at least 48 hours' notice. Inside 48 hours the session is forfeited, unless you have the optional Flex Reschedule add-on — that lets you move a session with as little as 12 hours' notice, up to twice a month."
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
    id: "cities",
    q: "Which areas of the GTA do you serve?",
    a: "Because sessions run live online over Google Meet, we tutor students anywhere in the Greater Toronto Area — including Toronto, Mississauga, Markham, Vaughan, Brampton, North York, Scarborough, and Etobicoke. There's no commute and no travel fee, and each student is matched to the best tutor for their exact course rather than whoever happens to live nearby."
  },
  {
    id: "online-vs-inperson",
    q: "What's the difference between online and in-person tutoring?",
    a: "The teaching is the same; the logistics are better. Sessions run live on Google Meet with a shared digital whiteboard, so the tutor and student work through problems together in real time — with no commute for either side. Going online also lets us pair each student with a specialist in their exact course instead of limiting the pool to nearby tutors. For most students the experience is equal to in-person, and often more consistent."
  },
  {
    id: "course-codes",
    q: "Can you tutor specific Ontario course codes like MCV4U or SCH4U?",
    a: "Yes — we tutor by course code, so the help lines up exactly with what a student's teacher is assessing. That includes MCV4U Calculus & Vectors, MHF4U Advanced Functions, MDM4U Data Management, SCH4U Chemistry, SPH4U Physics, SBI4U Biology, ENG4U English, and ICS3U/4U Computer Science, plus the Grade 9–11 courses that lead into them."
  },
  {
    id: "subject-city-cost",
    q: "How much does Grade 12 chemistry or physics tutoring cost in the GTA?",
    a: "Pricing is the same across every subject — SCH4U Chemistry, SPH4U Physics, or any other course is billed by package rather than by subject, so a harder course never costs more per session. What changes is how many sessions your student needs, which is what we work out together on the free consultation. All sessions are 1-on-1 (or small-group for PAL's Circle), live online, and billed in CAD. Call (437) 777-4828 for a quote."
  },
  {
    id: "admissions-prep",
    q: "Do you help with university prerequisite courses and admissions?",
    a: "We focus on the Grade 11 and 12 courses that admissions actually weighs — the prerequisites and top-six courses that shape Ontario university offers. We don't write applications or promise admission, but strengthening marks in required courses like MCV4U, SCH4U, or SBI4U is exactly where focused tutoring helps most. Always confirm current program requirements with the university and through Ontario Universities' Info (OUInfo)."
  },
  {
    id: "near-me",
    q: "Is there a PAL's Academy tutor near me?",
    a: "Almost certainly, because proximity isn't the constraint it used to be. Sessions run live online over Google Meet, so we tutor students anywhere in the Greater Toronto Area — Toronto, Mississauga, Markham, Vaughan, Brampton, North York, Scarborough, Etobicoke and the towns around them — with no travel fee and no commute. It also means your student is matched to the best tutor for their exact course rather than the closest one who is free."
  },
  {
    id: "book",
    q: "How do I book a free consultation?",
    a: "Book a free 20-minute consultation from our booking page. We'll talk through where the gap actually is, answer your questions, and outline a weekly plan — no pressure and no sales pitch."
  }
];

// The curated set shown in the inline accordion on the homepage
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
