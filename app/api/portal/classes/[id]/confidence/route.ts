import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.object({
  rating: z.number().int().min(1).max(5),
  note: z.string().max(280).optional().nullable()
});

// A student logs how confident they feel in this class right now (1–5).
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "student")
    return NextResponse.json({ error: "Only students log a confidence check-in." }, { status: 403 });
  if (!(await canAccessClass(user, params.id)))
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Pick a rating from 1 to 5." }, { status: 400 });

  const log = await mutate((db) => {
    const entry = {
      id: newId("conf"),
      classId: params.id,
      studentId: user.id,
      rating: parsed.data.rating,
      note: parsed.data.note?.trim() || null,
      createdAt: new Date().toISOString()
    };
    db.confidenceLogs.push(entry);
    return entry;
  });

  return NextResponse.json({ ok: true, log });
}
