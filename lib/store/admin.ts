import { readDb } from "./db";
import type { Lead, TutorApplication, User, ClassEntry } from "./types";

export async function getAdminSnapshot() {
  const db = await readDb();
  const students = db.users.filter((u) => u.role === "student");
  const tutors = db.users.filter((u) => u.role === "tutor");
  const pending = db.users.filter((u) => u.status === "pending");
  return {
    users: db.users,
    students,
    tutors,
    pending,
    leads: [...db.leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    applications: [...db.applications].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    ),
    classes: db.classes,
    assignments: db.assignments,
    messages: db.messages
  };
}

export async function getAllLeads(): Promise<Lead[]> {
  const db = await readDb();
  return [...db.leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getAllApplications(): Promise<TutorApplication[]> {
  const db = await readDb();
  return [...db.applications].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getPendingUsers(): Promise<User[]> {
  const db = await readDb();
  return db.users
    .filter((u) => u.status === "pending")
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getAllUsers(): Promise<User[]> {
  const db = await readDb();
  return [...db.users].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getAllClasses(): Promise<
  (ClassEntry & { tutorName: string; studentNames: string[] })[]
> {
  const db = await readDb();
  const nameOf = (id: string) => db.users.find((u) => u.id === id)?.fullName || "—";
  return db.classes.map((c) => ({
    ...c,
    tutorName: nameOf(c.tutorId),
    studentNames: c.studentIds.map(nameOf)
  }));
}
