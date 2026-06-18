import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";
import type { MasteryStatus } from "@/lib/store/types";

export const runtime = "nodejs";

const STATUS = z.enum(["new", "learning", "practising", "mastered"]);

const CreateSchema = z.object({
  label: z.string().min(2).max(160),
  unit: z.string().max(80).optional().nullable(),
  status: STATUS.optional().default("new")
});

const PatchSchema = z.object({
  topicId: z.string().min(1),
  status: STATUS.optional(),
  label: z.string().min(2).max(160).optional(),
  unit: z.string().max(80).optional().nullable()
});

function isTutorOrAdmin(role: string) {
  return role === "tutor" || role === "admin";
}

// Create a curriculum topic on the Mastery Map (tutor / admin).
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!isTutorOrAdmin(user.role))
    return NextResponse.json({ error: "Only tutors or admin can edit the Mastery Map." }, { status: 403 });
  if (!(await canAccessClass(user, params.id)))
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "A topic label is required." }, { status: 400 });

  const now = new Date().toISOString();
  const topic = await mutate((db) => {
    const order =
      db.masteryTopics.filter((t) => t.classId === params.id).reduce((m, t) => Math.max(m, t.order), -1) + 1;
    const t = {
      id: newId("mtopic"),
      classId: params.id,
      label: parsed.data.label.trim(),
      unit: parsed.data.unit?.trim() || null,
      status: parsed.data.status as MasteryStatus,
      order,
      updatedBy: user.id,
      updatedAt: now,
      createdAt: now
    };
    db.masteryTopics.push(t);
    return t;
  });

  return NextResponse.json({ ok: true, topic });
}

// Update a topic's status / label (tutor / admin).
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (!isTutorOrAdmin(user.role))
    return NextResponse.json({ error: "Only tutors or admin can edit the Mastery Map." }, { status: 403 });
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

  const topic = await mutate((db) => {
    const t = db.masteryTopics.find((x) => x.id === parsed.data.topicId && x.classId === params.id);
    if (!t) return null;
    if (parsed.data.status) t.status = parsed.data.status;
    if (parsed.data.label) t.label = parsed.data.label.trim();
    if (parsed.data.unit !== undefined) t.unit = parsed.data.unit?.trim() || null;
    t.updatedBy = user.id;
    t.updatedAt = new Date().toISOString();
    return t;
  });

  if (!topic) return NextResponse.json({ error: "Topic not found." }, { status: 404 });
  return NextResponse.json({ ok: true, topic });
}
