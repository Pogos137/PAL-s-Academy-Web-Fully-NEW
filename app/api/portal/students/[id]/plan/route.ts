import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

// Sessions/billing are the Owner's domain — admin only.
const Schema = z.object({
  planName: z.string().trim().min(1).max(40),
  monthlyPrice: z.number().int().min(0).max(100000),
  sessionsPurchased: z.number().int().min(0).max(1000),
  sessionsRemaining: z.number().int().min(0).max(1000)
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if (user.role !== "admin")
    return NextResponse.json({ error: "Only an academy admin can edit sessions." }, { status: 403 });

  let json: unknown = {};
  try {
    json = await req.json();
  } catch {}
  const parsed = Schema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Please enter valid plan details." }, { status: 400 });

  const { planName, monthlyPrice, sessionsPurchased, sessionsRemaining } = parsed.data;
  // The Owner thinks in "remaining"; we store "used". Derive and clamp.
  const sessionsUsed = Math.max(0, Math.min(sessionsPurchased, sessionsPurchased - sessionsRemaining));

  const result = await mutate((db) => {
    const student = db.users.find((u) => u.id === params.id && u.role === "student");
    if (!student) return { notFound: true as const };

    let plan = db.studentPlans.find((p) => p.studentId === params.id);
    if (!plan) {
      const now = new Date();
      plan = {
        id: newId("plan"),
        studentId: params.id,
        planName,
        monthlyPrice,
        sessionsPurchased,
        sessionsUsed,
        periodStart: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
        renewsOn: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()
      };
      db.studentPlans.push(plan);
    } else {
      plan.planName = planName;
      plan.monthlyPrice = monthlyPrice;
      plan.sessionsPurchased = sessionsPurchased;
      plan.sessionsUsed = sessionsUsed;
    }
    return { plan };
  });

  if ("notFound" in result)
    return NextResponse.json({ error: "Student not found." }, { status: 404 });

  return NextResponse.json({ ok: true, plan: result.plan });
}
