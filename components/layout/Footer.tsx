import Link from "next/link";
import Monogram from "@/components/ui/Monogram";

const PHONE_DISPLAY = "(437) 777-4828";
const PHONE_TEL = "+14377774828";

// The highest-intent city × subject pages. GSC shows these clusters pulling
// impressions with no clicks, and every one of them had zero site-wide internal
// links pointing at it — pages nothing links to get crawled less and rank worse
// regardless of how good the copy is. Rendered as a strip rather than a fifth
// column so the footer grid keeps its five-track layout.
const popular = [
  { href: "/tutoring/toronto/chemistry", label: "Chemistry tutor Toronto" },
  { href: "/tutoring/toronto/physics", label: "Physics tutor Toronto" },
  { href: "/tutoring/mississauga/math", label: "Math tutor Mississauga" },
  { href: "/tutoring/toronto/math", label: "Math tutor Toronto" },
  { href: "/tutoring/mississauga/chemistry", label: "Chemistry tutor Mississauga" },
  { href: "/blog/sch4u-vs-sph4u-which-is-harder", label: "SCH4U or SPH4U?" }
];

const cols = [
  {
    title: "Learn",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/subjects", label: "Subjects" },
      { href: "/tutoring", label: "Tutoring by city" },
      { href: "/blog", label: "Guides" },
      { href: "/testimonials", label: "Our Promise" },
      { href: "/faq", label: "FAQ" }
    ]
  },
  {
    title: "Subjects",
    links: [
      { href: "/subjects/chemistry-tutoring", label: "Chemistry (SCH4U)" },
      { href: "/subjects/physics-tutoring", label: "Physics (SPH4U)" },
      { href: "/subjects/biology-tutoring", label: "Biology (SBI4U)" },
      { href: "/subjects/math-tutoring", label: "Math (Gr 9–12)" },
      { href: "/subjects/calculus-vectors-tutoring", label: "Calculus & Vectors" },
      { href: "/subjects/english-tutoring", label: "English (ENG4U)" }
    ]
  },
  {
    title: "Get Started",
    links: [
      { href: "/booking", label: "Book free consultation" },
      { href: "/auth/login", label: "Student portal" },
      { href: "/auth/signup", label: "Create account" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-ink-900 text-ivory">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-30" />
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />
      <div className="container-luxe relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram tone="gold" className="h-10 w-10" />
            <div>
              <div className="font-serif text-2xl">PAL&rsquo;s Academy</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider2 text-gold-400">
                Private Tutoring
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-200">
            One-on-one tutoring for Grade 9&ndash;12 and first-year university students
            across the Greater Toronto Area.
          </p>
          <div className="gold-rule mt-8" />
          <a
            href="mailto:palseduacademy@gmail.com"
            className="mt-4 inline-block text-xs uppercase tracking-wider2 text-ink-300 transition-colors hover:text-gold-300"
          >
            palseduacademy@gmail.com
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-2 block text-xs uppercase tracking-wider2 text-ink-300 transition-colors hover:text-gold-300"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="text-[10px] uppercase tracking-wider2 text-gold-400">{col.title}</div>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-100 transition-colors hover:text-gold-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-ivory/10">
        <div className="container-luxe py-8">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-400">
            Popular searches
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {popular.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-ink-200 transition-colors hover:text-gold-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-ivory/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-300 sm:flex-row">
          <div>© {new Date().getFullYear()} PAL&rsquo;s Academy. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-300">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-300">Terms</Link>
            <Link href="/careers" className="text-gold-400 hover:text-gold-300">Careers ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
