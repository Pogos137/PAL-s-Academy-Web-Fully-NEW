import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Gauge, Sparkles, Target, TrendingUp, Trophy } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { ensureProgressSeed } from "@/lib/store/seed-progress";
import { classesForUser } from "@/lib/store/queries";
import { studentGrowth } from "@/lib/store/progress";
import PortalShell from "@/components/portal/PortalShell";
import { MASTERY_META, sparklinePoints } from "@/components/portal/progress-meta";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Progress",
  robots: { index: false, follow: false }
};

export default async function ProgressPage() {
  await ensureSeed();
  await ensureProgressSeed();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal/progress");
  // Personal growth hub is for students; tutors/admins get the oversight directory.
  if (user.role !== "student") redirect("/portal/students");
  if (user.status !== "approved") redirect("/portal/pending");

  const [classes, growth] = await Promise.all([classesForUser(user), studentGrowth(user)]);
  const isStudent = user.role === "student";

  const confidenceLabel =
    growth.overallConfidence == null
      ? "No check-ins yet"
      : growth.overallConfidence >= 4
      ? "Feeling solid"
      : growth.overallConfidence >= 3
      ? "Getting there"
      : "Building it up";

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <div className="text-[10px] uppercase tracking-wider2 text-gold-600">PAL&rsquo;s Progress</div>
        <h1 className="mt-1 font-serif text-4xl text-ink-800">Growth, made visible.</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">
          {isStudent
            ? "Not just grades — where you stand topic by topic, how your confidence is trending, and the breakthroughs along the way."
            : "Every class at a glance — mastery, confidence, and what each student wants to work on next."}
        </p>

        {/* Headline stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Momentum */}
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <Sparkles className="h-3.5 w-3.5" /> Course momentum
            </div>
            <div className="mt-3 font-serif text-4xl text-ink-800">{growth.overallMomentum}%</div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                style={{ width: `${growth.overallMomentum}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-ink-500">
              {growth.totalMastered} of {growth.totalTopics} topics mastered
            </div>
          </div>

          {/* Confidence */}
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <Gauge className="h-3.5 w-3.5" /> Confidence
            </div>
            <div className="mt-3 font-serif text-4xl text-ink-800">
              {growth.overallConfidence ?? "—"}
              {growth.overallConfidence != null && <span className="text-lg text-ink-400">/5</span>}
            </div>
            {growth.confidenceSeries.length > 0 ? (
              <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" preserveAspectRatio="none" aria-hidden="true">
                <polyline
                  points={sparklinePoints(growth.confidenceSeries, 120, 28)}
                  fill="none"
                  stroke="#C99A2A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            ) : (
              <div className="mt-3 h-7" />
            )}
            <div className="mt-2 text-xs text-ink-500">{confidenceLabel}</div>
          </div>

          {/* Open focus */}
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
              <Target className="h-3.5 w-3.5" /> Focus requests
            </div>
            <div className="mt-3 font-serif text-4xl text-ink-800">{growth.openFocus.length}</div>
            <div className="mt-3 h-2" />
            <div className="mt-2 text-xs text-ink-500">
              {isStudent ? "Things you've flagged for your tutor" : "Open across your students"}
            </div>
          </div>
        </div>

        {/* Per-class growth cards */}
        <h2 className="mt-12 font-serif text-2xl text-ink-800">By class</h2>
        {growth.cards.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            No classes yet. Once your weekly class is set up, your growth will appear here.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {growth.cards.map(({ cls, mastery, confidence, openFocus, latestWin }) => (
              <Link
                key={cls.id}
                href={`/portal/classes/${cls.id}`}
                className="group rounded-2xl border border-ink-100 bg-ivory-50 p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-luxe"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider2 text-gold-600">{cls.subject}</div>
                    <div className="mt-1 truncate font-serif text-xl text-ink-800">{cls.title}</div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
                  <span>{mastery.momentum}% momentum</span>
                  <span>
                    {mastery.counts.mastered}/{mastery.total} mastered
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                    style={{ width: `${mastery.momentum}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-gold-600" />
                    Confidence {confidence.latest ?? "—"}
                    {confidence.latest != null && "/5"}
                    {confidence.delta != null && confidence.delta !== 0 && (
                      <span className={confidence.delta > 0 ? "text-accent-sage" : "text-accent-rose"}>
                        ({confidence.delta > 0 ? "+" : ""}
                        {confidence.delta})
                      </span>
                    )}
                  </span>
                  {openFocus > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-gold-600" />
                      {openFocus} to prep
                    </span>
                  )}
                </div>

                {latestWin && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-gold-200 bg-gold-50 p-3">
                    <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                    <p className="text-xs text-ink-700">{latestWin.body}</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Two rails: recent wins + open focus */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-serif text-2xl text-ink-800">
              <Trophy className="h-5 w-5 text-gold-500" /> Recent wins
            </h2>
            {growth.recentWins.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-6 text-sm text-ink-500">
                Breakthroughs you and your tutor log will collect here.
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {growth.recentWins.map((w) => (
                  <li key={w.id} className="rounded-xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-4">
                    <div className="flex items-start gap-2.5">
                      <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      <p className="text-sm text-ink-800">{w.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-serif text-2xl text-ink-800">
              <TrendingUp className="h-5 w-5 text-gold-500" /> {isStudent ? "What you've flagged" : "What students want"}
            </h2>
            {growth.openFocus.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-6 text-sm text-ink-500">
                Nothing flagged right now. Open a class to add a focus for your next session.
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {growth.openFocus.slice(0, 6).map((f) => (
                  <li key={f.id} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ivory-50 p-4">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <div className="min-w-0">
                      <p className="text-sm text-ink-700">{f.body}</p>
                      <div className="mt-1 text-[11px] uppercase tracking-wider2 text-ink-400">
                        {f.status === "planned" ? "Planned next session" : "Open"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
