// Single source of truth for the subject-specific SEO landing pages served at
// /subjects/<slug>. Each entry powers one page: hero, "what we cover", "why it
// matters", outcome cards, and a subject-specific FAQ (which also feeds the
// FAQPage structured data). Copy follows brand voice — calm, expert, honest,
// no grade guarantees — and every fact (prices, course codes, free consult,
// 90+ tutors, Google Meet) is grounded in the knowledge base. Pricing here must
// stay in sync with /pricing: Starter $200, Core $360, Intensive $480,
// PAL's Circle $120 — all CAD, billed monthly, cancel any time.

export type SubjectFaq = { q: string; a: string };
export type SubjectOutcome = { title: string; body: string };

export type SubjectContent = {
  /** URL slug under /subjects, e.g. "chemistry-tutoring". */
  slug: string;
  /** Short subject noun used in headings/breadcrumbs, e.g. "Chemistry". */
  subject: string;
  /** schema.org serviceType, e.g. "Chemistry tutoring". */
  serviceType: string;
  /** ≤ ~45 char title segment; buildMetadata appends "· PAL's Academy". */
  metaTitle: string;
  /** 150–160 char, keyword-forward meta description ending in a CTA. */
  metaDescription: string;
  /** Course-code eyebrow above the H1, e.g. "SCH3U · SCH4U · First-year". */
  eyebrow: string;
  /** The page H1. */
  h1: string;
  /** One-paragraph hero intro. */
  heroIntro: string;
  /** Course codes / topics rendered as a "What we cover" grid. */
  topics: string[];
  /** Short subhead for the "Why it matters" section. */
  whyTitle: string;
  /** "Why it matters" body paragraphs (honest stakes + method). */
  whyBody: string[];
  /** Three "what changes" outcome cards. */
  outcomes: SubjectOutcome[];
  /** Subject-specific FAQs → visible list + FAQPage schema. */
  faqs: SubjectFaq[];
  /** Slugs of related subject pages for internal linking. */
  related: string[];
};

export const subjects: SubjectContent[] = [
  {
    slug: "chemistry-tutoring",
    subject: "Chemistry",
    serviceType: "Chemistry tutoring",
    metaTitle: "Chemistry Tutoring Toronto | SCH3U & SCH4U",
    metaDescription:
      "Expert 1-on-1 chemistry tutoring in Toronto — SCH3U, SCH4U & university. Verified tutors, same instructor weekly. Book a free consultation.",
    eyebrow: "SCH3U · SCH4U · First-year chemistry",
    h1: "Chemistry tutoring that finally makes it click.",
    heroIntro:
      "Chemistry quietly decides a lot of Ontario university applications — and it's the course students most often hit a wall on. Whether it's the mole and stoichiometry in SCH3U, equilibrium and organic in SCH4U, or first-year university chemistry, we match your student with a tutor who scored 90+ in that exact course and can explain it five different ways.",
    topics: [
      "SCH3U · Grade 11 Chemistry",
      "SCH4U · Grade 12 Chemistry",
      "Stoichiometry & the mole",
      "Thermochemistry & energy",
      "Chemical equilibrium",
      "Acids, bases & pH",
      "Organic chemistry",
      "First-year university chemistry"
    ],
    whyTitle: "A gateway course, taught from the root cause.",
    whyBody: [
      "For students heading into life sciences, engineering, or health programs, SCH4U is often a required course — and a competitive one. A weak chemistry mark can quietly pull down an average that's otherwise strong. We won't promise a letter grade by a date; we find where the understanding actually broke and rebuild from there.",
      "Most chemistry struggles aren't about memory — they trace to a concept a unit or two back that never fully landed. Your tutor works the Ontario curriculum in the same order your student's teacher does, so sessions reinforce class instead of competing with it."
    ],
    outcomes: [
      {
        title: "Concepts, not just formulas",
        body: "We teach the why behind equilibrium and stoichiometry, so problems your student hasn't seen before stop being frightening."
      },
      {
        title: "Exam-ready, calmly",
        body: "Structured review before unit tests and finals — deliberate and early, never a cram the night before."
      },
      {
        title: "The same tutor each week",
        body: "One verified tutor who knows your student's gaps, every week, with lesson notes after each session."
      }
    ],
    faqs: [
      {
        q: "Do you tutor SCH4U and SCH3U?",
        a: "Yes — both Grade 11 (SCH3U) and Grade 12 (SCH4U) Ontario chemistry, worked by course code so sessions line up with exactly what your student's teacher is assessing. We also support first-year university chemistry."
      },
      {
        q: "My child is failing chemistry — where do you start?",
        a: "At the free consultation we figure out where the understanding actually broke, which is usually a unit or two earlier than where the marks slipped. We rebuild from that point rather than drilling the current chapter in isolation."
      },
      {
        q: "Can you help with first-year university chemistry?",
        a: "Yes. Our tutors have completed first-year post-secondary chemistry and know how university exams are structured — a different game from Grade 12."
      },
      {
        q: "How much does chemistry tutoring cost?",
        a: "Plans run from $200/month for one weekly 1-on-1 up to $480/month for three weekly sessions, with a small-group PAL's Circle at $120/month. All in CAD, billed monthly, cancel any time."
      }
    ],
    related: ["physics-tutoring", "biology-tutoring", "math-tutoring"]
  },
  {
    slug: "physics-tutoring",
    subject: "Physics",
    serviceType: "Physics tutoring",
    metaTitle: "Physics Tutoring Toronto | SPH3U & SPH4U",
    metaDescription:
      "Expert 1-on-1 physics tutoring in Toronto — SPH3U & SPH4U, plus first-year university. Verified tutors, same instructor every week. Free consultation.",
    eyebrow: "SPH3U · SPH4U · First-year physics",
    h1: "Physics tutoring for students who can do the math but not the problem.",
    heroIntro:
      "Physics punishes a shaky grasp of the fundamentals harder than almost any other subject — one misunderstood idea in kinematics quietly breaks everything that follows. Whether it's SPH3U forces and energy, SPH4U fields and waves, or first-year university physics, we pair your student with a tutor who has mastered the course and can untangle where it went sideways.",
    topics: [
      "SPH3U · Grade 11 Physics",
      "SPH4U · Grade 12 Physics",
      "Kinematics & dynamics",
      "Forces, energy & momentum",
      "Waves & sound",
      "Electricity & magnetism",
      "Gravitational, electric & magnetic fields",
      "First-year university physics"
    ],
    whyTitle: "The gap is usually the setup, not the content.",
    whyBody: [
      "Physics is required for most engineering and many science programs, and it rewards a specific skill: turning a word problem into the right equation. Students who understand it in class but freeze on the test usually have a gap in that translation step, not in the material itself.",
      "Our tutors slow down exactly where the curriculum speeds up — free-body diagrams, sign conventions, the assumptions behind each formula — so problem-solving becomes a method rather than a guess."
    ],
    outcomes: [
      {
        title: "From formula sheet to method",
        body: "Students learn to set up problems systematically, so unfamiliar questions stop being a wall."
      },
      {
        title: "Conceptual foundations",
        body: "We fix the root misunderstanding — usually a few units back — instead of patching the current chapter."
      },
      {
        title: "Deliberate exam prep",
        body: "Structured review timed to your student's test calendar, never a panic the night before."
      }
    ],
    faqs: [
      {
        q: "Do you tutor SPH4U and SPH3U?",
        a: "Yes — both Grade 11 and Grade 12 Ontario physics by course code, plus first-year university physics. Sessions follow the same unit order as your student's class."
      },
      {
        q: "My child understands physics in class but fails the tests — why?",
        a: "Almost always it's the translation step: turning a scenario into the right setup. That's a teachable method, and it's most of what we work on together."
      },
      {
        q: "Can you help with first-year university physics?",
        a: "Yes — our tutors have completed first-year post-secondary physics and know how those exams differ from Grade 12."
      },
      {
        q: "How much does physics tutoring cost?",
        a: "From $200/month for one weekly 1-on-1 up to $480/month for three, or $120/month in a small-group PAL's Circle. All in CAD, billed monthly, no lock-in."
      }
    ],
    related: ["chemistry-tutoring", "calculus-vectors-tutoring", "math-tutoring"]
  },
  {
    slug: "biology-tutoring",
    subject: "Biology",
    serviceType: "Biology tutoring",
    metaTitle: "Biology Tutoring Toronto | SBI3U & SBI4U",
    metaDescription:
      "Expert 1-on-1 biology tutoring in Toronto — SBI3U, SBI4U & first-year university biology. Verified tutors, same instructor weekly. Free consultation.",
    eyebrow: "SBI3U · SBI4U · First-year biology",
    h1: "Biology tutoring that goes beyond memorizing.",
    heroIntro:
      "Grade 12 biology looks like memorization until the exam asks students to apply it — and that's where marks slip. From SBI3U systems to SBI4U biochemistry, molecular genetics, and metabolic processes, through first-year university biology, we match your student with a tutor who knows the course cold and teaches it to be understood, not just recalled.",
    topics: [
      "SBI3U · Grade 11 Biology",
      "SBI4U · Grade 12 Biology",
      "Biochemistry & macromolecules",
      "Metabolic processes",
      "Molecular genetics",
      "Homeostasis",
      "Population dynamics",
      "First-year university biology"
    ],
    whyTitle: "A high-volume course that rewards a framework.",
    whyBody: [
      "SBI4U is a gateway course for nursing, kinesiology, life-sciences, and pre-med streams, and Ontario universities watch it closely. The sheer volume of content makes it easy to fall behind and hard to catch up alone.",
      "We help students build a framework — how the units connect — so biology stops being a list to memorize and becomes a system they can reason through. That's exactly what application questions are testing."
    ],
    outcomes: [
      {
        title: "Understanding over recall",
        body: "We connect the units so application questions become answerable, not just definitions to memorize."
      },
      {
        title: "A plan for the content load",
        body: "Weekly structure that keeps pace with a heavy course instead of cramming before each test."
      },
      {
        title: "University-ready",
        body: "Tutors who've done first-year biology and know the real step up in pace and depth."
      }
    ],
    faqs: [
      {
        q: "Do you tutor SBI4U and SBI3U?",
        a: "Yes — Grade 11 and Grade 12 Ontario biology by course code, and first-year university biology. We follow your student's class sequence unit by unit."
      },
      {
        q: "Biology feels like pure memorization — how does tutoring help?",
        a: "We teach the connections between units so students can reason through application questions, which is where most of the exam marks actually live."
      },
      {
        q: "Can you help with first-year university biology?",
        a: "Yes. Our tutors have completed first-year post-secondary biology and understand how university assessment differs from Grade 12."
      },
      {
        q: "How much does biology tutoring cost?",
        a: "From $200/month for one weekly session to $480/month for three, with a $120/month small-group option. All in CAD, billed monthly, cancel any time."
      }
    ],
    related: ["chemistry-tutoring", "physics-tutoring", "math-tutoring"]
  },
  {
    slug: "math-tutoring",
    subject: "Math",
    serviceType: "Mathematics tutoring",
    metaTitle: "Math Tutoring Toronto | MHF4U, MCV4U & MDM4U",
    metaDescription:
      "Expert 1-on-1 math tutoring in Toronto — MHF4U, MCV4U, MDM4U, MCR3U & first-year calculus. Verified tutors. Same instructor weekly. Free consultation.",
    eyebrow: "Grade 9–12 · First-year university",
    h1: "Math tutoring across the full Ontario sequence.",
    heroIntro:
      "Math builds on itself — a gap in Grade 10 quietly resurfaces in Grade 12. We tutor the entire Ontario sequence, from MPM2D and MCR3U Functions through MHF4U Advanced Functions and MCV4U Calculus & Vectors, plus MDM4U Data Management and first-year university calculus and linear algebra. Every student is matched to a tutor who scored 90+ in that exact course.",
    topics: [
      "MPM2D · Principles of Mathematics",
      "MCR3U · Functions",
      "MHF4U · Advanced Functions",
      "MCV4U · Calculus & Vectors",
      "MDM4U · Data Management",
      "Grade 9 math",
      "First-year calculus",
      "First-year linear algebra"
    ],
    whyTitle: "Find the real gap, not the symptom.",
    whyBody: [
      "Because each math course assumes mastery of the last, the real problem is rarely the current unit — it's an unfinished idea from a year or two ago. We find it and close it, so the foundation stops cracking under new material.",
      "For Grade 11 and 12 students, math marks weigh heavily on competitive university applications. We won't promise a grade by a date, but we will build the consistent weekly habit that produces real, durable improvement."
    ],
    outcomes: [
      {
        title: "Find the real gap",
        body: "We trace struggles back to their root — usually an earlier course — and rebuild the foundation properly."
      },
      {
        title: "A weekly rhythm",
        body: "Math rewards consistency over cramming: the same tutor, the same time, every week."
      },
      {
        title: "Toward the right course",
        body: "A clear path through Functions, Advanced Functions, and Calculus toward your student's program goals."
      }
    ],
    faqs: [
      {
        q: "Which Ontario math courses do you tutor?",
        a: "The full sequence — MPM2D, MCR3U Functions, MHF4U Advanced Functions, MCV4U Calculus & Vectors, and MDM4U Data Management — plus Grade 9 math and first-year university calculus and linear algebra."
      },
      {
        q: "My child suddenly struggles in Grade 11/12 math — why now?",
        a: "Usually because an earlier idea never fully landed and the new course assumes it. We diagnose that at the consultation and rebuild from the gap, not the symptom."
      },
      {
        q: "Do you tutor MCV4U and MHF4U specifically?",
        a: "Yes — and we have dedicated pages for MCV4U Calculus & Vectors and MHF4U Advanced Functions, each matched with a tutor who earned a top mark in that exact course."
      },
      {
        q: "How much does math tutoring cost?",
        a: "From $200/month for one weekly 1-on-1 to $480/month for three, or $120/month in a small-group PAL's Circle. All in CAD, billed monthly, no contract."
      }
    ],
    related: ["calculus-vectors-tutoring", "advanced-functions-tutoring", "physics-tutoring"]
  },
  {
    slug: "calculus-vectors-tutoring",
    subject: "Calculus & Vectors",
    serviceType: "Calculus tutoring",
    metaTitle: "MCV4U Calculus & Vectors Tutoring",
    metaDescription:
      "Private 1-on-1 MCV4U Calculus & Vectors tutoring across the GTA, plus first-year university calculus. Verified tutors, weekly online sessions. Book a free consultation.",
    eyebrow: "MCV4U · First-year calculus",
    h1: "MCV4U Calculus & Vectors tutoring, by someone who aced it.",
    heroIntro:
      "MCV4U is one of the most demanding courses in the Ontario curriculum and a prerequisite for nearly every engineering, science, and math program. Derivatives, limits, related rates, and 3-D vectors arrive fast. We match your student with a tutor who earned a top mark in MCV4U and can make the hard parts make sense — and we support first-year university calculus too.",
    topics: [
      "Limits & continuity",
      "Derivatives & the rules of differentiation",
      "Related rates",
      "Curve sketching & optimization",
      "Vectors in 2-D and 3-D",
      "Equations of lines & planes",
      "First-year university calculus"
    ],
    whyTitle: "A fast course at the worst possible time.",
    whyBody: [
      "MCV4U often runs in a single semester at a pace that leaves little room to fall behind, and it lands in Grade 12 right when university applications are being decided. The opening calculus unit tends to separate students quickly.",
      "We focus on the conceptual spine — what a derivative actually means, why the rules work — so students can handle unfamiliar problems instead of pattern-matching memorized examples. The vectors unit, which many find equally tricky, gets the same careful treatment."
    ],
    outcomes: [
      {
        title: "The calculus that makes sense",
        body: "Derivatives and limits taught conceptually, so new problems are solvable rather than scary."
      },
      {
        title: "Vectors, untangled",
        body: "The 3-D vectors, lines, and planes unit explained clearly, one step at a time."
      },
      {
        title: "Built for the pace",
        body: "A weekly cadence that keeps up with a fast, single-semester course."
      }
    ],
    faqs: [
      {
        q: "Do you tutor MCV4U Calculus & Vectors?",
        a: "Yes — it's one of our most-requested courses. Your student is matched with a tutor who earned a top mark in MCV4U specifically."
      },
      {
        q: "Is MCV4U really that hard?",
        a: "It's demanding and fast, especially the opening calculus unit. Most students don't lack ability — they lack time to absorb concepts at that pace, which is exactly what weekly tutoring restores."
      },
      {
        q: "Can you help with first-year university calculus too?",
        a: "Yes. Our tutors have completed first-year post-secondary calculus and know how those exams are built."
      },
      {
        q: "How much does MCV4U tutoring cost?",
        a: "From $200/month for one weekly 1-on-1 up to $480/month for three weekly sessions; a small-group PAL's Circle is $120/month. All in CAD, billed monthly."
      }
    ],
    related: ["advanced-functions-tutoring", "math-tutoring", "physics-tutoring"]
  },
  {
    slug: "advanced-functions-tutoring",
    subject: "Advanced Functions",
    serviceType: "Advanced Functions tutoring",
    metaTitle: "MHF4U Advanced Functions Tutoring",
    metaDescription:
      "Private 1-on-1 MHF4U Advanced Functions tutoring across the GTA — the foundation for MCV4U Calculus. Verified tutors, weekly online sessions. Book a free consultation.",
    eyebrow: "MHF4U · Foundation for calculus",
    h1: "MHF4U Advanced Functions tutoring that sets up the rest.",
    heroIntro:
      "MHF4U is the course universities quietly treat as proof a student can handle quantitative programs — and the foundation MCV4U Calculus is built on. Polynomial, rational, logarithmic, and trigonometric functions all arrive in one term. We match your student with a tutor who earned a top mark in Advanced Functions and teaches it so the calculus that follows isn't a cliff.",
    topics: [
      "Polynomial functions",
      "Rational functions",
      "Exponential & logarithmic functions",
      "Trigonometric functions & identities",
      "Combining transformations",
      "Average & instantaneous rates of change",
      "Foundations for MCV4U"
    ],
    whyTitle: "Get this right and calculus stops being a cliff.",
    whyBody: [
      "Advanced Functions is a common prerequisite and is weighted heavily in admissions for business, science, and engineering programs. Because MCV4U assumes everything in MHF4U, a shaky term here makes calculus much harder than it needs to be.",
      "We make sure each function family is genuinely understood — not just the procedures — so students walk into Calculus & Vectors with a foundation that holds under pressure."
    ],
    outcomes: [
      {
        title: "A foundation that holds",
        body: "Every function family understood properly, so MCV4U builds on solid ground instead of cracks."
      },
      {
        title: "Trig and logs demystified",
        body: "The two units students fear most, taught patiently until they actually make sense."
      },
      {
        title: "Admissions-aware",
        body: "Steady weekly work on a course that weighs heavily in competitive university applications."
      }
    ],
    faqs: [
      {
        q: "Do you tutor MHF4U Advanced Functions?",
        a: "Yes — your student is matched with a tutor who scored 90+ in MHF4U and follows their class unit by unit."
      },
      {
        q: "Should my child take Advanced Functions before Calculus?",
        a: "MHF4U is the standard foundation for MCV4U, and most students take it first or alongside. A strong MHF4U term makes Calculus & Vectors significantly more manageable."
      },
      {
        q: "Which units do students struggle with most?",
        a: "Trigonometric identities and logarithms tend to be the sticking points. Those get extra, patient attention until the logic clicks."
      },
      {
        q: "How much does MHF4U tutoring cost?",
        a: "From $200/month for one weekly session to $480/month for three, or $120/month in a small group. All in CAD, billed monthly, cancel any time."
      }
    ],
    related: ["calculus-vectors-tutoring", "math-tutoring", "chemistry-tutoring"]
  },
  {
    slug: "english-tutoring",
    subject: "English",
    serviceType: "English tutoring",
    metaTitle: "ENG4U English Tutoring in the GTA",
    metaDescription:
      "Private 1-on-1 ENG4U & ENG3U English tutoring across the GTA, plus university application essays. Verified tutors, weekly online sessions. Book a free consultation.",
    eyebrow: "ENG3U · ENG4U · Application essays",
    h1: "English tutoring that teaches what rubrics actually reward.",
    heroIntro:
      "Strong ideas don't always read as strong on paper — and Ontario English rubrics grade the writing, not the intention. From ENG3U and ENG4U essays and analysis to university application essays and personal statements, our tutors teach a clear argument, real evidence, and a confident voice, line by line.",
    topics: [
      "ENG3U · Grade 11 English",
      "ENG4U · Grade 12 English",
      "Thesis & argument",
      "Literary analysis & essays",
      "Reading comprehension",
      "Grammar & clarity",
      "University application essays & personal statements"
    ],
    whyTitle: "A near-universal prerequisite, often overlooked.",
    whyBody: [
      "ENG4U is required for almost every Ontario university program, regardless of field, which makes it quietly one of the highest-stakes courses on a Grade 12 transcript — and an easy one to underestimate until the mark matters.",
      "We coach the things rubrics actually measure: a defensible thesis, evidence that earns its place, and prose that stays clear under pressure. The goal is simple — students who think well should sound that way on the page."
    ],
    outcomes: [
      {
        title: "Writing that scores",
        body: "We teach to the rubric — argument, evidence, structure — not vague “write better” advice."
      },
      {
        title: "A clearer voice",
        body: "Students learn to say what they mean precisely, which shows up in every other subject too."
      },
      {
        title: "Application-essay support",
        body: "Line-by-line coaching on the essays and personal statements that influence admission."
      }
    ],
    faqs: [
      {
        q: "Do you tutor ENG4U and ENG3U?",
        a: "Yes — both Grade 11 and Grade 12 Ontario English, focused on the analysis and writing skills the curriculum assesses."
      },
      {
        q: "Can you help with university application essays?",
        a: "Yes. We coach application essays and personal statements line by line, so genuinely strong students read as strong on paper."
      },
      {
        q: "My child has good ideas but low essay marks — can that change?",
        a: "Usually, yes. The gap is almost always structure and evidence — both very teachable — rather than intelligence or effort."
      },
      {
        q: "How much does English tutoring cost?",
        a: "From $200/month for one weekly 1-on-1 to $480/month for three, with a $120/month small-group option. All in CAD, billed monthly, no lock-in."
      }
    ],
    related: ["math-tutoring", "biology-tutoring", "computer-science-tutoring"]
  },
  {
    slug: "computer-science-tutoring",
    subject: "Computer Science",
    serviceType: "Computer science tutoring",
    metaTitle: "ICS4U Computer Science Tutoring",
    metaDescription:
      "Private 1-on-1 ICS4U & ICS3U computer science tutoring across the GTA — Python, Java, C — plus first-year CS. Verified tutors. Book a free consultation.",
    eyebrow: "ICS3U · ICS4U · First-year CS",
    h1: "Computer science tutoring from people who actually code.",
    heroIntro:
      "Programming clicks when someone sits beside you and debugs your thinking, not just your syntax. We tutor ICS3U and ICS4U — Python, algorithms, and the fundamentals that U of T, Waterloo, and McMaster CS programs expect — and support first-year university students in Python, Java, and C, plus the data-structures groundwork that makes second year survivable.",
    topics: [
      "ICS3U · Grade 11 Computer Science",
      "ICS4U · Grade 12 Computer Science",
      "Python fundamentals",
      "Algorithms & logic",
      "Object-oriented programming",
      "First-year Java & C",
      "Data structures foundations"
    ],
    whyTitle: "The wall between following and writing.",
    whyBody: [
      "For students aiming at competitive CS programs, a strong Grade 12 computer science mark matters — and the gap between “followed the lesson” and “can write it from scratch” is where many students stall.",
      "Our tutors have completed post-secondary computer science and work the way good engineers do: read the error, reason about the logic, and build the habit of solving problems independently — which is the part that finally makes it click."
    ],
    outcomes: [
      {
        title: "From following to writing",
        body: "Students learn to build solutions from scratch, not just trace code someone handed them."
      },
      {
        title: "Debugging as a skill",
        body: "We teach reading errors and reasoning about logic — the habit that makes CS click."
      },
      {
        title: "University-ready",
        body: "Python, Java, C, and the data-structures groundwork first year quietly assumes."
      }
    ],
    faqs: [
      {
        q: "Do you tutor ICS3U and ICS4U?",
        a: "Yes — Grade 11 and Grade 12 Ontario computer science, primarily in Python, following your student's course."
      },
      {
        q: "Can you help with first-year university CS?",
        a: "Yes. We support first-year Python, Java, and C, plus the data-structures foundations that second year builds on."
      },
      {
        q: "My child can follow lessons but can't code alone — is that normal?",
        a: "Very. The jump from reading code to writing it is the most common wall, and building that habit is exactly what our tutors focus on."
      },
      {
        q: "How much does computer science tutoring cost?",
        a: "From $200/month for one weekly session to $480/month for three, or $120/month in a small group. All in CAD, billed monthly, cancel any time."
      }
    ],
    related: ["math-tutoring", "calculus-vectors-tutoring", "advanced-functions-tutoring"]
  }
];

/** Lookup map by slug for O(1) access in the dynamic route. */
const bySlug = new Map(subjects.map((s) => [s.slug, s]));

export function getSubject(slug: string): SubjectContent | undefined {
  return bySlug.get(slug);
}

/** All slugs, for generateStaticParams and the sitemap. */
export const subjectSlugs = subjects.map((s) => s.slug);
