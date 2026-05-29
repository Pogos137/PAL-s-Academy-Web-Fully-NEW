import { getAllLeads } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getAllLeads();
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Leads</h1>
      <p className="mt-1 text-sm text-ink-500">Every consultation request, newest first.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Subjects</th>
              <th className="px-4 py-3">Goals</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-ink-100 align-top">
                <td className="px-4 py-3 font-medium text-ink-800">{l.name}</td>
                <td className="px-4 py-3 text-ink-600">{l.email}</td>
                <td className="px-4 py-3 text-ink-600">{l.phone || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.studentGrade || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.subjects || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.goals || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{l.source || "—"}</td>
                <td className="px-4 py-3 text-ink-500">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-400">
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
