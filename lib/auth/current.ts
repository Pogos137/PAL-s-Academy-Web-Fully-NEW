import { readDb } from "@/lib/store/db";
import { readSessionFromCookies } from "./session";
import type { User } from "@/lib/store/types";

export async function getCurrentUser(): Promise<User | null> {
  const session = readSessionFromCookies();
  if (!session) return null;
  const db = await readDb();
  const user = db.users.find((u) => u.id === session.userId);
  if (!user) return null;
  return user;
}

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || "palseduacademy@gmail.com").toLowerCase();
}

export function isAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === adminEmail();
}
