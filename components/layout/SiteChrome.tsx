"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { PORTAL_ENABLED } from "@/lib/feature-flags";

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
  const isPortalPath =
    pathname === "/portal" ||
    pathname.startsWith("/portal/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  // With the portal switched off, middleware rewrites these paths to a 404.
  // usePathname still reports the requested URL, so without this guard the
  // 404 would render bare — no nav, no footer, no way back to the site.
  const isAppSurface = PORTAL_ENABLED && isPortalPath;

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
