"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-hero text-ivory">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />

      {/* decorative laurel rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[640px] w-[640px] rounded-full border border-gold-400/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-24 top-1/3 h-[440px] w-[440px] rounded-full border border-gold-400/30"
      />

      <div className="container-luxe relative flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow text-gold-300"
        >
          A Private Tutoring Academy
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display mt-8 text-balance text-5xl text-ivory sm:text-6xl lg:text-[88px]"
        >
          Tutoring, refined for{" "}
          <span className="text-gradient-gold italic">students who refuse to settle.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-100/90"
        >
          One-to-one weekly sessions with verified tutors for Grade 9–12 and first-year
          university. Quiet, exacting, and measurably effective — designed for families who
          treat education as an investment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link href="/booking" className="btn btn-gold group">
            <Sparkles className="h-4 w-4" />
            Book your free consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/how-it-works" className="btn btn-ghost-dark">
            How it works
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-ivory/10 pt-8 text-ivory/80 sm:gap-12"
        >
          {[
            { v: "150+", l: "Students coached" },
            { v: "92%", l: "Hit their goal grade" },
            { v: "4.9/5", l: "Family satisfaction" }
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-3xl text-gradient-gold sm:text-4xl">{s.v}</div>
              <div className="mt-2 text-[11px] uppercase tracking-wider2 text-ink-200">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider2 text-ivory/40"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
