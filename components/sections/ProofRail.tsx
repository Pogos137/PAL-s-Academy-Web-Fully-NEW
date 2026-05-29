"use client";
import { motion } from "framer-motion";

const marquee = [
  "MCV4U · Calculus",
  "SCH4U · Chemistry",
  "SPH4U · Physics",
  "ENG4U · English",
  "FSF4U · French",
  "MHF4U · Functions",
  "BIO Year 1",
  "ECON Year 1",
  "CS Year 1"
];

export default function ProofRail() {
  return (
    <section className="relative overflow-hidden border-y border-ink-100 bg-ivory-100 py-10">
      <div className="container-luxe flex items-center gap-6">
        <div className="hidden shrink-0 text-[10px] uppercase tracking-wider2 text-gold-500 md:block">
          Subjects we move the needle on
        </div>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex shrink-0 gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...marquee, ...marquee, ...marquee].map((s, i) => (
              <span
                key={i}
                className="font-serif text-xl text-ink-500 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-ink-200 pr-10"
              >
                {s}
              </span>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ivory-100 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ivory-100 to-transparent" />
        </div>
      </div>
    </section>
  );
}
