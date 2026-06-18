import { mutate, newId, readDb } from "./db";
import type {
  ConfidenceLog,
  FocusRequest,
  MasteryStatus,
  MasteryTopic,
  StudentPlan,
  Win
} from "./types";

// Idempotent demo seeding for the PAL's Progress features. Keyed off whether any
// mastery topics exist, so it backfills realistic data even on a DB that was
// seeded before these features existed. Runs once, then bails.

const DAY = 86_400_000;

let progressSeeded = false;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Topic banks keyed by a substring of the class subject (course code or word).
const TOPIC_BANKS: { match: RegExp; unitTag: string; topics: string[] }[] = [
  { match: /sch|chem/i, unitTag: "Chemistry", topics: ["Matter & bonding", "Stoichiometry & the mole", "Thermochemistry", "Chemical equilibrium", "Acids, bases & pH", "Organic chemistry", "Electrochemistry"] },
  { match: /sph|physic/i, unitTag: "Physics", topics: ["Kinematics", "Dynamics & forces", "Energy & momentum", "Waves & sound", "Electricity & magnetism", "Gravitational & electric fields"] },
  { match: /sbi|bio/i, unitTag: "Biology", topics: ["Biochemistry", "Metabolic processes", "Molecular genetics", "Homeostasis", "Population dynamics"] },
  { match: /mcv|calc|vector/i, unitTag: "Calculus & Vectors", topics: ["Limits & continuity", "Derivative rules", "Related rates", "Curve sketching & optimization", "Vectors in 3-D", "Lines & planes"] },
  { match: /mhf|advanced function/i, unitTag: "Advanced Functions", topics: ["Polynomial functions", "Rational functions", "Exponential & log functions", "Trig functions & identities", "Rates of change"] },
  { match: /mdm|data manage/i, unitTag: "Data Management", topics: ["One-variable statistics", "Two-variable statistics", "Probability", "Counting & combinatorics", "Probability distributions"] },
  { match: /eng|english/i, unitTag: "English", topics: ["Thesis & argument", "Literary analysis", "Essay structure", "Evidence & integration", "Grammar & clarity"] },
  { match: /ics|computer/i, unitTag: "Computer Science", topics: ["Variables & control flow", "Functions & decomposition", "Arrays & loops", "Object-oriented basics", "Algorithms & efficiency"] },
  { match: /math|mcr|mpm|function/i, unitTag: "Mathematics", topics: ["Functions & transformations", "Trigonometry", "Exponential functions", "Sequences & series", "Rational expressions"] }
];

const DEFAULT_TOPICS = ["Foundations", "Core concepts", "Application & problem-solving", "Exam technique"];

function topicsFor(subject: string): { unitTag: string; topics: string[] } {
  const bank = TOPIC_BANKS.find((b) => b.match.test(subject));
  return bank ? { unitTag: bank.unitTag, topics: bank.topics } : { unitTag: "Course", topics: DEFAULT_TOPICS };
}

function statusForIndex(i: number, total: number): MasteryStatus {
  const frac = (i + 0.5) / total;
  if (frac < 0.3) return "mastered";
  if (frac < 0.55) return "practising";
  if (frac < 0.8) return "learning";
  return "new";
}

const FOCUS_BANK = [
  "The questions that combine two units — I freeze on where to start.",
  "Word problems: translating the scenario into the right setup.",
  "I want to go slower on the parts that show up on the test most.",
  "Reviewing the last quiz — I lost marks I didn't understand.",
  "Building confidence before the unit test next week."
];

const WIN_BANK = [
  "Solved a full problem with zero hints for the first time.",
  "Explained the concept back to the tutor in their own words.",
  "Jumped a full grade on the latest unit test.",
  "Finally 'gets' why the method works, not just the steps."
];

export async function ensureProgressSeed(): Promise<void> {
  if (progressSeeded) return;
  const db = await readDb();
  if (db.masteryTopics.length > 0) {
    progressSeeded = true;
    return;
  }

  await mutate((d) => {
    const now = Date.now();
    const masteryTopics: MasteryTopic[] = [];
    const confidenceLogs: ConfidenceLog[] = [];
    const focusRequests: FocusRequest[] = [];
    const wins: Win[] = [];

    for (const cls of d.classes) {
      const { unitTag, topics } = topicsFor(cls.subject);

      // Mastery Map — one curated topic list per class.
      topics.forEach((label, i) => {
        const ts = new Date(now - (topics.length - i) * 2 * DAY).toISOString();
        masteryTopics.push({
          id: newId("mtopic"),
          classId: cls.id,
          label,
          unit: unitTag,
          status: statusForIndex(i, topics.length),
          order: i,
          updatedBy: cls.tutorId,
          updatedAt: ts,
          createdAt: ts
        });
      });

      // Per-student confidence trend + a focus request.
      cls.studentIds.forEach((studentId, si) => {
        const base = 2 + (hash(studentId + cls.id) % 2); // 2 or 3
        const ladder = [base, base, base + 1, base + 1, Math.min(5, base + 2), Math.min(5, base + 2)];
        ladder.forEach((rating, wi) => {
          const weeksAgo = ladder.length - wi; // 6..1 weeks ago
          confidenceLogs.push({
            id: newId("conf"),
            classId: cls.id,
            studentId,
            rating: Math.max(1, Math.min(5, rating)),
            note: wi === ladder.length - 1 ? "Starting to click." : null,
            createdAt: new Date(now - weeksAgo * 7 * DAY).toISOString()
          });
        });

        focusRequests.push({
          id: newId("focus"),
          classId: cls.id,
          studentId,
          body: FOCUS_BANK[hash(studentId + cls.subject) % FOCUS_BANK.length],
          status: si === 0 ? "planned" : "open",
          createdAt: new Date(now - (2 + (hash(studentId) % 4)) * DAY).toISOString(),
          updatedAt: new Date(now - 1 * DAY).toISOString()
        });
      });

      // A couple of wins per class, credited to the tutor.
      const firstStudent = cls.studentIds[0] ?? null;
      const winCount = 1 + (hash(cls.id) % 2);
      for (let w = 0; w < winCount; w++) {
        wins.push({
          id: newId("win"),
          classId: cls.id,
          studentId: firstStudent,
          body: WIN_BANK[(hash(cls.id) + w) % WIN_BANK.length],
          addedBy: cls.tutorId,
          createdAt: new Date(now - (1 + w * 5) * DAY).toISOString()
        });
      }
    }

    d.masteryTopics.push(...masteryTopics);
    d.confidenceLogs.push(...confidenceLogs);
    d.focusRequests.push(...focusRequests);
    d.wins.push(...wins);
  });

  progressSeeded = true;
}

// ── Student billing plans (sessions remaining) ────────────────────────────

let plansSeeded = false;

const PLAN_TIERS = [
  { name: "Starter", price: 200, perPeriod: 4 },
  { name: "Core", price: 360, perPeriod: 8 },
  { name: "Intensive", price: 480, perPeriod: 12 },
  { name: "PAL's Circle", price: 120, perPeriod: 4 }
];

export async function ensureStudentPlans(): Promise<void> {
  if (plansSeeded) return;
  const db = await readDb();
  if (db.studentPlans.length > 0) {
    plansSeeded = true;
    return;
  }

  await mutate((d) => {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const renewsOn = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

    const students = d.users.filter((u) => u.role === "student");
    const plans: StudentPlan[] = students.map((s, i) => {
      // Weight toward Starter/Core; deterministic per student.
      const pick = [0, 1, 1, 2, 0, 3][(hash(s.id) + i) % 6];
      const tier = PLAN_TIERS[pick];
      // 35–80% of the period's sessions already used.
      const usedFrac = 0.35 + (hash(s.id + "u") % 46) / 100;
      const sessionsUsed = Math.min(tier.perPeriod, Math.round(tier.perPeriod * usedFrac));
      return {
        id: newId("plan"),
        studentId: s.id,
        planName: tier.name,
        monthlyPrice: tier.price,
        sessionsPurchased: tier.perPeriod,
        sessionsUsed,
        periodStart,
        renewsOn
      };
    });

    d.studentPlans.push(...plans);
  });

  plansSeeded = true;
}
