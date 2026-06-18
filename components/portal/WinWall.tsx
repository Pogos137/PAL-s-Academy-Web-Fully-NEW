"use client";

import { useState } from "react";
import { Loader2, Plus, Trophy } from "lucide-react";

type W = { id: string; body: string; byName: string | null; createdAt: string };

type Props = {
  classId: string;
  initial: W[];
  canAdd: boolean;
  /** How the current user is credited on wins they add (for optimistic UI). */
  selfName?: string;
};

function ago(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

export default function WinWall({ classId, initial, canAdd, selfName }: Props) {
  const [items, setItems] = useState<W[]>(
    [...initial].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  );
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/wins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setItems((prev) => [
        { id: data.win.id, body: data.win.body, byName: selfName ?? null, createdAt: data.win.createdAt },
        ...prev
      ]);
      setBody("");
      setOpen(false);
    } catch (e: any) {
      setErr(e.message || "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
            <Trophy className="h-3.5 w-3.5" /> Win Wall
          </div>
          <h2 className="mt-1 font-serif text-2xl text-ink-800">Breakthroughs worth keeping</h2>
        </div>
        {canAdd && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-300 bg-white/70 px-3 py-1.5 text-xs uppercase tracking-wider2 text-gold-700 transition-colors hover:border-gold-400"
          >
            <Plus className="h-3 w-3" /> {open ? "Cancel" : "Add a win"}
          </button>
        )}
      </div>

      {open && canAdd && (
        <form onSubmit={add} className="mt-4 flex gap-2">
          <input
            className="input-luxe flex-1 bg-white"
            placeholder="e.g. Solved an equilibrium problem with zero hints today"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={280}
            autoFocus
          />
          <button type="submit" className="btn btn-gold shrink-0" disabled={saving || !body.trim()}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
          </button>
        </form>
      )}

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-gold-200 bg-white/50 p-6 text-sm text-ink-500">
          No wins logged yet — the first breakthrough lands here soon.
        </div>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((w) => (
            <li key={w.id} className="rounded-2xl border border-gold-200 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <div className="min-w-0">
                  <p className="text-sm text-ink-800">{w.body}</p>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wider2 text-ink-400">
                    {w.byName ? `${w.byName} · ` : ""}
                    {ago(w.createdAt)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}
    </section>
  );
}
