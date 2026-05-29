import { NextResponse } from "next/server";
import { z } from "zod";
import { mutate, newId } from "@/lib/store/db";
import { ensureSeed } from "@/lib/store/seed";
import { sendEmail, ADMIN_TO } from "@/lib/email/resend";
import { leadConfirmationHTML, adminLeadHTML } from "@/lib/email/templates";

export const runtime = "nodejs";

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  student_grade: z.string().optional().nullable(),
  subjects: z.array(z.string()).optional().default([]),
  goals: z.string().optional().nullable(),
  source: z.string().optional().default("website")
});

export async function POST(req: Request) {
  await ensureSeed();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  await mutate((db) => {
    db.leads.unshift({
      id: newId("lead"),
      name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      studentGrade: data.student_grade ?? null,
      subjects: (data.subjects || []).join(", "),
      goals: data.goals ?? null,
      source: data.source ?? "website",
      createdAt: new Date().toISOString()
    });
  });

  try {
    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: "We received your request · PAL's Academy",
        html: leadConfirmationHTML(data.full_name)
      }),
      sendEmail({
        to: ADMIN_TO,
        subject: `New lead — ${data.full_name}`,
        html: adminLeadHTML(data)
      })
    ]);
  } catch (e) {
    console.error("[leads:email]", e);
  }

  return NextResponse.json({ ok: true });
}
