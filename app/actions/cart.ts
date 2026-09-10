"use server";

import { cookies } from "next/headers";
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  type Cart,
} from "@/lib/shopify/cart";

import { CART_COOKIE as COOKIE } from "@/lib/shopify/cart-cookie";

const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

async function readCartId(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value;
}
async function writeCartId(id: string): Promise<void> {
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Read the current cart (or null). Never throws – returns null on any error. */
export async function getCartAction(): Promise<Cart | null> {
  try {
    const id = await readCartId();
    if (!id) return null;
    return await cartGet(id);
  } catch {
    return null;
  }
}

/** Ensure a live cart exists and return its id (creating one if needed). */
async function ensureCart(): Promise<string> {
  const id = await readCartId();
  if (id) {
    const existing = await cartGet(id);
    if (existing) return existing.id;
  }
  const created = await cartCreate();
  await writeCartId(created.id);
  return created.id;
}

export async function addToCartAction(
  merchandiseId: string,
  quantity = 1,
  attributes?: { key: string; value: string }[]
): Promise<Cart> {
  const cartId = await ensureCart();
  return cartLinesAdd(cartId, [{ merchandiseId, quantity, attributes }]);
}

/**
 * Adds a diffuser together with its complimentary ₹0 oil, in one mutation.
 *
 * Two separate calls could half-succeed and leave a diffuser in the bag with no
 * oil beside it — the customer would then be charged correctly but shipped
 * short, and nothing in the order would show the bottle was owed. cartLinesAdd
 * takes both lines at once, so either both land or neither does.
 */
export async function addDiffuserWithGiftAction(
  diffuserVariantId: string,
  giftVariantId: string | null,
  attributes?: { key: string; value: string }[]
): Promise<Cart> {
  const cartId = await ensureCart();
  const lines = [
    { merchandiseId: diffuserVariantId, quantity: 1, attributes },
    // No gift variant configured for this scent yet: add the diffuser rather
    // than blocking the sale, and the attribute still records what is owed.
    ...(giftVariantId
      ? [{ merchandiseId: giftVariantId, quantity: 1, attributes }]
      : []),
  ];
  return cartLinesAdd(cartId, lines);
}

export async function updateLineAction(
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  if (quantity <= 0) return cartLinesRemove(id, [lineId]);
  return cartLinesUpdate(id, [{ id: lineId, quantity }]);
}

export async function removeLineAction(lineId: string): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  return cartLinesRemove(id, [lineId]);
}
