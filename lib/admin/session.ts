import crypto from "node:crypto";
import { cookies } from "next/headers";
import { apiSecret, normalizeShop, shopDomain } from "@/lib/shopify/oauth";

/**
 * Staff session for /admin.
 *
 * Access is proven by completing Shopify's OAuth flow: only somebody who can
 * log into this store's Shopify admin can finish it. Rather than keep a session
 * store, the cookie is a value signed with the app secret — the same secret
 * Shopify signs its own callbacks with — so it cannot be forged without it.
 *
 * The check runs in a server layout rather than in proxy.ts: the Next docs are
 * explicit that proxy should be a last resort, and a layout keeps the decision
 * next to the pages it protects. Every /admin page is dynamic for this reason,
 * so nothing protected is ever prerendered into the CDN.
 */
export const ADMIN_COOKIE = "quint_admin_session";

/** Eight hours. Long enough for a working day, short enough that a forgotten
 *  laptop stops mattering by morning. */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const b64 = (v: string) => Buffer.from(v, "utf8").toString("base64url");

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

/** `<shop>.<expiry>.<signature>` — self-contained, so no session table. */
export function issueSession(shop: string, expiresAtMs: number): string | null {
  const secret = apiSecret();
  if (!secret) return null;
  const payload = `${b64(normalizeShop(shop))}.${expiresAtMs}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** The shop this cookie is good for, or null if it is absent, malformed,
 *  expired, for another shop, or not signed by us. */
export function verifySession(value: string | undefined, nowMs: number): string | null {
  const secret = apiSecret();
  if (!secret || !value) return null;

  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [shopPart, expiryPart, signature] = parts;

  const expected = sign(`${shopPart}.${expiryPart}`, secret);
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  // Compare before trusting any of the payload.
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  const expiresAt = Number(expiryPart);
  if (!Number.isFinite(expiresAt) || expiresAt <= nowMs) return null;

  let shop: string;
  try {
    shop = Buffer.from(shopPart, "base64url").toString("utf8");
  } catch {
    return null;
  }
  // A token minted for a different store must not open this one.
  return shop && shop === normalizeShop(shopDomain()) ? shop : null;
}

/** The signed-in shop for the current request, or null. */
export async function currentStaffShop(): Promise<string | null> {
  const jar = await cookies();
  return verifySession(jar.get(ADMIN_COOKIE)?.value, Date.now());
}
