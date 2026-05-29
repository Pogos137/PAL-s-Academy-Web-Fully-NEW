import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "Every subject we tutor for Grade 9–12 and first-year university. Math, sciences, humanities, languages, and CS.",
  alternates: { canonical: "/subjects" }
};

const groups = [
  {
    title: "Mathematics",
    items: ["MPM2D · Principles of Math", "MCR3U · Functions", "MHF4U · Advanced Functions", "MCV4U · Calculus & Vectors", "MDM4U · Data Management", "1st-yr Calculus", "1st-yr Linear Algebra"]
  },
  {
    title: "Sciences",
    items: ["SCH3U · Chemistry", "SCH4U · Chemistry", "SPH3U · Physics", "SPH4U · Physics", "SBI3U · Biology", "SBI4U · Biology", "1st-yr Bio · Chem · Physics"]
  },
  {
    title: "Humanities",
    items: ["ENG3U · English", "ENG4U · English", "1st-yr Economics", "1st-yr Sociology", "Application essays & personal statements"]
  },
  {
    title: "Languages",
    items: ["FSF3U · Core French", "FSF4U · Core French", "Spanish (custom)"]
  },
  {
    title: "Computer Science",
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
                  <ul className="mt-5 space-y-2">
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
