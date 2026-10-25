import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";
import { checkSession } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  try {
    const isAuth = await checkSession();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await readStore();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search")?.toLowerCase();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let forms = [...store.forms];

    if (status && status !== "all") {
      forms = forms.filter(f => f.status === status);
    }
    if (type && type !== "all") {
      forms = forms.filter(f => f.type === type);
    }
    if (search) {
      forms = forms.filter(f => 
        f.name?.toLowerCase().includes(search) ||
        f.email?.toLowerCase().includes(search) ||
        f.phone?.toLowerCase().includes(search) ||
        f.token?.toLowerCase().includes(search)
      );
    }

    forms.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
    const total = forms.length;
    const paginated = forms.slice((page-1)*limit, page*limit);

    return NextResponse.json({ forms: paginated, total, page, limit, totalPages: Math.ceil(total/limit) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
