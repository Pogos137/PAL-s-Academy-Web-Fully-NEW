import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.object({ note: z.string().max(2000).optional() });

export async function POST(
  req: Request,
  { params }: { params: { id: string; aid: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "student")
    return NextResponse.json({ error: "Only students submit work." }, { status: 403 });

  const allowed = await canAccessClass(user, params.id);
  if (!allowed) return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown = {};
  try {
    json = await req.json();
  } catch {}
  const parsed = Schema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });

  const submission = await mutate((db) => {
    const exists = db.submissions.find(
      (s) => s.assignmentId === params.aid && s.studentId === user.id
    );
    if (exists) {
      exists.note = parsed.data.note || exists.note;
      exists.submittedAt = new Date().toISOString();
      return exists;
    }
    const s = {
      id: newId("sub"),
      assignmentId: params.aid,
      studentId: user.id,
      note: parsed.data.note,
      submittedAt: new Date().toISOString()
    };
    db.submissions.push(s);
    return s;
  });

  return NextResponse.json({ ok: true, submission });
}

// Un-mark a completed assignment (student toggles the circle off).
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; aid: string } }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "student")
    return NextResponse.json({ error: "Only students update their work." }, { status: 403 });

  const allowed = await canAccessClass(user, params.id);
  if (!allowed) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await mutate((db) => {
    db.submissions = db.submissions.filter(
      (s) => !(s.assignmentId === params.aid && s.studentId === user.id)
    );
  });

  return NextResponse.json({ ok: true });
}
