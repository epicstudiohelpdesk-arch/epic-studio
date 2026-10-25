import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, notes } = await request.json();

    const dataToUpdate: any = {};
    if (status !== undefined) dataToUpdate.status = status;
    if (notes !== undefined) dataToUpdate.notes = notes;

    const submission = await prisma.formSubmission.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.formSubmission.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
