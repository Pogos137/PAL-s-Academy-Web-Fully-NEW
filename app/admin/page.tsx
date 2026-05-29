import Link from "next/link";
import { getAdminSnapshot } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const snap = await getAdminSnapshot();

  const stats = [
    { label: "Total users", value: snap.users.length, href: "/admin/users" },
    { label: "Pending approvals", value: snap.pending.length, href: "/admin/approvals" },
    { label: "Active classes", value: snap.classes.length, href: "/admin/classes" },
    { label: "Leads", value: snap.leads.length, href: "/admin/leads" },
    { label: "Tutor applications", value: snap.applications.length, href: "/admin/applications" },
    { label: "Messages exchanged", value: snap.messages.length, href: "/admin/classes" }
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Overview</h1>
      <p className="mt-1 text-sm text-ink-500">
        Everything across the platform, at a glance. You have full access.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:border-gold-300 hover:shadow-luxe"
          >
            <div className="text-[10px] uppercase tracking-wider2 text-ink-400">{s.label}</div>
            <div className="mt-2 font-serif text-4xl text-ink-800">{s.value}</div>
            <div className="mt-4 text-xs text-gold-600 transition-transform group-hover:translate-x-1">
              View →
            </div>
          </Link>
        ))}
      </div>

      {/* Pending approvals callout */}
      {snap.pending.length > 0 && (
        <div className="mt-10 rounded-2xl border border-gold-300 bg-gold-50 p-6">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-700">
            Needs your attention
          </div>
          <div className="mt-1 font-serif text-xl text-ink-800">
            {snap.pending.length} account{snap.pending.length === 1 ? "" : "s"} waiting for approval
          </div>
          <Link href="/admin/approvals" className="btn btn-gold mt-4">
            Review approvals
          </Link>
        </div>
      )}

      {/* Recent leads */}
      <h2 className="mt-12 font-serif text-2xl text-ink-800">Recent leads</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Subjects</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {snap.leads.slice(0, 6).map((l) => (
              <tr key={l.id} className="border-t border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">{l.name}</td>
                <td className="px-4 py-3 text-ink-600">{l.studentGrade || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.subjects || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.source || "—"}</td>
                <td className="px-4 py-3 text-ink-500">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {snap.leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-400">
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
