import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { classesForUser } from "@/lib/store/queries";
import { readDb } from "@/lib/store/db";
import PortalShell from "@/components/portal/PortalShell";
import PortalCalendar, { type DueEvent, type SessionDef } from "@/components/portal/PortalCalendar";

export const metadata = {
  title: "Calendar",
  robots: { index: false, follow: false }
};

const WEEKDAY_INDEX: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

// "Sundays · 7:00pm ET" → { weekday: 0, time: "7:00pm ET" }
function parseSchedule(schedule: string): { weekday: number | null; time: string } {
  const [left, right] = schedule.split("·").map((s) => s.trim());
  const word = (left || "").toLowerCase().replace(/s$/, "");
  const weekday = word in WEEKDAY_INDEX ? WEEKDAY_INDEX[word] : null;
  return { weekday, time: right || left || "" };
}

function fmt(date: string) {
  return new Date(date).toLocaleString("en-CA", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default async function CalendarPage() {
  await ensureSeed();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal/calendar");
  if (user.status !== "approved" && user.role !== "admin") redirect("/portal/pending");

  const classes = await classesForUser(user);
  const db = await readDb();
  const classIds = new Set(classes.map((c) => c.id));

  const assignments = db.assignments
    .filter((a) => classIds.has(a.classId))
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

  const dues: DueEvent[] = assignments.map((a) => {
    const cls = classes.find((c) => c.id === a.classId)!;
    return { classId: a.classId, subject: cls.subject, title: a.title, date: a.dueDate };
  });

  const sessions: SessionDef[] = classes
    .map((c) => {
      const { weekday, time } = parseSchedule(c.schedule);
      if (weekday === null) return null;
      return {
        weekday,
        time,
        classId: c.id,
        subject: c.subject,
        title: c.title,
        meetUrl: c.meetUrl
      } satisfies SessionDef;
    })
    .filter((s): s is SessionDef => s !== null);

  const upcoming = assignments.filter((a) => +new Date(a.dueDate) >= Date.now());

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <h1 className="font-serif text-4xl text-ink-800">Calendar</h1>
        <p className="mt-2 text-sm text-ink-600">
          {user.role === "student"
            ? "Your recurring weekly sessions and every assignment due date, on one calendar. Click any day for details."
            : user.role === "tutor"
            ? "Every class you teach — weekly sessions and assignment due dates on one calendar. Click any day for details."
            : "Every class's weekly sessions and assignment due dates across the academy, on one calendar. Click any day for details."}
        </p>

        <div className="mt-8">
          <PortalCalendar dues={dues} sessions={sessions} />
        </div>

        <h2 className="mt-12 font-serif text-2xl text-ink-800">Upcoming due dates</h2>
        {upcoming.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            Nothing due. Enjoy it.
          </div>
        ) : (
          <ol className="mt-4 space-y-3">
            {upcoming.map((a) => {
              const cls = classes.find((c) => c.id === a.classId);
              return (
                <li
                  key={a.id}
                  className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ivory-50 p-5"
                >
                  <div className="w-36 shrink-0 text-xs text-ink-500">{fmt(a.dueDate)}</div>
                  <div className="flex-1">
                    <Link
                      href={`/portal/classes/${a.classId}`}
                      className="font-medium text-ink-800 hover:text-ink-900"
                    >
                      {a.title}
                    </Link>
                    <div className="text-xs text-ink-500">{cls?.subject}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </PortalShell>
  );
}
