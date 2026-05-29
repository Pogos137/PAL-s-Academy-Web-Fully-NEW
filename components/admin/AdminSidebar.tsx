"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mailbox,
  MessageSquare,
  Users,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/enrollment", label: "Enrollment", icon: GraduationCap },
  { href: "/admin/classes", label: "Classes", icon: CalendarDays },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/approvals", label: "Approvals", icon: UserCheck },
  { href: "/admin/leads", label: "Leads", icon: Mailbox },
  { href: "/admin/applications", label: "Applications", icon: Briefcase }
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [out, setOut] = useState(false);

  async function signOut() {
    setOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-ink-100 bg-white p-5">
        <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Admin console</div>
        <div className="mt-2 truncate font-serif text-lg text-ink-800">{adminName}</div>
        <div className="mt-2 inline-flex rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 text-ink-500">
          Full access
        </div>
      </div>

      <nav className="mt-4 rounded-2xl border border-ink-100 bg-white p-2">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-ink-900 text-ivory" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={signOut}
        disabled={out}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 px-4 py-2.5 text-sm text-ink-700 transition-colors hover:border-gold-300 hover:text-ink-900 disabled:opacity-50"
      >
        <LogOut className="h-4 w-4" /> {out ? "Signing out…" : "Sign out"}
      </button>
    </aside>
  );
}
