// Single source of truth for the city × subject intersection landing pages
// served at /tutoring/<city>/<subject> (e.g. /tutoring/toronto/chemistry).
// These are the highest-intent SEO targets — "chemistry tutor Toronto",
// "MHF4U tutor Mississauga" — matching purchase-intent queries exactly.
//
// IMPORTANT: this is a *curated allowlist*, NOT every city × subject combination.
// Generating all 8×8 pairs would create thin, near-duplicate doorway pages that
// Google penalises. Each entry below is a high-value pair with HAND-WRITTEN,
// unique intro, "choosing a tutor", "why it matters" and FAQ copy. Only the
// school boards and universities are pulled from locations-content. Measure
// before shipping a new entry: at least ~65% of a page's body text should
// appear on no other page. The pages Google declined to index sat at 38–53%.
//
// HONESTY GUARDRAILS (see CLAUDE.md): online-only delivery,
// pre-launch (no fabricated track record), and NO DOLLAR FIGURES — packages are
// quoted on the free consultation so they can be scoped to the student. Cost
// questions stay (high-intent queries) but answer by explaining the package
// model and pointing to a call.

export type IntersectionFaq = { q: string; a: string };
export type IntersectionCriterion = { title: string; body: string };

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
  /** Three "choosing a tutor" cards, written for this subject in this city.
   *  Never reuse the subject page's topics or "why" copy here: when these pages
   *  reprinted it, Google crawled them as near-copies of /subjects/<subject>
   *  and left them out of the index (GSC, Oct 2026). */
  criteria: IntersectionCriterion[];
  /** H2 for the "why it matters" section. */
  localTitle: string;
  /** Where the course leads for students in this city. May contain inline
   *  [label](/path) or [label](https://…) links. */
  localBody: string[];
  /** Intersection-specific FAQs → visible list + FAQPage schema. */
  faqs: IntersectionFaq[];
};

export const intersections: Intersection[] = [
  {
    citySlug: "toronto",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutoring Toronto | SCH4U & SCH3U",
    metaDescription:
      "Chemistry tutoring for Toronto students: SCH3U, SCH4U and first-year university chemistry, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Chemistry tutoring for Toronto students.",
    intro: [
      "In Toronto's competitive university race, SCH4U chemistry is one of the marks that decides offers in life sciences, health, and engineering. We pair Toronto students with a chemistry tutor who scored 90+ in the exact course — SCH3U, SCH4U, or first-year university chemistry — and meet weekly online, so the help fits around school and transit instead of adding another commute.",
      "Sessions run live online with a shared whiteboard, so a student in Etobicoke and one downtown get the same tutor quality. We work the Ontario curriculum by course code, in the same order your student's TDSB or TCDSB teacher does — the mole, equilibrium, organic — so tutoring reinforces class rather than competing with it."
    ],
    criteria: [
      {
        title: "Their SCH4U mark, not a subject list",
        body: "Plenty of tutors list chemistry among half a dozen subjects. Ask which chemistry courses they took and what they earned in SCH4U itself. Every tutor we match scored 90+ in the exact course they teach, so organic and electrochemistry are familiar ground rather than a refresher."
      },
      {
        title: "Your teacher's unit order",
        body: "The Ontario curriculum sets SCH4U's five units but not the order they are taught in, so TDSB and TCDSB classes often run them differently. A good tutor asks for the course outline and works in step with it, so sessions land the week before a unit test, not the week after."
      },
      {
        title: "A check on Grade 11 first",
        body: "Most SCH4U trouble starts in SCH3U, with a mole or stoichiometry idea that never fully landed. A tutor who goes straight to equilibrium ends up patching symptoms. Ours spend the first sessions finding where the foundation actually broke, then build forward from there."
      }
    ],
    localTitle: "Where SCH4U leads for Toronto students.",
    localBody: [
      "SCH4U is a required or recommended course for many life-science, health and engineering programs at the University of Toronto, Toronto Metropolitan University and York, which is why one chemistry credit can carry more weight than it looks. Requirements differ by program and change between admission cycles, so confirm the current list on [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) before planning around it.",
      "For students already at U of T, TMU or York, first-year chemistry moves faster and assumes SCH4U is solid, and we tutor that step too. If your student is still choosing between the Grade 12 sciences, our comparison of [SCH4U, SPH4U and SBI4U](/blog/sch4u-vs-sph4u-which-is-harder) lays out how they differ, and the [SCH4U course page](/subjects/sch4u-chemistry-tutoring) walks through each unit."
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
        a: "Chemistry costs the same as every other subject we teach. Tutoring is sold as a package of sessions, in CAD, rather than by the hour, and the total depends on how many sessions your student needs and whether 1-on-1 or a small-group PAL's Circle suits them. We quote it on the free consultation, or call (437) 777-4828 and we will walk you through it."
      },
      {
        q: "I searched for a chemistry tutor near me — do you cover my area of Toronto?",
        a: "Yes. Because sessions run live online, \"near me\" stops being a constraint — we tutor students in every Toronto neighbourhood, from Etobicoke and North York to Scarborough, the Beaches and downtown, with no travel fee and no commute. It also means your student is matched to the best chemistry tutor for their course rather than whoever happens to live a few streets away."
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
    metaTitle: "Physics Tutoring Toronto | SPH4U & SPH3U",
    metaDescription:
      "Physics tutoring for Toronto students: SPH3U, SPH4U and first-year university physics, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Physics tutoring for Toronto students.",
    intro: [
      "SPH4U is one of the courses Toronto's engineering and physical-science programs watch most closely — and one where students most often mistake memorizing formulas for understanding. We match Toronto students with a physics tutor who earned 90+ in the course and teaches the reasoning behind the equations, weekly and online.",
      "Because sessions run online, your student keeps the same tutor every week regardless of where in the city you are or what the weather's doing. We follow the TDSB or TCDSB sequence by course code — kinematics, dynamics, fields, waves — so the work lines up with exactly what's being graded."
    ],
    criteria: [
      {
        title: "Diagrams before formulas",
        body: "Watch how a tutor starts a problem. If the first move is reaching for the formula sheet, that is the same habit costing your student marks. Ours start with the picture and the principle, then the math, which is what unfamiliar SPH4U test questions are designed to reward."
      },
      {
        title: "Math that is current",
        body: "SPH4U leans on Grade 11 and 12 math constantly: trigonometry in two-dimensional dynamics, vectors, rearranging equations under time pressure. A physics tutor should catch an algebra slip as quickly as a physics one, because on a test they cost the same marks."
      },
      {
        title: "One slot, every week",
        body: "Between school, practices and the TTC, Toronto weeks fill up fast. Physics improves by repeating the same reasoning until it is automatic, so look for a tutor who holds one fixed weekly slot rather than fitting your student in when there is room."
      }
    ],
    localTitle: "Where SPH4U leads for Toronto students.",
    localBody: [
      "Engineering and physical-science programs at U of T, TMU and York commonly list SPH4U as a required course, often alongside MCV4U and SCH4U in the same application. Because those programs compare applicants on their required courses, a physics mark is rarely just one mark. Check each program's current requirements on [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/), since they change between cycles.",
      "SPH4U marks are rarely lost evenly across the course. They tend to go in the fields unit or when momentum turns two-dimensional, and the [SPH4U course page](/subjects/sph4u-physics-tutoring) covers how we work through both. For study habits, our [SPH4U study guide](/blog/sph4u-physics-study-guide) explains the picture, principle, math method, and first-year physics students at U of T, TMU and York get the same approach."
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
        a: "The same as any other subject: physics is not priced higher for being hard. You buy a package of sessions in CAD rather than paying by the hour, and the total depends on how many sessions your student needs and whether they work 1-on-1 or in a PAL's Circle group of three or four. We quote it on the free consultation, or call (437) 777-4828."
      },
      {
        q: "I searched for a physics tutor near me — do you cover my part of Toronto?",
        a: "Yes. Sessions are live online, so we tutor students across every Toronto neighbourhood — Etobicoke, North York, Scarborough, East York, downtown — with no travel fee and no commute for either side. Being online is also why we can match your student to a tutor who scored 90+ in SPH4U specifically, rather than the closest available tutor."
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
    metaTitle: "Math Tutoring Toronto | MHF4U, MCV4U & More",
    metaDescription:
      "Math tutoring for Toronto students: MCR3U, MHF4U, MCV4U, MDM4U and first-year calculus, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Math tutoring for Toronto students.",
    intro: [
      "From MCR3U Functions through MHF4U Advanced Functions and MCV4U Calculus & Vectors, the Grade 11 and 12 math courses gate most of Toronto's competitive STEM and commerce programs. We match students with a math tutor who scored 90+ in their exact course and meet weekly online to keep small gaps from compounding.",
      "Math is where a missed foundation hurts most, because every unit builds on the last. Our tutors work the Ontario curriculum by course code and rebuild the foundation — clean algebra, function sense, confident problem-solving — so a shaky term turns into a steady upward line. Sessions are online, no commute required."
    ],
    criteria: [
      {
        title: "Matched to the course code",
        body: "MHF4U, MCV4U and MDM4U are three different courses that test different skills, and being strong in one says little about the others. Ask the tutor which of them they took and what they earned. We match on the exact code, with a tutor who scored 90+ in it."
      },
      {
        title: "Algebra checked early",
        body: "Most senior math trouble is really algebra trouble that surfaces in a new unit: factoring, exponent laws, rearranging. A tutor who only teaches the current unit keeps patching the same leak. Ours test the algebra early and rebuild it alongside the course."
      },
      {
        title: "Work from a blank page",
        body: "Following a worked example and producing one are different skills, and tests only measure the second. Expect sessions where your student does the writing and the tutor asks the questions, not an hour of watching someone else solve problems."
      }
    ],
    localTitle: "Where senior math leads for Toronto students.",
    localBody: [
      "At U of T, TMU and York, business, computer science and engineering programs, along with many science programs, ask for MHF4U, MCV4U or both. The Ontario curriculum also requires MHF4U to be taken before or alongside MCV4U, so a shaky Advanced Functions term tends to follow a student straight into calculus. [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) lists what each program currently asks for.",
      "If your student is deciding how to sequence the two, our guide to [MHF4U vs MCV4U](/blog/mhf4u-vs-mcv4u-which-is-harder) explains how they connect. Course-level detail lives on the [MHF4U](/subjects/advanced-functions-tutoring), [MCV4U](/subjects/calculus-vectors-tutoring) and [MDM4U](/subjects/data-management-tutoring) pages, and first-year calculus and linear algebra students at Toronto's universities get the same approach."
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
        a: "No more than any other subject; the harder courses do not cost extra. What you pay for is a package of sessions in CAD, sized on the free consultation to the number of sessions your student needs and to whether they work 1-on-1 or in a PAL's Circle group of three or four. Call (437) 777-4828 if you would rather talk it through now."
      }
    ]
  },
  {
    citySlug: "mississauga",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutoring Mississauga | SCH4U",
    metaDescription:
      "Chemistry tutoring for Mississauga students: SCH3U, SCH4U and first-year UTM chemistry, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Chemistry tutoring for Mississauga students.",
    intro: [
      "In Mississauga's large Peel and Dufferin-Peel science classes, it's easy to slip a step behind in SCH4U and never quite catch up. We pair students with a chemistry tutor who scored 90+ in the course and meet weekly online, so the foundation gets rebuilt before it costs a mark — and with UTM on the doorstep, those Grade 12 chemistry marks matter directly.",
      "Sessions run online, so a student near Square One and one out by Meadowvale get the same tutor quality with no drive across the city. We follow the Ontario curriculum by course code — the mole, equilibrium, organic — in step with your student's teacher, and support first-year UTM chemistry too."
    ],
    criteria: [
      {
        title: "Help that keeps pace with a full class",
        body: "A teacher with a full room cannot stop the lesson for one student's stoichiometry gap. A tutor's job is to catch that gap in the week it opens, so look for steady weekly sessions rather than help booked only in the days before a test."
      },
      {
        title: "Someone who knows what comes next",
        body: "If your student is heading to UTM or another life-science program, the tutor should know what first-year chemistry will expect, because that changes what to prioritize in Grade 12. Our science tutors have completed first-year university study in their subject."
      },
      {
        title: "A plan you can follow",
        body: "Ask what you will see after each session. We send written notes covering what was worked on and what comes next, so you can follow the progress without sitting in on the lesson."
      }
    ],
    localTitle: "Where SCH4U leads for Mississauga students.",
    localBody: [
      "With the University of Toronto Mississauga in the city, a lot of Mississauga students apply to life-science and health programs, and many of those list SCH4U as a required course. That makes the Grade 12 chemistry mark part of the application itself, not just a line on the transcript. Requirements vary by program and change each cycle, so look them up on [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) every year.",
      "Students who move on to UTM can keep working with us through first-year chemistry. For the high-school course, the [SCH4U course page](/subjects/sch4u-chemistry-tutoring) covers each unit, and [how to study for SCH4U](/blog/how-to-study-for-sch4u-chemistry) sets out a unit-by-unit approach that does not depend on cramming."
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
        a: "The same as every subject we teach. Families buy a package of sessions in CAD instead of paying hourly, sized to how many sessions the student needs and whether 1-on-1 or a PAL's Circle group of three or four fits. We work that out on the free consultation, or call (437) 777-4828 for a straight answer."
      }
    ]
  },
  {
    citySlug: "markham",
    subject: "chemistry",
    subjectSlug: "chemistry-tutoring",
    metaTitle: "Chemistry Tutoring Markham | SCH4U & SCH3U",
    metaDescription:
      "Chemistry tutoring for Markham students: SCH3U, SCH4U and first-year university chemistry, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Chemistry tutoring for Markham students.",
    intro: [
      "Markham students compete hard, and SCH4U chemistry is one of the marks that decides spots in selective life-science and health programs. We match students with a chemistry tutor who scored 90+ in the exact course and meet weekly online, turning that drive into a mark that holds under pressure.",
      "Because sessions are online, students in Unionville, Cornell or Berczy Village all get the same tutor — no waitlist tied to a plaza learning centre. We work the YRDSB or York Catholic sequence by course code, from the mole and stoichiometry through to organic, so tutoring matches what's being graded."
    ],
    criteria: [
      {
        title: "Calm matters as much as content",
        body: "In a high-pressure year, a tutor who adds more worksheets can add more stress. Look for someone who finds the one unit that is actually weak and works on that, so your student walks into tests knowing exactly what they have fixed."
      },
      {
        title: "The same person every week",
        body: "Group learning centres are convenient, but the person teaching can change from week to week. Ask who will work with your student each session and what they earned in SCH4U itself. We match one tutor, 90+ in the course, for every session."
      },
      {
        title: "Ready well before the test",
        body: "Ask how the tutor prepares for unit tests and the final. Review should start a week or two ahead and be built from your student's own mistakes, rather than one long session the evening before."
      }
    ],
    localTitle: "Where SCH4U leads for Markham students.",
    localBody: [
      "Markham students apply widely, to York, the University of Toronto and programs well beyond the GTA, and the life-science, health and engineering programs near the top of many lists commonly require SCH4U. A strong chemistry mark keeps those options open, while a weak one can close them regardless of the rest of the average. [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) has each program's up-to-date list.",
      "Teachers at YRDSB and York Catholic schools set their own unit order, so we work from your student's course outline. The [SCH4U course page](/subjects/sch4u-chemistry-tutoring) describes how we teach each unit, and our comparison of [SCH4U, SPH4U and SBI4U](/blog/sch4u-vs-sph4u-which-is-harder) helps if your student is still choosing their Grade 12 sciences."
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
        a: "Every subject is priced the same way, so chemistry costs no more than English. Tutoring is a package of sessions in CAD, not an hourly rate, and the total depends on the number of sessions and whether your student works 1-on-1 or in a PAL's Circle group of three or four. We quote it on the free consultation, or call (437) 777-4828."
      }
    ]
  },
  {
    citySlug: "mississauga",
    subject: "math",
    subjectSlug: "math-tutoring",
    metaTitle: "Math Tutoring Mississauga | MHF4U & MCV4U",
    metaDescription:
      "Math tutoring for Mississauga students: MCR3U, MHF4U, MCV4U, MDM4U and first-year UTM calculus, 1-on-1 online with a 90+ tutor. Book a free consultation.",
    h1: "Math tutoring for Mississauga students.",
    intro: [
      "MHF4U Advanced Functions and MCV4U Calculus & Vectors decide a lot of Mississauga university applications, and they move fast in packed Peel classrooms. We match students with a math tutor who scored 90+ in their exact course and meet weekly online, so a missed foundation gets caught before the whole term tilts.",
      "Our tutors rebuild the algebra and function sense the rest of the course assumes, working by course code in step with the Peel or Dufferin-Peel sequence. Sessions are online — same tutor quality whether you're near Square One or out in Meadowvale, with no commute — and we support first-year UTM calculus too."
    ],
    criteria: [
      {
        title: "Someone who plans the whole term",
        body: "Math is sequential, so one-off sessions before a test rarely move the mark. Look for a tutor who maps the term against the course outline, from the first functions unit through to the final exam, and works ahead of the class rather than behind it."
      },
      {
        title: "Strength in the right course",
        body: "Being good at math in general is not the same as knowing MCV4U's vectors unit or MDM4U's culminating project. Ask which senior math courses the tutor took and what they earned in each. We match on the exact course, with a tutor who scored 90+ in it."
      },
      {
        title: "Honest about the timeline",
        body: "Be cautious of anyone who promises a grade by a date. A good tutor tells you what they found, what they are fixing first, and how you will see the change, through the work itself and the written notes after every session."
      }
    ],
    localTitle: "Where senior math leads for Mississauga students.",
    localBody: [
      "Commerce, computer science and engineering programs at UTM and across Ontario, and many science programs too, require MHF4U, MCV4U or both. Because MHF4U has to come before or alongside MCV4U, Mississauga students usually feel the pressure of both in Grade 12 at once. The requirements for each program are published on [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) and change from year to year.",
      "First-year calculus at UTM builds directly on MCV4U, and we support that step as well. For the high-school courses, see the [MHF4U](/subjects/advanced-functions-tutoring), [MCV4U](/subjects/calculus-vectors-tutoring) and [MDM4U](/subjects/data-management-tutoring) pages, or our [MHF4U study guide](/blog/mhf4u-advanced-functions-study-guide) for a unit-by-unit plan."
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
        a: "Math is priced like every other subject. Sessions are bought as a package in CAD rather than by the hour, and what a package costs depends on how many sessions your student needs and whether they work 1-on-1 or in a PAL's Circle group of three or four. We quote it on the free consultation, or call (437) 777-4828."
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
    metaTitle: "Physics Tutoring Vaughan | SPH4U & SPH3U",
    metaDescription:
      "Physics tutoring for Vaughan students: SPH3U, SPH4U and first-year university physics, 1-on-1 online with a tutor who scored 90+. Book a free consultation.",
    h1: "Physics tutoring for Vaughan students.",
    intro: [
      "SPH4U rewards understanding over memorization, and in Vaughan's YRDSB and York Catholic schools it's one of the courses that moves quickly past students who miss a foundation. We pair Vaughan students with a physics tutor who scored 90+ in the course and teaches the reasoning behind the equations, weekly and online.",
      "Sessions run online, so a student in Woodbridge and one in Maple get the same tutor with no commute or weather days. We follow the Ontario sequence by course code — kinematics, dynamics, energy, fields, waves — coaching the habit of picture, principle, then math that unfamiliar test problems demand."
    ],
    criteria: [
      {
        title: "A tutor who explains why",
        body: "If a tutor's answer to a hard question is a new formula, your student learns one more thing to memorize. Ask them to talk through a problem out loud. You want someone who can say why momentum is conserved, not only how to plug numbers in."
      },
      {
        title: "Grade 11 physics reviewed",
        body: "SPH4U assumes SPH3U: motion, forces and energy from Grade 11 come back in harder forms. A tutor should check that foundation early, because a gap there shows up in every SPH4U unit that follows."
      },
      {
        title: "The same tutor all year",
        body: "Physics marks improve when one person sees your student's mistakes week after week and notices the pattern. Changing tutors resets that. We keep one matched tutor every week, online, so winter roads never cancel a session."
      }
    ],
    localTitle: "Where SPH4U leads for Vaughan students.",
    localBody: [
      "With York University's Keele campus just south of the city line, many Vaughan students apply to its engineering and science programs as well as to programs across Ontario. Engineering and physical-science programs commonly list SPH4U as a required course, so the Grade 12 physics mark often sits at the centre of the application. Program requirements change, so check them on [Ontario Universities' Info](https://www.ontariouniversitiesinfo.ca/) rather than relying on last year's list.",
      "The [SPH4U course page](/subjects/sph4u-physics-tutoring) breaks down each unit, and our [SPH4U study guide](/blog/sph4u-physics-study-guide) explains how to study problems rather than formulas. If your student is weighing physics against chemistry or biology, the [SCH4U, SPH4U and SBI4U comparison](/blog/sch4u-vs-sph4u-which-is-harder) is a good place to start."
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
        a: "Physics is priced the same as every other subject. You buy a package of sessions in CAD rather than an hourly rate, and the total depends on how many sessions your student needs and whether 1-on-1 or a PAL's Circle group of three or four is the better fit. We quote it on the free consultation, or call (437) 777-4828."
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
