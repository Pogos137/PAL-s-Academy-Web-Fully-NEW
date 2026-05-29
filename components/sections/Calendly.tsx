"use client";

import { useEffect } from "react";
import { CalendarClock, Mail } from "lucide-react";

/**
 * Embeds a Calendly inline widget if a valid URL is configured.
 * If no URL is set (the typical state until the user wires Calendly), we render
 * a graceful fallback CTA — never a "page not found" iframe.
 */
export default function Calendly({ url }: { url: string | null | undefined }) {
  const isReal =
    !!url &&
    /^https?:\/\/(www\.)?calendly\.com\//i.test(url) &&
    !/your-handle|placeholder|YOUR-/i.test(url);

  useEffect(() => {
    if (!isReal) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      try {
        document.body.removeChild(s);
      } catch {}
    };
  }, [isReal]);

  if (!isReal) {
    return (
      <div className="rounded-3xl border border-ink-100 bg-ivory-50 p-10 text-center shadow-luxe sm:p-14">
        <div className="mx-auto inline-flex rounded-2xl border border-gold-200 bg-gold-50 p-3 text-gold-600">
          <CalendarClock className="h-6 w-6" />
        </div>
        <h3 className="mt-6 font-serif text-3xl text-ink-800">
          Pick a time the human way.
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink-600">
          Submit the form above and we&rsquo;ll reply within one business day with two or
          three time slots that fit your week. Or reach us directly:
        </p>
        <a
          href="mailto:palseduacademy@gmail.com?subject=Free%20consultation%20—%20PAL%E2%80%99s%20Academy"
          className="btn btn-gold mt-7"
        >
          <Mail className="h-4 w-4" /> palseduacademy@gmail.com
        </a>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget min-h-[700px] w-full overflow-hidden rounded-2xl border border-ink-100 bg-white"
      data-url={`${url}?hide_gdpr_banner=1&background_color=faf8f4&text_color=0c3d32&primary_color=c99a2a`}
    />
  );
}
