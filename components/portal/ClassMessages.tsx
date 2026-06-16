"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  body: string;
  createdAt: string;
};

type Props = {
  classId: string;
  currentUserId: string;
  initial: Msg[];
};

function fmtTime(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  if (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  ) {
    return d.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" });
  }
  return d.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export default function ClassMessages({ classId, currentUserId, initial }: Props) {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/classes/${classId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: trimmed })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");
      // Optimistically add — we don't have senderName from the API, so build it from
      // the existing list's tutor/student name when possible, else fallback to "You".
      setMessages((prev) => [
        ...prev,
        {
          id: data.message.id,
          senderId: data.message.senderId,
          senderName: "You",
          senderRole: "self",
          body: data.message.body,
          createdAt: data.message.createdAt
        }
      ]);
      setBody("");
    } catch (e: any) {
      setErr(e.message || "Could not send");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[520px] flex-col rounded-2xl border border-ink-100 bg-ivory-50">
      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-ink-500">
            No messages yet. Say hi to your tutor.
          </div>
        ) : (
          messages.map((m) => {
            const mine = m.senderId === currentUserId;
            return (
              <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    mine
                      ? "bg-ink-900 text-ivory"
                      : "border border-ink-100 bg-white text-ink-800"
                  )}
                >
                  {!mine && (
                    <div className="mb-1 text-[10px] uppercase tracking-wider2 text-gold-600">
                      {m.senderName} · {m.senderRole}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap leading-relaxed">{m.body}</div>
                  <div
                    className={cn(
                      "mt-1 text-[10px]",
                      mine ? "text-ivory/50" : "text-ink-400"
                    )}
                  >
                    {fmtTime(m.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t border-ink-100 p-3"
      >
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message…"
          aria-label="Write a message to this class"
          className="input-luxe flex-1"
          disabled={sending}
        />
        <button
          type="submit"
          aria-label="Send message"
          className="btn btn-ink"
          disabled={sending || !body.trim()}
        >
          {sending ? (
            <Loader2 aria-hidden="true" focusable="false" className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" focusable="false" className="h-4 w-4" />
          )}
        </button>
      </form>
      {err && <div className="px-4 pb-3 text-xs text-accent-rose">{err}</div>}
    </div>
  );
}
