import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current";
import { mutate, newId } from "@/lib/store/db";

export const runtime = "nodejs";

const STUDENT_LINES = [
  "Quick question about tonight's homework — is #4 using the chain rule?",
  "Will the recording be posted after class?",
  "Got it, thanks! That makes a lot more sense now.",
  "Can we go over question 7 next session?",
  "Just submitted my work — let me know if the format's okay.",
  "Running 5 min late to the Meet, joining now!",
  "Found a cleaner way to solve #3, can I show the class?",
  "Is the practice set due before or after Sunday?"
];

const TUTOR_LINES = [
  "Great work this week, everyone — keep it up.",
  "Reminder: upload your attempts before our session so we can review them live.",
  "I've posted a new practice set — give it a go before Friday.",
  "Nice progress on the last set. We'll tackle the harder ones next.",
  "Don't forget to show full working for the word problems.",
  "Good question — let's unpack that at the start of class.",
  "I'll share my annotated solutions right after our session."
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Admin: inject a little believable bot activity (messages + a completion) so the
// platform can be test-driven as if students and tutors were actively using it.
export async function POST() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const summary = await mutate((db) => {
    const eligible = db.classes.filter((c) => c.studentIds.length > 0);
    if (eligible.length === 0) return { messages: 0, completions: 0 };

    // Shuffle and take up to 3 classes.
    const classes = [...eligible].sort(() => Math.random() - 0.5).slice(0, 3);
    let messages = 0;
    let completions = 0;
    const now = Date.now();

    for (const cls of classes) {
      const fromTutor = Math.random() < 0.45;
      const senderId = fromTutor ? cls.tutorId : pick(cls.studentIds);
      const body = fromTutor ? pick(TUTOR_LINES) : pick(STUDENT_LINES);
      db.messages.push({
        id: newId("msg"),
        classId: cls.id,
        senderId,
        body,
        createdAt: new Date(now - Math.floor(Math.random() * 3) * 60_000).toISOString()
      });
      messages++;

      // Mark one open assignment complete for a random enrolled student.
      const classAssignments = db.assignments.filter((a) => a.classId === cls.id);
      const student = pick(cls.studentIds);
      const open = classAssignments.find(
        (a) => !db.submissions.some((s) => s.assignmentId === a.id && s.studentId === student)
      );
      if (open) {
        db.submissions.push({
          id: newId("sub"),
          assignmentId: open.id,
          studentId: student,
          submittedAt: new Date().toISOString()
        });
        completions++;
      }
    }

    return { messages, completions };
  });

  return NextResponse.json({ ok: true, ...summary });
}
