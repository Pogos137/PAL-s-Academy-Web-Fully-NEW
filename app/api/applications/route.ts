import { NextResponse } from "next/server";
import { z } from "zod";
import { mutate, newId } from "@/lib/store/db";
import { ensureSeed } from "@/lib/store/seed";
import { sendEmail, ADMIN_TO } from "@/lib/email/resend";
import { applicationConfirmationHTML, adminApplicationHTML } from "@/lib/email/templates";

export const runtime = "nodejs";

const schema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  highest_education: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  program: z.string().optional().nullable(),
  subjects: z.array(z.string()).min(1, "Pick at least one subject"),
  grade_levels: z.array(z.string()).min(1, "Pick at least one grade level"),
  years_experience: z.number().int().min(0).optional().nullable(),
  availability: z.string().optional().nullable(),
  resume_url: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  cover_letter: z.string().optional().nullable()
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
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid payload" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  await mutate((db) => {
    db.applications.unshift({
      id: newId("app"),
      name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      location: data.location ?? null,
      education: data.highest_education ?? null,
      university: data.university ?? null,
      program: data.program ?? null,
      subjects: (data.subjects || []).join(", "),
      gradeLevels: (data.grade_levels || []).join(", "),
      yearsExperience: data.years_experience ?? null,
      availability: data.availability ?? null,
      linkedin: data.linkedin ?? null,
      resumeUrl: data.resume_url ?? null,
      coverLetter: data.cover_letter ?? null,
      status: "new",
      createdAt: new Date().toISOString()
    });
  });

  try {
    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: "Application received · PAL's Academy Careers",
        html: applicationConfirmationHTML(data.full_name)
      }),
      sendEmail({
        to: ADMIN_TO,
        subject: `New tutor application — ${data.full_name}`,
        html: adminApplicationHTML(data)
      })
    ]);
  } catch (e) {
    console.error("[applications:email]", e);
  }

  return NextResponse.json({ ok: true });
}
