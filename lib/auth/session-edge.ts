// Edge-runtime-safe session verification using Web Crypto (no Node 'crypto').
// Must stay byte-compatible with the Node signer in session.ts:
//   token = base64url(JSON(payload)) + "." + base64url(HMAC_SHA256(body, secret))
import type { SessionPayload } from "./session";

export const SESSION_COOKIE = "pals_session";

function getSecret(): string {
  return process.env.AUTH_SESSION_SECRET || "dev-only-not-secret-change-me";
}

function bytesToBase64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlToString(s: string): string {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(padded);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmac(body: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  return bytesToBase64url(new Uint8Array(sig));
}

export async function verifySessionEdge(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await hmac(body);
  if (expected.length !== sig.length || expected !== sig) return null;
  try {
    const payload = JSON.parse(base64urlToString(body)) as SessionPayload;
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
