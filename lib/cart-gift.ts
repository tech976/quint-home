import { oils } from "@/lib/data/oils";
import { diffusers } from "@/lib/data/diffusers";
import {
  handleCandidates,
  shopifyHandle,
  type ShopifyCommerce,
} from "@/lib/shopify/commerce";

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
/**
 * The product name without its gift suffix.
 *
 * The gift is a duplicate product called "The Arrival Free", and showing that
 * verbatim beside a COMPLIMENTARY badge reads as a different, oddly-named item
 * rather than the oil the customer chose.
 */
export function giftDisplayTitle(title: string): string {
  return title.replace(/\s*[-–—]?\s*(free|complimentary|gift)\s*$/i, "").trim() || title;
}

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
/**
 * Suffixes a gift product's handle may carry. The store names them by hand, so
 * more than one wording is accepted rather than forcing an exact convention.
 */
const GIFT_SUFFIXES = ["-free", "-complimentary", "-gift"];

export function giftVariantFor(
  oilName: string,
  commerce: Record<string, ShopifyCommerce> | undefined
): { id: string } | null {
  if (!commerce) return null;

  // The gift is its own Shopify product, published only to the headless
  // channel — that is what keeps it off the public store, where it could
  // otherwise be bought outright with no diffuser. Publishing is per product,
  // never per variant, so a ₹0 variant of the paid oil would have inherited
  // the oil's visibility and been purchasable by anyone.
  for (const base of handleCandidates(shopifyHandle(oilName))) {
    for (const suffix of GIFT_SUFFIXES) {
      const free = commerce[base + suffix]?.variants.find(
        (v) => v.price === 0 && v.available
      );
      // Availability matters as much as price: gift stock is tracked, and the
      // diffuser and its gift go in as one mutation, so an out-of-stock gift
      // would fail the whole add-to-cart and block the diffuser's sale.
      if (free) return { id: free.id };
    }
  }

  // Older setups put the gift as a ₹0 variant on the oil's own product.
  for (const base of handleCandidates(shopifyHandle(oilName))) {
    const own = commerce[base]?.variants.find((v) => v.price === 0 && v.available);
    if (own) return { id: own.id };
  }

  return null;
}

/** True when this variant id is a ₹0 gift variant of some oil. */
export function isGiftVariant(
  merchandiseId: string,
  commerce: Record<string, ShopifyCommerce> | undefined
): boolean {
  if (!commerce) return false;
  // Scanned across the whole catalogue rather than per oil: gifts now sit in
  // their own products, so looking only inside the oils would miss them.
  return Object.values(commerce).some((p) =>
    p.variants.some((v) => v.id === merchandiseId && v.price === 0)
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
