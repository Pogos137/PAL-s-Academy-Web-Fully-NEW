// Single source of truth for the city / location SEO landing pages served at
// /tutoring/<slug>. Each entry powers one page: hero, local-context section,
// "why online", a subjects interlink, and a city-specific FAQ (which also feeds
// the FAQPage structured data).
//
// HONESTY GUARDRAILS (see CLAUDE.md + knowledge base):
//   • Delivery is 100% ONLINE via Google Meet. In-person is a *future* option,
//     never implied as available today. "No commute" is a genuine benefit.
//   • PAL's Academy is pre-launch — NEVER fabricate track record, student
//     counts, or "trusted by N families in <city>". These pages describe the
//     service offered to each community, not a history we don't have yet.
//   • Local facts (school boards, nearby campuses) are public, verifiable, and
//     deliberately kept to high-confidence items (boards + universities).
//   • Pricing must stay in sync with /pricing: Starter $375 (5 sessions),
//     Core $750 (10), Intensive $1,125 (15), PAL's Circle $420/student (12) —
//     all CAD, billed upfront as a package (no monthly/cancel-anytime framing).

export type LocationFaq = { q: string; a: string };
export type LocationHighlight = { title: string; body: string };

export type LocationContent = {
  /** URL slug under /tutoring, e.g. "toronto". */
  slug: string;
  /** City name used in headings/breadcrumbs, e.g. "Toronto". */
  city: string;
  /** Broader region for context, e.g. "York Region". */
  region: string;
  /** ≤ ~46 char title segment; buildMetadata appends "· PAL's Academy". */
  metaTitle: string;
  /** 150–160 char, keyword-forward meta description ending in a CTA. */
  metaDescription: string;
  /** Eyebrow above the H1. */
  eyebrow: string;
  /** The page H1. */
  h1: string;
  /** One-paragraph hero intro. */
  heroIntro: string;
  /** Public school boards serving the city (high-confidence facts). */
  boards: string[];
  /** Nearby post-secondary campuses students commonly aim for. */
  universities: string[];
  /** Local-context body paragraphs — the differentiating, non-templated copy. */
  localBody: string[];
  /** Three "why online works" highlight cards. */
  highlights: LocationHighlight[];
  /** Optional: real neighbourhoods/areas within the city we support, rendered as
   *  a geo-relevance section. Public geographic facts only — never implies a
   *  physical location or office in the neighbourhood. */
  neighbourhoods?: string[];
  /** City-specific FAQs → visible list + FAQPage schema. */
  faqs: LocationFaq[];
  /** Slugs of nearby city pages for internal linking. */
  nearby: string[];
};

export const locations: LocationContent[] = [
  {
    slug: "toronto",
    city: "Toronto",
    region: "City of Toronto",
    metaTitle: "Toronto Tutoring · Grade 9–12 & University",
    metaDescription:
      "Online 1-on-1 tutoring for Toronto students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Toronto · TDSB & TCDSB",
    h1: "Private tutoring for Toronto students.",
    heroIntro:
      "Toronto's top university programs are competitive, and the gap between a B+ and an A often comes down to a few concepts that never quite clicked. We pair Toronto students with a tutor who scored 90+ in their exact course and meet weekly, online, so the work fits around school, transit, and everything else.",
    boards: [
      "Toronto District School Board (TDSB)",
      "Toronto Catholic District School Board (TCDSB)"
    ],
    universities: [
      "University of Toronto (St. George)",
      "Toronto Metropolitan University",
      "York University",
      "OCAD University"
    ],
    localBody: [
      "Toronto is the most competitive admissions market in the country. Students across the TDSB and TCDSB are aiming at the University of Toronto, Toronto Metropolitan, and out-of-province programs where a single Grade 12 mark in chemistry, calculus, or English can decide an offer. The pressure is real, and it rarely shows up as a knowledge problem — it shows up as a confidence problem.",
      "We work the actual Ontario curriculum your student is sitting in, by course code, and we keep the same tutor every week so nothing has to be re-explained from scratch. Because sessions run online over Google Meet, a student in Yorkville and a student in Scarborough get the same tutor quality with zero commute — no fighting the 401 or the subway to get to a lesson.",
      "That reach matters in a city this spread out. We support families from Midtown, Forest Hill, and Rosedale to Leaside, Riverdale, the Beaches, and High Park, and out through North York and Etobicoke — without anyone needing to travel. Whether your student is in a competitive academic stream downtown or a fast-moving west-end classroom, the tutor is matched to the course, not to the postal code.",
      "The courses that most often decide a Toronto student's options are the Grade 11 and 12 sciences and maths — [SCH4U Chemistry](/subjects/chemistry-tutoring), [SPH4U Physics](/subjects/physics-tutoring), [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring), and [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring) — alongside ENG4U English, which nearly every program counts. These are exactly the courses our tutors specialise in, each having earned 90+ in the subject they teach.",
      "We don't promise a letter grade by a date. What we do is find where the understanding actually broke — usually a unit or two before the marks slipped — and rebuild from there, with written lesson notes after each session so parents can see what changed. For most Toronto students, momentum returns within the first few weeks, and a clearer grade picture follows by the end of the reporting term."
    ],
    neighbourhoods: [
      "Yorkville",
      "Midtown",
      "The Annex",
      "Forest Hill",
      "Rosedale",
      "Leaside",
      "Riverdale",
      "The Beaches",
      "High Park",
      "Davisville"
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Sessions run on Google Meet from wherever your student studies best. That's an hour of tutoring, not an hour of tutoring plus an hour of Toronto traffic each way."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We tutor by course code — SCH4U, MCV4U, ENG4U and the rest — so the work maps onto what your student's Toronto teacher is actually grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor who scored 90+ in the course, every session. Consistency is what turns a shaky term into a steady upward line."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Toronto?",
        a: "Right now every session runs online over Google Meet, so there's no commute and your student keeps the same tutor each week regardless of traffic or weather. An in-person option in the GTA is something we plan to add as we grow."
      },
      {
        q: "Which Toronto courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university science and math for U of T, TMU and York students."
      },
      {
        q: "How are Toronto tutors matched?",
        a: "We match by subject and learning style, and every tutor has earned 90+ in the course they teach (or its university equivalent). You meet them on a free consultation before anything is booked."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["north-york", "etobicoke", "scarborough"]
  },
  {
    slug: "mississauga",
    city: "Mississauga",
    region: "Peel Region",
    metaTitle: "Mississauga Tutoring · Grade 9–12 & Uni",
    metaDescription:
      "Online 1-on-1 tutoring for Mississauga students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Mississauga · Peel DSB & DPCDSB",
    h1: "Private tutoring for Mississauga students.",
    heroIntro:
      "From the Peel board's busiest science classes to first-year courses at UTM, Mississauga students carry a heavy academic load. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, so a strong term doesn't depend on a strong commute.",
    boards: [
      "Peel District School Board",
      "Dufferin-Peel Catholic District School Board"
    ],
    universities: [
      "University of Toronto Mississauga (UTM)",
      "Sheridan College",
      "University of Toronto (St. George)"
    ],
    localBody: [
      "Mississauga's Peel and Dufferin-Peel schools are large and fast-moving, and it's easy for a student to fall a step behind in a packed SCH4U or MCV4U class and never quite catch up. With the University of Toronto Mississauga campus on the doorstep, the marks students earn in Grade 11 and 12 matter directly for where they land next.",
      "We tutor the exact course your student is taking, by code, with the same tutor every week. Sessions are online over Google Meet, so a student near Square One and one out by Meadowvale get identical tutor quality — and parents get an hour of tutoring back instead of spending it driving across the city.",
      "Because there's no commute, where you live in Mississauga doesn't change the help your student gets. We work with families from Port Credit and Lorne Park to Erin Mills, Churchill Meadows, Streetsville, and Meadowvale — matching the tutor to the course rather than to whichever learning centre happens to be nearby.",
      "The courses that carry the most weight here are the Grade 11 and 12 sciences and maths — [SCH4U Chemistry](/subjects/chemistry-tutoring), [SPH4U Physics](/subjects/physics-tutoring), [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring), and [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring) — alongside ENG4U English. For students continuing at UTM, we also support first-year university chemistry, biology, and calculus.",
      "We won't promise a grade by a date. Instead, the tutor finds the unit where the understanding first slipped and rebuilds from there, sending written notes after each session so you can follow the progress. Most Mississauga families notice steadier confidence within a few weeks and a clearer mark by the end of the term."
    ],
    neighbourhoods: [
      "Port Credit",
      "Streetsville",
      "Erin Mills",
      "Meadowvale",
      "Lorne Park",
      "City Centre / Square One",
      "Churchill Meadows",
      "Clarkson",
      "Cooksville"
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet from home. No driving to Square One and back, no lost evenings in Mississauga traffic — just the lesson."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We teach by course code so the work lines up with what your student's Peel or Dufferin-Peel teacher is grading this week."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the subject, every session — the consistency that actually moves a mark."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Mississauga?",
        a: "All sessions are currently online over Google Meet, which means no commute and the same tutor every week. We plan to add an in-person option across the GTA as we grow."
      },
      {
        q: "Which Mississauga courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university science and math, including UTM courses."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style. Every tutor has earned 90+ in the course they teach, and you meet them on a free consultation before booking."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["etobicoke", "brampton", "toronto"]
  },
  {
    slug: "markham",
    city: "Markham",
    region: "York Region",
    metaTitle: "Markham Tutoring · Grade 9–12 & University",
    metaDescription:
      "Online 1-on-1 tutoring for Markham students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Markham · YRDSB & YCDSB",
    h1: "Private tutoring for Markham students.",
    heroIntro:
      "Markham is one of the most academically driven communities in the GTA, and the bar students set for themselves is high. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, to turn that drive into marks that hold under pressure.",
    boards: [
      "York Region District School Board (YRDSB)",
      "York Catholic District School Board"
    ],
    universities: [
      "York University",
      "University of Toronto",
      "Seneca Polytechnic"
    ],
    localBody: [
      "Markham students compete hard — for the top marks in YRDSB and York Catholic classrooms, and for spots in the most selective university programs. In that environment, a single weak unit in advanced functions or chemistry can feel like it threatens the whole plan, and the stress can do more damage than the gap itself.",
      "Our job is to make the hard parts make sense, calmly, with the same tutor every week working the exact Ontario course your student is taking. Sessions are online over Google Meet, so the time goes into learning rather than into driving across Markham — and your student keeps a tutor who actually knows where they are in the course.",
      "Markham is large, and demand for strong tutoring runs through all of it. Because sessions are online, students in Unionville, Cornell, Berczy Village, Markham Village, Cathedraltown, and Greensborough all get the same 90+ tutor — no drive to a plaza learning centre, no waitlist tied to a single location.",
      "The courses that decide the most here are the Grade 11 and 12 sciences and maths — [SCH4U Chemistry](/subjects/chemistry-tutoring), [SPH4U Physics](/subjects/physics-tutoring), [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring), and [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring) — together with ENG4U English. We also support first-year university math and science for students heading to York, U of T, or Seneca.",
      "We don't trade in grade guarantees. The tutor finds where the understanding actually broke, rebuilds it properly, and sends lesson notes after every session so the progress is visible. For most Markham students, the first thing to return is confidence — and a steadier mark follows it."
    ],
    neighbourhoods: [
      "Unionville",
      "Cornell",
      "Markham Village",
      "Berczy Village",
      "Cathedraltown",
      "Greensborough",
      "Wismer",
      "Milliken Mills"
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet. In a community where every evening is scheduled, that's a real hour back each week."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We tutor by course code so each session maps onto what your student's YRDSB or York Catholic teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the course — steady, familiar, and building on last week instead of starting over."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Markham?",
        a: "Sessions are online over Google Meet for now, which keeps quality high with no commute and the same tutor each week. An in-person GTA option is on our roadmap as we grow."
      },
      {
        q: "Which Markham courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university math and science."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, and every tutor has earned 90+ in the course they teach. You meet them on a free consultation first."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["vaughan", "north-york", "scarborough"]
  },
  {
    slug: "vaughan",
    city: "Vaughan",
    region: "York Region",
    metaTitle: "Vaughan Tutoring · Grade 9–12 & University",
    metaDescription:
      "Online 1-on-1 tutoring for Vaughan students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Vaughan · YRDSB & YCDSB",
    h1: "Private tutoring for Vaughan students.",
    heroIntro:
      "Vaughan families want their students stretched and supported in equal measure. We pair your student with a tutor who scored 90+ in their exact course and meet weekly, online, building real understanding rather than a last-minute cram before each test.",
    boards: [
      "York Region District School Board (YRDSB)",
      "York Catholic District School Board"
    ],
    universities: [
      "York University",
      "Seneca Polytechnic",
      "University of Toronto"
    ],
    localBody: [
      "Across Vaughan's YRDSB and York Catholic schools, the courses that decide university offers — advanced functions, calculus, chemistry, biology — move quickly, and a student who misses the foundation of a unit often spends the rest of it guessing. With York University and the wider GTA campuses close by, those Grade 11 and 12 marks carry real weight.",
      "We slow the hard parts down and rebuild them properly, with the same tutor each week teaching the exact Ontario course your student is taking. Because everything runs online over Google Meet, a student in Woodbridge and one in Maple get the same tutor quality with no commute and no wasted evenings.",
      "Vaughan is spread across several distinct communities, and online tutoring reaches all of them equally. We work with families in Woodbridge, Maple, Thornhill, Kleinburg, Concord, and Vellore Village — the tutor is chosen for the course your student is in, not for how close they happen to live.",
      "The heaviest-weighted courses are the Grade 11 and 12 sciences and maths — [SCH4U Chemistry](/subjects/chemistry-tutoring), [SPH4U Physics](/subjects/physics-tutoring), [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring), and [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring) — plus ENG4U English. First-year university math and science support is there too for students moving on to York or U of T.",
      "There are no grade guarantees from us — just honest work. The tutor traces the gap back to where it started, rebuilds the foundation, and leaves written notes after each session so you can see what changed. For most Vaughan students, confidence steadies first, and the mark follows."
    ],
    neighbourhoods: [
      "Woodbridge",
      "Maple",
      "Thornhill",
      "Kleinburg",
      "Concord",
      "Vellore Village",
      "Patterson"
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Sessions are online over Google Meet — no driving across Vaughan, no weather days, just the lesson on schedule."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We teach by course code so the work matches what your student's YRDSB or York Catholic teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the subject, every session — consistency that compounds into a steady mark."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Vaughan?",
        a: "For now all sessions run online over Google Meet, so there's no commute and your student keeps the same tutor weekly. An in-person option across the GTA is planned as we grow."
      },
      {
        q: "Which Vaughan courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university math and science."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, with every tutor having earned 90+ in the course they teach. You meet them on a free consultation before booking."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["markham", "north-york", "brampton"]
  },
  {
    slug: "brampton",
    city: "Brampton",
    region: "Peel Region",
    metaTitle: "Brampton Tutoring · Grade 9–12 & Uni",
    metaDescription:
      "Online 1-on-1 tutoring for Brampton students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Brampton · Peel DSB & DPCDSB",
    h1: "Private tutoring for Brampton students.",
    heroIntro:
      "Brampton's classrooms are large and the pace is quick, which makes it easy for a capable student to slip a step behind. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, to close the gap before it widens.",
    boards: [
      "Peel District School Board",
      "Dufferin-Peel Catholic District School Board"
    ],
    universities: [
      "Sheridan College (Davis Campus)",
      "Algoma University (Brampton)",
      "University of Toronto Mississauga"
    ],
    localBody: [
      "In Brampton's Peel and Dufferin-Peel schools, science and math classes are often full and fast, and one missed foundation in chemistry or functions can quietly undermine an entire term. For students aiming at competitive university programs, the Grade 11 and 12 marks are what open or close the door.",
      "We give those students one-on-one attention on the exact course they're taking, with the same tutor every week. Sessions are online over Google Meet, so a student anywhere in Brampton gets the same tutor quality without a commute — and parents reclaim the evenings they'd otherwise spend driving.",
      "Brampton is one of the fastest-growing cities in the country, and online tutoring keeps up with it everywhere. We work with families from Springdale and Mount Pleasant to Bramalea, Heart Lake, Castlemore, and Credit Valley — matching the tutor to the course rather than to a fixed location.",
      "The marks that matter most come from the Grade 11 and 12 sciences and maths — [SCH4U Chemistry](/subjects/chemistry-tutoring), [SPH4U Physics](/subjects/physics-tutoring), [MHF4U Advanced Functions](/subjects/advanced-functions-tutoring), and [MCV4U Calculus & Vectors](/subjects/calculus-vectors-tutoring) — together with ENG4U English. We also support first-year university chemistry, biology, and calculus for students continuing locally or downtown.",
      "We don't promise a number by a date. The tutor finds where the understanding first broke, rebuilds it patiently, and shares lesson notes after every session so the progress is clear. Most Brampton families see confidence return within a few weeks and a steadier grade by the end of the term."
    ],
    neighbourhoods: [
      "Springdale",
      "Bramalea",
      "Mount Pleasant",
      "Heart Lake",
      "Castlemore",
      "Credit Valley",
      "Fletcher's Meadow",
      "Sandalwood"
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet from home. No driving across Brampton, no lost time — the full hour goes into the lesson."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We teach by course code so each session matches what your student's Peel or Dufferin-Peel teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the subject, every session — the steady cadence that actually moves a grade."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Brampton?",
        a: "All sessions are online over Google Meet for now, which means no commute and the same tutor each week. We plan to add an in-person GTA option as we grow."
      },
      {
        q: "Which Brampton courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university math and science."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, and every tutor has earned 90+ in the course they teach. You meet them on a free consultation before anything is booked."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["mississauga", "vaughan", "toronto"]
  },
  {
    slug: "north-york",
    city: "North York",
    region: "City of Toronto",
    metaTitle: "North York Tutoring · Grade 9–12 & Uni",
    metaDescription:
      "Online 1-on-1 tutoring for North York students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · North York · TDSB & TCDSB",
    h1: "Private tutoring for North York students.",
    heroIntro:
      "North York is home to some of Toronto's most demanding academic programs, and students here aim high. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, to keep the hard courses from becoming the deciding ones.",
    boards: [
      "Toronto District School Board (TDSB)",
      "Toronto Catholic District School Board (TCDSB)"
    ],
    universities: [
      "York University",
      "University of Toronto",
      "Seneca Polytechnic"
    ],
    localBody: [
      "North York's TDSB and TCDSB schools include some of the city's strongest academic streams, and the competition for top marks is intense. With York University in the neighbourhood and U of T a short ride away, the chemistry, calculus and English marks students earn in Grade 12 translate directly into university options.",
      "We work the exact Ontario course your student is taking, by code, with the same tutor each week so progress builds instead of resetting. Sessions run online over Google Meet, so students from Willowdale to Don Mills get the same tutor quality with no commute eating into study time."
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet — no travel across North York, no transit time, just the lesson when it's scheduled."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We tutor by course code so the work maps onto what your student's TDSB or TCDSB teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the subject, every session — building on last week rather than starting fresh."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in North York?",
        a: "Sessions are online over Google Meet for now, which keeps the same tutor each week with no commute. An in-person GTA option is on our roadmap as we grow."
      },
      {
        q: "Which North York courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university math and science."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, with every tutor having earned 90+ in the course they teach. You meet them on a free consultation first."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["toronto", "vaughan", "markham"]
  },
  {
    slug: "scarborough",
    city: "Scarborough",
    region: "City of Toronto",
    metaTitle: "Scarborough Tutoring · Grade 9–12 & Uni",
    metaDescription:
      "Online 1-on-1 tutoring for Scarborough students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Scarborough · TDSB & TCDSB",
    h1: "Private tutoring for Scarborough students.",
    heroIntro:
      "With the University of Toronto Scarborough campus right in the community, the marks students earn here matter close to home. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, so the hard courses become a strength rather than a worry.",
    boards: [
      "Toronto District School Board (TDSB)",
      "Toronto Catholic District School Board (TCDSB)"
    ],
    universities: [
      "University of Toronto Scarborough (UTSC)",
      "Centennial College",
      "University of Toronto (St. George)"
    ],
    localBody: [
      "Scarborough's TDSB and TCDSB schools serve a huge, diverse range of students, and in big classes the students who quietly fall behind in SCH4U or MCV4U are often the ones who needed only a little focused help. With UTSC and Centennial nearby, strong Grade 11 and 12 marks keep excellent local options open.",
      "We give one-on-one attention on the exact Ontario course your student is taking, with the same tutor each week. Everything runs online over Google Meet, so a student near the Bluffs and one up by Malvern get identical tutor quality without spending the evening on a bus."
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet from home — no travel across Scarborough, no transit time, just the lesson."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We teach by course code so the work lines up with what your student's TDSB or TCDSB teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the course, every session — the consistency that turns effort into results."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Scarborough?",
        a: "All sessions are online over Google Meet for now, which means no commute and the same tutor weekly. An in-person GTA option is planned as we grow."
      },
      {
        q: "Which Scarborough courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university science and math, including UTSC courses."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, and every tutor has earned 90+ in the course they teach. You meet them on a free consultation before booking."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["toronto", "markham", "north-york"]
  },
  {
    slug: "etobicoke",
    city: "Etobicoke",
    region: "City of Toronto",
    metaTitle: "Etobicoke Tutoring · Grade 9–12 & Uni",
    metaDescription:
      "Online 1-on-1 tutoring for Etobicoke students in Grade 9–12 and first-year university — math, sciences, English & CS, matched to a 90+ tutor. Book a free consultation.",
    eyebrow: "Online · Etobicoke · TDSB & TCDSB",
    h1: "Private tutoring for Etobicoke students.",
    heroIntro:
      "Etobicoke students juggle demanding course loads with everything else a west-end life involves. We match your student with a tutor who scored 90+ in their exact course and meet weekly, online, so the toughest subjects get steady attention without adding a commute.",
    boards: [
      "Toronto District School Board (TDSB)",
      "Toronto Catholic District School Board (TCDSB)"
    ],
    universities: [
      "Humber College",
      "University of Toronto",
      "Toronto Metropolitan University"
    ],
    localBody: [
      "Across Etobicoke's TDSB and TCDSB schools, the Grade 11 and 12 sciences and math courses are where university plans are quietly won or lost. A capable student who falls behind early in chemistry or functions can spend months compensating — when a few focused sessions would have fixed the foundation.",
      "We tutor the exact course your student is taking, by code, with the same tutor every week. Because sessions are online over Google Meet, a student near the Kingsway and one out by Rexdale get the same tutor quality with no commute and no evenings lost to traffic on the Gardiner or the 427."
    ],
    highlights: [
      {
        title: "No commute, ever",
        body: "Online over Google Meet — no driving across Etobicoke, no time lost to the 427, just the lesson on schedule."
      },
      {
        title: "The Ontario curriculum, exactly",
        body: "We teach by course code so each session matches what your student's TDSB or TCDSB teacher is grading."
      },
      {
        title: "The same tutor every week",
        body: "One matched tutor, 90+ in the subject, every session — steady progress instead of constant restarts."
      }
    ],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Etobicoke?",
        a: "Sessions are online over Google Meet for now, which keeps the same tutor each week with no commute. An in-person option across the GTA is on our roadmap as we grow."
      },
      {
        q: "Which Etobicoke courses do you cover?",
        a: "The full Grade 9–12 Ontario sequence — math, chemistry, physics, biology, English, French and computer science — plus first-year university math and science."
      },
      {
        q: "How are tutors matched?",
        a: "By subject and learning style, with every tutor having earned 90+ in the course they teach. You meet them on a free consultation first."
      },
      {
        q: "What does it cost?",
        a: "Our packages are billed upfront in CAD: a Starter is $375 for five 1-on-1 sessions, a Core $750 for ten, and an Intensive $1,125 for fifteen. A small-group PAL's Circle is $420 per student. Full pricing is on our pricing page."
      }
    ],
    nearby: ["toronto", "mississauga", "north-york"]
  }
];

/** Lookup map by slug for O(1) access in the dynamic route. */
const bySlug = new Map(locations.map((l) => [l.slug, l]));

export function getLocation(slug: string): LocationContent | undefined {
  return bySlug.get(slug);
}

/** All slugs, for generateStaticParams and the sitemap. */
export const locationSlugs = locations.map((l) => l.slug);
