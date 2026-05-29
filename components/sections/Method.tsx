import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Free 20-minute consultation",
    body: "We meet you and your student, listen carefully, and diagnose where the actual gap is — not where the report card says it is."
  },
  {
    n: "02",
    title: "Matched with your tutor",
    body: "We hand-pick the tutor whose subject mastery, temperament, and schedule fit your student. Same tutor, every week."
  },
  {
    n: "03",
    title: "Weekly live sessions",
    body: "60-minute Google Meet sessions with notes, follow-ups, and a clear plan toward the next test, exam, or application."
  },
  {
    n: "04",
    title: "Visible progress",
    body: "Monthly recap to parents. If we aren't on track, we say so first — and we adjust before you have to ask."
  }
];

export default function Method() {
  return (
    <section className="relative bg-ink-800 py-32 text-ivory">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-luxe relative">
        <Reveal>
          <div className="max-w-2xl">
            <div className="eyebrow text-gold-300">The method</div>
            <h2 className="display mt-6 text-4xl text-ivory sm:text-5xl">
              A simple sequence, executed without exception.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 md:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full bg-ink-800 p-10 transition-colors duration-500 hover:bg-ink-700">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-5xl text-gradient-gold">{s.n}</span>
                  <div className="h-px flex-1 bg-ivory/10" />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-200">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
