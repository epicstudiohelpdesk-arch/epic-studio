import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    const store = await readStore();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    
    let forms = store.forms;
    if (status && status !== "all") {
      forms = forms.filter(f => f.status === status);
    }
    
    return NextResponse.json({ forms: forms.sort((a,b) => b.createdAt.localeCompare(a.createdAt)) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const store = await readStore();
    
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
               request.headers.get("x-real-ip") ||
               undefined;
    const userAgent = request.headers.get("user-agent") || undefined;

    const submission = {
      id: crypto.randomUUID(),
      ...body,
      status: body.status || "new",
      ip,
      userAgent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.forms.push(submission);
    await writeStore(store);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}
