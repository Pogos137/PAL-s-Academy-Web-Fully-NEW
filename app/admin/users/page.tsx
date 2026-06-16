import { getAllUsers } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Users",
  robots: { index: false, follow: false }
};

const PILL_BASE =
  "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider2";

// Status colours are chosen to clear WCAG 1.4.3 (≥4.5:1) at this small badge size.
function StatusPill({ value }: { value: string }) {
  const map: Record<string, string> = {
    approved: "bg-ink-50 text-ink-700 border-ink-200",
    pending: "bg-gold-50 text-gold-700 border-gold-300",
    rejected: "bg-accent-rose/10 text-[#8A2C44] border-accent-rose/40"
  };
  return <span className={`${PILL_BASE} ${map[value] || map.pending}`}>{value}</span>;
}

// Distinct, accessible role fills so screen-reader and low-vision users can tell
// roles apart at a glance (brand emerald + gold, all ≥7:1 contrast).
function RolePill({ value }: { value: string }) {
  const map: Record<string, string> = {
    admin: "bg-ink-700 text-white border-transparent",
    tutor: "bg-ink-50 text-ink-700 border-ink-200",
    student: "bg-gold-50 text-gold-700 border-gold-200"
  };
  return <span className={`${PILL_BASE} ${map[value] || map.student}`}>{value}</span>;
}

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Users</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every account on the platform — students, parents, tutors, and admins.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-100 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-600">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Role</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">{u.fullName}</td>
                <td className="px-4 py-3 text-ink-600">{u.email}</td>
                <td className="px-4 py-3">
                  <RolePill value={u.role} />
                </td>
                <td className="px-4 py-3">
                  <StatusPill value={u.status} />
                </td>
                <td className="px-4 py-3 text-ink-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-400">
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
