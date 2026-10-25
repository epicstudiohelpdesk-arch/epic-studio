import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { readStore, writeStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || body.referrer || undefined;

    // 1. Prisma DB record
    try {
      await prisma.visit.create({
        data: {
          ip: ip || null,
          userAgent: userAgent || null,
          path: body.path || "/",
          referrer: referrer || null,
          country: body.country || null,
          city: body.city || null,
        },
      });
    } catch (dbErr) {
      console.error("[Analytics Track] Prisma error:", dbErr);
    }

    // 2. Fallback JSON store
    try {
      const store = await readStore();
      store.visits.push({
        id: crypto.randomUUID(),
        ip,
        userAgent,
        path: body.path || "/",
        referrer,
        country: body.country,
        city: body.city,
        createdAt: new Date().toISOString(),
      });
      // Keep store file size reasonable
      if (store.visits.length > 5000) {
        store.visits = store.visits.slice(-5000);
      }
      await writeStore(store);
    } catch (storeErr) {
      console.error("[Analytics Track] Store fallback error:", storeErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    const since = new Date();
    since.setDate(since.getDate() - days);

    // Try reading from Prisma first
    try {
      const dbVisits = await prisma.visit.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: "desc" },
        take: 2000,
      });

      const totalCount = await prisma.visit.count({
        where: { createdAt: { gte: since } },
      });

      const visitsByDay = dbVisits.reduce((acc, visit) => {
        const day = new Date(visit.createdAt).toISOString().split("T")[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPagesMap = dbVisits.reduce((acc, visit) => {
        acc[visit.path] = (acc[visit.path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topReferrersMap = dbVisits.reduce((acc, visit) => {
        if (visit.referrer && visit.referrer !== "") {
          acc[visit.referrer] = (acc[visit.referrer] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({
        total: totalCount,
        visitsByDay,
        topPages: Object.entries(topPagesMap).sort((a, b) => b[1] - a[1]).slice(0, 10),
        topReferrers: Object.entries(topReferrersMap).sort((a, b) => b[1] - a[1]).slice(0, 10),
        recentVisits: dbVisits.slice(0, 20),
      });
    } catch {
      // Fallback to store
      const store = await readStore();
      const visits = store.visits.filter((v) => new Date(v.createdAt) >= since);

      const visitsByDay = visits.reduce((acc, visit) => {
        const day = new Date(visit.createdAt).toISOString().split("T")[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPages = visits.reduce((acc, visit) => {
        acc[visit.path] = (acc[visit.path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topReferrers = visits.reduce((acc, visit) => {
        if (visit.referrer && visit.referrer !== "") {
          acc[visit.referrer] = (acc[visit.referrer] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return NextResponse.json({
        total: visits.length,
        visitsByDay,
        topPages: Object.entries(topPages).sort((a, b) => b[1] - a[1]).slice(0, 10),
        topReferrers: Object.entries(topReferrers).sort((a, b) => b[1] - a[1]).slice(0, 10),
        recentVisits: visits.slice(-20).reverse(),
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
