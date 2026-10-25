import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalSubmissions,
      submissionsToday,
      submissions7Days,
      submissions30Days,
      newSubmissions,
      totalInquiries,
      totalCalls,
      totalVisits,
      recentSubmissions,
      allSubmissionsForBreakdown,
      visits7Days,
    ] = await Promise.all([
      prisma.formSubmission.count(),
      prisma.formSubmission.count({ where: { createdAt: { gte: today } } }),
      prisma.formSubmission.count({ where: { createdAt: { gte: last7Days } } }),
      prisma.formSubmission.count({ where: { createdAt: { gte: last30Days } } }),
      prisma.formSubmission.count({ where: { status: "new" } }),
      prisma.formSubmission.count({ where: { type: "inquiry" } }),
      prisma.formSubmission.count({ where: { type: "call" } }),
      prisma.visit.count(),
      prisma.formSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.formSubmission.findMany({
        select: {
          id: true,
          type: true,
          discipline: true,
          budget: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.visit.count({ where: { createdAt: { gte: last7Days } } }),
    ]);

    // Status breakdown
    const statusCounts: Record<string, number> = {
      new: 0,
      in_progress: 0,
      contacted: 0,
      converted: 0,
      archived: 0,
    };

    // Discipline breakdown
    const disciplineCounts: Record<string, number> = {};

    // Budget breakdown
    const budgetCounts: Record<string, number> = {};

    allSubmissionsForBreakdown.forEach((sub) => {
      // Status
      if (statusCounts[sub.status] !== undefined) {
        statusCounts[sub.status]++;
      } else {
        statusCounts[sub.status] = 1;
      }

      // Discipline
      if (sub.discipline) {
        disciplineCounts[sub.discipline] = (disciplineCounts[sub.discipline] || 0) + 1;
      }

      // Budget
      if (sub.budget) {
        budgetCounts[sub.budget] = (budgetCounts[sub.budget] || 0) + 1;
      }
    });

    // 14-day timeline
    const timelineDays: Array<{ date: string; label: string; count: number; calls: number; inquiries: number }> = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const daySubmissions = allSubmissionsForBreakdown.filter((sub) => {
        const subDate = new Date(sub.createdAt);
        return subDate >= dayStart && subDate < dayEnd;
      });

      timelineDays.push({
        date: dayStart.toISOString().split("T")[0],
        label: dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: daySubmissions.length,
        calls: daySubmissions.filter((s) => s.type === "call").length,
        inquiries: daySubmissions.filter((s) => s.type === "inquiry").length,
      });
    }

    return NextResponse.json({
      metrics: {
        total: totalSubmissions,
        today: submissionsToday,
        last7Days: submissions7Days,
        last30Days: submissions30Days,
        new: newSubmissions,
        inquiries: totalInquiries,
        calls: totalCalls,
        totalVisits,
        visits7Days,
      },
      statusBreakdown: statusCounts,
      disciplineBreakdown: Object.entries(disciplineCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      budgetBreakdown: Object.entries(budgetCounts)
        .map(([range, count]) => ({ range, count }))
        .sort((a, b) => b.count - a.count),
      timeline: timelineDays,
      recentSubmissions,
    });
  } catch (error) {
    console.error("[Admin Stats Error]", error);
    return NextResponse.json({ error: "Failed to generate stats" }, { status: 500 });
  }
}
