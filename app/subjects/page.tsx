import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Subjects",
  description:
    "Private tutoring for Grade 9–12 and first-year university in the GTA — math, sciences, English, French, and CS, including SCH4U, MCV4U, and ENG4U. Book a free session.",
  path: "/subjects"
});

const groups = [
  {
    title: "Mathematics",
    blurb:
      "Our math tutors work the full Ontario sequence — from MPM2D and MCR3U Functions through MHF4U and MCV4U Calculus & Vectors — plus first-year university calculus and linear algebra. Whether your student is stuck on functions in Grade 11 or racing toward derivatives for MCV4U, we match them with a tutor who scored 90+ in that exact course.",
    items: ["MPM2D · Principles of Math", "MCR3U · Functions", "MHF4U · Advanced Functions", "MCV4U · Calculus & Vectors", "MDM4U · Data Management", "1st-yr Calculus", "1st-yr Linear Algebra"]
  },
  {
    title: "Sciences",
    blurb:
      "SCH4U Chemistry, SPH4U Physics, and SBI4U Biology are the courses that most often decide Ontario university admission. Our science tutors have completed first-year post-secondary study in their subject, so they know exactly what Grade 12 examiners reward — and they carry that rigour into first-year university chemistry, physics, and biology support.",
    items: ["SCH3U · Chemistry", "SCH4U · Chemistry", "SPH3U · Physics", "SPH4U · Physics", "SBI3U · Biology", "SBI4U · Biology", "1st-yr Bio · Chem · Physics"]
  },
  {
    title: "Humanities",
    blurb:
      "From ENG3U and ENG4U English to first-year Economics and Sociology, our humanities tutors teach what rubrics actually grade: a clear argument, real evidence, and a confident voice. We also coach university application essays and personal statements line by line, so strong students read as strong on paper.",
    items: ["ENG3U · English", "ENG4U · English", "1st-yr Economics", "1st-yr Sociology", "Application essays & personal statements"]
  },
  {
    title: "Languages",
    blurb:
      "Core French — FSF3U and FSF4U — rewards a steady weekly rhythm far more than last-minute cramming. Our French tutors build that rhythm across grammar, oral exams, and essays, and offer custom Spanish support for students who want a second language done properly.",
    items: ["FSF3U · Core French", "FSF4U · Core French", "Spanish (custom)"]
  },
  {
    title: "Computer Science",
    blurb:
      "We tutor ICS3U and ICS4U computer science — Python, algorithms, and the fundamentals that university CS programs at U of T, Waterloo, and McMaster expect. First-year students get support in Python, Java, and C, plus the data-structures groundwork that makes second year survivable.",
    items: ["ICS3U/4U · CS Grade 11–12", "1st-yr Python · Java · C", "Data Structures fundamentals"]
  }
];

export default function SubjectsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">What we teach</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Every subject, by someone who&rsquo;s mastered it.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              Private 1-on-1 tutoring across the Greater Toronto Area for Grade 9&ndash;12 and
              first-year university — math, sciences, English, French, and computer science.
              We tutor the Ontario curriculum by course code, from MCV4U Calculus and SCH4U
              Chemistry to ENG4U English, and match every student to a tutor who has earned
              top marks in that exact subject.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <StaggerItem key={g.title}>
                <div className="card-luxe h-full">
                  <h2 className="font-serif text-2xl text-ink-800">{g.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{g.blurb}</p>
                  <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5">
                    {g.items.map((i) => (
                      <li key={i} className="text-sm text-ink-600">· {i}</li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <div className="mt-16 text-center">
              <Link href="/booking" className="btn btn-gold">Book free consultation</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
