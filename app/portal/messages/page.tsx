import Link from "next/link";
import { redirect } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { classesForUser } from "@/lib/store/queries";
import { readDb } from "@/lib/store/db";
import PortalShell from "@/components/portal/PortalShell";

export const metadata = {
  title: "Messages",
  robots: { index: false, follow: false }
};

export default async function MessagesPage() {
  await ensureSeed();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal/messages");
  if (user.role === "admin") redirect("/admin");
  if (user.status !== "approved") redirect("/portal/pending");

  const classes = await classesForUser(user);
  const db = await readDb();

  const threads = classes.map((c) => {
    const msgs = db.messages
      .filter((m) => m.classId === c.id)
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    const last = msgs[0];
    const senderName = last
      ? db.users.find((u) => u.id === last.senderId)?.fullName || "Member"
      : null;
    return { cls: c, last, senderName, count: msgs.length };
  });

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <h1 className="font-serif text-4xl text-ink-800">Messages</h1>
        <p className="mt-2 text-sm text-ink-600">
          Every class has its own private thread. Pick one to continue the conversation.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-ivory-50">
          {threads.length === 0 ? (
            <div className="p-8 text-sm text-ink-600">
              No classes yet — no threads to show.
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {threads.map(({ cls, last, senderName, count }) => (
                <li key={cls.id}>
                  <Link
                    href={`/portal/classes/${cls.id}`}
                    className="flex items-start gap-4 p-5 transition-colors hover:bg-ink-50"
                  >
                    <div className="rounded-xl border border-gold-200 bg-gold-50 p-2.5 text-gold-600">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-ink-800">{cls.subject}</div>
                      {last ? (
                        <div className="mt-1 truncate text-sm text-ink-600">
                          <span className="text-ink-500">{senderName}:</span> {last.body}
                        </div>
                      ) : (
                        <div className="mt-1 text-sm text-ink-400">No messages yet</div>
                      )}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider2 text-ink-400">
                      {count} msg{count === 1 ? "" : "s"}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
