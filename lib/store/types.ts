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

export type Database = {
  users: User[];
  leads: Lead[];
  applications: TutorApplication[];
  classes: ClassEntry[];
  assignments: Assignment[];
  submissions: Submission[];
  messages: Message[];
};
