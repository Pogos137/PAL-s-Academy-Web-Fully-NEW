import { cn } from "@/lib/utils";

type Tone = "gold" | "ink" | "ivory";

export default function Monogram({ className, tone = "gold" }: { className?: string; tone?: Tone }) {
  // On dark backgrounds the logo mark sits on an ivory tile so the emerald reads.
  // On light backgrounds we keep the original emerald tile.
  const onDark = tone === "ivory" || tone === "gold";
  const bg = onDark ? "#FAF8F4" : "#114E40";
  const fg = onDark ? "#114E40" : "#FAF8F4";
  return (
    <svg
      viewBox="0 0 56 56"
      className={cn("h-8 w-8", className)}
      fill="none"
      aria-label="PAL's Academy mark"
    >
      <rect x="0" y="0" width="56" height="56" rx="14" fill={bg} />
      {/* The mark is a two-tone "P": the stem carries the tile's foreground,
          the bowl is always gold. Replaced the mortarboard cap in Aug 2026 —
          that symbol is the category default and was colliding with other
          tutoring brands. Keep the stem and bowl as separate strokes so the
          two colours stay independent of the tile. */}
      <path d="M19 44 V13" stroke={fg} strokeWidth="5" strokeLinecap="round" />
      <path
        d="M19 13 H29 A9 9 0 0 1 29 31 H19"
        stroke="#C99A2A"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
