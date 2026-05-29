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
      <path d="M11 25.5 L28 18 L45 25.5 L28 33 Z" fill={fg} />
      <path
        d="M19 29 V36 C19 38.5 23 41 28 41 C33 41 37 38.5 37 36 V29"
        stroke={fg}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M45 25.5 V34" stroke="#C99A2A" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="45" cy="36.4" r="2.4" fill="#C99A2A" />
    </svg>
  );
}
