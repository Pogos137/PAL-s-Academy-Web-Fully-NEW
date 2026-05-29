import { getAllUsers } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

function StatusPill({ value }: { value: string }) {
  const map: Record<string, string> = {
    approved: "bg-accent-sage/10 text-accent-sage border-accent-sage/40",
    pending: "bg-gold-50 text-gold-700 border-gold-300",
    rejected: "bg-accent-rose/10 text-accent-rose border-accent-rose/40"
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 ${
        map[value] || map.pending
      }`}
    >
      {value}
    </span>
  );
}

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Users</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every account on the platform — students, parents, tutors, and admins.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-ink-100">
                <td className="px-4 py-3 font-medium text-ink-800">{u.fullName}</td>
                <td className="px-4 py-3 text-ink-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-ink-100 bg-ink-50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider2 text-ink-500">
                    {u.role}
                  </span>
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
