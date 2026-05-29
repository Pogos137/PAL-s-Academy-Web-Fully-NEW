import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedTestimonial() {
  return (
    <section className="relative bg-ivory py-32">
      <div className="container-luxe">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-3xl border border-ink-100 bg-ivory-50 p-12 shadow-luxe lg:p-20">
            <Quote className="h-10 w-10 text-gold-400" />
            <p className="mt-8 font-serif text-3xl leading-snug text-ink-800 sm:text-4xl">
              &ldquo;My daughter went from a 68 in Grade 11 Chemistry to a 91 in two terms.
              What I valued most wasn&rsquo;t the grade — it was the calm, weekly rhythm
              and the way her tutor treated her like a serious adult.&rdquo;
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold-200 to-gold-500" />
              <div>
                <div className="font-medium text-ink-800">Priya N.</div>
                <div className="text-xs uppercase tracking-wider2 text-ink-400">
                  Parent · Mississauga · SCH3U → SCH4U
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
