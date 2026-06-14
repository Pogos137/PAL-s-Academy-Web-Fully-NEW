"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { homepageFaqs, type Faq } from "@/lib/faq-content";

type Props = {
  eyebrow?: string;
  heading?: string;
  items?: Faq[];
  /** Background tone. Defaults to a faint ink tint for separation. */
  tone?: "ivory" | "ink-50";
};

export default function FaqAccordion({
  eyebrow = "Questions, answered",
  heading = "Before you book — the honest answers.",
  items = homepageFaqs,
  tone = "ink-50"
}: Props) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <section className={tone === "ivory" ? "relative bg-ivory py-24" : "relative bg-ink-50 py-24"}>
      <div className="container-luxe">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow justify-center">{eyebrow}</div>
            <h2 className="display mt-4 text-4xl text-ink-800 sm:text-5xl">{heading}</h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-ivory">
          {items.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ivory-50 sm:px-8"
                  >
                    <span className="font-serif text-lg text-ink-800 sm:text-xl">{f.q}</span>
                    <Plus
                      className={
                        "h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 " +
                        (isOpen ? "rotate-45" : "")
                      }
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-ink-600 sm:px-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gold-600 transition-colors hover:text-gold-700"
          >
            See all frequently asked questions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
