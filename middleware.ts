import { NextResponse, type NextRequest } from "next/server";
import { verifySessionEdge, SESSION_COOKIE } from "@/lib/auth/session-edge";
import { PORTAL_ENABLED } from "@/lib/feature-flags";

const ADMIN_PATHS = ["/admin"];
const PORTAL_PATHS = ["/portal"];

// Every route that only exists to serve the portal. When PORTAL_ENABLED is
// false these are answered with a 404 so the surface is unreachable by direct
// URL, an old bookmark, or a stale session cookie.
const PORTAL_ONLY_PATHS = ["/portal", "/admin", "/auth", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!PORTAL_ENABLED && PORTAL_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
    // Rewriting to a private (underscore-prefixed) path can never match an app
    // route, so Next renders app/not-found.tsx with a real 404 status.
    return NextResponse.rewrite(new URL("/_portal-disabled", request.url));
  }

  const isAdmin = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isPortal = PORTAL_PATHS.some((p) => pathname.startsWith(p));
  if (!isAdmin && !isPortal) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionEdge(token);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdmin && session.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// The matcher is statically analysed at build time, so it cannot depend on the
// flag. It always covers the portal surface; when PORTAL_ENABLED is true the
// /auth and /api/auth requests simply fall through to NextResponse.next().
export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/auth/:path*", "/api/auth/:path*"]
};
