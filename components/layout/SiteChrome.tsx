"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Decides whether the public marketing chrome (top nav + footer) should render.
 *
 * The portal (/portal) and admin console (/admin) are a *completely separate*
 * product surface — they have their own top bar + sidebar and must NOT show the
 * marketing navigation or the marketing footer. Everything else (home, pricing,
 * subjects, auth, legal pages, …) gets the full marketing chrome.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isAppSurface =
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isAppSurface) {
    // The portal/admin layouts render their own top bar — no marketing chrome.
    return <main className="relative">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
}
