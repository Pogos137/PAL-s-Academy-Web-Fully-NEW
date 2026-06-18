"use client";

import { useMemo, useState } from "react";
import { Archive, Calendar, CheckCircle2, ChevronDown, Circle, Loader2, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type A = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submitted: boolean;
  completedAt: string | null;
};

type Props = {
  classId: string;
  initial: A[];
  canSubmit: boolean;
  canCreate: boolean;
};

// A checked-off task lingers (struck through, at the bottom) for 24h, then
// moves into the Archive so the live list never grows without bound.
const ARCHIVE_AFTER_MS = 24 * 60 * 60 * 1000;

function fmt(d: string) {
  return new Date(d).toLocaleString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default function AssignmentList({ classId, initial, canSubmit, canCreate }: Props) {
  const [items, setItems] = useState<A[]>(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  // Split into the live list vs the archive (completed > 24h ago).
  const { active, archived } = useMemo(() => {
    const now = Date.now();
    const isArchived = (a: A) =>
      a.submitted && a.completedAt != null && now - +new Date(a.completedAt) > ARCHIVE_AFTER_MS;
    const act = items
      .filter((a) => !isArchived(a))
      // Open work first (by due date), recently-completed sinks to the bottom.
      .sort((a, b) => {
        if (a.submitted !== b.submitted) return a.submitted ? 1 : -1;
        return +new Date(a.dueDate) - +new Date(b.dueDate);
      });
    const arc = items
      .filter(isArchived)
      .sort((a, b) => +new Date(b.completedAt!) - +new Date(a.completedAt!));
    return { active: act, archived: arc };
  }, [items]);

  const openCount = active.filter((a) => !a.submitted).length;
  const doneCount = active.length - openCount;

  // Toggle completion on/off. POST marks complete, DELETE un-marks (also how a
  // student "retrieves" an archived task — it comes back as open).
  async function toggle(id: string, currentlyDone: boolean) {
    if (busyId) return;
    const prevItem = items.find((a) => a.id === id);
    setBusyId(id);
    setErr(null);
    // Optimistic flip.
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, submitted: !currentlyDone, completedAt: currentlyDone ? null : new Date().toISOString() }
          : a
      )
    );
    try {
      const res = await fetch(`/api/portal/classes/${classId}/assignments/${id}/submit`, {
        method: currentlyDone ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: currentlyDone ? undefined : JSON.stringify({})
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not update");
      }
    } catch (e: any) {
      // Roll back on failure to the exact prior state.
      setItems((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, submitted: currentlyDone, completedAt: prevItem?.completedAt ?? null }
            : a
        )
      );
      setErr(e.message || "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");
      setItems((prev) => [
        ...prev,
        {
          id: data.assignment.id,
          title: data.assignment.title,
          description: data.assignment.description,
          dueDate: data.assignment.dueDate,
          submitted: false,
          completedAt: null
        }
      ]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setCreating(false);
    } catch (e: any) {
      setErr(e.message || "Could not create");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-ink-800">Assignments &amp; tasks</h2>
          {items.length > 0 && (
            <div className="mt-1 text-xs text-ink-500">
              {openCount} open
              {doneCount > 0 && <> · {doneCount} completed</>}
            </div>
          )}
        </div>
        {canCreate && (
          <button
            onClick={() => setCreating((v) => !v)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 px-3 py-1.5 text-xs uppercase tracking-wider2 text-ink-700 transition-colors hover:border-gold-300"
          >
            <Plus className="h-3 w-3" /> {creating ? "Cancel" : "New assignment"}
          </button>
        )}
      </div>

      {creating && canCreate && (
        <form
          onSubmit={create}
          className="mt-4 grid gap-3 rounded-2xl border border-ink-100 bg-ivory-50 p-5"
        >
          <input
            className="input-luxe"
            placeholder="Assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="input-luxe min-h-[80px]"
            placeholder="Description / instructions"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-ink-500" />
            <input
              type="date"
              className="input-luxe flex-1"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-gold" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post assignment"}
          </button>
        </form>
      )}

      {active.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
          {items.length === 0
            ? "No assignments yet for this class."
            : "Nothing active right now — your completed tasks are in the archive below."}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {active.map((a) => {
            const overdue = !a.submitted && +new Date(a.dueDate) < Date.now();
            const busy = busyId === a.id;
            return (
              <li
                key={a.id}
                className={cn(
                  "rounded-2xl border p-5 transition-all",
                  a.submitted
                    ? "border-accent-sage/40 bg-accent-sage/5"
                    : overdue
                    ? "border-accent-rose/50 bg-ivory-50"
                    : "border-ink-100 bg-ivory-50"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Completion toggle */}
                  {canSubmit ? (
                    <button
                      onClick={() => toggle(a.id, a.submitted)}
                      disabled={busy}
                      aria-label={a.submitted ? "Mark as not done" : "Mark as complete"}
                      title={a.submitted ? "Mark as not done" : "Mark as complete"}
                      className="mt-0.5 shrink-0 rounded-full transition-transform hover:scale-110 disabled:opacity-50"
                    >
                      {busy ? (
                        <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
                      ) : a.submitted ? (
                        <CheckCircle2 className="h-5 w-5 text-accent-sage" />
                      ) : (
                        <Circle className="h-5 w-5 text-ink-300 hover:text-gold-500" />
                      )}
                    </button>
                  ) : a.submitted ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-sage" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 shrink-0 text-ink-300" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "font-medium",
                        a.submitted ? "text-ink-500 line-through decoration-accent-sage/50" : "text-ink-800"
                      )}
                    >
                      {a.title}
                    </div>
                    {a.description && (
                      <p
                        className={cn(
                          "mt-1 whitespace-pre-wrap text-sm",
                          a.submitted ? "text-ink-400" : "text-ink-600"
                        )}
                      >
                        {a.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 uppercase tracking-wider2",
                          a.submitted
                            ? "border border-accent-sage bg-accent-sage/10 text-accent-sage"
                            : overdue
                            ? "border border-accent-rose bg-accent-rose/10 text-accent-rose"
                            : "border border-gold-300 bg-gold-50 text-gold-700"
                        )}
                      >
                        {a.submitted ? "Completed" : overdue ? "Overdue" : "Open"}
                      </span>
                      <span className="text-ink-500">Due {fmt(a.dueDate)}</span>
                    </div>
                  </div>

                  {canSubmit && (
                    <button
                      onClick={() => toggle(a.id, a.submitted)}
                      disabled={busy}
                      className={cn(
                        "hidden shrink-0 whitespace-nowrap sm:inline-flex",
                        a.submitted ? "btn btn-ghost" : "btn btn-ink"
                      )}
                    >
                      {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : a.submitted ? (
                        "Undo"
                      ) : (
                        "Mark complete"
                      )}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Archived tasks — completed more than 24h ago. */}
      {archived.length > 0 && (
        <div className="mt-5 rounded-2xl border border-ink-100 bg-white/60">
          <button
            onClick={() => setShowArchive((v) => !v)}
            aria-expanded={showArchive}
            className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
          >
            <span className="inline-flex items-center gap-2 text-sm text-ink-600">
              <Archive className="h-4 w-4 text-ink-400" />
              Archived tasks
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] text-ink-600">
                {archived.length}
              </span>
            </span>
            <ChevronDown
              className={cn("h-4 w-4 text-ink-400 transition-transform", showArchive && "rotate-180")}
            />
          </button>
          {showArchive && (
            <ul className="border-t border-ink-100 px-3 pb-3 pt-2">
              {archived.map((a) => {
                const busy = busyId === a.id;
                return (
                  <li
                    key={a.id}
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-ink-50"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-ink-300" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-ink-500 line-through decoration-ink-300">
                        {a.title}
                      </div>
                      {a.completedAt && (
                        <div className="text-[11px] text-ink-400">Completed {fmt(a.completedAt)}</div>
                      )}
                    </div>
                    {canSubmit && (
                      <button
                        onClick={() => toggle(a.id, true)}
                        disabled={busy}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1 text-[11px] uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900 disabled:opacity-50"
                        title="Bring this task back to your active list"
                      >
                        {busy ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <RotateCcw className="h-3 w-3" />
                        )}
                        Retrieve
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}
    </div>
  );
}
