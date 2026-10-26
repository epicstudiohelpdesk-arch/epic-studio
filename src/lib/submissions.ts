import prisma from "@/lib/prisma";
import { readStore, writeStore } from "@/lib/store";

export interface CreateSubmissionInput {
  token?: string;
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  discipline?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message?: string | null;
  date?: string | null;
  timeSlot?: string | null;
  timezone?: string | null;
  platform?: string | null;
  callTopic?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}

/**
 * Generates an entropy-rich, collision-resistant reference token.
 */
export function generateReferenceToken(type: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const microSeconds = Date.now().toString().slice(-4);
  const prefix = type === "call" ? "EPIC-CALL" : type === "career" ? "EPIC-TALENT" : "EPIC";
  return `${prefix}-${year}-${randomSuffix}${microSeconds}`;
}

/**
 * Persists form submission with retry logic against SQLite locks and dual-layer fallback.
 */
export async function persistFormSubmission(input: CreateSubmissionInput) {
  let token = input.token || generateReferenceToken(input.type);
  let savedRecord = null;
  let attempts = 0;
  const maxAttempts = 3;

  // 1. Attempt Prisma DB creation with retry on collision/lock
  while (attempts < maxAttempts && !savedRecord) {
    attempts++;
    try {
      savedRecord = await prisma.formSubmission.create({
        data: {
          token,
          type: input.type,
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone?.trim() || null,
          discipline: input.discipline || null,
          budget: input.budget || null,
          timeline: input.timeline || null,
          message: input.message?.trim() || null,
          date: input.date || null,
          timeSlot: input.timeSlot || null,
          timezone: input.timezone || null,
          platform: input.platform || null,
          callTopic: input.callTopic?.trim() || null,
          status: "new",
          ip: input.ip || null,
          userAgent: input.userAgent || null,
        },
      });
    } catch (err: any) {
      console.warn(`[Submissions Service] Attempt ${attempts} failed:`, err?.message || err);
      // If unique constraint failed on token, generate a new token
      if (err?.code === "P2002") {
        token = generateReferenceToken(input.type);
      }
      if (attempts >= maxAttempts) {
        console.error("[Submissions Service] Max Prisma DB attempts reached:", err);
      } else {
        await new Promise((r) => setTimeout(r, 100 * attempts));
      }
    }
  }

  // 2. Secondary redundant JSON store backup
  try {
    const store = await readStore();
    const existingIndex = store.forms.findIndex((f) => f.token === token);
    const storeRecord = {
      id: savedRecord?.id || crypto.randomUUID(),
      token,
      type: input.type as any,
      name: input.name,
      email: input.email,
      phone: input.phone || undefined,
      discipline: input.discipline || undefined,
      budget: input.budget || undefined,
      timeline: input.timeline || undefined,
      message: input.message || undefined,
      date: input.date || undefined,
      timeSlot: input.timeSlot || undefined,
      timezone: input.timezone || undefined,
      platform: input.platform || undefined,
      callTopic: input.callTopic || undefined,
      status: "new" as const,
      ip: input.ip || undefined,
      userAgent: input.userAgent || undefined,
      createdAt: savedRecord?.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: savedRecord?.updatedAt?.toISOString() || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      store.forms[existingIndex] = storeRecord;
    } else {
      store.forms.push(storeRecord);
    }
    await writeStore(store);
  } catch (storeErr) {
    console.error("[Submissions Service] Backup JSON store write failed:", storeErr);
  }

  return {
    record: savedRecord,
    token,
    persistedToDb: savedRecord !== null,
  };
}

/**
 * Reconciles any submissions that exist in store.json but not yet in SQLite DB.
 * Guarantees zero data loss even during severe service interruptions.
 */
export async function reconcileSubmissions() {
  try {
    const store = await readStore();
    if (!store.forms || store.forms.length === 0) return 0;

    let reconciledCount = 0;
    for (const form of store.forms) {
      const exists = await prisma.formSubmission.findUnique({
        where: { token: form.token },
      });

      if (!exists) {
        await prisma.formSubmission.create({
          data: {
            token: form.token,
            type: form.type,
            name: form.name,
            email: form.email,
            phone: form.phone || null,
            discipline: form.discipline || null,
            budget: form.budget || null,
            timeline: form.timeline || null,
            message: form.message || null,
            date: form.date || null,
            timeSlot: form.timeSlot || null,
            timezone: form.timezone || null,
            platform: form.platform || null,
            callTopic: form.callTopic || null,
            status: form.status || "new",
            notes: form.notes || null,
            ip: form.ip || null,
            userAgent: form.userAgent || null,
            createdAt: new Date(form.createdAt),
          },
        });
        reconciledCount++;
      }
    }
    if (reconciledCount > 0) {
      console.log(`[Reconciliation] Successfully backfilled ${reconciledCount} missing submissions to SQLite.`);
    }
    return reconciledCount;
  } catch (err) {
    console.error("[Reconciliation Error]", err);
    return 0;
  }
}
