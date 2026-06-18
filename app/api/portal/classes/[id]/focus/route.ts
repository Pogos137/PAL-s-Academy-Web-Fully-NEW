import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";
import type { FocusStatus } from "@/lib/store/types";

export const runtime = "nodejs";

const CreateSchema = z.object({ body: z.string().min(3).max(500) });
const PatchSchema = z.object({
  focusId: z.string().min(1),
  status: z.enum(["open", "planned", "addressed"])
});

// A student requests a focus for their next session.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "student")
    return NextResponse.json({ error: "Only students can request a session focus." }, { status: 403 });
  if (!(await canAccessClass(user, params.id)))
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Tell your tutor what to focus on." }, { status: 400 });

  const now = new Date().toISOString();
  const request = await mutate((db) => {
    const f = {
      id: newId("focus"),
      classId: params.id,
      studentId: user.id,
      body: parsed.data.body.trim(),
      status: "open" as FocusStatus,
      createdAt: now,
      updatedAt: now
    };
    db.focusRequests.push(f);
    return f;
  });

  return NextResponse.json({ ok: true, request });
}

// Update a request's status. Tutors/admin can plan or close any; the student
// who raised it can update their own (e.g. mark it addressed or reopen it).
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
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
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid update." }, { status: 400 });

  const result = await mutate((db) => {
    const f = db.focusRequests.find((x) => x.id === parsed.data.focusId && x.classId === params.id);
    if (!f) return { ok: false as const };
    const isOwner = f.studentId === user.id;
    const canManage = user.role === "tutor" || user.role === "admin" || isOwner;
    if (!canManage) return { ok: false as const, forbidden: true };
    f.status = parsed.data.status;
    f.updatedAt = new Date().toISOString();
    return { ok: true as const, request: f };
  });

  if (!result.ok && "forbidden" in result && result.forbidden)
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  if (!result.ok) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  return NextResponse.json({ ok: true, request: result.request });
}
