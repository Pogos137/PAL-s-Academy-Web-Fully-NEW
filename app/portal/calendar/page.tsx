import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarClock, Video } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { classesForUser } from "@/lib/store/queries";
import { readDb } from "@/lib/store/db";
import PortalShell from "@/components/portal/PortalShell";

export const metadata = {
  title: "Calendar",
  robots: { index: false, follow: false }
};

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
  if (user.role === "admin") redirect("/admin");
  if (user.status !== "approved") redirect("/portal/pending");

  const classes = await classesForUser(user);
  const db = await readDb();
  const classIds = new Set(classes.map((c) => c.id));

  const deadlines = db.assignments
    .filter((a) => classIds.has(a.classId))
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <h1 className="font-serif text-4xl text-ink-800">Calendar</h1>
        <p className="mt-2 text-sm text-ink-600">
          Your recurring sessions and every upcoming assignment due date.
        </p>

        <h2 className="mt-10 font-serif text-2xl text-ink-800">Recurring sessions</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {classes.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-ink-100 bg-ivory-50 p-6"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
                <CalendarClock className="h-3.5 w-3.5" /> {c.schedule}
              </div>
              <div className="mt-2 font-serif text-xl text-ink-800">{c.subject}</div>
              <div className="mt-1 text-sm text-ink-600">{c.title}</div>
              <div className="mt-4 flex gap-2">
                <Link href={`/portal/classes/${c.id}`} className="btn btn-ink">
                  Open class
                </Link>
                <a
                  href={c.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <Video className="h-4 w-4" /> Join Meet
                </a>
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-6 text-sm text-ink-600">
              No sessions scheduled yet.
            </div>
          )}
        </div>

        <h2 className="mt-12 font-serif text-2xl text-ink-800">Upcoming due dates</h2>
        {deadlines.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            Nothing due. Enjoy it.
          </div>
        ) : (
          <ol className="mt-4 space-y-3">
            {deadlines.map((a) => {
              const cls = classes.find((c) => c.id === a.classId);
              const overdue = +new Date(a.dueDate) < Date.now();
              return (
                <li
                  key={a.id}
                  className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ivory-50 p-5"
                >
                  <div className="w-28 shrink-0 text-xs text-ink-500">{fmt(a.dueDate)}</div>
                  <div className="flex-1">
                    <Link
                      href={`/portal/classes/${a.classId}`}
                      className="font-medium text-ink-800 hover:text-ink-900"
                    >
                      {a.title}
                    </Link>
                    <div className="text-xs text-ink-500">{cls?.subject}</div>
                  </div>
                  {overdue && (
                    <span className="rounded-full border border-accent-rose bg-accent-rose/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 text-accent-rose">
                      Past
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </PortalShell>
  );
}
