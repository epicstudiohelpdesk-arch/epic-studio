import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, createSession } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (await verifyAdmin(password, email)) {
      await createSession();
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
