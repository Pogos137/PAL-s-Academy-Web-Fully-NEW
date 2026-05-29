import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { canAccessClass } from "@/lib/store/queries";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const Schema = z.object({ body: z.string().min(1).max(2000) });

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.status !== "approved")
    return NextResponse.json({ error: "Account pending approval." }, { status: 403 });

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
    return NextResponse.json({ error: "Message body required." }, { status: 400 });

  const message = await mutate((db) => {
    const m = {
      id: newId("msg"),
      classId: params.id,
      senderId: user.id,
      body: parsed.data.body.trim(),
      createdAt: new Date().toISOString()
    };
    db.messages.push(m);
    return m;
  });

  return NextResponse.json({ ok: true, message });
}
