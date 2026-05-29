"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const subjects = [
  "Math",
  "Functions",
  "Calculus",
  "Chemistry",
  "Physics",
  "Biology",
  "English",
  "French",
  "Computer Science",
  "Economics"
];

const grades = ["Grade 9-10", "Grade 11-12", "1st-year University"];

const educations = ["High School", "Undergraduate (current)", "Undergraduate (graduate)", "Master's", "PhD"];

export default function TutorApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [chosenSubjects, setChosenSubjects] = useState<string[]>([]);
  const [chosenGrades, setChosenGrades] = useState<string[]>([]);

  function toggle(list: string[], set: (s: string[]) => void, v: string) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
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
      location: String(fd.get("location") || ""),
      highest_education: String(fd.get("highest_education") || ""),
      university: String(fd.get("university") || ""),
      program: String(fd.get("program") || ""),
      subjects: chosenSubjects,
      grade_levels: chosenGrades,
      years_experience: Number(fd.get("years_experience") || 0),
      availability: String(fd.get("availability") || ""),
      linkedin: String(fd.get("linkedin") || ""),
      resume_url: String(fd.get("resume_url") || ""),
      cover_letter: String(fd.get("cover_letter") || "")
    };
    try {
      const res = await fetch("/api/applications", {
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
        <h3 className="mt-4 font-serif text-2xl text-ink-800">
          Application received. Thank you.
        </h3>
        <p className="mt-2 text-sm text-ink-500">
          We read every application personally. If your background fits a current need,
          we&rsquo;ll reach out within 7 business days to schedule a teaching interview.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input-luxe" name="full_name" required placeholder="Full name" />
        <input className="input-luxe" name="email" type="email" required placeholder="Email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input-luxe" name="phone" placeholder="Phone" />
        <input className="input-luxe" name="location" placeholder="City / area" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <select className="input-luxe" name="highest_education" required defaultValue="">
          <option value="" disabled>Highest education</option>
          {educations.map((e) => <option key={e}>{e}</option>)}
        </select>
        <input className="input-luxe" name="university" placeholder="University" />
        <input className="input-luxe" name="program" placeholder="Program / Major" />
      </div>

      <div>
        <div className="mb-2 text-xs uppercase tracking-wider2 text-ink-400">
          Subjects you can teach
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => {
            const active = chosenSubjects.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(chosenSubjects, setChosenSubjects, s)}
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

      <div>
        <div className="mb-2 text-xs uppercase tracking-wider2 text-ink-400">
          Grade levels you&rsquo;re comfortable teaching
        </div>
        <div className="flex flex-wrap gap-2">
          {grades.map((g) => {
            const active = chosenGrades.includes(g);
            return (
              <button
                type="button"
                key={g}
                onClick={() => toggle(chosenGrades, setChosenGrades, g)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs transition-all " +
                  (active
                    ? "border-gold-400 bg-gold-50 text-ink-800"
                    : "border-ink-200 text-ink-500 hover:border-gold-300")
                }
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <input
          className="input-luxe"
          name="years_experience"
          type="number"
          min={0}
          placeholder="Years tutoring"
        />
        <input
          className="input-luxe sm:col-span-2"
          name="availability"
          placeholder="Weekly availability (e.g. weekday evenings + Sun AM)"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input className="input-luxe" name="linkedin" placeholder="LinkedIn URL" />
        <input className="input-luxe" name="resume_url" placeholder="Resume link (Drive/Dropbox)" />
      </div>

      <textarea
        className="input-luxe min-h-[140px] resize-y"
        name="cover_letter"
        placeholder="Tell us why you want to teach with PAL's. Specific is better than long."
      />

      {err && <div className="text-sm text-accent-rose">{err}</div>}

      <button type="submit" className="btn btn-gold mt-2" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting
          </>
        ) : (
          "Submit application"
        )}
      </button>
      <p className="text-center text-[11px] uppercase tracking-wider2 text-ink-400">
        Reviewed personally · Response within 7 business days
      </p>
    </form>
  );
}
