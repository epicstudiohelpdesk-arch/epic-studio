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

async function ensureStore() {
  try {
    await fs.access(STORE_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_FILE, JSON.stringify({ visits: [], forms: [] }, null, 2));
  }
}

export async function readStore(): Promise<Store> {
  await ensureStore();
  const data = await fs.readFile(STORE_FILE, "utf-8");
  return JSON.parse(data);
}

export async function writeStore(store: Store): Promise<void> {
  await ensureStore();
  await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2));
}
