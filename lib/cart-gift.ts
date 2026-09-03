import { oils } from "@/lib/data/oils";

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

/** Everything except the gift, which the bag renders as its own row instead. */
export function otherAttributes(
  attributes: { key: string; value: string }[] | undefined
): { key: string; value: string }[] {
  return (attributes ?? []).filter((a) => a.key !== COMPLIMENTARY_OIL);
}
