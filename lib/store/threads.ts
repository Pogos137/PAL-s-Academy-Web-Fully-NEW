import { readDb } from "./db";
import { classesForUser } from "./queries";
import type { User } from "./types";

export type ThreadMsg = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  body: string;
  createdAt: string;
};

export type Thread = {
  id: string; // classId — the conversation channel
  subject: string;
  title: string;
  participants: { id: string; fullName: string; role: string }[];
  messages: ThreadMsg[];
};

/**
 * Build one conversation thread per class the user can see:
 * - student → classes they're enrolled in
 * - tutor   → classes they teach
 * - admin   → every class (oversight)
 *
 * Every academy admin is added to the participant list so the conversation
 * visibly includes admin (legal/privacy), even before they post.
 */
export async function buildThreadsForUser(user: User): Promise<Thread[]> {
  const [classes, db] = await Promise.all([classesForUser(user), readDb()]);
  const admins = db.users.filter((u) => u.role === "admin");

  return classes
    .map((c) => {
      const participantIds = new Set<string>([
        c.tutorId,
        ...c.studentIds,
        ...admins.map((a) => a.id)
      ]);
      const participants = db.users
        .filter((u) => participantIds.has(u.id))
        // tutor first, then students, then admins
        .sort((a, b) => roleRank(a.role) - roleRank(b.role))
        .map((u) => ({ id: u.id, fullName: u.fullName, role: u.role }));

      const messages = db.messages
        .filter((m) => m.classId === c.id)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
        .map((m) => {
          const sender = db.users.find((u) => u.id === m.senderId);
          return {
            id: m.id,
            senderId: m.senderId,
            senderName: sender?.fullName || "Member",
            senderRole: sender?.role || "member",
            body: m.body,
            createdAt: m.createdAt
          };
        });

      return {
        id: c.id,
        subject: c.subject,
        title: c.title,
        participants,
        messages,
        _lastAt: messages.length ? +new Date(messages[messages.length - 1].createdAt) : 0
      };
    })
    // Most recently active conversations first.
    .sort((a, b) => b._lastAt - a._lastAt)
    .map(({ _lastAt, ...t }) => t);
}

function roleRank(role: string) {
  return role === "tutor" ? 0 : role === "student" ? 1 : 2;
}
