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

async function readSupabase(): Promise<Database> {
  const { data, error } = await sbClient()
    .from("store")
    .select("data")
    .eq("id", "main")
    .single();

  if (error || !data) return { ...EMPTY };
  return { ...EMPTY, ...(data.data as Partial<Database>) };
}

async function writeSupabase(db: Database): Promise<void> {
  const { error } = await sbClient()
    .from("store")
    .upsert({ id: "main", data: db, updated_at: new Date().toISOString() });
  if (error) {
    console.error("[db] Supabase write error:", error.message);
    throw new Error(error.message);
  }
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
  const db = await readDb();
  const result = await fn(db);
  await writeDb(db);
  return result;
}
