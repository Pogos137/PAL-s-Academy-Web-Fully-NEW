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
        <div>
          <label htmlFor="ta-name" className="mb-1.5 block text-xs font-medium text-ink-700">
            Full name
          </label>
          <input id="ta-name" className="input-luxe" name="full_name" required placeholder="e.g. Priya Anand" />
        </div>
        <div>
          <label htmlFor="ta-email" className="mb-1.5 block text-xs font-medium text-ink-700">
            Email
          </label>
          <input id="ta-email" className="input-luxe" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ta-phone" className="mb-1.5 block text-xs font-medium text-ink-700">
            Phone <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input id="ta-phone" className="input-luxe" name="phone" type="tel" placeholder="(437) 777-4828" />
        </div>
        <div>
          <label htmlFor="ta-location" className="mb-1.5 block text-xs font-medium text-ink-700">
            City / area
          </label>
          <input id="ta-location" className="input-luxe" name="location" placeholder="e.g. North York" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="ta-education" className="mb-1.5 block text-xs font-medium text-ink-700">
            Highest education
          </label>
          <select id="ta-education" className="input-luxe" name="highest_education" required defaultValue="">
            <option value="" disabled>Select…</option>
            {educations.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ta-university" className="mb-1.5 block text-xs font-medium text-ink-700">
            University
          </label>
          <input id="ta-university" className="input-luxe" name="university" placeholder="e.g. U of T" />
        </div>
        <div>
          <label htmlFor="ta-program" className="mb-1.5 block text-xs font-medium text-ink-700">
            Program / Major
          </label>
          <input id="ta-program" className="input-luxe" name="program" placeholder="e.g. Biochemistry" />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-medium text-ink-700">Subjects you can teach</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => {
            const active = chosenSubjects.includes(s);
            return (
              <button
                type="button"
                key={s}
                aria-pressed={active}
                onClick={() => toggle(chosenSubjects, setChosenSubjects, s)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 " +
                  (active
                    ? "border-gold-400 bg-gold-50 text-ink-800"
                    : "border-ink-200 text-ink-600 hover:border-gold-300")
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xs font-medium text-ink-700">
          Grade levels you&rsquo;re comfortable teaching
        </legend>
        <div className="flex flex-wrap gap-2">
          {grades.map((g) => {
            const active = chosenGrades.includes(g);
            return (
              <button
                type="button"
                key={g}
                aria-pressed={active}
                onClick={() => toggle(chosenGrades, setChosenGrades, g)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 " +
                  (active
                    ? "border-gold-400 bg-gold-50 text-ink-800"
                    : "border-ink-200 text-ink-600 hover:border-gold-300")
                }
              >
                {g}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="ta-years" className="mb-1.5 block text-xs font-medium text-ink-700">
            Years tutoring
          </label>
          <input id="ta-years" className="input-luxe" name="years_experience" type="number" min={0} placeholder="0" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ta-availability" className="mb-1.5 block text-xs font-medium text-ink-700">
            Weekly availability
          </label>
          <input
            id="ta-availability"
            className="input-luxe"
            name="availability"
            placeholder="e.g. weekday evenings + Sun AM"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ta-linkedin" className="mb-1.5 block text-xs font-medium text-ink-700">
            LinkedIn <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input id="ta-linkedin" className="input-luxe" name="linkedin" type="url" placeholder="linkedin.com/in/…" />
        </div>
        <div>
          <label htmlFor="ta-resume" className="mb-1.5 block text-xs font-medium text-ink-700">
            Resume link <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input id="ta-resume" className="input-luxe" name="resume_url" type="url" placeholder="Drive / Dropbox link" />
        </div>
      </div>

      <div>
        <label htmlFor="ta-cover" className="mb-1.5 block text-xs font-medium text-ink-700">
          Why do you want to teach with PAL&rsquo;s?
        </label>
        <textarea
          id="ta-cover"
          className="input-luxe min-h-[140px] resize-y"
          name="cover_letter"
          placeholder="Specific is better than long."
        />
      </div>

      {err && (
        <div role="alert" className="text-sm text-accent-rose">
          {err}
        </div>
      )}

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
