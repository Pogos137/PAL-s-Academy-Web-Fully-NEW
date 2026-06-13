import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// The single source of truth for the site's public origin.
// In local dev, .env.local sets NEXT_PUBLIC_SITE_URL=http://localhost:3000.
// In production (Vercel) this MUST be set to https://www.palsacademy.ca.
// The fallback is the production domain — never localhost — so that even if the
// env var is missing at build time, canonical/OG URLs resolve to the live site
// instead of leaking localhost into Google's index.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.palsacademy.ca";

export function siteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
