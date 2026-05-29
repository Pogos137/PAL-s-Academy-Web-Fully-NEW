import { getPendingUsers } from "@/lib/store/admin";
import ApprovalRow from "@/components/admin/ApprovalRow";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const pending = await getPendingUsers();
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Portal approvals</h1>
      <p className="mt-1 text-sm text-ink-500">
        Accounts awaiting your approval before their portal unlocks.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((p) => (
              <ApprovalRow
                key={p.id}
                id={p.id}
                fullName={p.fullName}
                email={p.email}
                created={p.createdAt}
              />
            ))}
            {pending.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-400">
                  Nothing pending. Quiet inbox.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
