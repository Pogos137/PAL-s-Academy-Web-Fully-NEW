import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import { classesForUser } from "@/lib/store/queries";
import { buildThreadsForUser } from "@/lib/store/threads";
import PortalShell from "@/components/portal/PortalShell";
import MessagesInbox from "@/components/portal/MessagesInbox";

export const metadata = {
  title: "Messages",
  robots: { index: false, follow: false }
};

export default async function MessagesPage({
  searchParams
}: {
  searchParams: { c?: string };
}) {
  await ensureSeed();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/portal/messages");
  if (user.status !== "approved" && user.role !== "admin") redirect("/portal/pending");

  const [threads, classes] = await Promise.all([
    buildThreadsForUser(user),
    classesForUser(user)
  ]);

  const isAdmin = user.role === "admin";
  const canViewProfiles = isAdmin || user.role === "tutor";

  return (
    <PortalShell
      user={{ fullName: user.fullName, email: user.email, role: user.role }}
      classes={classes.map((c) => ({ id: c.id, subject: c.subject, title: c.title }))}
    >
      <div>
        <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Inbox</div>
        <h1 className="mt-1 font-serif text-4xl text-ink-800">Messages</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-600">
          {isAdmin
            ? "Every class conversation across the academy, in one place. You're part of each thread for safety — open any conversation to read or reply."
            : user.role === "tutor"
            ? "A private conversation for each class you teach. Message students directly — an academy admin is part of every thread."
            : "A private conversation for each of your classes. Reach your tutor directly — they and an academy admin will see your messages and reply right here."}
        </p>

        <MessagesInbox
          threads={threads}
          currentUserId={user.id}
          initialActiveId={searchParams.c}
          isAdmin={isAdmin}
          canViewProfiles={canViewProfiles}
        />
      </div>
    </PortalShell>
  );
}
