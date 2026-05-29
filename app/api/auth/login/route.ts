import { NextResponse } from "next/server";
import { z } from "zod";
import { readDb } from "@/lib/store/db";
import { ensureSeed } from "@/lib/store/seed";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, setSessionCookie } from "@/lib/auth/session";

export const runtime = "nodejs";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(req: Request) {
  await ensureSeed();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  const token = signSession({ userId: user.id, email: user.email, role: user.role });
  setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    },
    next:
      user.role === "admin"
        ? "/admin"
        : user.status === "approved"
        ? "/portal"
        : "/portal/pending"
  });
}
