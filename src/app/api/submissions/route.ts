import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { readStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    try {
      const whereClause: any = {};
      if (status && status !== "all") {
        whereClause.status = status;
      }

      const forms = await prisma.formSubmission.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ forms });
    } catch {
      const store = await readStore();
      let forms = store.forms;
      if (status && status !== "all") {
        forms = forms.filter((f) => f.status === status);
      }
      return NextResponse.json({ forms: forms.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
