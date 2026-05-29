import { GraduationCap, ShieldCheck, LineChart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const items = [
  {
    icon: GraduationCap,
    title: "Verified tutors only",
    body: "Every tutor is vetted by a current educator, screened on subject mastery, and trained on our teaching framework before they ever meet a student."
  },
  {
    icon: ShieldCheck,
    title: "Live, one-to-one, weekly",
    body: "Calm Google Meet sessions on a regular cadence. No content mills, no rotating tutors — your student keeps the same mentor."
  },
  {
    icon: LineChart,
    title: "Measured by results",
    body: "We track grades, confidence, and study habits. If we aren't moving the number, we tell you — and we course-correct in week one."
  }
];

export default function Pillars() {
  return (
    <section className="relative bg-ivory py-28">
      <div className="container-luxe">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow mx-auto justify-center">The PAL&rsquo;s standard</div>
            <h2 className="display mt-6 text-4xl text-ink-800 sm:text-5xl">
              Three quiet commitments that change outcomes.
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="card-luxe h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300 bg-gold-50 text-gold-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ink-800">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
