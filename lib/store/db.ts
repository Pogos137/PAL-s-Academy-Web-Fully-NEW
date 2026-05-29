import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ── Shared helpers ────────────────────────────────────────────────────────

const EMPTY: Database = {
  users: [],
  leads: [],
  applications: [],
  classes: [],
  assignments: [],
  submissions: [],
  messages: [],
};

export function newId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

// ── Supabase path (production / Vercel) ───────────────────────────────────
//
// When SUPABASE_URL + SUPABASE_SECRET_KEY are set the store reads/writes a
// single JSONB row in Supabase so data persists across serverless restarts.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);

function sbClient() {
  return createClient(SUPABASE_URL!, SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false },
  });
}

// The whole database lives in a single JSONB row. To avoid "lost updates"
// (two serverless instances reading the same row, each writing their own copy
// back, the second clobbering the first) every write uses optimistic
// concurrency control: we remember the row's `updated_at` when we read, and the
// write only succeeds if `updated_at` hasn't changed since. If it has, another
// writer beat us to it, so we re-read and re-apply the change. This is what
// keeps a brand-new signup from being erased by a concurrent page load.

type VersionedDb = { db: Database; version: string | null };

async function readSupabaseVersioned(): Promise<VersionedDb> {
  const { data, error } = await sbClient()
    .from("store")
    .select("data, updated_at")
    .eq("id", "main")
    .maybeSingle();

  if (error) {
    console.error("[db] Supabase read error:", error.message);
    throw new Error(error.message);
  }
  if (!data) return { db: { ...EMPTY }, version: null };
  return {
    db: { ...EMPTY, ...(data.data as Partial<Database>) },
    version: (data.updated_at as string | null) ?? null
  };
}

async function readSupabase(): Promise<Database> {
  return (await readSupabaseVersioned()).db;
}

// Full overwrite (no concurrency guard). Kept only for the writeDb() escape
// hatch; production writes go through mutateSupabase() which is race-safe.
async function writeSupabase(db: Database): Promise<void> {
  const { error } = await sbClient()
    .from("store")
    .upsert({ id: "main", data: db, updated_at: new Date().toISOString() });
  if (error) {
    console.error("[db] Supabase write error:", error.message);
    throw new Error(error.message);
  }
}

async function mutateSupabase<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const MAX_ATTEMPTS = 8;
  let lastError: string | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const { db, version } = await readSupabaseVersioned();
    const result = await fn(db);
    const nextVersion = new Date().toISOString();
    const sb = sbClient();

    if (version === null) {
      // Row doesn't exist yet — try to create it. If another writer created it
      // first the primary-key conflict sends us back to the retry loop.
      const { error } = await sb.from("store").insert({ id: "main", data: db, updated_at: nextVersion });
      if (!error) return result;
      lastError = error.message;
    } else {
      // Compare-and-swap: only write if nobody changed the row since we read.
      const { data: rows, error } = await sb
        .from("store")
        .update({ data: db, updated_at: nextVersion })
        .eq("id", "main")
        .eq("updated_at", version)
        .select("id");
      if (error) lastError = error.message;
      else if (rows && rows.length > 0) return result; // our write won
      // 0 rows updated → someone wrote between our read and write → retry
    }

    await new Promise((r) => setTimeout(r, 50 + attempt * 60));
  }

  throw new Error(
    `[db] write failed after ${MAX_ATTEMPTS} attempts (concurrent write conflict)` +
      (lastError ? `: ${lastError}` : "")
  );
}

// ── File path (local dev fallback) ────────────────────────────────────────
//
// When Supabase env vars are absent the store falls back to a local JSON
// file at `.data/db.json` (gitignored).  On Vercel without those vars it
// falls back to /tmp (ephemeral, fine for a demo).

const IS_READONLY_FS = process.env.VERCEL === "1";
const ROOT = IS_READONLY_FS
  ? path.join("/tmp", "pals-data")
  : path.join(process.cwd(), ".data");
const DB_PATH = path.join(ROOT, "db.json");

let fileCache: Database | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function ensureFile() {
  await fs.mkdir(ROOT, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(EMPTY, null, 2), "utf8");
  }
}

async function readFile(): Promise<Database> {
  if (fileCache) return fileCache;
  await ensureFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<Database>;
    fileCache = { ...EMPTY, ...parsed };
  } catch {
    fileCache = { ...EMPTY };
  }
  return fileCache;
}

async function writeFile(db: Database): Promise<void> {
  fileCache = db;
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  });
  return writeQueue;
}

// ── Public API ────────────────────────────────────────────────────────────

export async function readDb(): Promise<Database> {
  return USE_SUPABASE ? readSupabase() : readFile();
}

export async function writeDb(db: Database): Promise<void> {
  return USE_SUPABASE ? writeSupabase(db) : writeFile(db);
}

export async function mutate<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  if (USE_SUPABASE) return mutateSupabase(fn);
  // Local file store: single process, no concurrency to guard against.
  const db = await readDb();
  const result = await fn(db);
  await writeDb(db);
  return result;
}
