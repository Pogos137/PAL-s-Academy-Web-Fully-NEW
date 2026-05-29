"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, ShieldCheck } from "lucide-react";

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "same-origin"
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch {}
  return { ok: res.ok, status: res.status, data };
}

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const nextUrl = params.get("next");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    const { ok, data } = await postJson("/api/auth/login", { email, password });
    if (!ok) {
      setStatus("error");
      setErr(data.error || "Sign-in failed. Try again.");
      return;
    }

    const dest = nextUrl || data.next || "/portal";
    router.push(dest);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-300">
        <Lock className="h-3.5 w-3.5" /> Members area
      </div>
      <h1 className="mt-3 font-serif text-3xl text-ivory">Welcome back.</h1>
      <p className="mt-2 text-sm text-ink-200">
        Sign in to your PAL&rsquo;s Academy portal.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <input className="input-dark" type="email" name="email" required placeholder="Email" />
        <input
          className="input-dark"
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        {err && <div className="text-sm text-accent-rose">{err}</div>}
        <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-ink-200">
        Need access?{" "}
        <Link href="/auth/signup" className="text-gold-300 hover:text-gold-200">
          Request an account
        </Link>
      </div>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("full_name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");

    const { ok, data } = await postJson("/api/auth/signup", {
      fullName,
      email,
      password
    });

    if (!ok) {
      setStatus("error");
      setErr(data.error || "We couldn't create your account. Try again.");
      return;
    }

    router.push(data.next || "/portal/pending");
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-gold-300">
        <ShieldCheck className="h-3.5 w-3.5" /> Request access
      </div>
      <h1 className="mt-3 font-serif text-3xl text-ivory">Create your portal account.</h1>
      <p className="mt-2 text-sm text-ink-200">
        Admin approval required before your portal opens. We&rsquo;re intentionally small.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <input className="input-dark" name="full_name" required placeholder="Full name" />
        <input className="input-dark" type="email" name="email" required placeholder="Email" />
        <input
          className="input-dark"
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Password (8+ characters)"
        />
        {err && <div className="text-sm text-accent-rose">{err}</div>}
        <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Request access"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-ink-200">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-gold-300 hover:text-gold-200">
          Sign in
        </Link>
      </div>
    </div>
  );
}
