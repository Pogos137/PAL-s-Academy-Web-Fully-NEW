"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Users, ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import ClassMessages from "./ClassMessages";

type Msg = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  body: string;
  createdAt: string;
};

type Thread = {
  id: string; // classId — the conversation channel
  subject: string;
  title: string;
  participants: { id: string; fullName: string; role: string }[];
  messages: Msg[];
};

type Props = {
  threads: Thread[];
  currentUserId: string;
  initialActiveId?: string | null;
  /** Admin oversight view shows all class threads across the academy. */
  isAdmin?: boolean;
};

export default function MessagesInbox({
  threads,
  currentUserId,
  initialActiveId,
  isAdmin = false
}: Props) {
  const firstId =
    initialActiveId && threads.some((t) => t.id === initialActiveId)
      ? initialActiveId
      : threads[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(firstId);
  const [paneOpen, setPaneOpen] = useState(Boolean(initialActiveId)); // mobile: open straight into the deep-linked thread

  const active = threads.find((t) => t.id === activeId) || null;

  if (threads.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-ink-100 bg-ivory-50 p-10 text-center">
        <div className="mx-auto inline-flex rounded-2xl border border-gold-200 bg-gold-50 p-3 text-gold-600">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-serif text-2xl text-ink-800">No conversations yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
          Once an academy admin links you to a class, a private conversation with your tutor and
          the academy team will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[320px_1fr]">
      {/* Thread list */}
      <aside
        className={cn(
          "overflow-hidden rounded-2xl border border-ink-100 bg-ivory-50",
          paneOpen && "hidden lg:block"
        )}
      >
        <div className="border-b border-ink-100 px-5 py-4">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Conversations</div>
          <div className="mt-0.5 text-sm text-ink-600">
            {threads.length} class thread{threads.length === 1 ? "" : "s"}
          </div>
        </div>
        <ul className="divide-y divide-ink-100">
          {threads.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const who = last ? (last.senderId === currentUserId ? "You" : last.senderName) : null;
            const isActive = t.id === activeId;
            return (
              <li key={t.id}>
                <button
                  onClick={() => {
                    setActiveId(t.id);
                    setPaneOpen(true);
                  }}
                  className={cn(
                    "flex w-full items-start gap-3 px-5 py-4 text-left transition-colors",
                    isActive ? "bg-ink-900 text-ivory" : "hover:bg-ink-50"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-xl border p-2",
                      isActive
                        ? "border-ivory/20 bg-ivory/10 text-gold-300"
                        : "border-gold-200 bg-gold-50 text-gold-600"
                    )}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "truncate text-sm font-medium",
                        isActive ? "text-ivory" : "text-ink-800"
                      )}
                    >
                      {t.subject}
                    </div>
                    <div
                      className={cn(
                        "mt-0.5 truncate text-xs",
                        isActive ? "text-ivory/70" : "text-ink-500"
                      )}
                    >
                      {last ? (
                        <>
                          <span className={isActive ? "text-gold-300" : "text-ink-600"}>
                            {who}:
                          </span>{" "}
                          {last.body}
                        </>
                      ) : (
                        "No messages yet"
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Active conversation */}
      <section className={cn("min-w-0", !paneOpen && "hidden lg:block")}>
        {active ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-100 bg-ivory-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPaneOpen(false)}
                  className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-1 text-[11px] text-ink-600 lg:hidden"
                >
                  <ArrowLeft className="h-3 w-3" /> Back
                </button>
                <div>
                  <div className="font-serif text-lg text-ink-800">{active.subject}</div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-500">
                    <Users className="h-3 w-3 text-gold-600" />
                    {active.participants.map((p) => p.fullName).join(" · ")}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider2 text-ink-400">
                    <ShieldCheck className="h-3 w-3 text-gold-500" />
                    {isAdmin ? "Admin oversight" : "Admin is part of this conversation"}
                  </div>
                </div>
              </div>
              <Link
                href={`/portal/classes/${active.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
              >
                Open class <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-4">
              {/* key forces a clean remount (fresh history + scroll) when switching threads */}
              <ClassMessages
                key={active.id}
                classId={active.id}
                currentUserId={currentUserId}
                initial={active.messages}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-ink-100 bg-ivory-50 p-10 text-sm text-ink-500">
            Select a conversation to start.
          </div>
        )}
      </section>
    </div>
  );
}
