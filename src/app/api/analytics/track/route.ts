import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const store = await readStore();

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
               request.headers.get("x-real-ip") ||
               undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || body.referrer || undefined;

    const visit = {
      id: crypto.randomUUID(),
      ip,
      userAgent,
      path: body.path || "/",
      referrer,
      country: body.country,
      city: body.city,
      createdAt: new Date().toISOString(),
    };

    store.visits.push(visit);
    await writeStore(store);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const store = await readStore();
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    const since = new Date();
    since.setDate(since.getDate() - days);

    const visits = store.visits.filter(v => new Date(v.createdAt) >= since);
    
    const visitsByDay = visits.reduce((acc, visit) => {
      const day = new Date(visit.createdAt).toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = visits.reduce((acc, visit) => {
      acc[visit.path] = (acc[visit.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topReferrers = visits.reduce((acc, visit) => {
      if (visit.referrer && visit.referrer !== '') {
        acc[visit.referrer] = (acc[visit.referrer] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      total: visits.length,
      visitsByDay,
      topPages: Object.entries(topPages).sort((a,b) => b[1]-a[1]).slice(0,10),
      topReferrers: Object.entries(topReferrers).sort((a,b) => b[1]-a[1]).slice(0,10),
      recentVisits: visits.slice(-20).reverse(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
