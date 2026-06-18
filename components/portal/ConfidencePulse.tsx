"use client";

import { useMemo, useState } from "react";
import { Loader2, TrendingDown, TrendingUp, Minus, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { sparklinePoints } from "./progress-meta";

type Log = { rating: number; note: string | null; createdAt: string };

type Props = {
  classId: string;
  initial: Log[];
  canLog: boolean;
};

const RATING_LABELS = ["Lost", "Shaky", "Getting there", "Solid", "Confident"];

export default function ConfidencePulse({ classId, initial, canLog }: Props) {
  const [logs, setLogs] = useState<Log[]>(
    [...initial].sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
  );
  const [rating, setRating] = useState<number>(0);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const stats = useMemo(() => {
    const series = logs.map((l) => l.rating);
    const latest = series.length ? series[series.length - 1] : null;
    const previous = series.length > 1 ? series[series.length - 2] : null;
    const delta = latest !== null && previous !== null ? latest - previous : null;
    return { series, latest, delta };
  }, [logs]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/confidence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, note: note || null })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setLogs((prev) => [
        ...prev,
        { rating: data.log.rating, note: data.log.note, createdAt: data.log.createdAt }
      ]);
      setRating(0);
      setNote("");
    } catch (e: any) {
      setErr(e.message || "Could not save");
    } finally {
      setSaving(false);
    }
  }

  const TrendIcon = stats.delta == null ? Minus : stats.delta > 0 ? TrendingUp : stats.delta < 0 ? TrendingDown : Minus;
  const trendColor =
    stats.delta == null || stats.delta === 0
      ? "text-ink-400"
      : stats.delta > 0
      ? "text-accent-sage"
      : "text-accent-rose";

  return (
    <section className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
        <Gauge className="h-3.5 w-3.5" /> Confidence Pulse
      </div>
      <h2 className="mt-1 font-serif text-2xl text-ink-800">How confident do you feel?</h2>

      {/* Headline + sparkline */}
      <div className="mt-4 flex items-center gap-5">
        <div className="shrink-0">
          <div className="font-serif text-4xl text-ink-800">
            {stats.latest ?? "—"}
            {stats.latest !== null && <span className="text-lg text-ink-400">/5</span>}
          </div>
          <div className={cn("mt-0.5 flex items-center gap-1 text-xs", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {stats.delta == null
              ? "First check-in"
              : stats.delta === 0
              ? "Holding steady"
              : `${stats.delta > 0 ? "+" : ""}${stats.delta} vs last`}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          {stats.series.length > 0 ? (
            <svg viewBox="0 0 120 44" className="h-12 w-full" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points={sparklinePoints(stats.series, 120, 44)}
                fill="none"
                stroke="#C99A2A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : (
            <div className="text-xs text-ink-400">
              No check-ins yet — your confidence trend will grow here.
            </div>
          )}
        </div>
      </div>

      {canLog && (
        <form onSubmit={submit} className="mt-5 rounded-2xl border border-ink-100 bg-white p-5">
          <div className="text-xs text-ink-600">Tap where you&rsquo;re at right now:</div>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} — ${RATING_LABELS[n - 1]}`}
                className={cn(
                  "flex h-11 flex-1 items-center justify-center rounded-xl border text-lg font-medium transition-all",
                  rating === n
                    ? "border-gold-400 bg-gold-50 text-gold-700 shadow-ring"
                    : "border-ink-100 text-ink-500 hover:border-gold-300"
                )}
              >
                {n}
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div className="mt-2 text-center text-xs uppercase tracking-wider2 text-gold-600">
              {RATING_LABELS[rating - 1]}
            </div>
          )}
          <input
            className="input-luxe mt-3"
            placeholder="Optional: a word on what changed"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={280}
          />
          <button type="submit" className="btn btn-gold mt-3 w-full" disabled={saving || !rating}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log check-in"}
          </button>
        </form>
      )}
      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}
    </section>
  );
}
