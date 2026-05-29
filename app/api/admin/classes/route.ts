import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { mutate, newId } from "@/lib/store/db";
import type { ClassEntry } from "@/lib/store/types";

export const runtime = "nodejs";

const Schema = z.object({
  subject: z.string().min(2).max(120),
  title: z.string().min(2).max(160),
  tutorId: z.string().min(1),
  schedule: z.string().min(2).max(120),
  meetUrl: z.string().url().optional(),
  studentIds: z.array(z.string()).optional().default([])
});

// Admin: create a new class/course.
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );

  const result = await mutate((db) => {
    const tutor = db.users.find((u) => u.id === parsed.data.tutorId && u.role === "tutor");
    if (!tutor) return { error: "Select a valid tutor." as const };

    const validStudentIds = parsed.data.studentIds.filter((id) =>
      db.users.some((u) => u.id === id && u.role === "student")
    );

    const cls: ClassEntry = {
      id: newId("cls"),
      subject: parsed.data.subject.trim(),
      title: parsed.data.title.trim(),
      studentIds: Array.from(new Set(validStudentIds)),
      tutorId: parsed.data.tutorId,
      schedule: parsed.data.schedule.trim(),
      meetUrl: parsed.data.meetUrl?.trim() || "https://meet.google.com/lookup/pals-class",
      createdAt: new Date().toISOString()
    };
    db.classes.push(cls);
    return { cls };
  });

  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, class: result.cls });
}
