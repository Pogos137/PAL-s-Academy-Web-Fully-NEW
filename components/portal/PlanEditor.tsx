"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Pencil, Wallet, X } from "lucide-react";

type Plan = {
  planName: string;
  monthlyPrice: number;
  sessionsPurchased: number;
  sessionsRemaining: number;
  renewsOn: string | null;
} | null;

const PRESETS = [
  { name: "Starter", price: 200, sessions: 4 },
  { name: "Core", price: 360, sessions: 8 },
  { name: "Intensive", price: 480, sessions: 12 },
  { name: "PAL's Circle", price: 120, sessions: 4 }
];

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

export default function PlanEditor({ studentId, initial }: { studentId: string; initial: Plan }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [planName, setPlanName] = useState(initial?.planName ?? "Core");
  const [monthlyPrice, setMonthlyPrice] = useState(String(initial?.monthlyPrice ?? 360));
  const [purchased, setPurchased] = useState(String(initial?.sessionsPurchased ?? 8));
  const [remaining, setRemaining] = useState(String(initial?.sessionsRemaining ?? 8));

  const remNum = Math.max(0, parseInt(remaining || "0", 10) || 0);
  const purNum = Math.max(0, parseInt(purchased || "0", 10) || 0);
  const usedNum = Math.max(0, purNum - remNum);

  function applyPreset(p: (typeof PRESETS)[number]) {
    setPlanName(p.name);
    setMonthlyPrice(String(p.price));
    setPurchased(String(p.sessions));
    setRemaining(String(p.sessions));
  }

  async function save() {
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/portal/students/${studentId}/plan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: planName.trim(),
          monthlyPrice: parseInt(monthlyPrice || "0", 10) || 0,
          sessionsPurchased: purNum,
          sessionsRemaining: remNum
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setEditing(false);
      router.refresh();
    } catch (e: any) {
      setErr(e.message || "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  const usagePct = purNum > 0 ? Math.round((usedNum / purNum) * 100) : 0;

  if (!editing) {
    return (
      <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory-50 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
            <Wallet className="h-3.5 w-3.5" /> Plan &amp; sessions
          </div>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] uppercase tracking-wider2 text-ink-700 transition-colors hover:border-gold-400"
          >
            <Pencil className="h-3 w-3" /> Edit
          </button>
        </div>
        {initial ? (
          <>
            <div className="mt-2 font-serif text-2xl text-ink-800">{initial.planName}</div>
            <div className="text-xs text-ink-500">
              ${initial.monthlyPrice}/mo · renews {fmtDate(initial.renewsOn)}
            </div>
            <div className="mt-3 text-sm text-ink-700">
              <span className="font-serif text-2xl text-ink-800">{initial.sessionsRemaining}</span> of{" "}
              {initial.sessionsPurchased} sessions left
            </div>
          </>
        ) : (
          <div className="mt-2 text-sm text-ink-600">
            No plan on file yet. Click <span className="font-medium text-ink-800">Edit</span> to set
            sessions paid for.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold-300 bg-ivory-50 p-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-600">
        <Wallet className="h-3.5 w-3.5" /> Edit plan &amp; sessions
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => applyPreset(p)}
            className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[11px] text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider2 text-ink-500">Plan name</span>
          <input
            className="input-luxe mt-1 w-full"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider2 text-ink-500">Monthly price (CAD)</span>
          <input
            type="number"
            min={0}
            className="input-luxe mt-1 w-full"
            value={monthlyPrice}
            onChange={(e) => setMonthlyPrice(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider2 text-ink-500">Sessions paid for</span>
          <input
            type="number"
            min={0}
            className="input-luxe mt-1 w-full"
            value={purchased}
            onChange={(e) => setPurchased(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wider2 text-ink-500">Sessions remaining</span>
          <input
            type="number"
            min={0}
            className="input-luxe mt-1 w-full"
            value={remaining}
            onChange={(e) => setRemaining(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-3 text-xs text-ink-500">
        {usedNum} used · {remNum} left of {purNum} paid
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500" style={{ width: `${usagePct}%` }} />
        </div>
      </div>

      {err && <div className="mt-3 text-sm text-accent-rose">{err}</div>}

      <div className="mt-4 flex gap-2">
        <button onClick={save} disabled={saving} className="btn btn-gold flex-1">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4" /> Save</>}
        </button>
        <button
          onClick={() => {
            setEditing(false);
            setErr(null);
          }}
          disabled={saving}
          className="btn btn-ghost"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
    </div>
  );
}
