// Single source of truth for the city × subject intersection landing pages
// served at /tutoring/<city>/<subject> (e.g. /tutoring/toronto/chemistry).
// These are the highest-intent SEO targets — "chemistry tutor Toronto",
// "MHF4U tutor Mississauga" — matching purchase-intent queries exactly.
//
// IMPORTANT: this is a *curated allowlist*, NOT every city × subject combination.
// Generating all 8×8 pairs would create thin, near-duplicate doorway pages that
// Google penalises. Each entry below is a high-value pair with HAND-WRITTEN,
// unique intro + FAQ copy. The page pulls shared, structured detail (course
// topics, school boards, universities) from subjects-content + locations-content,
// so the pages are substantive rather than templated stubs.
//
// HONESTY GUARDRAILS (see CLAUDE.md): online-only delivery via Google Meet,
// pre-launch (no fabricated track record), and NO DOLLAR FIGURES — packages are
// quoted on the free consultation so they can be scoped to the student. Cost
// questions stay (high-intent queries) but answer by explaining the package
// model and pointing to a call.

export type IntersectionFaq = { q: string; a: string };

export type Intersection = {
  /** City slug — must match a LocationContent.slug in locations-content.ts. */
  citySlug: string;
  /** Short subject URL segment, e.g. "chemistry" (NOT the subject-page slug). */
  subject: string;
  /** Subject-page slug — must match a SubjectContent.slug in subjects-content.ts. */
  subjectSlug: string;
  /** ≤ ~52 char title segment; buildMetadata appends "· PAL's Academy". */
  metaTitle: string;
  /** 150–160 char, keyword-forward meta description ending in a CTA. */
  metaDescription: string;
  /** The page H1. */
  h1: string;
  /** Two hand-written hero/intro paragraphs unique to this city × subject. */
  intro: string[];
  /** Intersection-specific FAQs → visible list + FAQPage schema. */
  faqs: IntersectionFaq[];
};

export const intersections: Intersection[] = [
  {
    citySlug: "toronto",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutor Toronto | SCH4U & SCH3U",
    metaDescription:
      "Private 1-on-1 chemistry tutoring for Toronto students — SCH3U, SCH4U and first-year university chemistry, with a tutor who scored 90+. Book a free consultation.",
    h1: "Chemistry tutoring for Toronto students.",
    intro: [
      "In Toronto's competitive university race, SCH4U chemistry is one of the marks that decides offers in life sciences, health, and engineering. We pair Toronto students with a chemistry tutor who scored 90+ in the exact course — SCH3U, SCH4U, or first-year university chemistry — and meet weekly online, so the help fits around school and transit instead of adding another commute.",
      "Sessions run live over Google Meet with a shared whiteboard, so a student in Etobicoke and one downtown get the same tutor quality. We work the Ontario curriculum by course code, in the same order your student's TDSB or TCDSB teacher does — the mole, equilibrium, organic — so tutoring reinforces class rather than competing with it."
    ],
    faqs: [
      {
        q: "Do you tutor SCH4U and SCH3U chemistry in Toronto?",
        a: "Yes — both Grade 11 (SCH3U) and Grade 12 (SCH4U) Ontario chemistry, plus first-year university chemistry. Sessions are online, so we cover every Toronto neighbourhood from North York to the Beaches."
      },
      {
        q: "Is online chemistry tutoring effective for Toronto students?",
        a: "Very. A shared digital whiteboard lets the tutor and student work problems together in real time, and going online means we match your student to the best chemistry tutor for their course rather than whoever's nearby — with no commute across the city."
      },
      {
        q: "How much does chemistry tutoring in Toronto cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      },
      {
        q: "I searched for a chemistry tutor near me — do you cover my area of Toronto?",
        a: "Yes. Because sessions run live online over Google Meet, \"near me\" stops being a constraint — we tutor students in every Toronto neighbourhood, from Etobicoke and North York to Scarborough, the Beaches and downtown, with no travel fee and no commute. It also means your student is matched to the best chemistry tutor for their course rather than whoever happens to live a few streets away."
      },
      {
        q: "SCH4U or SPH4U — which should we get help with first?",
        a: "If both marks are slipping, start with the one that is a prerequisite for the program your student is applying to, then the one where the gap runs deeper. They fail differently: chemistry usually breaks because a concept a unit or two back never landed, while physics usually breaks on process rather than knowledge. Our guide on whether SCH4U or SPH4U is harder walks through both, and the consultation is where we look at your student\'s actual marks and say which to tackle first."
      }
    ]
  },
  {
    citySlug: "toronto",
    subject: "physics",
    subjectSlug: "physics-tutoring",
    metaTitle: "Physics Tutor Toronto | SPH4U & SPH3U",
    metaDescription:
      "Private 1-on-1 physics tutoring for Toronto students — SPH3U, SPH4U and first-year university physics, matched to a 90+ tutor. Book a free consultation.",
    h1: "Physics tutoring for Toronto students.",
    intro: [
      "SPH4U is one of the courses Toronto's engineering and physical-science programs watch most closely — and one where students most often mistake memorizing formulas for understanding. We match Toronto students with a physics tutor who earned 90+ in the course and teaches the reasoning behind the equations, weekly and online.",
      "Because sessions run over Google Meet, your student keeps the same tutor every week regardless of where in the city you are or what the weather's doing. We follow the TDSB or TCDSB sequence by course code — kinematics, dynamics, fields, waves — so the work lines up with exactly what's being graded."
    ],
    faqs: [
      {
        q: "Do you tutor SPH4U and SPH3U physics in Toronto?",
        a: "Yes — Grade 11 (SPH3U) and Grade 12 (SPH4U) Ontario physics, plus first-year university physics for U of T, TMU and York students. All sessions are online across the GTA."
      },
      {
        q: "My Toronto student understands class but freezes on physics tests — can you help?",
        a: "That's usually a reasoning-and-process gap, not a knowledge gap. Our tutors coach the habit of drawing the diagram, choosing the principle, then doing the math — which is exactly what unfamiliar test problems demand."
      },
      {
        q: "What does physics tutoring in Toronto cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      },
      {
        q: "I searched for a physics tutor near me — do you cover my part of Toronto?",
        a: "Yes. Sessions are live online over Google Meet, so we tutor students across every Toronto neighbourhood — Etobicoke, North York, Scarborough, East York, downtown — with no travel fee and no commute for either side. Being online is also why we can match your student to a tutor who scored 90+ in SPH4U specifically, rather than the closest available tutor."
      },
      {
        q: "SPH4U or SCH4U — which is harder, and which should we tutor first?",
        a: "Neither is universally harder; they punish different weaknesses. SPH4U tends to expose a shaky habit of reasoning — students reach for a formula before identifying the principle — while SCH4U tends to expose a concept that never fully landed a unit or two earlier. Start with whichever is a prerequisite for the program your student wants. Our SCH4U vs SPH4U guide compares them properly, and we will look at the real marks with you on the consultation."
      }
    ]
  },
  {
    citySlug: "toronto",
    subject: "math",
    subjectSlug: "math-tutoring",
    metaTitle: "Math Tutor Toronto | MHF4U, MCV4U & More",
    metaDescription:
      "Private 1-on-1 math tutoring for Toronto students — MHF4U, MCV4U, MCR3U and first-year calculus, matched to a 90+ tutor. Book a free consultation.",
    h1: "Math tutoring for Toronto students.",
    intro: [
      "From MCR3U Functions through MHF4U Advanced Functions and MCV4U Calculus & Vectors, the Grade 11 and 12 math courses gate most of Toronto's competitive STEM and commerce programs. We match students with a math tutor who scored 90+ in their exact course and meet weekly online to keep small gaps from compounding.",
      "Math is where a missed foundation hurts most, because every unit builds on the last. Our tutors work the Ontario curriculum by course code and rebuild the foundation — clean algebra, function sense, confident problem-solving — so a shaky term turns into a steady upward line. Sessions are online over Google Meet, no commute required."
    ],
    faqs: [
      {
        q: "Which Toronto math courses do you tutor?",
        a: "The full Ontario sequence — MPM2D, MCR3U Functions, MHF4U Advanced Functions, MCV4U Calculus & Vectors and MDM4U Data Management — plus first-year university calculus and linear algebra."
      },
      {
        q: "Should my Toronto student get a tutor for MHF4U or MCV4U?",
        a: "Both are common grade-deciders. MHF4U is the foundation MCV4U is built on, so we often shore up Advanced Functions algebra first — see our guide on MHF4U vs MCV4U for the full picture."
      },
      {
        q: "How much is math tutoring in Toronto?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      }
    ]
  },
  {
    citySlug: "mississauga",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutor Mississauga | SCH4U",
    metaDescription:
      "Private 1-on-1 chemistry tutoring for Mississauga students — SCH3U, SCH4U and first-year UTM chemistry, with a 90+ tutor. Book a free consultation.",
    h1: "Chemistry tutoring for Mississauga students.",
    intro: [
      "In Mississauga's large Peel and Dufferin-Peel science classes, it's easy to slip a step behind in SCH4U and never quite catch up. We pair students with a chemistry tutor who scored 90+ in the course and meet weekly online, so the foundation gets rebuilt before it costs a mark — and with UTM on the doorstep, those Grade 12 chemistry marks matter directly.",
      "Sessions run over Google Meet, so a student near Square One and one out by Meadowvale get the same tutor quality with no drive across the city. We follow the Ontario curriculum by course code — the mole, equilibrium, organic — in step with your student's teacher, and support first-year UTM chemistry too."
    ],
    faqs: [
      {
        q: "Do you tutor SCH4U chemistry across Mississauga?",
        a: "Yes — SCH3U, SCH4U and first-year university chemistry, online for students anywhere in Mississauga from Port Credit to Churchill Meadows, plus UTM first-years."
      },
      {
        q: "Is online chemistry tutoring effective for Mississauga students?",
        a: "Yes — a shared whiteboard means real-time problem-solving, and online matching means your student gets the right chemistry tutor for their course rather than the closest one, with no commute."
      },
      {
        q: "What does chemistry tutoring in Mississauga cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      }
    ]
  },
  {
    citySlug: "markham",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutor Markham | SCH4U & SCH3U",
    metaDescription:
      "Private 1-on-1 chemistry tutoring for Markham students — SCH3U, SCH4U and first-year university chemistry, with a 90+ tutor. Book a free consultation.",
    h1: "Chemistry tutoring for Markham students.",
    intro: [
      "Markham students compete hard, and SCH4U chemistry is one of the marks that decides spots in selective life-science and health programs. We match students with a chemistry tutor who scored 90+ in the exact course and meet weekly online, turning that drive into a mark that holds under pressure.",
      "Because sessions are online over Google Meet, students in Unionville, Cornell or Berczy Village all get the same tutor — no waitlist tied to a plaza learning centre. We work the YRDSB or York Catholic sequence by course code, from the mole and stoichiometry through to organic, so tutoring matches what's being graded."
    ],
    faqs: [
      {
        q: "Do you tutor SCH4U chemistry in Markham?",
        a: "Yes — SCH3U, SCH4U and first-year university chemistry, online across Markham from Unionville to Cathedraltown."
      },
      {
        q: "My Markham student is stressed about chemistry — how do you start?",
        a: "We find where the understanding actually broke, usually a unit or two before the marks slipped, and rebuild calmly from there — the stress often does more damage than the gap itself."
      },
      {
        q: "How much does chemistry tutoring in Markham cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      }
    ]
  },
  {
    citySlug: "mississauga",
    subject: "math",
    subjectSlug: "math-tutoring",
    metaTitle: "Math Tutor Mississauga | MHF4U & MCV4U",
    metaDescription:
      "Private 1-on-1 math tutoring for Mississauga students — MHF4U, MCV4U, MCR3U and first-year calculus, matched to a 90+ tutor. Book a free consultation.",
    h1: "Math tutoring for Mississauga students.",
    intro: [
      "MHF4U Advanced Functions and MCV4U Calculus & Vectors decide a lot of Mississauga university applications, and they move fast in packed Peel classrooms. We match students with a math tutor who scored 90+ in their exact course and meet weekly online, so a missed foundation gets caught before the whole term tilts.",
      "Our tutors rebuild the algebra and function sense the rest of the course assumes, working by course code in step with the Peel or Dufferin-Peel sequence. Sessions are online over Google Meet — same tutor quality whether you're near Square One or out in Meadowvale, with no commute — and we support first-year UTM calculus too."
    ],
    faqs: [
      {
        q: "Which Mississauga math courses do you tutor?",
        a: "MPM2D, MCR3U Functions, MHF4U Advanced Functions, MCV4U Calculus & Vectors and MDM4U Data Management, plus first-year university calculus and linear algebra including UTM courses."
      },
      {
        q: "Is online math tutoring effective for Mississauga students?",
        a: "Yes — a shared whiteboard makes working through problems together as natural as sitting side by side, and online means the right tutor for the course, not just the nearest one."
      },
      {
        q: "What does math tutoring in Mississauga cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      },
      {
        q: "Do you run a math program for Mississauga students, or just one-off sessions?",
        a: "It is a programme, not drop-in help. Your student is matched to one tutor who stays with them, meets on the same weekly slot, and works a plan built around their actual course — MHF4U, MCV4U, MDM4U or the Grade 9–11 courses feeding into them. Written notes follow every session so you can see what was covered. Sessions are bought as a multi-session package rather than by the hour, which is what keeps the work sequential instead of scattered."
      },
      {
        q: "I searched for a math tutor near me — which parts of Mississauga do you cover?",
        a: "All of it, because the sessions are online. Port Credit, Streetsville, Meadowvale, Erin Mills, Churchill Meadows, Malton, Cooksville — a student anywhere in Mississauga gets the same tutor quality with no drive across the city, plus first-year UTM calculus support."
      }
    ]
  },
  {
    citySlug: "vaughan",
    subject: "physics",
    subjectSlug: "physics-tutoring",
    metaTitle: "Physics Tutor Vaughan | SPH4U",
    metaDescription:
      "Private 1-on-1 physics tutoring for Vaughan students — SPH3U, SPH4U and first-year university physics, matched to a 90+ tutor. Book a free consultation.",
    h1: "Physics tutoring for Vaughan students.",
    intro: [
      "SPH4U rewards understanding over memorization, and in Vaughan's YRDSB and York Catholic schools it's one of the courses that moves quickly past students who miss a foundation. We pair Vaughan students with a physics tutor who scored 90+ in the course and teaches the reasoning behind the equations, weekly and online.",
      "Sessions run over Google Meet, so a student in Woodbridge and one in Maple get the same tutor with no commute or weather days. We follow the Ontario sequence by course code — kinematics, dynamics, energy, fields, waves — coaching the habit of picture, principle, then math that unfamiliar test problems demand."
    ],
    faqs: [
      {
        q: "Do you tutor SPH4U physics in Vaughan?",
        a: "Yes — Grade 11 (SPH3U) and Grade 12 (SPH4U) Ontario physics, plus first-year university physics, online across Vaughan from Woodbridge to Kleinburg."
      },
      {
        q: "My Vaughan student understands physics in class but loses marks on tests — why?",
        a: "It's usually process, not knowledge — skipping the diagram, or reaching for a formula before identifying the principle. That's exactly the habit our tutors rebuild, and it's very teachable."
      },
      {
        q: "How much does physics tutoring in Vaughan cost?",
        a: "Tutoring is priced by package rather than by the hour, in CAD. What it costs depends on how many sessions your student needs and whether you choose 1-on-1 or a small-group PAL's Circle, so we quote it on the free consultation instead of publishing a number that fits nobody. Call (437) 777-4828 for a straight answer."
      }
    ]
  }
];

export function getIntersection(citySlug: string, subject: string): Intersection | undefined {
  return intersections.find((i) => i.citySlug === citySlug && i.subject === subject);
}

/** All city × subject params for generateStaticParams. */
export const intersectionParams = intersections.map((i) => ({
  city: i.citySlug,
  subject: i.subject
}));

/** Sibling intersections offering the same subject in other cities. */
export function intersectionsForSubjectSlug(subjectSlug: string): Intersection[] {
  return intersections.filter((i) => i.subjectSlug === subjectSlug);
}

/** Intersections available within a given city (for city → intersection links). */
export function intersectionsForCity(citySlug: string): Intersection[] {
  return intersections.filter((i) => i.citySlug === citySlug);
}

/** Look up an intersection by city + the subject-page slug (for relinking the
 *  city page's subject cards to the matching intersection when one exists). */
export function getIntersectionByCityAndSubjectSlug(
  citySlug: string,
  subjectSlug: string
): Intersection | undefined {
  return intersections.find((i) => i.citySlug === citySlug && i.subjectSlug === subjectSlug);
}

/** Absolute path for an intersection page. */
export function intersectionPath(i: Intersection): string {
  return `/tutoring/${i.citySlug}/${i.subject}`;
}
