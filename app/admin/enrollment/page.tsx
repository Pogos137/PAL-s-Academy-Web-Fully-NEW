import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current";
import { readDb } from "@/lib/store/db";
import EnrollmentManager from "@/components/admin/EnrollmentManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Enrollment",
  robots: { index: false, follow: false }
};

export default async function EnrollmentPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/admin/enrollment");
  if (user.role !== "admin") redirect("/portal");

  const db = await readDb();
  const tutors = db.users
    .filter((u) => u.role === "tutor")
    .map((u) => ({ id: u.id, fullName: u.fullName, email: u.email }));
  const studentsList = db.users
    .filter((u) => u.role === "student")
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((u) => ({ id: u.id, fullName: u.fullName, email: u.email }));
  const classes = db.classes
    .map((c) => ({
      id: c.id,
      subject: c.subject,
      title: c.title,
      schedule: c.schedule,
      meetUrl: c.meetUrl,
      tutorId: c.tutorId,
      studentIds: c.studentIds
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject));

  return <EnrollmentManager classes={classes} students={studentsList} tutors={tutors} />;
}
