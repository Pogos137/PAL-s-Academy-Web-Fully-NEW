import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  CalendarClock,
  ClipboardCheck,
  Gauge,
  MessageSquare,
  Sparkles,
  Target,
  Trophy,
  Wallet
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { ensureProgressSeed, ensureStudentPlans } from "@/lib/store/seed-progress";
import { classesForUser } from "@/lib/store/queries";
import { canViewStudent, studentProfile } from "@/lib/store/progress";
import PortalShell from "@/components/portal/PortalShell";
import PlanEditor from "@/components/portal/PlanEditor";
import { MASTERY_META, sparklinePoints } from "@/components/portal/progress-meta";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Student profile",
  robots: { index: false, follow: false }
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  await ensureSeed();
  await ensureProgressSeed();
  await ensureStudentPlans();
  const user = await getCurrentUser();
  if (!user) redirect(`/auth/login?next=/portal/students/${params.id}`);
  if (user.status !== "approved" && user.role !== "admin") redirect("/portal/pending");

  if (!(await canViewStudent(user, params.id))) notFound();
  const [profile, classes] = await Promise.all([studentProfile(params.id), classesForUser(user)]);
  if (!profile) notFound();

  const { user: s, plan, sessionsRemaining, overallMomentum, latestConfidence, confidenceSeries } = profile;
  const isSelf = user.id === s.id;

  const planInitial = plan
    ? {
        planName: plan.planName,
        monthlyPrice: plan.monthlyPrice,
        sessionsPurchased: plan.sessionsPurchased,
        sessionsRemaining: sessionsRemaining ?? 0,
        renewsOn: plan.renewsOn
      }
    : null;

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        {!isSelf && (
          <Link
            href="/portal/students"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider2 text-ink-500 hover:text-ink-800"
          >
            <ArrowLeft className="h-3 w-3" /> All students
          </Link>
        )}

        {/* Header */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Student profile</div>
            <h1 className="mt-1 font-serif text-4xl text-ink-800">{s.fullName}</h1>
            <div className="mt-1 text-sm text-ink-500">
              {s.email} · joined {fmtDate(s.createdAt)}
            </div>
          </div>
        </div>

        {/* Top stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <Sparkles className="h-3.5 w-3.5" /> Momentum
            </div>
            <div className="mt-2 font-serif text-3xl text-ink-800">{overallMomentum}%</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                style={{ width: `${overallMomentum}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <Gauge className="h-3.5 w-3.5" /> Confidence
            </div>
            <div className="mt-2 font-serif text-3xl text-ink-800">
              {latestConfidence ?? "—"}
              {latestConfidence != null && <span className="text-base text-ink-400">/5</span>}
            </div>
            {confidenceSeries.length > 0 && (
              <svg viewBox="0 0 120 24" className="mt-2 h-6 w-full" preserveAspectRatio="none" aria-hidden="true">
                <polyline
                  points={sparklinePoints(confidenceSeries, 120, 24)}
                  fill="none"
                  stroke="#C99A2A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </div>

          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <ClipboardCheck className="h-3.5 w-3.5" /> Assignments
            </div>
            <div className="mt-2 font-serif text-3xl text-ink-800">
              {profile.assignmentsDone}
              <span className="text-base text-ink-400">/{profile.assignmentsTotal}</span>
            </div>
            <div className="mt-2 text-xs text-ink-500">completed across classes</div>
          </div>

        </div>

        {/* Plan & sessions — admins edit here; tutors see it read-only */}
        <div className="mt-4">
          {user.role === "admin" ? (
            <PlanEditor studentId={s.id} initial={planInitial} />
          ) : (
            <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
                <Wallet className="h-3.5 w-3.5" /> Plan &amp; sessions
              </div>
              {plan ? (
                <div className="mt-2 flex flex-wrap items-end gap-x-8 gap-y-2">
                  <div>
                    <div className="font-serif text-2xl text-ink-800">{plan.planName}</div>
                    <div className="text-xs text-ink-500">
                      ${plan.monthlyPrice}/mo · renews {fmtDate(plan.renewsOn)}
                    </div>
                  </div>
                  <div className="text-sm text-ink-700">
                    <span className="font-serif text-2xl text-ink-800">{sessionsRemaining}</span> of{" "}
                    {plan.sessionsPurchased} sessions left
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-ink-500">No active plan on file.</div>
              )}
            </div>
          )}
        </div>

        {/* Per-class breakdown */}
        <h2 className="mt-12 font-serif text-2xl text-ink-800">How they&rsquo;re doing, by class</h2>
        {profile.classes.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            Not enrolled in any classes yet.
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {profile.classes.map(({ cls, mastery, confidence, assignmentsDone, assignmentsTotal, winsCount, openFocus }) => (
              <div key={cls.id} className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider2 text-gold-600">{cls.subject}</div>
                    <div className="mt-0.5 font-serif text-xl text-ink-800">{cls.title}</div>
                    <div className="mt-1 text-xs text-ink-500">{cls.schedule}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/portal/messages?c=${cls.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
                    >
                      <MessageSquare className="h-3 w-3" /> Messages
                    </Link>
                    <Link
                      href={`/portal/classes/${cls.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
                    >
                      <CalendarClock className="h-3 w-3" /> Open class
                    </Link>
                  </div>
                </div>

                {/* Mastery momentum */}
                <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
                  <span>{mastery.momentum}% momentum</span>
                  <span>
                    {mastery.counts.mastered}/{mastery.total} topics mastered
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                    style={{ width: `${mastery.momentum}%` }}
                  />
                </div>
                {/* Mastery distribution chips */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-500">
                  {(["mastered", "practising", "learning", "new"] as const).map((k) => (
                    <span key={k} className="inline-flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${MASTERY_META[k].dot}`} />
                      {MASTERY_META[k].label}
                      <span className="text-ink-400">· {mastery.counts[k]}</span>
                    </span>
                  ))}
                </div>

                {/* Quick metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-ink-500">
                      <Gauge className="h-3 w-3 text-gold-600" /> Confidence
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink-800">
                      {confidence.latest ?? "—"}
                      {confidence.latest != null && "/5"}
                      {confidence.delta != null && confidence.delta !== 0 && (
                        <span className={confidence.delta > 0 ? " text-accent-sage" : " text-accent-rose"}>
                          {" "}
                          ({confidence.delta > 0 ? "+" : ""}
                          {confidence.delta})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-ink-500">
                      <ClipboardCheck className="h-3 w-3 text-gold-600" /> Assignments
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink-800">
                      {assignmentsDone}/{assignmentsTotal}
                    </div>
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-ink-500">
                      <Trophy className="h-3 w-3 text-gold-600" /> Wins
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink-800">{winsCount}</div>
                  </div>
                  <div className="rounded-xl border border-ink-100 bg-white p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-ink-500">
                      <Target className="h-3 w-3 text-gold-600" /> To prep
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink-800">{openFocus}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Archived tasks — completed more than 24h ago (read-only here) */}
        {profile.archivedTasks.length > 0 && (
          <>
            <h2 className="mt-12 flex items-center gap-2 font-serif text-2xl text-ink-800">
              <Archive className="h-5 w-5 text-ink-400" /> Archived tasks
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Tasks {isSelf ? "you" : s.fullName.split(" ")[0]} completed more than 24 hours ago.
            </p>
            <ul className="mt-4 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-ivory-50">
              {profile.archivedTasks.map((t, i) => (
                <li key={`${t.id}-${i}`} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-ink-700 line-through decoration-ink-300">
                      {t.title}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider2 text-gold-600">
                      {t.classSubject}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-ink-400">Completed {fmtDate(t.completedAt)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </PortalShell>
  );
}
