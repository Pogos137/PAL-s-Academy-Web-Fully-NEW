import { readDb } from "./db";
import { classesForUser } from "./queries";
import type {
  ClassEntry,
  ConfidenceLog,
  FocusRequest,
  MasteryStatus,
  MasteryTopic,
  StudentPlan,
  User,
  Win
} from "./types";

// ── Mastery summaries ──────────────────────────────────────────────────────

export type MasterySummary = {
  total: number;
  counts: Record<MasteryStatus, number>;
  /** % of topics fully mastered (0–100). */
  percent: number;
  /** Weighted progress (mastered=1, shaky=.66, learning=.33, new=0) → 0–100.
   *  A gentler signal than percent-mastered for the headline ring. */
  momentum: number;
};

const WEIGHT: Record<MasteryStatus, number> = {
  new: 0,
  learning: 0.34,
  practising: 0.67,
  mastered: 1
};

export function masterySummary(topics: MasteryTopic[]): MasterySummary {
  const counts: Record<MasteryStatus, number> = { new: 0, learning: 0, practising: 0, mastered: 0 };
  for (const t of topics) counts[t.status]++;
  const total = topics.length;
  const percent = total ? Math.round((counts.mastered / total) * 100) : 0;
  const momentum = total
    ? Math.round((topics.reduce((sum, t) => sum + WEIGHT[t.status], 0) / total) * 100)
    : 0;
  return { total, counts, percent, momentum };
}

/** Latest confidence rating + simple trend direction for a series of logs. */
export function confidenceSummary(logs: ConfidenceLog[]): {
  latest: number | null;
  previous: number | null;
  delta: number | null;
  average: number | null;
  series: number[];
} {
  const ordered = [...logs].sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  const series = ordered.map((l) => l.rating);
  const latest = series.length ? series[series.length - 1] : null;
  const previous = series.length > 1 ? series[series.length - 2] : null;
  const delta = latest !== null && previous !== null ? +(latest - previous).toFixed(1) : null;
  const average = series.length
    ? +(series.reduce((a, b) => a + b, 0) / series.length).toFixed(1)
    : null;
  return { latest, previous, delta, average, series };
}

// ── Per-class bundle ─────────────────────────────────────────────────────────

export type ClassProgress = {
  topics: MasteryTopic[];
  confidence: ConfidenceLog[];
  focus: FocusRequest[];
  wins: Win[];
};

/** All growth data for one class. When `studentId` is given, confidence and
 *  focus are scoped to that student (the student's own view). Tutors/admins
 *  pass no studentId and see the whole class. */
export async function classProgress(
  classId: string,
  studentId?: string
): Promise<ClassProgress> {
  const db = await readDb();
  const topics = db.masteryTopics
    .filter((t) => t.classId === classId)
    .sort((a, b) => a.order - b.order);
  let confidence = db.confidenceLogs.filter((c) => c.classId === classId);
  let focus = db.focusRequests.filter((f) => f.classId === classId);
  if (studentId) {
    confidence = confidence.filter((c) => c.studentId === studentId);
    focus = focus.filter((f) => f.studentId === studentId);
  }
  const wins = db.wins
    .filter((w) => w.classId === classId && (!studentId || !w.studentId || w.studentId === studentId))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return { topics, confidence, focus, wins };
}

// ── Cross-class hub aggregate ─────────────────────────────────────────────────

export type ClassGrowthCard = {
  cls: ClassEntry;
  mastery: MasterySummary;
  confidence: ReturnType<typeof confidenceSummary>;
  openFocus: number;
  latestWin: Win | null;
};

export type StudentGrowth = {
  cards: ClassGrowthCard[];
  overallMomentum: number;
  overallConfidence: number | null;
  confidenceSeries: number[];
  totalMastered: number;
  totalTopics: number;
  recentWins: Win[];
  openFocus: FocusRequest[];
};

/** Aggregate growth across every class a user can see. For a student this is
 *  their own journey; for a tutor/admin it's their classes in aggregate. */
export async function studentGrowth(user: User): Promise<StudentGrowth> {
  const db = await readDb();
  const classes = await classesForUser(user);
  const scopeStudent = user.role === "student" ? user.id : undefined;

  const cards: ClassGrowthCard[] = classes.map((cls) => {
    const topics = db.masteryTopics
      .filter((t) => t.classId === cls.id)
      .sort((a, b) => a.order - b.order);
    const conf = db.confidenceLogs.filter(
      (c) => c.classId === cls.id && (!scopeStudent || c.studentId === scopeStudent)
    );
    const focus = db.focusRequests.filter(
      (f) => f.classId === cls.id && (!scopeStudent || f.studentId === scopeStudent)
    );
    const wins = db.wins
      .filter((w) => w.classId === cls.id && (!scopeStudent || !w.studentId || w.studentId === scopeStudent))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return {
      cls,
      mastery: masterySummary(topics),
      confidence: confidenceSummary(conf),
      openFocus: focus.filter((f) => f.status !== "addressed").length,
      latestWin: wins[0] ?? null
    };
  });

  const totalTopics = cards.reduce((n, c) => n + c.mastery.total, 0);
  const totalMastered = cards.reduce((n, c) => n + c.mastery.counts.mastered, 0);
  const overallMomentum = cards.length
    ? Math.round(cards.reduce((n, c) => n + c.mastery.momentum, 0) / cards.length)
    : 0;

  // Overall confidence = the most recent rating across all classes, plus a
  // chronological series for the hub sparkline.
  const classIds = new Set(classes.map((c) => c.id));
  const allConf = db.confidenceLogs
    .filter((c) => classIds.has(c.classId) && (!scopeStudent || c.studentId === scopeStudent))
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  const confidenceSeries = allConf.map((c) => c.rating);
  const overallConfidence = confidenceSeries.length
    ? confidenceSeries[confidenceSeries.length - 1]
    : null;

  const recentWins = db.wins
    .filter((w) => classIds.has(w.classId) && (!scopeStudent || !w.studentId || w.studentId === scopeStudent))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 6);

  const openFocus = db.focusRequests
    .filter(
      (f) => classIds.has(f.classId) && f.status !== "addressed" && (!scopeStudent || f.studentId === scopeStudent)
    )
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return {
    cards,
    overallMomentum,
    overallConfidence,
    confidenceSeries,
    totalMastered,
    totalTopics,
    recentWins,
    openFocus
  };
}

// ── Per-student oversight (admin / tutor) ─────────────────────────────────────

export function sessionsRemaining(plan: StudentPlan | null): number | null {
  if (!plan) return null;
  return Math.max(0, plan.sessionsPurchased - plan.sessionsUsed);
}

export type StudentClassBreakdown = {
  cls: ClassEntry;
  mastery: MasterySummary;
  confidence: ReturnType<typeof confidenceSummary>;
  assignmentsTotal: number;
  assignmentsDone: number;
  winsCount: number;
  openFocus: number;
};

export type ArchivedTask = {
  id: string; // assignmentId
  title: string;
  classSubject: string;
  completedAt: string;
};

export type StudentProfileData = {
  user: User;
  plan: StudentPlan | null;
  sessionsRemaining: number | null;
  classes: StudentClassBreakdown[];
  overallMomentum: number;
  latestConfidence: number | null;
  confidenceSeries: number[];
  assignmentsDone: number;
  assignmentsTotal: number;
  archivedTasks: ArchivedTask[];
};

/** A completed task drops off the active list and into the archive 24h after
 *  it's checked off — keeps the live list short without losing history. */
export const TASK_ARCHIVE_MS = 24 * 60 * 60 * 1000;

/** Everything about one student, for the admin/tutor profile view. */
export async function studentProfile(studentId: string): Promise<StudentProfileData | null> {
  const db = await readDb();
  const user = db.users.find((u) => u.id === studentId && u.role === "student");
  if (!user) return null;

  const plan = db.studentPlans.find((p) => p.studentId === studentId) ?? null;
  const enrolled = db.classes.filter((c) => c.studentIds.includes(studentId));

  const classes: StudentClassBreakdown[] = enrolled.map((cls) => {
    const topics = db.masteryTopics
      .filter((t) => t.classId === cls.id)
      .sort((a, b) => a.order - b.order);
    const conf = db.confidenceLogs.filter((c) => c.classId === cls.id && c.studentId === studentId);
    const classAssignmentIds = new Set(db.assignments.filter((a) => a.classId === cls.id).map((a) => a.id));
    const assignmentsTotal = classAssignmentIds.size;
    const assignmentsDone = db.submissions.filter(
      (s) => s.studentId === studentId && classAssignmentIds.has(s.assignmentId)
    ).length;
    const winsCount = db.wins.filter(
      (w) => w.classId === cls.id && (!w.studentId || w.studentId === studentId)
    ).length;
    const openFocus = db.focusRequests.filter(
      (f) => f.classId === cls.id && f.studentId === studentId && f.status !== "addressed"
    ).length;
    return {
      cls,
      mastery: masterySummary(topics),
      confidence: confidenceSummary(conf),
      assignmentsTotal,
      assignmentsDone,
      winsCount,
      openFocus
    };
  });

  const overallMomentum = classes.length
    ? Math.round(classes.reduce((n, c) => n + c.mastery.momentum, 0) / classes.length)
    : 0;
  const allConf = db.confidenceLogs
    .filter((c) => c.studentId === studentId && enrolled.some((e) => e.id === c.classId))
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  const confidenceSeries = allConf.map((c) => c.rating);
  const latestConfidence = confidenceSeries.length ? confidenceSeries[confidenceSeries.length - 1] : null;
  const assignmentsTotal = classes.reduce((n, c) => n + c.assignmentsTotal, 0);
  const assignmentsDone = classes.reduce((n, c) => n + c.assignmentsDone, 0);

  // Archived tasks: this student's completions older than the 24h window.
  const cutoff = Date.now() - TASK_ARCHIVE_MS;
  const enrolledIds = new Set(enrolled.map((c) => c.id));
  const subjectByAssignment = new Map(
    db.assignments
      .filter((a) => enrolledIds.has(a.classId))
      .map((a) => [a.id, { title: a.title, subject: enrolled.find((c) => c.id === a.classId)?.subject ?? "Class" }])
  );
  const archivedTasks: ArchivedTask[] = db.submissions
    .filter((s) => s.studentId === studentId && subjectByAssignment.has(s.assignmentId) && +new Date(s.submittedAt) < cutoff)
    .sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt))
    .map((s) => ({
      id: s.assignmentId,
      title: subjectByAssignment.get(s.assignmentId)!.title,
      classSubject: subjectByAssignment.get(s.assignmentId)!.subject,
      completedAt: s.submittedAt
    }));

  return {
    user,
    plan,
    sessionsRemaining: sessionsRemaining(plan),
    classes,
    overallMomentum,
    latestConfidence,
    confidenceSeries,
    assignmentsDone,
    assignmentsTotal,
    archivedTasks
  };
}

export type StudentDirectoryRow = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  classCount: number;
  subjects: string[];
  overallMomentum: number;
  latestConfidence: number | null;
  planName: string | null;
  sessionsRemaining: number | null;
};

/** The student directory the admin (all students) or a tutor (their students)
 *  sees — each row links to the full profile. */
export async function studentsOverview(viewer: User): Promise<StudentDirectoryRow[]> {
  const db = await readDb();
  // Which students are in scope?
  let students = db.users.filter((u) => u.role === "student");
  if (viewer.role === "tutor") {
    const mine = new Set<string>();
    db.classes.filter((c) => c.tutorId === viewer.id).forEach((c) => c.studentIds.forEach((s) => mine.add(s)));
    students = students.filter((s) => mine.has(s.id));
  }

  return students
    .map((s) => {
      const enrolled = db.classes.filter((c) => c.studentIds.includes(s.id));
      const momenta = enrolled.map((cls) => {
        const topics = db.masteryTopics.filter((t) => t.classId === cls.id);
        return masterySummary(topics).momentum;
      });
      const overallMomentum = momenta.length
        ? Math.round(momenta.reduce((a, b) => a + b, 0) / momenta.length)
        : 0;
      const conf = db.confidenceLogs
        .filter((c) => c.studentId === s.id && enrolled.some((e) => e.id === c.classId))
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
      const latestConfidence = conf.length ? conf[conf.length - 1].rating : null;
      const plan = db.studentPlans.find((p) => p.studentId === s.id) ?? null;
      return {
        id: s.id,
        fullName: s.fullName,
        email: s.email,
        status: s.status,
        classCount: enrolled.length,
        subjects: enrolled.map((c) => c.subject),
        overallMomentum,
        latestConfidence,
        planName: plan?.planName ?? null,
        sessionsRemaining: sessionsRemaining(plan)
      };
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

/** Can `viewer` see `studentId`'s profile? Admin: anyone. Tutor: their students.
 *  Student: only themselves. */
export async function canViewStudent(viewer: User, studentId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  if (viewer.role === "student") return viewer.id === studentId;
  if (viewer.role === "tutor") {
    const db = await readDb();
    return db.classes.some((c) => c.tutorId === viewer.id && c.studentIds.includes(studentId));
  }
  return false;
}
