"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

export default function SimulateButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/simulate", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMsg(
        `Added ${data.messages} message${data.messages === 1 ? "" : "s"} and ${
          data.completions
        } completion${data.completions === 1 ? "" : "s"} across the cohort.`
      );
      router.refresh();
    } catch (e: any) {
      setMsg(e.message || "Could not simulate");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button onClick={run} disabled={busy} className="btn btn-gold">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Simulate bot activity
      </button>
      {msg && <p className="mt-3 text-xs text-ink-600">{msg}</p>}
    </div>
  );
}
