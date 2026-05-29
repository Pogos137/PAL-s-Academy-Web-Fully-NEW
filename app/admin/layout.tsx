import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current";
import { ensureSeed } from "@/lib/store/seed";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await ensureSeed();
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?next=/admin");
  if (user.role !== "admin") redirect("/portal");

  return (
    <div className="min-h-[100svh] bg-ink-50 pt-20">
      <div className="container-luxe grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <AdminSidebar adminName={user.fullName} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
