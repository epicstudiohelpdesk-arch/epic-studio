import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin/auth";
import { reconcileSubmissions } from "@/lib/submissions";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const type = searchParams.get("type") || "all";
    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "50")));
    const skip = (page - 1) * limit;

    // Run seamless reconciliation to ensure zero data loss
    await reconcileSubmissions();

    // Build Prisma where query
    const whereClause: any = {};

    if (status !== "all") {
      whereClause.status = status;
    }

    if (type !== "all") {
      whereClause.type = type;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { token: { contains: search } },
        { phone: { contains: search } },
        { message: { contains: search } },
        { discipline: { contains: search } },
        { callTopic: { contains: search } },
        { platform: { contains: search } },
      ];
    }

    // Execute queries in parallel
    const [submissions, total, allCount, newCount, inProgressCount, contactedCount, convertedCount, archivedCount, inquiryCount, callCount] =
      await Promise.all([
        prisma.formSubmission.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.formSubmission.count({ where: whereClause }),
        prisma.formSubmission.count(),
        prisma.formSubmission.count({ where: { status: "new" } }),
        prisma.formSubmission.count({ where: { status: "in_progress" } }),
        prisma.formSubmission.count({ where: { status: "contacted" } }),
        prisma.formSubmission.count({ where: { status: "converted" } }),
        prisma.formSubmission.count({ where: { status: "archived" } }),
        prisma.formSubmission.count({ where: { type: "inquiry" } }),
        prisma.formSubmission.count({ where: { type: "call" } }),
      ]);

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      counts: {
        all: allCount,
        new: newCount,
        in_progress: inProgressCount,
        contacted: contactedCount,
        converted: convertedCount,
        archived: archivedCount,
        inquiry: inquiryCount,
        call: callCount,
      },
    });
  } catch (error) {
    console.error("[Admin Submissions GET Error]", error);
    return NextResponse.json(
      { error: "Failed to retrieve submissions" },
      { status: 500 }
    );
  }
}
