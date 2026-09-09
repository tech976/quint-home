import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  PASSWORD_PRINCIPAL,
  adminPasswordConfigured,
  issueSession,
  passwordMatches,
} from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/**
 * Passphrase sign-in.
 *
 * A shared secret is guessable in a way an OAuth round trip is not, so attempts
 * are throttled per IP. The window is in memory: a serverless instance may be
 * recycled and the count reset, which makes this a speed bump rather than a
 * wall — the real protection is a long passphrase. It is enough to stop casual
 * scripted guessing, and it costs nothing to run.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(ip: string, now: number): boolean {
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const back = (reason: string) =>
    NextResponse.redirect(new URL(`/admin/login?error=${reason}`, request.url), 303);

  if (!adminPasswordConfigured()) return back("nopass");

  const now = Date.now();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (tooManyAttempts(ip, now)) return back("throttled");

  const form = await request.formData();
  const candidate = String(form.get("password") ?? "");
  if (!candidate || !passwordMatches(candidate)) return back("badpass");

  // Correct passphrase: clear the count so a valid user is not locked out by
  // their own earlier typos.
  attempts.delete(ip);

  const session = issueSession(PASSWORD_PRINCIPAL, now + ADMIN_SESSION_MAX_AGE * 1000);
  if (!session) return back("config");

  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  res.cookies.set(ADMIN_COOKIE, session, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return res;
}
