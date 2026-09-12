"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Lock, Phone } from "lucide-react";
import Monogram from "@/components/ui/Monogram";
import { PORTAL_ENABLED } from "@/lib/feature-flags";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/subjects", label: "Subjects" },
  { href: "/testimonials", label: "Our Promise" },
  { href: "/faq", label: "FAQ" }
];

// Single source of truth for the public phone number (E.164 for the tel: href,
// formatted for display). Used in the nav, footer, booking and contact pages.
const PHONE_DISPLAY = "(437) 777-4828";
const PHONE_TEL = "+14377774828";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Pages whose hero starts with a dark background. On every other route
  // the header should always render in dark-text mode, even at the top.
  const darkHeroRoutes = ["/", "/booking", "/testimonials", "/careers", "/how-it-works", "/subjects", "/faq", "/about", "/contact", "/privacy", "/terms", "/auth/login", "/auth/signup", "/portal", "/portal/pending"];
  const hasDarkHero = darkHeroRoutes.some((r) => r === "/" ? pathname === "/" : pathname?.startsWith(r));
  const onDark = hasDarkHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-ink-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-header flex h-20 items-center justify-between gap-6">
        {/* Logo and nav are one left-hand group: justify-between then pushes
            only the phone/CTA cluster to the right edge. Previously all three
            were separate children, so the free space split evenly and the nav
            drifted to the middle of the bar looking unanchored. */}
        <div className="flex items-center gap-8 xl:gap-14">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Monogram
              tone={onDark ? "gold" : "ink"}
              className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg]"
            />
            <div className="leading-none">
              <div
                className={cn(
                  "font-serif text-xl tracking-tightish transition-colors",
                  onDark ? "text-ivory" : "text-ink-800"
                )}
              >
                PAL&rsquo;s Academy
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider2 text-gold-400">
                Private Tutoring
              </div>
            </div>
          </Link>

          {/* Tighter item spacing between lg and xl. At exactly 1024px the bar
              has no slack left, so the wider xl gap only kicks in once there
              is room for it. */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-10">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    onDark
                      ? "text-ivory/80 hover:text-ivory"
                      : "text-ink-600 hover:text-ink-900",
                    active && (onDark ? "text-ivory" : "text-ink-900")
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-6">
          <a
            href={`tel:${PHONE_TEL}`}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors",
              onDark
                ? "text-ivory/75 hover:text-gold-300"
                : "text-ink-600 hover:text-ink-900"
            )}
            title="Call PAL's Academy"
          >
            <Phone className="h-3.5 w-3.5 text-gold-400" />
            {PHONE_DISPLAY}
          </a>
          {PORTAL_ENABLED && (
            <Link
              href="/auth/login"
              className={cn(
                "group inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider2 transition-all",
                onDark
                  ? "border-ivory/25 text-ivory hover:border-gold-300 hover:bg-ivory/5"
                  : "border-ink-200 text-ink-700 hover:border-gold-400 hover:text-ink-900"
              )}
              title="Student portal — verified members only"
            >
              <Lock className="h-3.5 w-3.5 text-gold-400 transition-transform group-hover:scale-110" />
              Student Login
            </Link>
          )}
          <Link href="/booking" className="btn btn-gold whitespace-nowrap">
            Book Free Consultation
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "rounded-full border p-2 lg:hidden transition-colors",
            onDark ? "border-ivory/25 text-ivory" : "border-ink-200 text-ink-700"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="border-t border-ink-100 bg-ivory">
              <div className="container-header flex flex-col gap-1 py-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
                >
                  <Phone className="h-3.5 w-3.5 text-gold-400" />
                  {PHONE_DISPLAY}
                </a>
                <div className="mt-2 flex gap-2 border-t border-ink-100 pt-3">
                  {PORTAL_ENABLED && (
                    <Link href="/auth/login" className="btn btn-ghost flex-1">
                      <Lock className="h-3.5 w-3.5" /> Student Login
                    </Link>
                  )}
                  <Link href="/booking" className="btn btn-gold flex-1">
                    Book Free Consult
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
