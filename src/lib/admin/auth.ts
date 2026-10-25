import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const VALID_EMAIL = "admin@epicstudio.in";
const VALID_PASS = "Epic@2024Admin!";

export async function verifyAdmin(password: string, email?: string) {
  if ((email === VALID_EMAIL || !email) && password === VALID_PASS) {
    return true;
  }
  return password === VALID_PASS;
}

export async function createSession() {
  const cookieStore = await cookies();
  const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return token;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
