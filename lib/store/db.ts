import { promises as fs } from "fs";
import path from "path";
import type { Database } from "./types";

// `.data/db.json` at the project root holds everything for the local backend.
// On serverless platforms (Vercel) the filesystem is read-only outside /tmp,
// so we transparently fall back to /tmp there. State is per-instance in that
// mode (good enough for a single-tenant demo; swap to a real DB for prod).
const isReadOnlyFs = process.env.VERCEL === "1";
const ROOT = isReadOnlyFs ? path.join("/tmp", "pals-data") : path.join(process.cwd(), ".data");
const DB_PATH = path.join(ROOT, "db.json");

const empty: Database = {
  users: [],
  leads: [],
  applications: [],
  classes: [],
  assignments: [],
  submissions: [],
  messages: []
};

let cache: Database | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function ensureFile() {
  await fs.mkdir(ROOT, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(empty, null, 2), "utf8");
  }
}

export async function readDb(): Promise<Database> {
  if (cache) return cache;
  await ensureFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<Database>;
    cache = { ...empty, ...parsed };
  } catch {
    cache = { ...empty };
  }
  return cache;
}

export async function writeDb(db: Database): Promise<void> {
  cache = db;
  // Serialize concurrent writes so we never tear a JSON file.
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  });
  return writeQueue;
}

export async function mutate<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const db = await readDb();
  const result = await fn(db);
  await writeDb(db);
  return result;
}

export function newId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
