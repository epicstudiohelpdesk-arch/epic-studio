import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

export interface Visit {
  id: string;
  ip?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  path: string;
  referrer?: string;
  createdAt: string;
}

export interface FormSubmission {
  id: string;
  token: string;
  type: "inquiry" | "call";
  name: string;
  email: string;
  phone?: string;
  discipline?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  date?: string;
  timeSlot?: string;
  timezone?: string;
  platform?: string;
  callTopic?: string;
  status: "new" | "in_progress" | "contacted" | "converted" | "archived";
  notes?: string;
  ip?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

interface Store {
  visits: Visit[];
  forms: FormSubmission[];
}

let inMemoryStore: Store = { visits: [], forms: [] };

async function ensureStore() {
  try {
    await fs.access(STORE_FILE);
  } catch {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(STORE_FILE, JSON.stringify({ visits: [], forms: [] }, null, 2));
    } catch {
      // Ephemeral / Read-only filesystem (Vercel Lambda)
    }
  }
}

export async function readStore(): Promise<Store> {
  try {
    await ensureStore();
    const data = await fs.readFile(STORE_FILE, "utf-8");
    const parsed = JSON.parse(data);
    inMemoryStore = parsed;
    return parsed;
  } catch {
    return inMemoryStore;
  }
}

export async function writeStore(store: Store): Promise<void> {
  inMemoryStore = store;
  try {
    await ensureStore();
    await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2));
  } catch {
    // Read-only filesystem (Vercel Lambda) - silently persist to in-memory during execution
  }
}
