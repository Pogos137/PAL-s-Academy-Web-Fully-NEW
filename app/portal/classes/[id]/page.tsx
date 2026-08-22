import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  Gauge,
  MessageSquare,
  Users,
  Video
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { ensureProgressSeed } from "@/lib/store/seed-progress";
import { canAccessClass, classBundle, classesForUser } from "@/lib/store/queries";
import { classProgress } from "@/lib/store/progress";
import PortalShell from "@/components/portal/PortalShell";
import AssignmentList from "@/components/portal/AssignmentList";
import MasteryMap from "@/components/portal/MasteryMap";
import ConfidencePulse from "@/components/portal/ConfidencePulse";
import FocusRequests from "@/components/portal/FocusRequests";
import WinWall from "@/components/portal/WinWall";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Class",
  robots: { index: false, follow: false }
};

export default async function ClassPage({ params }: { params: { id: string } }) {
  await ensureSeed();
  await ensureProgressSeed();
  const user = await getCurrentUser();
  if (!user) redirect(`/auth/login?next=/portal/classes/${params.id}`);
  // Admins keep full portal access (per requirements) — they're not bounced to /admin here.
  if (user.role !== "admin" && user.status !== "approved") redirect("/portal/pending");

  const allowed = await canAccessClass(user, params.id);
  if (!allowed) notFound();

  const [{ cls, assignments, submissions, participants }, allClasses] = await Promise.all([
    classBundle(params.id),
    classesForUser(user)
  ]);

  if (!cls) notFound();

  const mySubMap = new Map(
    submissions.filter((s) => s.studentId === user.id).map((s) => [s.assignmentId, s.submittedAt])
  );

  const decoratedAssignments = assignments.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    dueDate: a.dueDate,
    submitted: mySubMap.has(a.id),
    completedAt: mySubMap.get(a.id) ?? null
  }));

  const nextDue = assignments.find((a) => +new Date(a.dueDate) >= Date.now());
  const nextDueLabel = nextDue
    ? new Date(nextDue.dueDate).toLocaleDateString("en-CA", { month: "short", day: "numeric" })
    : "—";
  const tutor = participants.find((p) => p.role === "tutor");
  const students = participants.filter((p) => p.role === "student");

  // ── PAL's Progress data for this class ──────────────────────────────────
  const isStudent = user.role === "student";
  const canManage = user.role === "tutor" || user.role === "admin";
  const progress = await classProgress(cls.id, isStudent ? user.id : undefined);
  const nameById = new Map(participants.map((p) => [p.id, p.fullName]));

  const masteryTopics = progress.topics.map((t) => ({
    id: t.id,
    label: t.label,
    unit: t.unit ?? null,
    status: t.status
  }));

  const myConfidence = progress.confidence.map((c) => ({
    rating: c.rating,
    note: c.note ?? null,
    createdAt: c.createdAt
  }));

  // Tutor/admin: latest confidence per student, for an at-a-glance roster.
  const latestConfByStudent = new Map<string, { rating: number; createdAt: string }>();
  for (const c of progress.confidence) {
    const prev = latestConfByStudent.get(c.studentId);
    if (!prev || +new Date(c.createdAt) > +new Date(prev.createdAt))
      latestConfByStudent.set(c.studentId, { rating: c.rating, createdAt: c.createdAt });
  }
  const confidenceRoster = students.map((s) => ({
    name: s.fullName,
    rating: latestConfByStudent.get(s.id)?.rating ?? null
  }));

  const focusItems = progress.focus.map((f) => ({
    id: f.id,
    body: f.body,
    status: f.status,
    studentName: isStudent ? null : nameById.get(f.studentId) ?? null,
    createdAt: f.createdAt
  }));

  const winItems = progress.wins.map((w) => ({
    id: w.id,
    body: w.body,
    byName: nameById.get(w.addedBy) ?? null,
    createdAt: w.createdAt
  }));

  // Conversations live in one place now — the portal inbox — for every role.
  const conversationHref = `/portal/messages?c=${cls.id}`;

  const overviewStats = [
    { icon: CalendarClock, label: "Schedule", value: cls.schedule },
    {
      icon: ClipboardList,
      label: "Assignments",
      value: `${assignments.length} task${assignments.length === 1 ? "" : "s"}`
    },
    { icon: CalendarClock, label: "Next due", value: nextDueLabel },
    { icon: Users, label: "Members", value: String(participants.length) }
  ];

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={allClasses.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <Link
          href="/portal"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-wider2 text-ink-500 hover:text-ink-800"
        >
          <ArrowLeft className="h-3 w-3" /> Back to dashboard
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">{cls.subject}</div>
            <h1 className="mt-1 font-serif text-4xl text-ink-800">{cls.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-gold-600" /> {cls.schedule}
              </span>
              {tutor && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-gold-600" /> {tutor.fullName} · tutor
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={conversationHref} className="btn btn-ghost">
              <MessageSquare className="h-4 w-4" /> Open conversation
            </Link>
            <a href={cls.meetUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <Video className="h-4 w-4" /> Join Google Meet
            </a>
          </div>
        </div>

        {/* Overview */}
        <section className="mt-8 rounded-2xl border border-ink-100 bg-ivory-50 p-6">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Overview</div>
          <p className="mt-2 max-w-2xl text-sm text-ink-600">
            Everything for <span className="text-ink-800">{cls.title}</span> in one place — your
            weekly session{tutor ? ` with ${tutor.fullName}` : ""}, homework, and submission
            deadlines. Next deadline:{" "}
            <span className="font-medium text-ink-800">{nextDueLabel}</span>. Questions for your
            tutor live in{" "}
            <Link href={conversationHref} className="text-ink-800 underline decoration-gold-400 underline-offset-2">
              Messages
            </Link>
            .
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map(({ icon: Icon, label, value }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4"
              >
                <div className="rounded-lg border border-gold-200 bg-gold-50 p-2 text-gold-600">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider2 text-ink-500">{label}</div>
                  <div className="truncate text-sm font-medium text-ink-800">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAL's Progress — Mastery Map */}
        <section className="mt-8">
          <MasteryMap classId={cls.id} initial={masteryTopics} canEdit={canManage} />
        </section>

        {/* Confidence Pulse + Focus Requests */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {isStudent ? (
            <ConfidencePulse classId={cls.id} initial={myConfidence} canLog />
          ) : (
            <section className="rounded-2xl border border-ink-100 bg-ivory-50 p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
                <Gauge className="h-3.5 w-3.5" /> Confidence Pulse
              </div>
              <h2 className="mt-1 font-serif text-2xl text-ink-800">How the class feels</h2>
              <p className="mt-1 text-sm text-ink-600">
                Each student&rsquo;s most recent self-rated confidence.
              </p>
              {confidenceRoster.length === 0 ? (
                <div className="mt-4 text-sm text-ink-500">No students enrolled yet.</div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {confidenceRoster.map((r) => (
                    <li
                      key={r.name}
                      className="flex items-center justify-between rounded-xl border border-ink-100 bg-white p-3.5"
                    >
                      <span className="text-sm text-ink-700">{r.name}</span>
                      <span className="font-serif text-lg text-ink-800">
                        {r.rating ?? "—"}
                        {r.rating != null && <span className="text-sm text-ink-400">/5</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
          <FocusRequests
            classId={cls.id}
            initial={focusItems}
            canAdd={isStudent}
            canManage={canManage}
          />
        </div>

        {/* Assignments — the focus of the course homepage, full width. */}
        <section className="mt-8">
          <AssignmentList
            classId={cls.id}
            initial={decoratedAssignments}
            canSubmit={user.role === "student"}
            canCreate={user.role === "tutor" || user.role === "admin"}
          />
        </section>

        {/* Win Wall */}
        <section className="mt-8">
          <WinWall classId={cls.id} initial={winItems} canAdd selfName={user.fullName} />
        </section>

        {/* Compact footer: members + conversation pointer. */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Class members</div>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {tutor && (
                <li className="flex items-center justify-between">
                  <span>{tutor.fullName}</span>
                  <span className="text-[10px] uppercase tracking-wider2 text-gold-600">tutor</span>
                </li>
              )}
              {students.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  {canManage ? (
                    <Link
                      href={`/portal/students/${p.id}`}
                      className="text-ink-700 underline decoration-gold-400 underline-offset-2 hover:text-ink-900"
                    >
                      {p.fullName}
                    </Link>
                  ) : (
                    <span>{p.fullName}</span>
                  )}
                  <span className="text-[10px] uppercase tracking-wider2 text-ink-400">student</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={conversationHref}
            className="group flex flex-col justify-between rounded-2xl border border-ink-100 bg-ink-900 p-5 text-ivory transition-colors hover:border-gold-300"
          >
            <div>
              <div className="inline-flex rounded-xl border border-ivory/20 bg-ivory/10 p-2 text-gold-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="mt-3 font-serif text-xl">Course conversation</div>
              <p className="mt-1 text-sm text-ivory/70">
                Message your tutor and classmates. An academy admin is part of every class
                conversation for safety.
              </p>
            </div>
            <span className="mt-4 text-xs uppercase tracking-wider2 text-gold-300 transition-transform group-hover:translate-x-1">
              Open Messages →
            </span>
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}
