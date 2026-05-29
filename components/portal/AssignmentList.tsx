"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Circle, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type A = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submitted: boolean;
};

type Props = {
  classId: string;
  initial: A[];
  canSubmit: boolean;
  canCreate: boolean;
};

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

  async function submitWork(id: string) {
    setBusyId(id);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/assignments/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submit failed");
      setItems((prev) => prev.map((a) => (a.id === id ? { ...a, submitted: true } : a)));
    } catch (e: any) {
      setErr(e.message || "Could not submit");
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
      setItems((prev) =>
        [
          ...prev,
          {
            id: data.assignment.id,
            title: data.assignment.title,
            description: data.assignment.description,
            dueDate: data.assignment.dueDate,
            submitted: false
          }
        ].sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
      );
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
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink-800">Assignments</h2>
        {canCreate && (
          <button
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-3 py-1.5 text-xs uppercase tracking-wider2 text-ink-700 transition-colors hover:border-gold-300"
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

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
          No assignments yet for this class.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((a) => {
            const overdue = !a.submitted && +new Date(a.dueDate) < Date.now();
            return (
              <li
                key={a.id}
                className={cn(
                  "rounded-2xl border bg-ivory-50 p-5 transition-colors",
                  a.submitted
                    ? "border-accent-sage/40"
                    : overdue
                    ? "border-accent-rose/50"
                    : "border-ink-100"
                )}
              >
                <div className="flex items-start gap-3">
                  {a.submitted ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent-sage" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 text-ink-300" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-ink-800">{a.title}</div>
                    {a.description && (
                      <p className="mt-1 whitespace-pre-wrap text-sm text-ink-600">
                        {a.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-3 text-xs">
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
                        {a.submitted ? "Submitted" : overdue ? "Overdue" : "Open"}
                      </span>
                      <span className="text-ink-500">Due {fmt(a.dueDate)}</span>
                    </div>
                  </div>
                  {canSubmit && !a.submitted && (
                    <button
                      onClick={() => submitWork(a.id)}
                      className="btn btn-ink whitespace-nowrap"
                      disabled={busyId === a.id}
                    >
                      {busyId === a.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Mark submitted"
                      )}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}
    </div>
  );
}
