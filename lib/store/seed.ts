import { mutate, newId } from "./db";
import { hashPassword } from "@/lib/auth/password";

let seeded = false;

/**
 * Idempotent: seeds a couple of sample tutor/student/classes/assignments so the
 * portal isn't empty for the first visitor.
 *
 * NOTE: we intentionally do NOT pre-create the admin account here. The first
 * person to sign up with ADMIN_EMAIL (palseduacademy@gmail.com) is automatically
 * promoted to admin + approved — see app/api/auth/signup/route.ts. That keeps the
 * admin password under the owner's control instead of a hardcoded default.
 */
export async function ensureSeed() {
  if (seeded) return;
  seeded = true;

  await mutate(async (db) => {
    // Sample tutor + students if none yet.
    if (!db.users.find((u) => u.role === "tutor")) {
      const tutorId = newId("usr");
      db.users.push({
        id: tutorId,
        email: "tutor.demo@palsacademy.local",
        fullName: "Mr. Hassan",
        passwordHash: await hashPassword("TutorDemo2025!"),
        role: "tutor",
        status: "approved",
        createdAt: new Date().toISOString()
      });

      const studentA = newId("usr");
      db.users.push({
        id: studentA,
        email: "student.demo@palsacademy.local",
        fullName: "Sample Student",
        passwordHash: await hashPassword("StudentDemo2025!"),
        role: "student",
        status: "approved",
        createdAt: new Date().toISOString()
      });

      // 3) Sample classes.
      const classId = newId("cls");
      db.classes.push({
        id: classId,
        subject: "MCV4U · Calculus & Vectors",
        title: "Grade 12 Calculus — Sunday cohort",
        studentIds: [studentA],
        tutorId,
        schedule: "Sundays · 7:00pm ET",
        meetUrl: "https://meet.google.com/lookup/pals-demo",
        createdAt: new Date().toISOString()
      });

      const classId2 = newId("cls");
      db.classes.push({
        id: classId2,
        subject: "SCH4U · Chemistry",
        title: "Grade 12 Chemistry — Tuesday 1-on-1",
        studentIds: [studentA],
        tutorId,
        schedule: "Tuesdays · 6:30pm ET",
        meetUrl: "https://meet.google.com/lookup/pals-demo-chem",
        createdAt: new Date().toISOString()
      });

      // 4) Sample assignments
      const inDays = (n: number) =>
        new Date(Date.now() + n * 24 * 60 * 60 * 1000).toISOString();
      db.assignments.push(
        {
          id: newId("asg"),
          classId,
          title: "Optimization word problems · set 4",
          description:
            "Complete problems 1–8 from the optimization handout. Show full setup before solving.",
          dueDate: inDays(3),
          createdAt: new Date().toISOString()
        },
        {
          id: newId("asg"),
          classId,
          title: "Mock test — Related rates",
          description:
            "60-minute timed mock. Submit your full working as a PDF after the session.",
          dueDate: inDays(7),
          createdAt: new Date().toISOString()
        },
        {
          id: newId("asg"),
          classId: classId2,
          title: "Equilibrium constants — practice set",
          description:
            "Problems 11–18 from Ch. 7. Pay attention to ICE-table setup.",
          dueDate: inDays(5),
          createdAt: new Date().toISOString()
        }
      );

      // 5) A welcome message in each class.
      db.messages.push(
        {
          id: newId("msg"),
          classId,
          senderId: tutorId,
          body: "Welcome to the calculus cohort! See you Sunday — bring your unit-1 notebook.",
          createdAt: new Date().toISOString()
        },
        {
          id: newId("msg"),
          classId: classId2,
          senderId: tutorId,
          body: "Reminder: equilibrium-constants set due before Tuesday's session.",
          createdAt: new Date().toISOString()
        }
      );
    }
  });
}
