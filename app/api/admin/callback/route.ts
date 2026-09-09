import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  OAUTH_STATE_COOKIE, isExpectedShop, normalizeShop, oauthConfigured, verifyHmac,
} from "@/lib/shopify/oauth";
import { ADMIN_COOKIE, ADMIN_SESSION_MAX_AGE, issueSession } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

/**
 * Completes staff sign-in.
 *
 * Every check the install callback makes is repeated here — right shop, valid
 * Shopify signature, matching nonce — because this one mints a session that
 * opens the back office. The authorisation code is deliberately not exchanged
 * for a token: reaching this point with a valid signature already proves store
 * access, and not exchanging means no second long-lived token to look after.
 */
function fail(request: NextRequest, reason: string) {
  return NextResponse.redirect(new URL(`/admin/login?error=${reason}`, request.url), 303);
}

export async function GET(request: NextRequest) {
  if (!oauthConfigured()) return fail(request, "config");

  const params = request.nextUrl.searchParams;
  if (!isExpectedShop(params.get("shop"))) return fail(request, "denied");
  if (!verifyHmac(params)) return fail(request, "denied");

  const jar = await cookies();
  const expected = jar.get(OAUTH_STATE_COOKIE)?.value;
  if (!expected || expected !== params.get("state")) return fail(request, "expired");
  jar.delete(OAUTH_STATE_COOKIE);

  const shop = normalizeShop(params.get("shop"));
  const session = issueSession(shop, Date.now() + ADMIN_SESSION_MAX_AGE * 1000);
  if (!session) return fail(request, "config");

  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  res.cookies.set(ADMIN_COOKIE, session, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return res;
}
