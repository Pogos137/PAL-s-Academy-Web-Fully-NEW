"use client";

import { useState } from "react";
import { Loader2, Plus, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FocusStatus } from "@/lib/store/types";

type FR = { id: string; body: string; status: FocusStatus; studentName?: string | null; createdAt: string };

type Props = {
  classId: string;
  initial: FR[];
  /** Student in this class — can raise new requests. */
  canAdd: boolean;
  /** Tutor/admin — can plan and close. (Students can also manage their own.) */
  canManage: boolean;
};

const ORDER: FocusStatus[] = ["open", "planned", "addressed"];
const META: Record<FocusStatus, { label: string; pill: string }> = {
  open: { label: "Open", pill: "border-gold-300 bg-gold-50 text-gold-700" },
  planned: { label: "Planned next session", pill: "border-ink-300 bg-ink-50 text-ink-600" },
  addressed: { label: "Addressed", pill: "border-accent-sage bg-accent-sage/10 text-accent-sage" }
};

export default function FocusRequests({ classId, initial, canAdd, canManage }: Props) {
  const [items, setItems] = useState<FR[]>(
    [...initial].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  );
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canCycle = canManage || canAdd;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/focus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setItems((prev) => [
        { id: data.request.id, body: data.request.body, status: data.request.status, createdAt: data.request.createdAt },
        ...prev
      ]);
      setBody("");
    } catch (e: any) {
      setErr(e.message || "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function cycle(item: FR) {
    if (!canCycle || busyId) return;
    const target = ORDER[(ORDER.indexOf(item.status) + 1) % ORDER.length];
    setBusyId(item.id);
    setErr(null);
    setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: target } : x)));
    try {
      const res = await fetch(`/api/portal/classes/${classId}/focus`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focusId: item.id, status: target })
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Could not update");
      }
    } catch (e: any) {
      setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: item.status } : x)));
      setErr(e.message || "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
        <Target className="h-3.5 w-3.5" /> Bring to your next session
      </div>
      <h2 className="mt-1 font-serif text-2xl text-ink-800">
        {canManage && !canAdd ? "What your students want to work on" : "Tell your tutor what to prep"}
      </h2>
      <p className="mt-1 max-w-xl text-sm text-ink-600">
        {canManage && !canAdd
          ? "Requests come in here so you can plan each session around what the student actually needs."
          : "Stuck on something specific? Flag it and your tutor will plan the next session around it."}
      </p>

      {canAdd && (
        <form onSubmit={add} className="mt-4 flex gap-2">
          <input
            className="input-luxe flex-1"
            placeholder="e.g. Related rates — the ladder problems still trip me up"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={500}
          />
          <button type="submit" className="btn btn-gold shrink-0" disabled={saving || !body.trim()}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          </button>
        </form>
      )}

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-ink-200 bg-white p-6 text-sm text-ink-500">
          Nothing flagged yet.
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => {
            const meta = META[item.status];
            const busy = busyId === item.id;
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm", item.status === "addressed" ? "text-ink-400" : "text-ink-700")}>
                    {item.body}
                  </p>
                  {item.studentName && (
                    <div className="mt-1 text-[11px] uppercase tracking-wider2 text-ink-400">
                      {item.studentName}
                    </div>
                  )}
                </div>
                {canCycle ? (
                  <button
                    onClick={() => cycle(item)}
                    disabled={busy}
                    title="Click to advance"
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider2 transition-transform hover:scale-105 disabled:opacity-50",
                      meta.pill
                    )}
                  >
                    {busy && <Loader2 className="h-3 w-3 animate-spin" />}
                    {meta.label}
                  </button>
                ) : (
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider2",
                      meta.pill
                    )}
                  >
                    {meta.label}
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
