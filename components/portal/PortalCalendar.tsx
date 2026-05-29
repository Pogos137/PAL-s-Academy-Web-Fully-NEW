"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export type DueEvent = {
  classId: string;
  subject: string;
  title: string;
  date: string; // ISO
};

export type SessionDef = {
  weekday: number; // 0 (Sun) – 6 (Sat)
  time: string; // human-readable, e.g. "7:00pm ET"
  classId: string;
  subject: string;
  title: string;
  meetUrl: string;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function ymd(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function sameDay(a: Date, b: Date) {
  return ymd(a) === ymd(b);
}
function shortSubject(s: string) {
  // "MCV4U · Calculus & Vectors" → "MCV4U"
  return s.split("·")[0].trim();
}

export default function PortalCalendar({
  dues,
  sessions
}: {
  dues: DueEvent[];
  sessions: SessionDef[];
}) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date>(today);

  // Build the visible grid (full weeks covering the month).
  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay()); // back to Sunday
    const out: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      out.push(d);
    }
    // Trim the trailing week if it's entirely in the next month.
    return out.slice(0, out[35].getMonth() === cursor.getMonth() ? 42 : 35);
  }, [cursor]);

  function eventsFor(day: Date) {
    const daySessions = sessions.filter((s) => s.weekday === day.getDay());
    const dayDues = dues.filter((d) => sameDay(new Date(d.date), day));
    return { daySessions, dayDues };
  }

  const sel = eventsFor(selected);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Month grid */}
      <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="font-serif text-2xl text-ink-800">
            {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="rounded-full border border-ink-200 px-3 py-1 text-[11px] uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-300 hover:text-ink-900"
            >
              Today
            </button>
            <button
              aria-label="Previous month"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="rounded-full border border-ink-200 p-1.5 text-ink-600 transition-colors hover:border-gold-300 hover:text-ink-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next month"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="rounded-full border border-ink-200 p-1.5 text-ink-600 transition-colors hover:border-gold-300 hover:text-ink-900"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider2 text-ink-400">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-1">{w}</div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((day) => {
            const inMonth = day.getMonth() === cursor.getMonth();
            const isToday = sameDay(day, today);
            const isSelected = sameDay(day, selected);
            const { daySessions, dayDues } = eventsFor(day);
            const chips = [
              ...daySessions.map((s) => ({ key: "s" + s.classId, kind: "session" as const, label: shortSubject(s.subject) })),
              ...dayDues.map((d) => ({ key: "d" + d.classId + d.title, kind: "due" as const, label: shortSubject(d.subject) }))
            ];
            return (
              <button
                key={ymd(day)}
                onClick={() => setSelected(new Date(day))}
                className={cn(
                  "flex min-h-[68px] flex-col rounded-xl border p-1.5 text-left transition-colors",
                  isSelected
                    ? "border-gold-400 bg-gold-50"
                    : "border-ink-100 bg-white hover:border-gold-200",
                  !inMonth && "opacity-40"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    isToday ? "bg-ink-900 font-medium text-ivory" : "text-ink-600"
                  )}
                >
                  {day.getDate()}
                </span>
                <span className="mt-1 flex flex-col gap-0.5">
                  {chips.slice(0, 2).map((c) => (
                    <span
                      key={c.key}
                      className={cn(
                        "truncate rounded px-1 py-0.5 text-[9px] font-medium leading-tight",
                        c.kind === "session"
                          ? "bg-ink-900/90 text-ivory"
                          : "bg-gold-100 text-gold-700"
                      )}
                    >
                      {c.kind === "due" ? "Due · " : ""}
                      {c.label}
                    </span>
                  ))}
                  {chips.length > 2 && (
                    <span className="px-1 text-[9px] text-ink-400">+{chips.length - 2} more</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-wider2 text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-ink-900" /> Session
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-gold-300" /> Due date
          </span>
        </div>
      </div>

      {/* Selected day detail */}
      <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
        <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
          {sameDay(selected, today) ? "Today" : "Selected day"}
        </div>
        <div className="mt-1 font-serif text-xl text-ink-800">
          {selected.toLocaleDateString("en-CA", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        </div>

        {sel.daySessions.length === 0 && sel.dayDues.length === 0 ? (
          <p className="mt-4 text-sm text-ink-500">Nothing scheduled. A clear day.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {sel.daySessions.map((s) => (
              <div key={s.classId} className="rounded-xl border border-ink-100 bg-white p-3">
                <div className="text-[10px] uppercase tracking-wider2 text-ink-400">
                  Session · {s.time}
                </div>
                <Link
                  href={`/portal/classes/${s.classId}`}
                  className="mt-1 block text-sm font-medium text-ink-800 hover:text-ink-900"
                >
                  {s.subject}
                </Link>
                <a
                  href={s.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink-100 px-2.5 py-1 text-xs text-ink-700 hover:border-gold-300"
                >
                  <Video className="h-3 w-3" /> Join Meet
                </a>
              </div>
            ))}
            {sel.dayDues.map((d) => (
              <Link
                key={d.classId + d.title}
                href={`/portal/classes/${d.classId}`}
                className="block rounded-xl border border-gold-200 bg-gold-50 p-3 transition-colors hover:border-gold-400"
              >
                <div className="text-[10px] uppercase tracking-wider2 text-gold-700">
                  Due · {d.subject.split("·")[0].trim()}
                </div>
                <div className="mt-1 text-sm font-medium text-ink-800">{d.title}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
