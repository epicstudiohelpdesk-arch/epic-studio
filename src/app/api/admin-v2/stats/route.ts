import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";
import { checkSession } from "@/lib/admin/auth";

export async function GET() {
  try {
    const isAuth = await checkSession();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await readStore();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const visitsToday = store.visits.filter(v => new Date(v.createdAt) >= today).length;
    const visits7Days = store.visits.filter(v => new Date(v.createdAt) >= last7Days).length;
    const visits30Days = store.visits.filter(v => new Date(v.createdAt) >= last30Days).length;
    const totalVisits = store.visits.length;

    const formsToday = store.forms.filter(f => new Date(f.createdAt) >= today).length;
    const forms7Days = store.forms.filter(f => new Date(f.createdAt) >= last7Days).length;
    const forms30Days = store.forms.filter(f => new Date(f.createdAt) >= last30Days).length;
    const totalForms = store.forms.length;
    const newForms = store.forms.filter(f => f.status === "new").length;

    const visitsByHour = Array.from({ length: 24 }, (_, hour) => {
      const count = store.visits.filter(v => {
        const d = new Date(v.createdAt);
        return d >= today && d.getHours() === hour;
      }).length;
      return { hour, count };
    });

    const visitsByDay = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      const count = store.visits.filter(v => {
        const d = new Date(v.createdAt);
        return d >= dayStart && d < dayEnd;
      }).length;
      visitsByDay.push({
        date: dayStart.toISOString().split('T')[0],
        label: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count
      });
    }

    const topPages = Object.entries(
      store.visits.reduce((acc, v) => {
        acc[v.path] = (acc[v.path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a,b) => b[1]-a[1]).slice(0,10).map(([path, count]) => ({ path, count }));

    const formStatusBreakdown = {
      new: store.forms.filter(f => f.status === "new").length,
      in_progress: store.forms.filter(f => f.status === "in_progress").length,
      contacted: store.forms.filter(f => f.status === "contacted").length,
      converted: store.forms.filter(f => f.status === "converted").length,
      archived: store.forms.filter(f => f.status === "archived").length,
    };

    const recentForms = store.forms
      .sort((a,b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0,5);

    return NextResponse.json({
      visits: { today: visitsToday, last7Days: visits7Days, last30Days: visits30Days, total: totalVisits },
      forms: { today: formsToday, last7Days: forms7Days, last30Days: forms30Days, total: totalForms, new: newForms },
      charts: { visitsByHour, visitsByDay },
      topPages,
      formStatusBreakdown,
      recentForms,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
