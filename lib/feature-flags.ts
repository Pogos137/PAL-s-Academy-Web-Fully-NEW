/**
 * Site-wide feature flags.
 *
 * Keep these as plain module-level constants, not env vars: middleware.ts reads
 * PORTAL_ENABLED on the Edge runtime, and a literal keeps the flag in version
 * control where a rollback is a one-line diff rather than a dashboard change.
 */

/**
 * The student portal kill switch. Owner turned this off 2026-09-12.
 *
 * NOTHING was deleted. The whole surface is still in the repo and still builds:
 *   app/portal/*        the student + parent portal pages
 *   app/admin/*         the admin console
 *   app/auth/*          login / signup screens
 *   app/api/auth/*      session endpoints
 *   components/portal/*, components/admin/*, lib/store/*, lib/auth/*
 *
 * While this is false:
 *   - Header drops the "Student Login" button (desktop + mobile menu)
 *   - Footer drops the "Student portal" and "Create account" links
 *   - middleware serves a 404 for /portal, /admin, /auth and /api/auth, so the
 *     routes are unreachable even by direct URL or an old bookmark
 *
 * To bring it back: set this to true, commit, push. That is the entire job —
 * no other file needs to change.
 */
export const PORTAL_ENABLED = false;
