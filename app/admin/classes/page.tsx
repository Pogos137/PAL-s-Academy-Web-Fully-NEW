import Link from "next/link";
import { Video } from "lucide-react";
import { getAllClasses } from "@/lib/store/admin";

export const dynamic = "force-dynamic";

export default async function AdminClassesPage() {
  const classes = await getAllClasses();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800">Classes</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every active class, its tutor, enrolled students, and Google Meet link.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {classes.map((c) => (
          <div key={c.id} className="rounded-2xl border border-ink-100 bg-white p-6">
            <div className="text-[10px] uppercase tracking-wider2 text-gold-600">
              {c.schedule}
            </div>
            <div className="mt-2 font-serif text-2xl text-ink-800">{c.subject}</div>
            <div className="mt-1 text-sm text-ink-600">{c.title}</div>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-ink-400">Tutor</dt>
                <dd className="text-ink-700">{c.tutorName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-ink-400">Students</dt>
                <dd className="text-ink-700">
                  {c.studentNames.length ? c.studentNames.join(", ") : "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex gap-2">
              <Link href={`/portal/classes/${c.id}`} className="btn btn-ink">
                Open class
              </Link>
              <a
                href={c.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Video className="h-4 w-4" /> Meet
              </a>
            </div>
          </div>
        ))}
        {classes.length === 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white p-8 text-sm text-ink-500">
            No classes created yet.
          </div>
        )}
      </div>
    </div>
  );
}
