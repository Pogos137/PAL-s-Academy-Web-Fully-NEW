import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, ExternalLink, Sparkles, Video, Wallet } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { ensureProgressSeed, ensureStudentPlans } from "@/lib/store/seed-progress";
import { classesForUser } from "@/lib/store/queries";
import { studentGrowth, sessionsRemaining } from "@/lib/store/progress";
import { readDb } from "@/lib/store/db";
import PortalShell, { ClassQuickStat } from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Student Portal",
  robots: { index: false, follow: false }
};

function fmt(date: string) {
  return new Date(date).toLocaleString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default async function PortalPage() {
  await ensureSeed();
  await ensureProgressSeed();
  await ensureStudentPlans();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal");
  if (user.role === "admin") redirect("/portal/students");
  if (user.status !== "approved") redirect("/portal/pending");

  const classes = await classesForUser(user);
  const db = await readDb();
  const growth = await studentGrowth(user);
  const plan = db.studentPlans.find((p) => p.studentId === user.id) ?? null;
  const sessionsLeft = sessionsRemaining(plan);
  const sessionsPct =
    plan && plan.sessionsPurchased > 0
      ? Math.round(((sessionsLeft ?? 0) / plan.sessionsPurchased) * 100)
      : 0;

  const classIds = new Set(classes.map((c) => c.id));
  const myAssignments = db.assignments
    .filter((a) => classIds.has(a.classId))
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

  const upcoming = myAssignments.filter((a) => +new Date(a.dueDate) >= Date.now()).slice(0, 5);
  const mySubmissions = new Set(
    db.submissions.filter((s) => s.studentId === user.id).map((s) => s.assignmentId)
  );

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
          Welcome back
        </div>
        <h1 className="mt-1 font-serif text-4xl text-ink-800">
          Hello, {user.fullName.split(" ")[0]}.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">
          Your classes, upcoming sessions, and homework live here. Quick-join your next
          Google Meet right from your class page.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ClassQuickStat
            icon="classes"
            label="Active classes"
            value={String(classes.length)}
          />
          <ClassQuickStat
            icon="assignments"
            label="Open assignments"
            value={String(upcoming.length)}
          />
          <ClassQuickStat
            icon="session"
            label="Next session"
            value={classes[0]?.schedule || "Schedule pending"}
          />
        </div>

        {/* Sessions remaining — so there's never confusion about what's left */}
        {plan && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-gold-200 bg-white/70 p-2.5 text-gold-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Your plan</div>
                <div className="font-serif text-xl text-ink-800">{plan.planName}</div>
                <div className="text-xs text-ink-500">
                  Renews{" "}
                  {new Date(plan.renewsOn).toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
              </div>
            </div>
            <div className="min-w-[200px] flex-1 sm:max-w-xs">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl text-ink-800">{sessionsLeft}</span>
                <span className="text-xs text-ink-500">
                  of {plan.sessionsPurchased} sessions left
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                  style={{ width: `${sessionsPct}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] text-ink-400">
                {plan.sessionsUsed} used this period · questions? message your tutor
              </div>
            </div>
          </div>
        )}

        {/* PAL's Progress teaser — the growth hub competitors don't offer */}
        {user.role === "student" && (
        <Link
          href="/portal/progress"
          className="group mt-8 flex flex-col gap-4 overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-luxe sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-gold-200 bg-white/70 p-2.5 text-gold-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-serif text-xl text-ink-800">Your progress, made visible</div>
              <p className="mt-1 max-w-md text-sm text-ink-600">
                Mastery by topic, your confidence trend, and the breakthroughs along the way.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-center">
              <div className="font-serif text-2xl text-ink-800">{growth.overallMomentum}%</div>
              <div className="text-[10px] uppercase tracking-wider2 text-ink-500">Momentum</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl text-ink-800">
                {growth.overallConfidence ?? "—"}
                {growth.overallConfidence != null && <span className="text-sm text-ink-400">/5</span>}
              </div>
              <div className="text-[10px] uppercase tracking-wider2 text-ink-500">Confidence</div>
            </div>
            <ArrowRight className="h-5 w-5 text-gold-500 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        )}

        {/* Classes */}
        <h2 className="mt-12 font-serif text-2xl text-ink-800">Your classes</h2>
        {classes.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            No classes are linked to your account yet. After your free consultation, an
            academy admin will set up your weekly class and you&rsquo;ll see it here.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {classes.map((c) => (
              <div
                key={c.id}
                className="group rounded-2xl border border-ink-100 bg-ivory-50 p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-luxe"
              >
                <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
                  {c.schedule}
                </div>
                <Link
                  href={`/portal/classes/${c.id}`}
                  className="mt-2 block font-serif text-2xl text-ink-800 hover:text-ink-900"
                >
                  {c.subject}
                </Link>
                <div className="mt-1 text-sm text-ink-600">{c.title}</div>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href={`/portal/classes/${c.id}`}
                    className="text-xs uppercase tracking-wider2 text-ink-500 transition-colors hover:text-ink-800"
                  >
                    Open class →
                  </Link>
                  <a
                    href={c.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3 py-1 text-xs text-ink-700 hover:border-gold-300"
                  >
                    <Video className="h-3 w-3" /> Join Meet
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming work */}
        <h2 className="mt-12 font-serif text-2xl text-ink-800">Upcoming work</h2>
        {upcoming.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            You&rsquo;re all caught up.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-ink-100 bg-ivory-50">
            <ul className="divide-y divide-ink-100">
              {upcoming.map((a) => {
                const cls = classes.find((c) => c.id === a.classId);
                const submitted = mySubmissions.has(a.id);
                return (
                  <li key={a.id} className="flex items-center gap-4 p-5">
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
                        {cls?.subject || "Class"}
                      </div>
                      <Link
                        href={`/portal/classes/${a.classId}`}
                        className="mt-1 block font-medium text-ink-800 hover:text-ink-900"
                      >
                        {a.title}
                      </Link>
                      <div className="mt-0.5 text-xs text-ink-500">Due {fmt(a.dueDate)}</div>
                    </div>
                    <span
                      className={
                        "rounded-full px-3 py-1 text-[10px] uppercase tracking-wider2 " +
                        (submitted
                          ? "border border-accent-sage bg-accent-sage/10 text-accent-sage"
                          : "border border-gold-300 bg-gold-50 text-gold-700")
                      }
                    >
                      {submitted ? "Submitted" : "Open"}
                    </span>
                    <Link
                      href={`/portal/classes/${a.classId}`}
                      className="hidden items-center gap-1 text-xs text-ink-500 hover:text-ink-800 sm:inline-flex"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
