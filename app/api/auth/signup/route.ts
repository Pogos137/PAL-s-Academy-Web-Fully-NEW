import { NextResponse } from "next/server";
import { z } from "zod";
import { mutate, newId } from "@/lib/store/db";
import { ensureSeed } from "@/lib/store/seed";
import { hashPassword } from "@/lib/auth/password";
import { isAdminEmail } from "@/lib/auth/current";
import { signSession, setSessionCookie } from "@/lib/auth/session";
import { sendEmail, ADMIN_TO } from "@/lib/email/resend";

export const runtime = "nodejs";

const Schema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  password: z.string().min(8).max(200)
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
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const { fullName, email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  const result = await mutate(async (db) => {
    if (db.users.find((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { error: "An account with this email already exists." as const };
    }

    const isAdmin = isAdminEmail(normalizedEmail);
    const user = {
      id: newId("usr"),
      email: normalizedEmail,
      fullName: fullName.trim(),
      passwordHash: await hashPassword(password),
      role: (isAdmin ? "admin" : "student") as "admin" | "student",
      status: (isAdmin ? "approved" : "pending") as "approved" | "pending",
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    return { user };
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const { user } = result;

  // Issue a session immediately. The middleware still routes pending
  // (non-admin) accounts to /portal/pending until approved.
  const token = signSession({ userId: user.id, email: user.email, role: user.role });
  setSessionCookie(token);

  // Notify admin (best-effort, non-blocking failures).
  try {
    await sendEmail({
      to: ADMIN_TO,
      subject: `New portal request · ${user.fullName}`,
      html: `<p>${user.fullName} (${user.email}) just requested portal access. Review in <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/approvals">Admin · Approvals</a>.</p>`
    });
  } catch (e) {
    console.warn("[signup] notify admin failed:", e);
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    },
    next: user.status === "approved" ? "/portal" : "/portal/pending"
  });
}
