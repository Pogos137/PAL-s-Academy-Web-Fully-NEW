import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import CTA from "@/components/sections/CTA";
import { buildMetadata } from "@/lib/seo";
import { locations } from "@/lib/locations-content";

export const metadata = buildMetadata({
  title: "Tutoring by City · Across the GTA",
  description:
    "Online 1-on-1 tutoring for students across the Greater Toronto Area — Toronto, Mississauga, Markham, Vaughan, Brampton and more. Grade 9–12 and first-year university. Book a free consultation.",
  path: "/tutoring"
});

export default function TutoringLocationsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-24 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300">Across the Greater Toronto Area</div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl lg:text-7xl">
              Online tutoring, everywhere in the GTA.
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              We tutor Grade 9–12 and first-year university students right across the Greater
              Toronto Area — delivered online over Google Meet, so every family gets the same
              tutor quality with no commute. Find your city below, or just book a free
              consultation and we&rsquo;ll take it from there.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ivory py-24">
        <div className="container-luxe">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <StaggerItem key={l.slug}>
                <Link
                  href={`/tutoring/${l.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-ivory-50 p-7 transition-all duration-500 hover:border-gold-300 hover:shadow-luxe"
                >
                  <div className="eyebrow">{l.region}</div>
                  <h2 className="mt-4 font-serif text-2xl text-ink-800">Tutoring in {l.city}</h2>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-600">
                    Explore {l.city}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-ink-500">
              Outside these cities but still in the GTA or Ontario? Our sessions are online, so we
              can almost certainly help — <Link href="/booking" className="text-gold-600 underline-offset-4 hover:underline">book a free consultation</Link> and ask.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
