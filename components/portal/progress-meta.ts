import type { MasteryStatus } from "@/lib/store/types";

// Shared presentation metadata for the Mastery Map states. Client-safe: this
// file imports only a type (erased at build), so both client components and
// server pages can use it. Keep the ladder monotonic: new → mastered.

export const MASTERY_ORDER: MasteryStatus[] = ["new", "learning", "practising", "mastered"];

export const MASTERY_META: Record<
  MasteryStatus,
  { label: string; short: string; dot: string; pill: string; bar: string }
> = {
  new: {
    label: "Not started",
    short: "New",
    dot: "bg-ink-200",
    pill: "border-ink-200 bg-ink-50 text-ink-500",
    bar: "bg-ink-200"
  },
  learning: {
    label: "Learning",
    short: "Learning",
    dot: "bg-gold-300",
    pill: "border-gold-200 bg-gold-50 text-gold-700",
    bar: "bg-gold-300"
  },
  practising: {
    label: "Practising",
    short: "Practising",
    dot: "bg-gold-500",
    pill: "border-gold-400 bg-gold-100 text-gold-700",
    bar: "bg-gold-500"
  },
  mastered: {
    label: "Mastered",
    short: "Mastered",
    dot: "bg-accent-sage",
    pill: "border-accent-sage bg-accent-sage/10 text-accent-sage",
    bar: "bg-accent-sage"
  }
};

/** A reusable sparkline path generator for confidence series (1–5 ratings). */
export function sparklinePoints(
  series: number[],
  width: number,
  height: number,
  pad = 3
): string {
  if (series.length === 0) return "";
  if (series.length === 1) {
    const y = height - pad - ((series[0] - 1) / 4) * (height - pad * 2);
    return `${pad},${y.toFixed(1)} ${(width - pad).toFixed(1)},${y.toFixed(1)}`;
  }
  const step = (width - pad * 2) / (series.length - 1);
  return series
    .map((v, i) => {
      const x = pad + i * step;
      const y = height - pad - ((Math.max(1, Math.min(5, v)) - 1) / 4) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
