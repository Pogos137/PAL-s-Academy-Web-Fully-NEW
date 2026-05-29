import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { mutate } from "@/lib/store/db";
import { sendEmail } from "@/lib/email/resend";
import { accountApprovedHTML } from "@/lib/email/templates";

export const runtime = "nodejs";

const schema = z.object({
  id: z.string(),
  action: z.enum(["approve", "reject"])
});

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const newStatus = parsed.data.action === "approve" ? "approved" : "rejected";

  const updated = await mutate((db) => {
    const u = db.users.find((x) => x.id === parsed.data.id);
    if (!u) return null;
    u.status = newStatus;
    return { email: u.email, fullName: u.fullName };
  });

  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (parsed.data.action === "approve") {
    try {
      await sendEmail({
        to: updated.email,
        subject: "Your PAL's Academy portal is unlocked",
        html: accountApprovedHTML(updated.fullName)
      });
    } catch (e) {
      console.warn("[approvals:email]", e);
    }
  }

  return NextResponse.json({ ok: true });
}
