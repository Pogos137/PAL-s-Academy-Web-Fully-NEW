"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BookOpenCheck,
  CalendarClock,
  GraduationCap,
  LogOut,
  MessageSquare,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: { fullName: string; email: string; role: string };
  classes: { id: string; subject: string; title: string }[];
  children: React.ReactNode;
};

const navItems = [
  { href: "/portal", label: "Dashboard", icon: GraduationCap, exact: true },
  { href: "/portal/calendar", label: "Calendar", icon: CalendarClock },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare }
];

export default function PortalShell({ user, classes, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  async function signOut() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <div className="relative min-h-[100svh] bg-ivory pt-20 text-ink-800">
      <div className="container-luxe grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink-100 bg-ivory-50 p-5">
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
              Signed in
            </div>
            <div className="mt-2 truncate font-serif text-lg text-ink-800">
              {user.fullName}
            </div>
            <div className="truncate text-xs text-ink-500">{user.email}</div>
            <div className="mt-3 inline-flex rounded-full border border-ink-100 bg-white px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 text-ink-500">
              {user.role}
            </div>
          </div>

          <nav className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-ink-900 text-ivory"
                      : "text-ink-700 hover:bg-ink-50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-ink-100 bg-ivory-50 p-3">
            <div className="px-2 pb-2 pt-1 text-[10px] uppercase tracking-wider2 text-gold-600">
              Classes
            </div>
            {classes.length === 0 ? (
              <div className="px-2 pb-2 text-xs text-ink-500">
                No classes yet. Your tutor will add you after the consultation.
              </div>
            ) : (
              <ul className="space-y-1">
                {classes.map((c) => {
                  const active = pathname?.startsWith(`/portal/classes/${c.id}`);
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/portal/classes/${c.id}`}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-gold-50 text-ink-900"
                            : "text-ink-700 hover:bg-ink-50"
                        )}
                      >
                        <div className="truncate font-medium">{c.subject}</div>
                        <div className="truncate text-xs text-ink-500">{c.title}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            onClick={signOut}
            disabled={loggingOut}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm text-ink-700 transition-colors hover:border-gold-300 hover:text-ink-900 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" /> {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

const STAT_ICONS = {
  classes: BookOpenCheck,
  assignments: CalendarClock,
  session: Video
} as const;

export function ClassQuickStat({
  icon,
  label,
  value
}: {
  icon: keyof typeof STAT_ICONS;
  label: string;
  value: string;
}) {
  const Icon = STAT_ICONS[icon];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ivory-50 p-5">
      <div className="rounded-xl border border-gold-200 bg-gold-50 p-2.5 text-gold-600">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider2 text-ink-500">{label}</div>
        <div className="text-sm font-medium text-ink-800">{value}</div>
      </div>
    </div>
  );
}
