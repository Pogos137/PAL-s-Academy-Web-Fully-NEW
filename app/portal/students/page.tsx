import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Gauge, Sparkles, Users, Wallet } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { ensureProgressSeed, ensureStudentPlans } from "@/lib/store/seed-progress";
import { classesForUser } from "@/lib/store/queries";
import { studentsOverview } from "@/lib/store/progress";
import PortalShell from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Students",
  robots: { index: false, follow: false }
};

export default async function StudentsPage() {
  await ensureSeed();
  await ensureProgressSeed();
  await ensureStudentPlans();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal/students");
  if (user.status !== "approved" && user.role !== "admin") redirect("/portal/pending");
  // Students don't get a directory — send them to their own growth hub.
  if (user.role === "student") redirect("/portal/progress");

  const [rows, classes] = await Promise.all([studentsOverview(user), classesForUser(user)]);

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
          <Users className="h-3.5 w-3.5" /> Oversight
        </div>
        <h1 className="mt-1 font-serif text-4xl text-ink-800">
          {user.role === "admin" ? "Every student" : "Your students"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">
          Click any student to see their full picture — progress by class, confidence trend,
          performance, and sessions remaining on their plan.
        </p>

        {rows.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-ink-100 bg-ivory-50 p-8 text-sm text-ink-600">
            No students yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {rows.map((s) => (
              <Link
                key={s.id}
                href={`/portal/students/${s.id}`}
                className="group rounded-2xl border border-ink-100 bg-ivory-50 p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-luxe"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-serif text-xl text-ink-800">{s.fullName}</div>
                    <div className="truncate text-xs text-ink-500">{s.email}</div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" />
                </div>

                {s.subjects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.subjects.map((subj, i) => (
                      <span
                        key={`${s.id}-${i}`}
                        className="rounded-full border border-ink-100 bg-white px-2.5 py-0.5 text-[11px] text-ink-600"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-gold-600" /> {s.overallMomentum}% momentum
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-gold-600" /> Confidence {s.latestConfidence ?? "—"}
                    {s.latestConfidence != null && "/5"}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-accent-sage"
                    style={{ width: `${s.overallMomentum}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-ink-600">
                    <Wallet className="h-3.5 w-3.5 text-gold-600" />
                    {s.planName ?? "No plan"}
                  </span>
                  {s.sessionsRemaining != null && (
                    <span
                      className={
                        "rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 " +
                        (s.sessionsRemaining <= 1
                          ? "border-accent-rose bg-accent-rose/10 text-accent-rose"
                          : "border-ink-200 bg-white text-ink-600")
                      }
                    >
                      {s.sessionsRemaining} session{s.sessionsRemaining === 1 ? "" : "s"} left
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
