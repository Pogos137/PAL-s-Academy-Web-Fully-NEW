import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { mutate } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.discriminatedUnion("op", [
  z.object({ op: z.literal("addStudent"), studentId: z.string().min(1) }),
  z.object({ op: z.literal("removeStudent"), studentId: z.string().min(1) }),
  z.object({ op: z.literal("setTutor"), tutorId: z.string().min(1) }),
  z.object({
    op: z.literal("update"),
    subject: z.string().min(2).max(120).optional(),
    title: z.string().min(2).max(160).optional(),
    schedule: z.string().min(2).max(120).optional(),
    meetUrl: z.string().url().optional()
  })
]);

// Admin: manage a class — enroll/unenroll students, change tutor, edit details.
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const result = await mutate((db) => {
    const cls = db.classes.find((c) => c.id === params.id);
    if (!cls) return { error: "Class not found." as const };
    const op = parsed.data;

    if (op.op === "addStudent") {
      const student = db.users.find((u) => u.id === op.studentId && u.role === "student");
      if (!student) return { error: "Not a valid student." as const };
      if (!cls.studentIds.includes(op.studentId)) cls.studentIds.push(op.studentId);
    } else if (op.op === "removeStudent") {
      cls.studentIds = cls.studentIds.filter((id) => id !== op.studentId);
    } else if (op.op === "setTutor") {
      const tutor = db.users.find((u) => u.id === op.tutorId && u.role === "tutor");
      if (!tutor) return { error: "Not a valid tutor." as const };
      cls.tutorId = op.tutorId;
    } else if (op.op === "update") {
      if (op.subject) cls.subject = op.subject.trim();
      if (op.title) cls.title = op.title.trim();
      if (op.schedule) cls.schedule = op.schedule.trim();
      if (op.meetUrl) cls.meetUrl = op.meetUrl.trim();
    }
    return { cls };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, class: result.cls });
}

// Admin: delete a class and cascade its assignments, submissions, and messages.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const ok = await mutate((db) => {
    const exists = db.classes.some((c) => c.id === params.id);
    if (!exists) return false;
    const removedAssignmentIds = new Set(
      db.assignments.filter((a) => a.classId === params.id).map((a) => a.id)
    );
    db.classes = db.classes.filter((c) => c.id !== params.id);
    db.assignments = db.assignments.filter((a) => a.classId !== params.id);
    db.submissions = db.submissions.filter((s) => !removedAssignmentIds.has(s.assignmentId));
    db.messages = db.messages.filter((m) => m.classId !== params.id);
    return true;
  });

  if (!ok) return NextResponse.json({ error: "Class not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
