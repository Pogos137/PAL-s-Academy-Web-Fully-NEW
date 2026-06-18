export type Role = "student" | "parent" | "tutor" | "admin";
export type PortalStatus = "pending" | "approved" | "rejected";

export type User = {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  role: Role;
  status: PortalStatus;
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  studentGrade?: string | null;
  subjects?: string | null;
  goals?: string | null;
  source?: string | null;
  createdAt: string;
};

export type TutorApplication = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  education?: string | null;
  university?: string | null;
  program?: string | null;
  subjects: string;
  gradeLevels?: string | null;
  yearsExperience?: number | null;
  availability?: string | null;
  linkedin?: string | null;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  status: "new" | "interviewing" | "hired" | "passed";
  createdAt: string;
};

export type ClassEntry = {
  id: string;
  subject: string;
  title: string;
  studentIds: string[];
  tutorId: string;
  schedule: string; // human-readable cadence, e.g. "Sundays · 7:00pm ET"
  meetUrl: string; // Google Meet link
  createdAt: string;
};

export type Assignment = {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: string; // ISO
  attachments?: string[];
  createdAt: string;
};

export type Submission = {
  id: string;
  assignmentId: string;
  studentId: string;
  note?: string;
  attachments?: string[];
  submittedAt: string;
};

export type Message = {
  id: string;
  classId: string;
  senderId: string;
  body: string;
  createdAt: string;
};

// ── PAL's Progress — the "Growth Hub" data ────────────────────────────────
// These power the portal features competitors don't offer: a course-code
// Mastery Map, a Confidence Pulse, Focus Requests, and a Win Wall.

export type MasteryStatus = "new" | "learning" | "practising" | "mastered";

/** One curriculum topic for a class, with the tutor's professional assessment
 *  of where the student stands. Ordered to read like a course outline. */
export type MasteryTopic = {
  id: string;
  classId: string;
  label: string; // e.g. "Equilibrium & Le Chatelier"
  unit?: string | null; // optional course-code/unit tag, e.g. "SCH4U · Unit 3"
  status: MasteryStatus;
  order: number;
  updatedBy: string; // userId
  updatedAt: string;
  createdAt: string;
};

/** A student's self-rated confidence (1–5) at a point in time. The trend over
 *  time is the headline metric — "rebuild confidence" made measurable. */
export type ConfidenceLog = {
  id: string;
  classId: string;
  studentId: string;
  rating: number; // 1..5
  note?: string | null;
  createdAt: string;
};

export type FocusStatus = "open" | "planned" | "addressed";

/** "Bring to your next session" — the student tells the tutor what to prep. */
export type FocusRequest = {
  id: string;
  classId: string;
  studentId: string;
  body: string;
  status: FocusStatus;
  createdAt: string;
  updatedAt: string;
};

/** A celebrated breakthrough on the Win Wall. */
export type Win = {
  id: string;
  classId: string;
  studentId?: string | null; // the student it's about (optional for group wins)
  body: string;
  addedBy: string; // userId
  createdAt: string;
};

/** A student's current billing plan and session balance. Powers the
 *  "sessions remaining" view on the admin student profile. (Demo values until
 *  a real billing system is wired in.) */
export type StudentPlan = {
  id: string;
  studentId: string;
  planName: string; // "Starter" | "Core" | "Intensive" | "PAL's Circle"
  monthlyPrice: number; // CAD
  sessionsPurchased: number; // for the current billing period
  sessionsUsed: number;
  periodStart: string; // ISO
  renewsOn: string; // ISO
};

export type Database = {
  users: User[];
  leads: Lead[];
  applications: TutorApplication[];
  classes: ClassEntry[];
  assignments: Assignment[];
  submissions: Submission[];
  messages: Message[];
  masteryTopics: MasteryTopic[];
  confidenceLogs: ConfidenceLog[];
  focusRequests: FocusRequest[];
  wins: Win[];
  studentPlans: StudentPlan[];
};
