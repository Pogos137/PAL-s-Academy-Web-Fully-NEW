"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, UserPlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Person = { id: string; fullName: string; email: string };
type Cls = {
  id: string;
  subject: string;
  title: string;
  schedule: string;
  meetUrl: string;
  tutorId: string;
  studentIds: string[];
};

type Props = { classes: Cls[]; students: Person[]; tutors: Person[] };

export default function EnrollmentManager({ classes, students, tutors }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    title: "",
    tutorId: tutors[0]?.id || "",
    schedule: "",
    meetUrl: ""
  });

  const studentName = (id: string) => students.find((s) => s.id === id)?.fullName || "—";

  async function call(url: string, method: string, body: unknown, key: string) {
    setBusy(key);
    setErr(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Action failed");
      router.refresh();
      return true;
    } catch (e: any) {
      setErr(e.message || "Action failed");
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function createClass(e: React.FormEvent) {
    e.preventDefault();
    if (!form.subject.trim() || !form.title.trim() || !form.tutorId || !form.schedule.trim()) return;
    setCreating(true);
    const ok = await call("/api/admin/classes", "POST", form, "create");
    setCreating(false);
    if (ok) {
      setForm({ subject: "", title: "", tutorId: tutors[0]?.id || "", schedule: "", meetUrl: "" });
      setShowCreate(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink-800">Enrollment</h1>
          <p className="mt-1 text-sm text-ink-500">
            Control which students are enrolled in each course, assign tutors, and create new
            classes. Students only see courses you enroll them in.
          </p>
        </div>
        <button
          onClick={() => setShowCreate((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-2 text-xs font-medium uppercase tracking-wider2 text-ink-800 transition-colors hover:bg-gold-100"
        >
          <Plus className="h-3.5 w-3.5" /> {showCreate ? "Cancel" : "New course"}
        </button>
      </div>

      {err && (
        <div className="mt-4 rounded-xl border border-accent-rose/40 bg-accent-rose/5 px-4 py-3 text-sm text-accent-rose">
          {err}
        </div>
      )}

      {showCreate && (
        <form
          onSubmit={createClass}
          className="mt-6 grid gap-3 rounded-2xl border border-ink-100 bg-white p-6 sm:grid-cols-2"
        >
          <div className="sm:col-span-2 text-[10px] uppercase tracking-wider2 text-gold-600">
            Create a course
          </div>
          <input
            className="input-luxe"
            aria-label="Subject code and name"
            placeholder="Subject code · name (e.g. SPH4U · Physics)"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
          <input
            className="input-luxe"
            aria-label="Class title"
            placeholder="Class title (e.g. Grade 12 Physics — Monday cohort)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            className="input-luxe"
            aria-label="Tutor for new course"
            value={form.tutorId}
            onChange={(e) => setForm({ ...form, tutorId: e.target.value })}
            required
          >
            <option value="" disabled>
              Select tutor…
            </option>
            {tutors.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </select>
          <input
            className="input-luxe"
            aria-label="Schedule"
            placeholder="Schedule (e.g. Mondays · 7:30pm ET)"
            value={form.schedule}
            onChange={(e) => setForm({ ...form, schedule: e.target.value })}
            required
          />
          <input
            className="input-luxe sm:col-span-2"
            aria-label="Google Meet URL (optional)"
            placeholder="Google Meet URL (optional)"
            value={form.meetUrl}
            onChange={(e) => setForm({ ...form, meetUrl: e.target.value })}
          />
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-gold" disabled={creating}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create course"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 space-y-5">
        {classes.length === 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white p-8 text-sm text-ink-500">
            No courses yet. Create one above.
          </div>
        )}

        {classes.map((c) => {
          const enrolled = c.studentIds;
          const available = students.filter((s) => !enrolled.includes(s.id));
          return (
            <div key={c.id} className="rounded-2xl border border-ink-100 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
                    {c.schedule}
                  </div>
                  <div className="mt-1 font-serif text-2xl text-ink-800">{c.subject}</div>
                  <div className="text-sm text-ink-600">{c.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/portal/classes/${c.id}`}
                    aria-label={`Open ${c.subject} — ${c.title}`}
                    className="btn btn-ghost"
                  >
                    Open
                  </Link>
                  <button
                    aria-label={`Delete ${c.subject} — ${c.title}`}
                    onClick={() => {
                      if (confirm(`Delete "${c.subject}"? This removes its assignments and messages.`))
                        call(`/api/admin/classes/${c.id}`, "DELETE", null, `del-${c.id}`);
                    }}
                    disabled={busy === `del-${c.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-xs text-ink-600 transition-colors hover:border-accent-rose hover:text-accent-rose disabled:opacity-50"
                  >
                    {busy === `del-${c.id}` ? (
                      <Loader2 aria-hidden="true" focusable="false" className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 aria-hidden="true" focusable="false" className="h-3.5 w-3.5" />
                    )}
                    Delete
                  </button>
                </div>
              </div>

              {/* Tutor */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider2 text-ink-500">Tutor</span>
                <select
                  aria-label={`Tutor for ${c.subject}`}
                  className="input-luxe max-w-xs py-1.5 text-sm"
                  value={c.tutorId}
                  disabled={busy === `tutor-${c.id}`}
                  onChange={(e) =>
                    call(`/api/admin/classes/${c.id}`, "PATCH", {
                      op: "setTutor",
                      tutorId: e.target.value
                    }, `tutor-${c.id}`)
                  }
                >
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enrolled students */}
              <div className="mt-5">
                <div className="text-[10px] uppercase tracking-wider2 text-ink-500">
                  Enrolled students · {enrolled.length}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {enrolled.length === 0 && (
                    <span className="text-sm text-ink-500">No students enrolled yet.</span>
                  )}
                  {enrolled.map((sid) => (
                    <span
                      key={sid}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-ink-50 py-1 pl-3 pr-1.5 text-sm text-ink-700"
                    >
                      {studentName(sid)}
                      <button
                        aria-label={`Remove ${studentName(sid)} from ${c.subject}`}
                        onClick={() =>
                          call(`/api/admin/classes/${c.id}`, "PATCH", {
                            op: "removeStudent",
                            studentId: sid
                          }, `rm-${c.id}-${sid}`)
                        }
                        disabled={busy === `rm-${c.id}-${sid}`}
                        className="rounded-full p-0.5 text-ink-500 transition-colors hover:bg-accent-rose/10 hover:text-accent-rose disabled:opacity-50"
                      >
                        {busy === `rm-${c.id}-${sid}` ? (
                          <Loader2 aria-hidden="true" focusable="false" className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <X aria-hidden="true" focusable="false" className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add student */}
                {available.length > 0 ? (
                  <div className="mt-3 flex items-center gap-2">
                    <UserPlus aria-hidden="true" focusable="false" className="h-4 w-4 text-gold-600" />
                    <select
                      aria-label={`Enroll a student in ${c.subject}`}
                      className="input-luxe max-w-xs py-1.5 text-sm"
                      value=""
                      disabled={busy?.startsWith(`add-${c.id}`)}
                      onChange={(e) => {
                        if (!e.target.value) return;
                        call(`/api/admin/classes/${c.id}`, "PATCH", {
                          op: "addStudent",
                          studentId: e.target.value
                        }, `add-${c.id}-${e.target.value}`);
                      }}
                    >
                      <option value="">Enroll a student…</option>
                      {available.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.fullName} ({s.email})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-ink-400">Every student is enrolled.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
