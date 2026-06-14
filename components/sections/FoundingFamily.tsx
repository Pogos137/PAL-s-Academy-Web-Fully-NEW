import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FoundingFamily() {
  return (
    <section className="relative bg-ivory py-32">
      <div className="container-luxe">
        <Reveal>
          <div className="mx-auto grid max-w-4xl gap-10 rounded-3xl border border-ink-100 bg-ivory-50 p-12 shadow-luxe lg:grid-cols-[1.3fr_1fr] lg:items-center lg:p-16">
            <div>
              <div className="eyebrow">A founding opportunity</div>
              <h2 className="mt-5 font-serif text-3xl leading-snug text-ink-800 sm:text-4xl">
                Become a founding family.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-ink-600">
                We&rsquo;re accepting a small number of students for our first cohort this
                semester. Founding families receive our full attention, direct access to the
                founder, and a rate that locks in permanently.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider2 text-gold-600">
                <Sparkles className="h-3.5 w-3.5" />
                Limited founding spots
              </div>
              <Link href="/booking" className="btn btn-gold group">
                Apply for a founding spot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
