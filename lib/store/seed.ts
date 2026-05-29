import { mutate, newId, readDb } from "./db";
import { hashPassword } from "@/lib/auth/password";
import type { ClassEntry, User } from "./types";

let seeded = false;

// One shared password for every seeded demo/bot account so the owner can sign in
// as any of them to test-drive the platform. Real accounts (e.g. the admin who
// signs up with palseduacademy@gmail.com) keep their own passwords.
export const BOT_PASSWORD = "PalsDemo2025!";

// If this bot exists, the rich catalog has already been seeded — bail early so we
// never duplicate classes/threads on subsequent boots.
const SEED_MARKER_EMAIL = "ava.bennett@palsacademy.bot";

const DAY = 86_400_000;
const HOUR = 3_600_000;
const MIN = 60_000;

type CatalogClass = {
  subject: string;
  title: string;
  tutorEmail: string;
  schedule: string;
  meetSlug: string;
  students: string[]; // student emails
  assignments: { title: string; description: string; dueDays: number }[];
  thread: { from: string; body: string; minsAgo: number }[];
  // [studentEmail, assignmentIndex] pairs that are already completed
  completed: [string, number][];
};

const TUTORS: { email: string; fullName: string }[] = [
  { email: "tutor.demo@palsacademy.local", fullName: "Mr. Hassan" }, // existing demo tutor
  { email: "priya.anand@palsacademy.bot", fullName: "Ms. Priya Anand" },
  { email: "daniel.okafor@palsacademy.bot", fullName: "Mr. Daniel Okafor" },
  { email: "camille.dubois@palsacademy.bot", fullName: "Mme Camille Dubois" },
  { email: "grace.liang@palsacademy.bot", fullName: "Ms. Grace Liang" },
  { email: "jonathan.reyes@palsacademy.bot", fullName: "Mr. Jonathan Reyes" }
];

const STUDENTS: { email: string; fullName: string }[] = [
  { email: "student.demo@palsacademy.local", fullName: "Sample Student" }, // existing demo student
  { email: SEED_MARKER_EMAIL, fullName: "Ava Bennett" },
  { email: "liam.carter@palsacademy.bot", fullName: "Liam Carter" },
  { email: "sofia.nguyen@palsacademy.bot", fullName: "Sofia Nguyen" },
  { email: "noah.kim@palsacademy.bot", fullName: "Noah Kim" },
  { email: "maya.patel@palsacademy.bot", fullName: "Maya Patel" },
  { email: "ethan.brooks@palsacademy.bot", fullName: "Ethan Brooks" },
  { email: "olivia.rossi@palsacademy.bot", fullName: "Olivia Rossi" },
  { email: "lucas.silva@palsacademy.bot", fullName: "Lucas Silva" }
];

const CATALOG: CatalogClass[] = [
  {
    subject: "MCV4U · Calculus & Vectors",
    title: "Grade 12 Calculus — Sunday cohort",
    tutorEmail: "tutor.demo@palsacademy.local",
    schedule: "Sundays · 7:00pm ET",
    meetSlug: "pals-mcv4u",
    students: ["student.demo@palsacademy.local", "ava.bennett@palsacademy.bot", "liam.carter@palsacademy.bot", "noah.kim@palsacademy.bot"],
    assignments: [
      { title: "Optimization word problems · set 4", description: "Complete problems 1–8 from the optimization handout. Show full setup before solving.", dueDays: 3 },
      { title: "Mock test — Related rates", description: "60-minute timed mock. Submit your full working as a PDF after the session.", dueDays: 7 },
      { title: "Vectors warm-up · dot & cross products", description: "Khan-style drill set. Quick check before we start the vectors unit.", dueDays: -2 }
    ],
    thread: [
      { from: "tutor.demo@palsacademy.local", body: "Welcome to the calculus cohort! See you Sunday — bring your unit-1 notebook.", minsAgo: 4 * 24 * 60 },
      { from: "ava.bennett@palsacademy.bot", body: "Thanks Mr. Hassan! Quick q — is the optimization set due before or after Sunday's class?", minsAgo: 3 * 24 * 60 },
      { from: "tutor.demo@palsacademy.local", body: "Before, ideally — that way we can review the tricky ones live. #6 and #8 trip everyone up.", minsAgo: 3 * 24 * 60 - 40 },
      { from: "liam.carter@palsacademy.bot", body: "Got through 1–5, stuck on the ladder problem 🙃 will bring it Sunday.", minsAgo: 26 * 60 }
    ],
    completed: [["noah.kim@palsacademy.bot", 0], ["noah.kim@palsacademy.bot", 2], ["ava.bennett@palsacademy.bot", 2]]
  },
  {
    subject: "MHF4U · Advanced Functions",
    title: "Grade 12 — Advanced Functions",
    tutorEmail: "tutor.demo@palsacademy.local",
    schedule: "Wednesdays · 6:00pm ET",
    meetSlug: "pals-mhf4u",
    students: ["sofia.nguyen@palsacademy.bot", "maya.patel@palsacademy.bot", "ethan.brooks@palsacademy.bot"],
    assignments: [
      { title: "Polynomial & rational inequalities", description: "Sign-chart method for all 12 problems. Box your final interval notation.", dueDays: 2 },
      { title: "Log laws — consolidation set", description: "Problems 1–10. Watch domain restrictions on the word problems.", dueDays: 6 }
    ],
    thread: [
      { from: "tutor.demo@palsacademy.local", body: "Reminder: sign-chart method for the inequalities set — don't just test one point.", minsAgo: 2 * 24 * 60 },
      { from: "maya.patel@palsacademy.bot", body: "Do we need to show the chart or just the answer?", minsAgo: 2 * 24 * 60 - 25 },
      { from: "tutor.demo@palsacademy.local", body: "Show the chart — that's where the marks are.", minsAgo: 2 * 24 * 60 - 30 }
    ],
    completed: [["sofia.nguyen@palsacademy.bot", 0]]
  },
  {
    subject: "SCH4U · Chemistry",
    title: "Grade 12 Chemistry — Tuesday 1-on-1",
    tutorEmail: "priya.anand@palsacademy.bot",
    schedule: "Tuesdays · 6:30pm ET",
    meetSlug: "pals-sch4u",
    students: ["student.demo@palsacademy.local", "olivia.rossi@palsacademy.bot", "lucas.silva@palsacademy.bot"],
    assignments: [
      { title: "Equilibrium constants — practice set", description: "Problems 11–18 from Ch. 7. Pay attention to ICE-table setup.", dueDays: 5 },
      { title: "Lab write-up — titration", description: "Full formal write-up with error analysis. Submit as PDF.", dueDays: -1 }
    ],
    thread: [
      { from: "priya.anand@palsacademy.bot", body: "Reminder: equilibrium-constants set due before Tuesday's session.", minsAgo: 3 * 24 * 60 },
      { from: "olivia.rossi@palsacademy.bot", body: "For the titration write-up, do we include the rough trial in the average?", minsAgo: 20 * 60 },
      { from: "priya.anand@palsacademy.bot", body: "Good question — no, exclude the rough trial from your averaged volume.", minsAgo: 19 * 60 }
    ],
    completed: [["lucas.silva@palsacademy.bot", 1], ["olivia.rossi@palsacademy.bot", 1]]
  },
  {
    subject: "SBI4U · Biology",
    title: "Grade 12 Biology — metabolism & genetics",
    tutorEmail: "priya.anand@palsacademy.bot",
    schedule: "Thursdays · 5:30pm ET",
    meetSlug: "pals-sbi4u",
    students: ["ava.bennett@palsacademy.bot", "maya.patel@palsacademy.bot", "sofia.nguyen@palsacademy.bot"],
    assignments: [
      { title: "Cellular respiration — flow diagram", description: "Map glycolysis → Krebs → ETC with ATP yields at each stage.", dueDays: 4 },
      { title: "Genetics problem set — dihybrid crosses", description: "Punnett squares + ratios for problems 1–9.", dueDays: 9 }
    ],
    thread: [
      { from: "priya.anand@palsacademy.bot", body: "We'll start the genetics unit Thursday — skim the dihybrid section beforehand.", minsAgo: 28 * 60 },
      { from: "maya.patel@palsacademy.bot", body: "Will do! The ATP counts in the flow diagram — net or gross?", minsAgo: 27 * 60 },
      { from: "priya.anand@palsacademy.bot", body: "Net for glycolysis (2), then we'll tally the rest together.", minsAgo: 26 * 60 }
    ],
    completed: []
  },
  {
    subject: "SPH4U · Physics",
    title: "Grade 12 Physics — fields & momentum",
    tutorEmail: "daniel.okafor@palsacademy.bot",
    schedule: "Mondays · 7:30pm ET",
    meetSlug: "pals-sph4u",
    students: ["liam.carter@palsacademy.bot", "noah.kim@palsacademy.bot", "ethan.brooks@palsacademy.bot"],
    assignments: [
      { title: "Momentum & impulse — problem set 3", description: "2D collision problems. Resolve into components before applying conservation.", dueDays: 1 },
      { title: "Electric fields — concept check", description: "Short-answer set on field lines, potential, and superposition.", dueDays: -3 }
    ],
    thread: [
      { from: "daniel.okafor@palsacademy.bot", body: "Set 3 is all 2D — break collisions into x and y first, then conserve each.", minsAgo: 2 * 24 * 60 },
      { from: "ethan.brooks@palsacademy.bot", body: "That makes more sense now, thanks. The angled one (#5) was killing me.", minsAgo: 30 * 60 }
    ],
    completed: [["liam.carter@palsacademy.bot", 1], ["noah.kim@palsacademy.bot", 1], ["ethan.brooks@palsacademy.bot", 1]]
  },
  {
    subject: "ENG4U · English",
    title: "Grade 12 English — essays & ISU",
    tutorEmail: "jonathan.reyes@palsacademy.bot",
    schedule: "Saturdays · 11:00am ET",
    meetSlug: "pals-eng4u",
    students: ["olivia.rossi@palsacademy.bot", "maya.patel@palsacademy.bot", "student.demo@palsacademy.local"],
    assignments: [
      { title: "Thesis workshop — comparative essay", description: "Draft three possible thesis statements for your two ISU texts.", dueDays: 3 },
      { title: "Annotated bibliography", description: "Five sources, MLA format, two sentences of evaluation each.", dueDays: 8 }
    ],
    thread: [
      { from: "jonathan.reyes@palsacademy.bot", body: "Bring three thesis options Saturday — we'll pressure-test each one as a group.", minsAgo: 22 * 60 },
      { from: "olivia.rossi@palsacademy.bot", body: "Can the comparison be thematic rather than character-based?", minsAgo: 21 * 60 },
      { from: "jonathan.reyes@palsacademy.bot", body: "Absolutely — thematic often gives you a stronger argument. Go for it.", minsAgo: 20 * 60 }
    ],
    completed: []
  },
  {
    subject: "FSF4U · Core French",
    title: "Grade 12 Core French — oral & writing",
    tutorEmail: "camille.dubois@palsacademy.bot",
    schedule: "Fridays · 4:00pm ET",
    meetSlug: "pals-fsf4u",
    students: ["sofia.nguyen@palsacademy.bot", "lucas.silva@palsacademy.bot"],
    assignments: [
      { title: "Présentation orale — l'environnement", description: "Two-minute spoken presentation. Record and upload, or present live Friday.", dueDays: 5 },
      { title: "Rédaction — le subjonctif", description: "150-word paragraph using at least five subjunctive triggers.", dueDays: 11 }
    ],
    thread: [
      { from: "camille.dubois@palsacademy.bot", body: "Pour vendredi : préparez votre présentation orale. On corrige la prononciation ensemble.", minsAgo: 18 * 60 },
      { from: "lucas.silva@palsacademy.bot", body: "Est-ce qu'on peut utiliser des notes pendant la présentation ?", minsAgo: 17 * 60 },
      { from: "camille.dubois@palsacademy.bot", body: "Des mots-clés seulement, pas de texte complet. 🙂", minsAgo: 16 * 60 }
    ],
    completed: []
  },
  {
    subject: "ICS4U · Computer Science",
    title: "Grade 12 CS — Python & data structures",
    tutorEmail: "grace.liang@palsacademy.bot",
    schedule: "Sundays · 2:00pm ET",
    meetSlug: "pals-ics4u",
    students: ["noah.kim@palsacademy.bot", "ethan.brooks@palsacademy.bot", "liam.carter@palsacademy.bot", "ava.bennett@palsacademy.bot"],
    assignments: [
      { title: "Recursion lab — towers & traversals", description: "Implement factorial, Fibonacci (memoized), and a binary-tree in-order traversal.", dueDays: 2 },
      { title: "Big-O quiz prep", description: "Classify the 10 snippets by time complexity. Justify each in one line.", dueDays: -1 }
    ],
    thread: [
      { from: "grace.liang@palsacademy.bot", body: "For the recursion lab — memoize Fibonacci. We'll compare runtimes with the naive version Sunday.", minsAgo: 2 * 24 * 60 },
      { from: "noah.kim@palsacademy.bot", body: "Memoized version is SO much faster, the naive one hung on n=40 😂", minsAgo: 90 },
      { from: "grace.liang@palsacademy.bot", body: "Exactly the point 😄 — that's the difference between O(2ⁿ) and O(n).", minsAgo: 80 }
    ],
    completed: [["ava.bennett@palsacademy.bot", 1], ["noah.kim@palsacademy.bot", 1]]
  }
];

/**
 * Idempotent: seeds a full PAL's Academy course catalog plus a roster of demo
 * "bot" tutors and students so the portal and admin console feel alive for a
 * test-run. Safe to run repeatedly — guarded by SEED_MARKER_EMAIL.
 *
 * NOTE: we intentionally do NOT create the admin account here. The first person
 * to sign up with ADMIN_EMAIL (palseduacademy@gmail.com) is auto-promoted to
 * admin — see app/api/auth/signup/route.ts — so the admin password stays under
 * the owner's control. Any existing accounts (including that admin) are preserved.
 */
export async function ensureSeed() {
  if (seeded) return;

  // Read-only check FIRST. ensureSeed() runs on every admin/portal page load;
  // if the catalog already exists we must NOT write the database back. Writing
  // the whole DB on every page load is what let a concurrent stale write erase
  // a freshly-created account. So: only write the very first time we seed.
  const current = await readDb();
  if (current.users.some((u) => u.email.toLowerCase() === SEED_MARKER_EMAIL)) {
    seeded = true;
    return;
  }

  await mutate(async (db) => {
    // Double-check under the compare-and-swap lock in case another instance
    // seeded between our read above and this write.
    if (db.users.some((u) => u.email.toLowerCase() === SEED_MARKER_EMAIL)) return;

    const now = Date.now();
    const iso = (ms: number) => new Date(ms).toISOString();

    async function findOrCreateUser(
      email: string,
      fullName: string,
      role: User["role"],
      createdDaysAgo: number
    ): Promise<User> {
      const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) return existing;
      const u: User = {
        id: newId("usr"),
        email,
        fullName,
        passwordHash: await hashPassword(BOT_PASSWORD),
        role,
        status: "approved",
        createdAt: iso(now - createdDaysAgo * DAY)
      };
      db.users.push(u);
      return u;
    }

    // 1) Tutors + students (reuse existing demo accounts by email).
    const tutorId: Record<string, string> = {};
    for (let i = 0; i < TUTORS.length; i++) {
      const t = TUTORS[i];
      const u = await findOrCreateUser(t.email, t.fullName, "tutor", 40 - i);
      tutorId[t.email] = u.id;
    }
    const studentId: Record<string, string> = {};
    for (let i = 0; i < STUDENTS.length; i++) {
      const s = STUDENTS[i];
      const u = await findOrCreateUser(s.email, s.fullName, "student", 30 - i);
      studentId[s.email] = u.id;
    }

    // 2) Classes (reuse an existing class if its subject already exists).
    for (const c of CATALOG) {
      const tId = tutorId[c.tutorEmail];
      const sIds = c.students.map((e) => studentId[e]).filter(Boolean);

      let cls = db.classes.find((x) => x.subject === c.subject);
      if (cls) {
        cls.tutorId = tId;
        cls.title = c.title;
        cls.schedule = c.schedule;
        cls.meetUrl = `https://meet.google.com/lookup/${c.meetSlug}`;
        cls.studentIds = Array.from(new Set([...cls.studentIds, ...sIds]));
      } else {
        cls = {
          id: newId("cls"),
          subject: c.subject,
          title: c.title,
          studentIds: sIds,
          tutorId: tId,
          schedule: c.schedule,
          meetUrl: `https://meet.google.com/lookup/${c.meetSlug}`,
          createdAt: iso(now - 35 * DAY)
        } satisfies ClassEntry;
        db.classes.push(cls);
      }

      // Assignments for this class — capture the created ids by index.
      const createdAssignmentIds: string[] = [];
      c.assignments.forEach((a, idx) => {
        const id = newId("asg");
        createdAssignmentIds[idx] = id;
        db.assignments.push({
          id,
          classId: cls!.id,
          title: a.title,
          description: a.description,
          dueDate: iso(now + a.dueDays * DAY),
          createdAt: iso(now - 10 * DAY)
        });
      });

      // Seeded conversation.
      for (const m of c.thread) {
        const senderId = tutorId[m.from] || studentId[m.from];
        if (!senderId) continue;
        db.messages.push({
          id: newId("msg"),
          classId: cls.id,
          senderId,
          body: m.body,
          createdAt: iso(now - m.minsAgo * MIN)
        });
      }

      // Completions (recorded as submissions).
      for (const [email, aIdx] of c.completed) {
        const sId = studentId[email];
        const aId = createdAssignmentIds[aIdx];
        if (!sId || !aId) continue;
        db.submissions.push({
          id: newId("sub"),
          assignmentId: aId,
          studentId: sId,
          submittedAt: iso(now - (1 + aIdx) * DAY)
        });
      }
    }
  });

  seeded = true;
}
