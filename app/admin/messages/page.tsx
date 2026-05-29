import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current";
import { buildThreadsForUser } from "@/lib/store/threads";
import MessagesInbox from "@/components/portal/MessagesInbox";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Messages",
  robots: { index: false, follow: false }
};

export default async function AdminMessagesPage({
  searchParams
}: {
  searchParams: { c?: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/admin/messages");
  if (user.role !== "admin") redirect("/portal");

  const threads = await buildThreadsForUser(user);

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Messages</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every class conversation across the academy. As admin you can read and post in any thread —
        students and tutors are notified you&rsquo;re part of the conversation.
      </p>

      <MessagesInbox
        threads={threads}
        currentUserId={user.id}
        initialActiveId={searchParams.c}
        isAdmin
      />
    </div>
  );
}
