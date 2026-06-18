import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.object({
  body: z.string().min(3).max(280),
  studentId: z.string().optional().nullable()
});

// Add a breakthrough to the Win Wall. Any class member can post; tutors/admin
// may attribute it to a specific student, a student posts their own.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!(await canAccessClass(user, params.id)))
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Describe the win." }, { status: 400 });

  const win = await mutate((db) => {
    const studentId =
      user.role === "student" ? user.id : parsed.data.studentId?.trim() || null;
    const w = {
      id: newId("win"),
      classId: params.id,
      studentId,
      body: parsed.data.body.trim(),
      addedBy: user.id,
      createdAt: new Date().toISOString()
    };
    db.wins.push(w);
    return w;
  });

  return NextResponse.json({ ok: true, win });
}
