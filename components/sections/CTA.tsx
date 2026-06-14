import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CTA({ note }: { note?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 text-ivory">
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />
      <div className="container-luxe relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="lux-divider mx-auto">·</div>
            <h2 className="display mt-6 text-4xl sm:text-5xl">
              The next quarter is already on the clock.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-200">
              Most of our results begin with a short, honest conversation. No pressure, no
              pitch — just a plan you can act on tomorrow.
            </p>
            {note && (
              <p className="mx-auto mt-6 max-w-[460px] text-sm italic text-gold-200/80">
                {note}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking" className="btn btn-gold group">
                Book your free consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pricing" className="btn btn-ghost-dark">
                See pricing
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
