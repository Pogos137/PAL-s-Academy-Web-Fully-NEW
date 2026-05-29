import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(4000).optional().default(""),
  dueDate: z.string().min(1) // ISO date or yyyy-mm-dd
});

// Tutor / admin: create a new assignment for a class.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "admin" && user.role !== "tutor")
    return NextResponse.json({ error: "Only tutors or admin can create assignments." }, {
      status: 403
    });

  const allowed = await canAccessClass(user, params.id);
  if (!allowed)
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Title and due date required." }, { status: 400 });

  // Allow yyyy-mm-dd by coercing to end-of-day ISO so it sorts right.
  const due =
    /^\d{4}-\d{2}-\d{2}$/.test(parsed.data.dueDate)
      ? new Date(parsed.data.dueDate + "T23:59:00").toISOString()
      : new Date(parsed.data.dueDate).toISOString();

  const assignment = await mutate((db) => {
    const a = {
      id: newId("asg"),
      classId: params.id,
      title: parsed.data.title.trim(),
      description: parsed.data.description?.trim() || "",
      dueDate: due,
      createdAt: new Date().toISOString()
    };
    db.assignments.push(a);
    return a;
  });

  return NextResponse.json({ ok: true, assignment });
}
