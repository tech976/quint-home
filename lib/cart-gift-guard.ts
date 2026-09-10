import type { Cart } from "@/lib/shopify/cart";
import type { ShopifyCommerce } from "@/lib/shopify/commerce";
import { isDiffuserVariant, isGiftVariant } from "@/lib/cart-gift";

/**
 * Refuses a bag that claims more free oils than it has earned.
 *
 * The complimentary oil is a real ₹0 Shopify variant so that stock moves and
 * the parcel has a provable contents list. The cost of that decision is that
 * the variant is publicly addressable: variant ids appear in the page source
 * and the Storefront API is open by design, so anyone who finds one can add it
 * to their own cart. Without this check the PayU callback would see a total
 * that reconciles perfectly — because the oil really is free — and write a
 * valid paid order for a parcel of free oils.
 *
 * The rule is the one the product pages promise: one complimentary bottle per
 * diffuser. Checked on the server against Shopify's own cart, never against
 * anything the browser sent.
 */
export interface GiftAudit {
  ok: boolean;
  giftQuantity: number;
  diffuserQuantity: number;
  reason?: string;
}

export function auditCartGifts(
  cart: Cart,
  commerce: Record<string, ShopifyCommerce> | undefined
): GiftAudit {
  let giftQuantity = 0;
  let diffuserQuantity = 0;

  for (const line of cart.lines) {
    if (isGiftVariant(line.merchandiseId, commerce)) {
      giftQuantity += line.quantity;
    } else if (isDiffuserVariant(line.merchandiseId, commerce)) {
      diffuserQuantity += line.quantity;
    }
  }

  /**
   * Identify free lines by price too, not only by matching the catalogue.
   *
   * getCommerceMap returns {} when Shopify is unreachable, and then no line
   * resolves as a gift — a bag of nine free bottles would have sailed through
   * on the very failure an attacker could provoke. A zero-priced line is free
   * whatever the catalogue says, so it is counted as a gift regardless.
   */
  const zeroPriced = cart.lines
    .filter((l) => l.price === 0)
    .reduce((n, l) => n + l.quantity, 0);
  giftQuantity = Math.max(giftQuantity, zeroPriced);

  if (giftQuantity === 0) return { ok: true, giftQuantity, diffuserQuantity };

  if (giftQuantity > diffuserQuantity) {
    return {
      ok: false,
      giftQuantity,
      diffuserQuantity,
      reason:
        `Bag claims ${giftQuantity} complimentary oil(s) against ` +
        `${diffuserQuantity} diffuser(s). One is included per diffuser.`,
    };
  }

  return { ok: true, giftQuantity, diffuserQuantity };
}
