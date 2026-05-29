"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const grades = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "1st-year University"];
const subjectOptions = [
  "Math (Functions/Calculus)",
  "Chemistry",
  "Physics",
  "Biology",
  "English",
  "French",
  "Computer Science",
  "Economics"
];

export default function LeadForm({ source = "booking" }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);

  function toggle(s: string) {
    setChosen((c) => (c.includes(s) ? c.filter((x) => x !== s) : [...c, s]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      student_grade: String(fd.get("student_grade") || ""),
      subjects: chosen,
      goals: String(fd.get("goals") || ""),
      source
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (e: unknown) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Unknown error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold-300 bg-ivory-50 p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold-500" />
        <h3 className="mt-4 font-serif text-2xl text-ink-800">We&rsquo;ve got it.</h3>
        <p className="mt-2 text-sm text-ink-500">
          A confirmation is on its way to your inbox. Choose a time below and we&rsquo;ll see
          you on the call.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input-luxe" name="full_name" required placeholder="Parent or student name" />
        <input className="input-luxe" name="email" type="email" required placeholder="Email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input-luxe" name="phone" placeholder="Phone (optional)" />
        <select className="input-luxe" name="student_grade" required defaultValue="">
          <option value="" disabled>
            Student grade level
          </option>
          {grades.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 text-xs uppercase tracking-wider2 text-ink-400">
          Subjects of interest
        </div>
        <div className="flex flex-wrap gap-2">
          {subjectOptions.map((s) => {
            const active = chosen.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs transition-all " +
                  (active
                    ? "border-gold-400 bg-gold-50 text-ink-800"
                    : "border-ink-200 text-ink-500 hover:border-gold-300")
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        className="input-luxe min-h-[110px] resize-y"
        name="goals"
        placeholder="What do you want to change this term? (a grade, an exam, university prep…)"
      />

      {err && <div className="text-sm text-accent-rose">{err}</div>}

      <button type="submit" className="btn btn-gold mt-2" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Send & unlock booking"
        )}
      </button>
      <p className="text-center text-[11px] uppercase tracking-wider2 text-ink-400">
        No spam · No payment to book · Reply within 24 hours
      </p>
    </form>
  );
}
