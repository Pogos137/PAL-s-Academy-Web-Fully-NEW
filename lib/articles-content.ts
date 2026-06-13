// Single source of truth for the content hub (blog) served at /blog and
// /blog/<slug>. Each entry is a top-of-funnel educational article that captures
// informational search intent and links internally into the subject and city
// landing pages (top-of-funnel → mid-funnel → free consultation).
//
// HONESTY GUARDRAILS (see CLAUDE.md):
//   • Educational claims are general and accurate to the Ontario curriculum /
//     admissions — NO invented statistics, no fake studies, no specific grade
//     cutoffs (those vary year to year).
//   • PAL's Academy is pre-launch — NEVER imply a track record, alumni, or
//     results we don't have. Delivery is online-only via Google Meet.
//   • Pricing referenced anywhere must match /pricing: Starter $200, Core $360,
//     Intensive $480, PAL's Circle $120 — CAD, monthly, cancel any time.
//
// Body paragraphs may contain inline links in markdown form: [label](/path).
// The article page parses these into internal <Link>s (strong SEO signal).

export type ArticleSection = {
  heading: string;
  /** Paragraphs; may include [label](/path) inline links. */
  body: string[];
};

export type ArticleLink = { label: string; href: string };

export type Article = {
  /** URL slug under /blog. */
  slug: string;
  /** H1 / on-page title. */
  title: string;
  /** ≤ ~52 char title segment; buildMetadata appends "· PAL's Academy". */
  metaTitle: string;
  /** 150–160 char, keyword-forward meta description ending in a CTA/hook. */
  metaDescription: string;
  /** Hub category label. */
  category: string;
  /** Eyebrow above the H1. */
  eyebrow: string;
  /** Estimated read time in minutes. */
  readMinutes: number;
  /** ISO publish date for schema + <time>. */
  publishedISO: string;
  /** Human-readable publish date. */
  publishedLabel: string;
  /** One-line summary for the index card + meta fallback. */
  excerpt: string;
  /** Lead paragraphs (may include inline links). */
  intro: string[];
  /** Body sections. */
  sections: ArticleSection[];
  /** Optional bullet summary rendered as "The short version". */
  keyTakeaways?: string[];
  /** Contextual internal links rendered in a "Related at PAL's Academy" block. */
  related: ArticleLink[];
  /** Slugs of related articles for internal linking. */
  relatedArticles: string[];
};

export const articles: Article[] = [
  {
    slug: "mhf4u-vs-mcv4u-which-is-harder",
    title: "MHF4U vs MCV4U: Which Is Harder, and How to Handle Both",
    metaTitle: "MHF4U vs MCV4U: Which Is Harder?",
    metaDescription:
      "MHF4U or MCV4U — which Grade 12 math course is harder, and which should you take first? A clear, honest breakdown for Ontario students, plus how to stay ahead.",
    category: "Course Guides",
    eyebrow: "Course Guides · Grade 12 Math",
    readMinutes: 5,
    publishedISO: "2026-04-15",
    publishedLabel: "April 15, 2026",
    excerpt:
      "The two Grade 12 math courses that decide most STEM university applications — what each really tests, which to take first, and where students lose marks.",
    intro: [
      "If you're heading into Grade 12 math in Ontario, two course codes dominate the conversation: MHF4U (Advanced Functions) and MCV4U (Calculus and Vectors). Between them, they gate most science, engineering, math, and commerce programs in the province — so the marks you earn here matter more than almost anything else on your transcript.",
      "The question students ask us most is simple: which one is harder? The honest answer is that they're hard in different ways, and the order you take them in changes the whole experience."
    ],
    sections: [
      {
        heading: "Take Advanced Functions first — it's the foundation",
        body: [
          "MHF4U is a prerequisite for MCV4U for a reason. Advanced Functions builds the algebra you'll lean on constantly in calculus: polynomial and rational functions, exponential and logarithmic functions, and trigonometric identities. None of it is conceptually exotic, but the volume of algebraic manipulation is high, and small mechanical slips compound quickly.",
          "Most students find MHF4U is where their math average is actually won or lost. It rewards precision and consistent practice more than flashes of insight. If your algebra from Grade 11 functions is shaky, Advanced Functions is where that gap finally catches up with you."
        ]
      },
      {
        heading: "Calculus & Vectors is newer, not necessarily harder",
        body: [
          "MCV4U introduces genuinely new ideas — rates of change, limits, and derivatives — alongside a vectors and 3D geometry unit that feels like a different subject entirely. The calculus is conceptual: once the idea of a derivative clicks, a lot of the course follows. The vectors unit, by contrast, is often the part students find most approachable because it's visual and self-contained.",
          "So MCV4U can feel less punishing than MHF4U day to day, provided your Advanced Functions algebra is solid. If it isn't, calculus simply exposes the same weaknesses in a new setting."
        ]
      },
      {
        heading: "Where students actually lose marks",
        body: [
          "It's rarely the big concepts. It's the foundation: factoring, function notation, working confidently with logarithms, and keeping algebra clean under time pressure on a test. A student who can do the calculus but drops marks on algebra walks away with a B when the understanding was an A.",
          "That's exactly the gap one-on-one work is built to close. Our [Advanced Functions tutoring](/subjects/advanced-functions-tutoring) and [Calculus & Vectors tutoring](/subjects/calculus-vectors-tutoring) pair students with a tutor who scored 90+ in that exact course and rebuilds the foundation before it costs a mark."
        ]
      }
    ],
    keyTakeaways: [
      "MHF4U (Advanced Functions) is the foundation and usually the bigger grade-decider — it's algebra-heavy and unforgiving of sloppy mechanics.",
      "MCV4U (Calculus & Vectors) introduces new ideas but feels manageable if your Advanced Functions algebra is solid.",
      "Take MHF4U first or alongside MCV4U; never let weak algebra carry into calculus.",
      "Most lost marks come from foundations, not the headline concepts."
    ],
    related: [
      { label: "MHF4U Advanced Functions tutoring", href: "/subjects/advanced-functions-tutoring" },
      { label: "MCV4U Calculus & Vectors tutoring", href: "/subjects/calculus-vectors-tutoring" },
      { label: "Math tutoring, Grade 9–12", href: "/subjects/math-tutoring" }
    ],
    relatedArticles: ["why-grade-12-marks-drop", "what-ontario-universities-look-at"]
  },
  {
    slug: "how-to-study-for-sch4u-chemistry",
    title: "How to Study for SCH4U Chemistry Without Cramming",
    metaTitle: "How to Study for SCH4U Chemistry",
    metaDescription:
      "A unit-by-unit study approach for SCH4U Grade 12 Chemistry — organic, equilibrium, thermochemistry and more — that builds real understanding instead of last-minute cramming.",
    category: "Study Strategy",
    eyebrow: "Study Strategy · SCH4U",
    readMinutes: 5,
    publishedISO: "2026-04-29",
    publishedLabel: "April 29, 2026",
    excerpt:
      "SCH4U punishes cramming. Here's a unit-by-unit way to study Grade 12 Chemistry that actually holds — from organic to equilibrium.",
    intro: [
      "SCH4U is one of the courses Ontario universities watch most closely for life-science, health-science, and engineering applicants. It's also one of the easiest to fall behind in, because each unit quietly assumes you mastered the last one.",
      "Cramming works for memorization. It fails completely in a course built on chains of reasoning — which is most of Grade 12 Chemistry. Here's how to study it so the understanding actually stays."
    ],
    sections: [
      {
        heading: "Treat each unit as a foundation, not a silo",
        body: [
          "SCH4U moves through organic chemistry, structure and properties of matter, energy changes and rates of reaction, chemical systems and equilibrium, and electrochemistry. They look separate on the course outline, but bonding and structure underpin organic reactions, and the mole work from Grade 11 underpins all of it.",
          "If you don't fully own stoichiometry and the mole concept, every quantitative unit becomes twice as hard. Shore up the foundation first — it pays back across the whole course."
        ]
      },
      {
        heading: "Practise problems, don't reread notes",
        body: [
          "Rereading your notes feels productive and teaches you almost nothing. Chemistry is learned by doing problems until the steps become automatic, then doing harder ones. Work problems with the solutions covered, and only check after you've committed to an answer.",
          "When you get one wrong, don't just note the right answer — figure out which step your reasoning broke at. That single habit separates students who plateau at 75 from students who push past 90."
        ]
      },
      {
        heading: "Use a weekly rhythm, not a pre-test sprint",
        body: [
          "An hour of focused chemistry every week beats a six-hour panic the night before a unit test, because the material needs time to settle between sessions. A steady cadence is also what makes a tutor genuinely useful: small corrections, early, before a misconception hardens.",
          "That weekly rhythm is exactly how our [chemistry tutoring](/subjects/chemistry-tutoring) works — one matched tutor who scored 90+ in SCH4U, every week, working the unit you're actually in. If you'd rather start by talking it through, a [free consultation](/booking) is the simplest first step."
        ]
      }
    ],
    keyTakeaways: [
      "SCH4U units build on each other — secure the mole concept and bonding before the quantitative units.",
      "Practise problems with solutions hidden; diagnose the exact step you got wrong.",
      "A steady weekly rhythm beats pre-test cramming because chemistry needs time to settle.",
      "Catch misconceptions early, while they're still cheap to fix."
    ],
    related: [
      { label: "SCH4U Chemistry tutoring", href: "/subjects/chemistry-tutoring" },
      { label: "Book a free consultation", href: "/booking" },
      { label: "See all subjects", href: "/subjects" }
    ],
    relatedArticles: ["why-grade-12-marks-drop", "first-year-university-science-is-different"]
  },
  {
    slug: "why-grade-12-marks-drop",
    title: "Why Grade 12 Marks Drop — and How to Stop the Slide",
    metaTitle: "Why Grade 12 Marks Drop (and How to Stop It)",
    metaDescription:
      "Strong students often see marks slip in Grade 12. Here's why the jump from Grade 11 catches families off guard — and a calm, practical plan to reverse it.",
    category: "Study Strategy",
    eyebrow: "Study Strategy · Grade 11 → 12",
    readMinutes: 4,
    publishedISO: "2026-05-13",
    publishedLabel: "May 13, 2026",
    excerpt:
      "The jump from Grade 11 to 12 surprises a lot of capable students. Here's what changes, why marks slip, and how to turn it around without panic.",
    intro: [
      "A parent's most common worry sounds like this: my child always did well, and suddenly the marks are sliding. It's one of the most familiar patterns we see, and it almost never means the student got worse at school.",
      "It usually means the course got harder faster than the study habits did. The good news: that's a fixable gap, and the earlier you catch it, the smaller the fix."
    ],
    sections: [
      {
        heading: "Grade 12 raises the bar on its own",
        body: [
          "Grade 12 U courses move faster, assume more, and grade more strictly than Grade 11. The same effort that earned an 88 last year can quietly produce a 78 this year — not because the student slipped, but because the bar moved.",
          "Courses like [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring) and [SCH4U Chemistry](/subjects/chemistry-tutoring) are notorious for this. They build relentlessly on prior units, so a single shaky foundation drags everything after it."
        ]
      },
      {
        heading: "The real damage is to confidence",
        body: [
          "The first lower mark is rarely the problem. The story a student tells themselves about it is. \"Maybe I'm just not a math person\" becomes a reason to disengage, and disengagement is what actually sinks the average.",
          "Reversing the slide is as much about rebuilding belief as it is about content. A few wins, early, change the whole trajectory of a term."
        ]
      },
      {
        heading: "A calm, specific plan beats more pressure",
        body: [
          "Piling on stress rarely helps. What helps is diagnosing the exact gap, fixing it with focused practice, and keeping a steady weekly rhythm so the student is always a step ahead of the next unit rather than a step behind.",
          "That's the entire idea behind [how we work](/how-it-works): one matched tutor, weekly, building on real understanding rather than cramming. If the slide has started, the best time to step in is now — a [free consultation](/booking) is a no-pressure place to begin."
        ]
      }
    ],
    keyTakeaways: [
      "Grade 12 grades more strictly and moves faster — the same effort can yield a lower mark.",
      "The biggest risk is to confidence, not knowledge.",
      "Catch it early: small gaps are cheap to fix, hardened ones aren't.",
      "A calm, specific weekly plan beats added pressure every time."
    ],
    related: [
      { label: "How PAL's Academy works", href: "/how-it-works" },
      { label: "Advanced Functions tutoring", href: "/subjects/advanced-functions-tutoring" },
      { label: "Book a free consultation", href: "/booking" }
    ],
    relatedArticles: ["mhf4u-vs-mcv4u-which-is-harder", "how-to-study-for-sch4u-chemistry"]
  },
  {
    slug: "what-ontario-universities-look-at",
    title: "What Ontario Universities Actually Look At: Your Top 6 Explained",
    metaTitle: "What Ontario Universities Look At: Top 6",
    metaDescription:
      "How Ontario university admission averages really work — the Top 6 Grade 12 U/M courses, prerequisites, and why a few key marks carry outsized weight. A clear guide.",
    category: "University Prep",
    eyebrow: "University Prep · Admissions",
    readMinutes: 5,
    publishedISO: "2026-05-27",
    publishedLabel: "May 27, 2026",
    excerpt:
      "A plain-English guide to how Ontario admission averages are built — the Top 6, prerequisite courses, and where to focus your energy.",
    intro: [
      "Ontario's university admissions process is less mysterious than it feels — but the details matter, and misunderstanding them costs students offers every year.",
      "Here's how the core of it actually works, without the rumours."
    ],
    sections: [
      {
        heading: "Your admission average is built from six courses",
        body: [
          "Most Ontario universities calculate your admission average from your best six Grade 12 U (university-preparation) or M (university/college) courses. That average — your \"Top 6\" — is the number programs compare you on.",
          "Crucially, required prerequisite courses are usually included whether or not they're among your strongest. So if a program requires Calculus and Vectors, your MCV4U mark counts even if it's not in your best six."
        ]
      },
      {
        heading: "Prerequisites are where a few marks decide everything",
        body: [
          "Competitive programs require specific courses and look closely at them. Life-science and health programs lean on [SCH4U Chemistry](/subjects/chemistry-tutoring) and [SBI4U Biology](/subjects/biology-tutoring); engineering and math programs require [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring), often alongside [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring) and SPH4U Physics.",
          "Because these prerequisite marks are non-negotiable, they carry outsized weight. A strong Top 6 average with a weak required course can still close doors at the most selective programs."
        ]
      },
      {
        heading: "Where to actually put your energy",
        body: [
          "Protect your prerequisite marks first — they're the ones you can't drop. Then build a Top 6 that plays to your strengths while meeting every program requirement you care about. And remember that English (ENG4U) is a near-universal requirement, so it belongs on the priority list even for STEM applicants.",
          "If a prerequisite course is the one giving you trouble, that's the highest-leverage place to get help. A [free consultation](/booking) is a good way to figure out where your energy will pay off most before the school year gets away from you."
        ]
      }
    ],
    keyTakeaways: [
      "Admission averages come from your best six Grade 12 U/M courses — your \"Top 6\".",
      "Required prerequisite marks usually count regardless, so they carry extra weight.",
      "Competitive programs scrutinize prerequisites like MCV4U, SCH4U, SBI4U and SPH4U.",
      "Protect prerequisite marks first; don't forget ENG4U is near-universal."
    ],
    related: [
      { label: "Chemistry (SCH4U) tutoring", href: "/subjects/chemistry-tutoring" },
      { label: "Calculus & Vectors (MCV4U) tutoring", href: "/subjects/calculus-vectors-tutoring" },
      { label: "Book a free consultation", href: "/booking" }
    ],
    relatedArticles: ["mhf4u-vs-mcv4u-which-is-harder", "first-year-university-science-is-different"]
  },
  {
    slug: "first-year-university-science-is-different",
    title: "First-Year University Science Is a Different Game",
    metaTitle: "First-Year University Science: How to Prepare",
    metaDescription:
      "Why first-year university biology, chemistry and physics overwhelm strong high-school students — and how to adjust your study approach before the first midterm.",
    category: "University Prep",
    eyebrow: "University Prep · First Year",
    readMinutes: 5,
    publishedISO: "2026-06-03",
    publishedLabel: "June 3, 2026",
    excerpt:
      "The students who struggle most in first-year science are often the ones who barely had to study in high school. Here's what changes — and how to adapt.",
    intro: [
      "Every fall, a familiar kind of student hits a wall: the one who coasted to a 90s average in high school and is suddenly underwater in first-year biology, chemistry, or physics.",
      "It's almost never about ability. It's about a learning environment that runs on completely different rules — and nobody warned them."
    ],
    sections: [
      {
        heading: "The pace and volume change everything",
        body: [
          "A first-year course can cover in one week what high school spread across a month. Lectures move fast and don't wait for you, content volume is relentless, and a single midterm can be worth more than an entire high-school term's worth of tests.",
          "The study habits that earned top marks in Grade 12 — reviewing the night before, relying on class time to absorb everything — simply don't scale to that pace."
        ]
      },
      {
        heading: "Nobody is tracking whether you fell behind",
        body: [
          "High school has guardrails: reminders, check-ins, teachers who notice. First year removes almost all of them. You can drift two weeks behind in organic chemistry without a single prompt, and by the time the midterm reveals it, catching up is brutal.",
          "Staying current — week to week, not crisis to crisis — is the single biggest predictor of who thrives."
        ]
      },
      {
        heading: "Adjust before the first midterm, not after",
        body: [
          "The students who adapt fastest test themselves constantly, work problems instead of rereading, and get help early rather than after a bad mark. A weekly hour with someone who has already cleared the course keeps you honest and current.",
          "We support first-year [biology](/subjects/biology-tutoring), [chemistry](/subjects/chemistry-tutoring), and physics alongside the high-school curriculum — same model, same weekly cadence. A [free consultation](/booking) is the easiest way to map out a plan before the term gets ahead of you."
        ]
      }
    ],
    keyTakeaways: [
      "First-year science moves faster and weighs single assessments much more heavily.",
      "The guardrails of high school disappear — staying current is on you.",
      "Test yourself and work problems; rereading notes doesn't scale.",
      "Adapt before the first midterm, not after a disappointing one."
    ],
    related: [
      { label: "Biology tutoring (incl. first-year)", href: "/subjects/biology-tutoring" },
      { label: "Chemistry tutoring (incl. first-year)", href: "/subjects/chemistry-tutoring" },
      { label: "Book a free consultation", href: "/booking" }
    ],
    relatedArticles: ["how-to-study-for-sch4u-chemistry", "what-ontario-universities-look-at"]
  },
  {
    slug: "does-online-tutoring-actually-work",
    title: "Does Online Tutoring Actually Work? An Honest Answer",
    metaTitle: "Does Online Tutoring Actually Work?",
    metaDescription:
      "An honest look at whether online tutoring works as well as in-person — what makes it effective, where it falls short, and how to tell if it's right for your family.",
    category: "How We Help",
    eyebrow: "How We Help · Online Learning",
    readMinutes: 4,
    publishedISO: "2026-06-10",
    publishedLabel: "June 10, 2026",
    excerpt:
      "A straight answer to the question parents ask us most: does online tutoring really work — and when does it work best?",
    intro: [
      "It's the first question many parents ask, and they're right to ask it. Plenty of online tutoring is mediocre, so the honest answer isn't a blanket yes.",
      "Online tutoring works extremely well under specific conditions — and falls flat without them. Here's the real version."
    ],
    sections: [
      {
        heading: "What makes online tutoring genuinely effective",
        body: [
          "Three things, mostly. A consistent weekly cadence so learning compounds. The same tutor each time, who remembers where the student is. And real tools — a shared screen and a digital whiteboard where tutor and student work the same problem together, in real time.",
          "When those are in place, the medium nearly disappears. A student in Brampton and a student in Scarborough get the same tutor quality, and the half-hour that would have gone to a commute goes into the lesson instead."
        ]
      },
      {
        heading: "Where it falls short",
        body: [
          "Online struggles when sessions are one-off and disconnected, when the student is passive and the tutor just talks, or when there's no structure between sessions. None of that is a flaw of \"online\" — it's a flaw of how it's run. The same setup fails in person too.",
          "It also asks something of the student: a quiet space and a willingness to engage on camera. For most high-school and university students, that's a low bar."
        ]
      },
      {
        heading: "How we run it",
        body: [
          "Every PAL's Academy session is online over Google Meet, by design — one matched tutor, the same one each week, working the exact course your student is taking. We chose online not as a compromise but because it removes the commute and lets us match a student to the right tutor regardless of where in the GTA they live.",
          "You can see the full approach on [how it works](/how-it-works), find your city on our [tutoring by city](/tutoring) pages, or just [book a free consultation](/booking) and judge the fit for yourself — no pressure, no pitch."
        ]
      }
    ],
    keyTakeaways: [
      "Online tutoring works when it has cadence, a consistent tutor, and real shared-screen tools.",
      "It fails when sessions are one-off, passive, or unstructured — the same way in-person does.",
      "It needs a quiet space and a student willing to engage — a low bar for most.",
      "PAL's runs online by design: same tutor weekly, no commute, GTA-wide matching."
    ],
    related: [
      { label: "How PAL's Academy works", href: "/how-it-works" },
      { label: "Tutoring by city across the GTA", href: "/tutoring" },
      { label: "Book a free consultation", href: "/booking" }
    ],
    relatedArticles: ["why-grade-12-marks-drop", "first-year-university-science-is-different"]
  }
];

/** Lookup map by slug for O(1) access in the dynamic route. */
const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

/** All slugs, for generateStaticParams and the sitemap. */
export const articleSlugs = articles.map((a) => a.slug);

/** Newest-first, for the index and "related" rendering. */
export const articlesByNewest = [...articles].sort((a, b) =>
  b.publishedISO.localeCompare(a.publishedISO)
);
