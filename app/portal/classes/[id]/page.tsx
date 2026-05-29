import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarClock, Users, Video } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { canAccessClass, classBundle, classesForUser } from "@/lib/store/queries";
import PortalShell from "@/components/portal/PortalShell";
import ClassMessages from "@/components/portal/ClassMessages";
import AssignmentList from "@/components/portal/AssignmentList";

export const metadata = {
  title: "Class",
  robots: { index: false, follow: false }
};

export default async function ClassPage({ params }: { params: { id: string } }) {
  await ensureSeed();
  const user = await getCurrentUser();
  if (!user) redirect(`/auth/login?next=/portal/classes/${params.id}`);
  // Admins keep full portal access (per requirements) — they're not bounced to /admin here.
  if (user.role !== "admin" && user.status !== "approved") redirect("/portal/pending");

  const allowed = await canAccessClass(user, params.id);
  if (!allowed) notFound();

  const [{ cls, assignments, messages, submissions, participants }, allClasses] =
    await Promise.all([classBundle(params.id), classesForUser(user)]);

  if (!cls) notFound();

  const mySubs = new Set(
    submissions.filter((s) => s.studentId === user.id).map((s) => s.assignmentId)
  );

  const decoratedMessages = messages.map((m) => {
    const sender = participants.find((p) => p.id === m.senderId);
    return {
      id: m.id,
      senderId: m.senderId,
      senderName: sender?.fullName || "Member",
      senderRole: sender?.role || "member",
      body: m.body,
      createdAt: m.createdAt
    };
  });

  const decoratedAssignments = assignments.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    dueDate: a.dueDate,
    submitted: mySubs.has(a.id)
  }));

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
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
              {cls.subject}
            </div>
            <h1 className="mt-1 font-serif text-4xl text-ink-800">{cls.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-gold-600" /> {cls.schedule}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-gold-600" />{" "}
                {participants.length} member{participants.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
          <a
            href={cls.meetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            <Video className="h-4 w-4" /> Join Google Meet
          </a>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <AssignmentList
              classId={cls.id}
              initial={decoratedAssignments}
              canSubmit={user.role === "student"}
              canCreate={user.role === "tutor" || user.role === "admin"}
            />
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ink-800">Class messages</h2>
            <p className="mt-1 text-xs text-ink-500">
              Private to this class · students, tutor, and admin.
            </p>
            <div className="mt-4">
              <ClassMessages
                classId={cls.id}
                currentUserId={user.id}
                initial={decoratedMessages}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-ink-100 bg-ivory-50 p-5">
              <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
                Class members
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                {participants.map((p) => (
                  <li key={p.id} className="flex items-center justify-between">
                    <span>{p.fullName}</span>
                    <span className="text-[10px] uppercase tracking-wider2 text-ink-400">
                      {p.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
