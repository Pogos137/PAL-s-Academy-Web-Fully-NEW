import { readDb } from "./db";
import type { Assignment, ClassEntry, Message, Submission, User } from "./types";

/**
 * Classes visible to a given user:
 * - admin: all
 * - tutor: classes they teach
 * - student: classes they're enrolled in
 */
export async function classesForUser(user: User): Promise<ClassEntry[]> {
  const db = await readDb();
  if (user.role === "admin") return db.classes;
  if (user.role === "tutor") return db.classes.filter((c) => c.tutorId === user.id);
  return db.classes.filter((c) => c.studentIds.includes(user.id));
}

export async function canAccessClass(user: User, classId: string): Promise<boolean> {
  const db = await readDb();
  const cls = db.classes.find((c) => c.id === classId);
  if (!cls) return false;
  if (user.role === "admin") return true;
  if (user.role === "tutor") return cls.tutorId === user.id;
  return cls.studentIds.includes(user.id);
}

export async function classBundle(classId: string): Promise<{
  cls: ClassEntry | null;
  assignments: Assignment[];
  messages: Message[];
  submissions: Submission[];
  participants: Pick<User, "id" | "fullName" | "email" | "role">[];
}> {
  const db = await readDb();
  const cls = db.classes.find((c) => c.id === classId) || null;
  if (!cls) {
    return { cls: null, assignments: [], messages: [], submissions: [], participants: [] };
  }
  const assignments = db.assignments
    .filter((a) => a.classId === classId)
    .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
  const messages = db.messages
    .filter((m) => m.classId === classId)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
  const assignmentIds = new Set(assignments.map((a) => a.id));
  const submissions = db.submissions.filter((s) => assignmentIds.has(s.assignmentId));
  const participantIds = new Set([cls.tutorId, ...cls.studentIds]);
  const participants = db.users
    .filter((u) => participantIds.has(u.id))
    .map((u) => ({ id: u.id, fullName: u.fullName, email: u.email, role: u.role }));
  return { cls, assignments, messages, submissions, participants };
}

export async function userById(id: string): Promise<User | null> {
  const db = await readDb();
  return db.users.find((u) => u.id === id) || null;
}
