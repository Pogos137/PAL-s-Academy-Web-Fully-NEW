import { getAllApplications } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tutor applications",
  robots: { index: false, follow: false }
};

export default async function ApplicationsPage() {
  const apps = await getAllApplications();
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Tutor applications</h1>
      <p className="mt-1 text-sm text-ink-500">Roster pipeline, newest first.</p>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-100 bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-ink-50 text-left text-[10px] uppercase tracking-wider2 text-ink-600">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Subjects</th>
              <th scope="col" className="px-4 py-3">Grades</th>
              <th scope="col" className="px-4 py-3">Exp</th>
              <th scope="col" className="px-4 py-3">Education</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id} className="border-t border-ink-100 align-top">
                <td className="px-4 py-3 font-medium text-ink-800">{a.name}</td>
                <td className="px-4 py-3 text-ink-600">{a.email}</td>
                <td className="px-4 py-3 text-ink-600">{a.subjects || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{a.gradeLevels || "—"}</td>
                <td className="px-4 py-3 text-ink-600">{a.yearsExperience ?? "—"}</td>
                <td className="px-4 py-3 text-ink-600">
                  {[a.education, a.university, a.program].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3 text-ink-600">{a.status}</td>
                <td className="px-4 py-3 text-ink-500">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-400">
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
