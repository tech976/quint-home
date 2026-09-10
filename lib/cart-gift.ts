import { oils } from "@/lib/data/oils";
import { diffusers } from "@/lib/data/diffusers";
import { shopifyHandle, type ShopifyCommerce } from "@/lib/shopify/commerce";

/**
 * Property name the complimentary oil travels under — on the cart line, on the
 * Shopify order and on the packing slip. Shared between the product pages that
 * write it and the bag that reads it, so the two can never drift apart.
 */
export const COMPLIMENTARY_OIL = "Complimentary oil";

export interface CartGift {
  /** As recorded on the line, e.g. "Blanc Ritual · 50 ml". */
  label: string;
  /** Catalogue artwork, so the gift reads as a bottle and not as a caption. */
  image: string | null;
  /** The oil's page, when the name resolves to a catalogue entry. */
  href: string | null;
}

/**
 * True when a cart line is itself the ₹0 gift bottle.
 *
 * Once the gift is a real line, the bag would otherwise show it twice: once as
 * the actual ₹0 row and again as the synthetic row derived from the diffuser's
 * property. The real line wins — it is what ships and what stock came off — and
 * the diffuser's synthetic row is suppressed.
 */
export function lineIsGift(line: {
  price: number;
  attributes?: { key: string; value: string }[];
}): boolean {
  return (
    line.price === 0 &&
    (line.attributes ?? []).some((a) => a.key === COMPLIMENTARY_OIL)
  );
}

/** The complimentary oil recorded on a line, or null if it carries none. */
export function giftOnLine(
  attributes: { key: string; value: string }[] | undefined
): CartGift | null {
  const attr = attributes?.find((a) => a.key === COMPLIMENTARY_OIL);
  if (!attr) return null;
  // Written as `${name} · ${volumeML} ml`, so the catalogue entry is whichever
  // oil name the value starts with. Unmatched values still render, just without
  // artwork — a renamed oil should never blank the row out.
  const oil = oils.find((o) => attr.value.startsWith(o.name));
  return {
    label: attr.value,
    image: oil?.image ?? null,
    href: oil ? `/range/${oil.slug}` : null,
  };
}

/**
 * The ₹0 variant that carries the complimentary oil.
 *
 * Every diffuser ships with an oil, and that bottle has to leave the warehouse
 * as a real line: otherwise stock never moves, the packer has only a note to go
 * on, and a courier claim has no proof the oil was in the parcel. So the gift
 * is a genuine Shopify variant priced at zero rather than a property on the
 * diffuser's line.
 *
 * Identified by price rather than by name, since the variant's title is
 * whatever the store calls it. A zero-priced variant of an oil is a gift
 * variant by definition — nothing else in the catalogue is free.
 */
export function giftVariantFor(
  oilName: string,
  commerce: Record<string, ShopifyCommerce> | undefined
): { id: string; weightGrams: number } | null {
  const entry = commerce?.[shopifyHandle(oilName)];
  const free = entry?.variants.find((v) => v.price === 0);
  return free ? { id: free.id, weightGrams: 0 } : null;
}

/** True when this variant id is a ₹0 gift variant of some oil. */
export function isGiftVariant(
  merchandiseId: string,
  commerce: Record<string, ShopifyCommerce> | undefined
): boolean {
  if (!commerce) return false;
  return oils.some((o) =>
    commerce[shopifyHandle(o.name)]?.variants.some(
      (v) => v.id === merchandiseId && v.price === 0
    )
  );
}

/** True when this variant id belongs to a diffuser — what earns a gift. */
export function isDiffuserVariant(
  merchandiseId: string,
  commerce: Record<string, ShopifyCommerce> | undefined
): boolean {
  if (!commerce) return false;
  return diffusers.some((d) =>
    commerce[shopifyHandle(d.name)]?.variants.some((v) => v.id === merchandiseId)
  );
}

/** Everything except the gift, which the bag renders as its own row instead. */
export function otherAttributes(
  attributes: { key: string; value: string }[] | undefined
): { key: string; value: string }[] {
  return (attributes ?? []).filter((a) => a.key !== COMPLIMENTARY_OIL);
}
