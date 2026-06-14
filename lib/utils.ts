import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// The single source of truth for the site's public origin.
// In local dev, .env.local sets NEXT_PUBLIC_SITE_URL=http://localhost:3000.
// In production (Vercel) this SHOULD be set to https://www.palsacademy.ca.
const PROD_ORIGIN = "https://www.palsacademy.ca";
const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// Defensive: in a production build, NEVER allow a localhost origin to leak into
// canonical/OG tags — Google reads canonical as authoritative, and a localhost
// canonical de-indexes the page. So if the env var is missing OR still points at
// localhost/127.0.0.1 in production, fall back to the live domain. In dev we keep
// whatever is configured (localhost is fine and expected there).
const isLocalhost = (u?: string) =>
  !!u && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(u);

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? RAW_SITE_URL && !isLocalhost(RAW_SITE_URL)
      ? RAW_SITE_URL
      : PROD_ORIGIN
    : RAW_SITE_URL || PROD_ORIGIN;

export function siteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
