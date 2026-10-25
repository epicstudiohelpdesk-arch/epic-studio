import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const submissions = await prisma.formSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Token",
      "Type",
      "Status",
      "Name",
      "Email",
      "Phone",
      "Discipline",
      "Budget",
      "Timeline",
      "Message",
      "Call Date",
      "Time Slot",
      "Timezone",
      "Platform",
      "Call Topic",
      "Admin Notes",
      "Created At",
      "IP Address",
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows = [headers.join(",")];

    for (const sub of submissions) {
      const row = [
        escapeCsv(sub.token),
        escapeCsv(sub.type),
        escapeCsv(sub.status),
        escapeCsv(sub.name),
        escapeCsv(sub.email),
        escapeCsv(sub.phone),
        escapeCsv(sub.discipline),
        escapeCsv(sub.budget),
        escapeCsv(sub.timeline),
        escapeCsv(sub.message),
        escapeCsv(sub.date),
        escapeCsv(sub.timeSlot),
        escapeCsv(sub.timezone),
        escapeCsv(sub.platform),
        escapeCsv(sub.callTopic),
        escapeCsv(sub.notes),
        escapeCsv(sub.createdAt.toISOString()),
        escapeCsv(sub.ip),
      ];
      csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\r\n");
    const dateStr = new Date().toISOString().split("T")[0];

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="epic-studio-leads-${dateStr}.csv"`,
      },
    });
  } catch (error) {
    console.error("[CSV Export Error]", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
