import { NextResponse, type NextRequest } from "next/server";
import { verifySessionEdge, SESSION_COOKIE } from "@/lib/auth/session-edge";

const ADMIN_PATHS = ["/admin"];
const PORTAL_PATHS = ["/portal"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"]
};
