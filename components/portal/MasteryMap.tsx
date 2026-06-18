"use client";

import { useMemo, useState } from "react";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MasteryStatus } from "@/lib/store/types";
import { MASTERY_META, MASTERY_ORDER } from "./progress-meta";

type Topic = { id: string; label: string; unit: string | null; status: MasteryStatus };

type Props = {
  classId: string;
  initial: Topic[];
  canEdit: boolean;
};

function nextStatus(s: MasteryStatus): MasteryStatus {
  const i = MASTERY_ORDER.indexOf(s);
  return MASTERY_ORDER[(i + 1) % MASTERY_ORDER.length];
}

export default function MasteryMap({ classId, initial, canEdit }: Props) {
  const [topics, setTopics] = useState<Topic[]>(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [unit, setUnit] = useState("");
  const [saving, setSaving] = useState(false);

  const summary = useMemo(() => {
    const counts: Record<MasteryStatus, number> = { new: 0, learning: 0, practising: 0, mastered: 0 };
    for (const t of topics) counts[t.status]++;
    const total = topics.length;
    const weight = { new: 0, learning: 0.34, practising: 0.67, mastered: 1 } as const;
    const momentum = total
      ? Math.round((topics.reduce((s, t) => s + weight[t.status], 0) / total) * 100)
      : 0;
    return { counts, total, momentum, mastered: counts.mastered };
  }, [topics]);

  async function cycle(t: Topic) {
    if (!canEdit || busyId) return;
    const target = nextStatus(t.status);
    setBusyId(t.id);
    setErr(null);
    setTopics((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: target } : x)));
    try {
      const res = await fetch(`/api/portal/classes/${classId}/mastery`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: t.id, status: target })
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Could not update");
      }
    } catch (e: any) {
      setTopics((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: t.status } : x)));
      setErr(e.message || "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  async function addTopic(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/mastery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, unit: unit || null })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not add topic");
      setTopics((prev) => [
        ...prev,
        { id: data.topic.id, label: data.topic.label, unit: data.topic.unit, status: data.topic.status }
      ]);
      setLabel("");
      setUnit("");
      setAdding(false);
    } catch (e: any) {
      setErr(e.message || "Could not add topic");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
            <Sparkles className="h-3.5 w-3.5" /> Mastery Map
          </div>
          <h2 className="mt-1 font-serif text-2xl text-ink-800">Where you stand, topic by topic</h2>
          <p className="mt-1 max-w-xl text-sm text-ink-600">
            Your tutor&rsquo;s honest read on each part of the course — so progress is never a
            mystery, and we always know exactly what to work on next.
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => setAdding((v) => !v)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 px-3 py-1.5 text-xs uppercase tracking-wider2 text-ink-700 transition-colors hover:border-gold-300"
          >
            <Plus className="h-3 w-3" /> {adding ? "Cancel" : "Add topic"}
          </button>
        )}
      </div>

      {/* Momentum bar */}
      {summary.total > 0 && (
        <div className="mt-5">
          <div className="flex items-end justify-between">
            <div className="text-sm text-ink-600">
              <span className="font-serif text-3xl text-ink-800">{summary.momentum}%</span>{" "}
              <span className="text-ink-500">course momentum</span>
            </div>
            <div className="text-xs text-ink-500">
              {summary.mastered} of {summary.total} mastered
            </div>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage transition-all duration-700"
              style={{ width: `${summary.momentum}%` }}
            />
          </div>
          {/* Legend / distribution */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-500">
            {MASTERY_ORDER.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", MASTERY_META[s].dot)} />
                {MASTERY_META[s].label}
                <span className="text-ink-400">· {summary.counts[s]}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {adding && canEdit && (
        <form onSubmit={addTopic} className="mt-5 grid gap-3 rounded-2xl border border-ink-100 bg-white p-5">
          <input
            className="input-luxe"
            placeholder="Topic, e.g. Equilibrium & Le Chatelier"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <input
            className="input-luxe"
            placeholder="Unit tag (optional), e.g. SCH4U · Unit 3"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <button type="submit" className="btn btn-gold" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to map"}
          </button>
        </form>
      )}

      {topics.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-sm text-ink-500">
          The map is empty. {canEdit ? "Add the course topics to start tracking mastery." : "Your tutor will map out the course topics here."}
        </div>
      ) : (
        <ul className="mt-5 space-y-2">
          {topics.map((t) => {
            const meta = MASTERY_META[t.status];
            const busy = busyId === t.id;
            return (
              <li
                key={t.id}
                className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3.5"
              >
                <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", meta.dot)} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink-800">{t.label}</div>
                  {t.unit && (
                    <div className="truncate text-[11px] uppercase tracking-wider2 text-ink-400">
                      {t.unit}
                    </div>
                  )}
                </div>
                {canEdit ? (
                  <button
                    onClick={() => cycle(t)}
                    disabled={busy}
                    title="Click to advance the status"
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider2 transition-transform hover:scale-105 disabled:opacity-50",
                      meta.pill
                    )}
                  >
                    {busy && <Loader2 className="h-3 w-3 animate-spin" />}
                    {meta.short}
                  </button>
                ) : (
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider2",
                      meta.pill
                    )}
                  >
                    {meta.short}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}
    </section>
  );
}
