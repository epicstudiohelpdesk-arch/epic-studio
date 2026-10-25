import { NextResponse } from "next/server";
import { clearSession } from "@/lib/admin/auth";

export async function POST() {
  await clearSession();
  return NextResponse.json({ success: true });
}

export async function GET() {
  await clearSession();
  return NextResponse.redirect(new URL("/admin-v2/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
