import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const store = await readStore();
    const form = store.forms.find(f => f.id === id || f.token === id);
    
    if (!form) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ form });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const store = await readStore();
    
    const index = store.forms.findIndex(f => f.id === id || f.token === id);
    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    store.forms[index] = {
      ...store.forms[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await writeStore(store);
    return NextResponse.json({ success: true, form: store.forms[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const store = await readStore();
    
    store.forms = store.forms.filter(f => f.id !== id && f.token !== id);
    await writeStore(store);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
