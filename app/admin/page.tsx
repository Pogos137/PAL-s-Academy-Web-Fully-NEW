import Link from "next/link";
import { getAdminSnapshot } from "@/lib/store/admin";
import { BOT_PASSWORD } from "@/lib/store/seed";
import SimulateButton from "@/components/admin/SimulateButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Overview",
  robots: { index: false, follow: false }
};

export default async function AdminOverview() {
  const snap = await getAdminSnapshot();

  const stats = [
    { label: "Total users", value: snap.users.length, href: "/admin/users" },
    { label: "Pending approvals", value: snap.pending.length, href: "/admin/approvals" },
    { label: "Active classes", value: snap.classes.length, href: "/admin/enrollment" },
    { label: "Leads", value: snap.leads.length, href: "/admin/leads" },
    { label: "Tutor applications", value: snap.applications.length, href: "/admin/applications" },
    { label: "Messages exchanged", value: snap.messages.length, href: "/admin/messages" }
  ];

  const sampleBots = snap.users
    .filter((u) => u.email.endsWith("@palsacademy.bot"))
    .slice(0, 3);

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
            aria-label={`View ${s.label.toLowerCase()}`}
            className="group rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:border-gold-300 hover:shadow-luxe"
          >
            <div className="text-[10px] uppercase tracking-wider2 text-ink-600">{s.label}</div>
            <div className="mt-2 font-serif text-4xl text-ink-800">{s.value}</div>
            <div className="mt-4 text-xs text-gold-600 transition-transform group-hover:translate-x-1">
              View <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Test-run / bots */}
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-600">Test-run</div>
          <div className="mt-1 font-serif text-xl text-ink-800">Bring the platform to life</div>
          <p className="mt-2 text-sm text-ink-600">
            The academy is seeded with demo tutors, students, and courses. Run a simulation to post
            new messages and mark assignments complete — then watch it land in{" "}
            <Link href="/admin/messages" className="text-ink-800 underline decoration-gold-400">
              Messages
            </Link>{" "}
            and on each course page.
          </p>
          <div className="mt-4">
            <SimulateButton />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-6">
          <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
            Sign in as a demo account
          </div>
          <div className="mt-1 font-serif text-xl text-ink-800">Test student &amp; tutor views</div>
          <p className="mt-2 text-sm text-ink-600">
            Every seeded account uses the password{" "}
            <code className="rounded bg-ink-50 px-1.5 py-0.5 text-xs text-ink-800">
              {BOT_PASSWORD}
            </code>
            . Sign out and log in as any of these to see their portal:
          </p>
          <ul className="mt-3 space-y-1 text-xs text-ink-600">
            {sampleBots.map((b) => (
              <li key={b.id}>
                <span className="text-ink-800">{b.fullName}</span> · {b.email}
              </li>
            ))}
            {sampleBots.length === 0 && <li>Demo accounts will appear after first load.</li>}
          </ul>
          <Link href="/admin/users" className="mt-3 inline-block text-xs text-gold-600 hover:text-gold-700">
            See all accounts →
          </Link>
        </div>
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
      <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-100 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-600">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Grade</th>
              <th scope="col" className="px-4 py-3">Subjects</th>
              <th scope="col" className="px-4 py-3">Source</th>
              <th scope="col" className="px-4 py-3">When</th>
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
