"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();
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

        {/* Keyword-forward H1 for search engines; the brand display line below
            stays the visible headline. Exactly one H1 on the page. */}
        <h1 className="sr-only">
          Private Tutoring for Grade 9–12 and First-Year University Students in the GTA
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="display mt-8 text-balance text-5xl text-ivory sm:text-6xl lg:text-[88px]"
        >
          Tutoring, refined for{" "}
          <span className="text-gradient-gold italic">students who refuse to settle.</span>
        </motion.p>

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
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ivory/70 transition-colors hover:text-gold-300"
          >
            How it works
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 max-w-2xl border-t border-ivory/10 pt-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-gold-300/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider2 text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Founding cohort · Summer 2026
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed">
            <span className="font-medium text-gradient-gold">
              Now accepting founding families for the 2026 summer semester.
            </span>{" "}
            <span className="text-ink-200">
              Spots are limited — intake closes when tutor capacity is reached.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/40"
        >
          <motion.span
            className="block"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
