import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const submission = await prisma.formSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("[Submission GET Error]", error);
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    const dataToUpdate: any = {};
    if (status !== undefined) {
      const allowedStatuses = ["new", "in_progress", "contacted", "converted", "archived", "spam"];
      if (allowedStatuses.includes(status)) {
        dataToUpdate.status = status;
      }
    }
    if (notes !== undefined) {
      dataToUpdate.notes = typeof notes === "string" ? notes.trim() : null;
    }

    const updated = await prisma.formSubmission.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    console.error("[Submission PATCH Error]", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.formSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Submission deleted" });
  } catch (error) {
    console.error("[Submission DELETE Error]", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
