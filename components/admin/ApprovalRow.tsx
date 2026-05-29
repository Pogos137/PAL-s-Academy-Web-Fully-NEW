"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

type Props = {
  id: string;
  email: string;
  fullName: string | null;
  created: string;
};

export default function ApprovalRow({ id, email, fullName, created }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "reject" | null>(null);

  async function act(action: "approve" | "reject") {
    setBusy(action);
    try {
      await fetch(`/api/admin/approvals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action })
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <tr className="border-t border-ink-100">
      <td className="px-4 py-3 font-medium text-ink-800">{fullName || "—"}</td>
      <td className="px-4 py-3 text-ink-600">{email}</td>
      <td className="px-4 py-3 text-ink-500">{new Date(created).toLocaleString()}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => act("approve")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1 rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-xs font-medium text-ink-800 transition-colors hover:bg-gold-100 disabled:opacity-50"
          >
            {busy === "approve" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
            Approve
          </button>
          <button
            onClick={() => act("reject")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-3 py-1 text-xs text-ink-600 transition-colors hover:bg-ink-50 disabled:opacity-50"
          >
            {busy === "reject" ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}
