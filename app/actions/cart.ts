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
import { COMPLIMENTARY_OIL } from "@/lib/cart-gift";

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

/** Carries the complimentary-oil note — both the diffuser and its bottle do. */
const notesGift = (l: { attributes?: { key: string; value: string }[] }) =>
  (l.attributes ?? []).some((a) => a.key === COMPLIMENTARY_OIL);

/**
 * Keeps the bag from holding more free bottles than it has earned.
 *
 * The gift is its own cart line, so removing the diffuser used to leave the
 * bottle behind on its own — a bag of nothing but a free oil, which then had
 * ₹99 shipping applied to a ₹0 subtotal. Checkout would have refused it, but
 * only after the customer had been left staring at a broken bag.
 *
 * The rule is the one the product pages promise and the checkout guard
 * enforces: one bottle per diffuser. Anything above that is trimmed here, as
 * soon as the bag changes, rather than at the till.
 */
async function reconcileGifts(cartId: string, cart: Cart): Promise<Cart> {
  const gifts = cart.lines.filter((l) => l.price === 0 && notesGift(l));
  const giftQty = gifts.reduce((n, l) => n + l.quantity, 0);
  const earned = cart.lines
    .filter((l) => l.price > 0 && notesGift(l))
    .reduce((n, l) => n + l.quantity, 0);

  // Fewer gifts than diffusers is the customer's loss to take, not an error.
  let excess = giftQty - earned;
  if (excess <= 0) return cart;

  const drop: string[] = [];
  const trim: { id: string; quantity: number }[] = [];
  for (const g of gifts) {
    if (excess <= 0) break;
    const take = Math.min(excess, g.quantity);
    excess -= take;
    const left = g.quantity - take;
    if (left === 0) drop.push(g.id);
    else trim.push({ id: g.id, quantity: left });
  }

  let next = cart;
  if (trim.length) next = await cartLinesUpdate(cartId, trim);
  if (drop.length) next = await cartLinesRemove(cartId, drop);
  return next;
}

export async function updateLineAction(
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  const next =
    quantity <= 0
      ? await cartLinesRemove(id, [lineId])
      : await cartLinesUpdate(id, [{ id: lineId, quantity }]);
  // Lowering a diffuser's quantity must take its spare bottles with it.
  return reconcileGifts(id, next);
}

export async function removeLineAction(lineId: string): Promise<Cart | null> {
  const id = await readCartId();
  if (!id) return null;
  const next = await cartLinesRemove(id, [lineId]);
  // Removing the diffuser removes the bottle that came with it.
  return reconcileGifts(id, next);
}
