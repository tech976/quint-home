import { cache } from "react";
import { storefront } from "./client";

/**
 * Live commerce data pulled from Shopify, keyed by product handle. The site's
 * editorial content stays in lib/data/*; this layer overlays real price,
 * availability and the variant IDs needed for checkout.
 */
export interface ShopifyVariant {
  id: string;
  title: string;
  price: number;
  /**
   * Shopify's compareAtPrice — the "was" price, struck through beside the
   * selling price. Undefined when the variant isn't marked down, or when the
   * compare-at is at or below the price (Shopify allows that; showing it
   * would claim a saving that doesn't exist).
   */
  compareAt?: number;
  currency: string;
  available: boolean;
  /** selectedOptions flattened, e.g. { Finish: "Gold" } */
  options: Record<string, string>;
}
export interface ShopifyCommerce {
  handle: string;
  available: boolean;
  minPrice: number;
  /** compareAtPrice of the cheapest variant, when it is genuinely higher. */
  minCompareAt?: number;
  currency: string;
  variants: ShopifyVariant[];
}

/**
 * The variant a shopper buys.
 *
 * Never `variants[0]`: Shopify returns variants in its own order, and each oil
 * now carries a ₹0 gift variant alongside the paid bottle. Taking the first one
 * would sooner or later hand out a free oil in the buy box, or price a bundle
 * at zero. The first variant with a price above zero is the sellable one; if a
 * product somehow has only free variants, none is returned rather than
 * defaulting to the gift.
 */
export function sellableVariant(
  commerce: ShopifyCommerce | undefined
): ShopifyVariant | undefined {
  return commerce?.variants.find((v) => v.price > 0);
}

/**
 * A compare-at amount, but only when it is above what the item actually sells
 * for. Shopify returns "0.0" for an unset compare-at and happily stores one
 * below the price; either would render as a strikethrough advertising a saving
 * the shopper is not getting.
 */
function higherOf(compareAt: string | undefined, price: number): number | undefined {
  const n = Math.round(Number(compareAt ?? 0));
  return Number.isFinite(n) && n > price ? n : undefined;
}

/**
 * A selling price and its struck-through list price, always taken from the
 * same source.
 *
 * Shopify is the live price and lib/data is only the fallback for when the
 * store can't be reached, so the two must never be mixed: read Shopify's price
 * against a code-level list price and you advertise a saving nobody set. While
 * the store still held the pre-markdown prices, a ₹17,999 Monolith measured
 * against a ₹23,750 list price in code claimed "−24%" on the page — a discount
 * that did not exist and that we would have had to honour.
 *
 * So when Shopify answers, only its compareAtPrice may strike anything
 * through; the code-level list price is used solely alongside the code-level
 * price. A product with no compare-at set simply shows one plain price.
 */
export function pricePair(
  commerce: ShopifyCommerce | undefined,
  fallbackPrice: number,
  fallbackList?: number
): { price: number; listPrice?: number } {
  return commerce
    ? { price: commerce.minPrice, listPrice: commerce.minCompareAt }
    : { price: fallbackPrice, listPrice: fallbackList };
}

/** The same pairing for one variant, for pages that price a chosen finish. */
export function variantPricePair(
  variant: ShopifyVariant | undefined,
  fallbackPrice: number,
  fallbackList?: number
): { price: number; listPrice?: number } {
  return variant
    ? { price: variant.price, listPrice: variant.compareAt }
    : { price: fallbackPrice, listPrice: fallbackList };
}

/** Shopify auto-generates handles from the title – mirror that from a name. */
export function shopifyHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface GQLProducts {
  products: {
    edges: {
      node: {
        handle: string;
        availableForSale: boolean;
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        compareAtPriceRange: { minVariantPrice: { amount: string } };
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
              compareAtPrice: { amount: string } | null;
              selectedOptions: { name: string; value: string }[];
            };
          }[];
        };
      };
    }[];
  };
}

const QUERY = `{
  products(first: 100) {
    edges { node {
      handle
      availableForSale
      priceRange { minVariantPrice { amount currencyCode } }
      compareAtPriceRange { minVariantPrice { amount } }
      variants(first: 20) { edges { node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount }
        selectedOptions { name value }
      } } }
    } }
  }
}`;

/**
 * Fetch every product's commerce data once per request (React-cached), as a
 * handle → ShopifyCommerce map. On any failure (Shopify down / misconfigured)
 * returns {} so callers cleanly fall back to the code-level price.
 */
export const getCommerceMap = cache(
  async (): Promise<Record<string, ShopifyCommerce>> => {
    try {
      const data = await storefront<GQLProducts>(QUERY);
      const out: Record<string, ShopifyCommerce> = {};
      for (const { node } of data.products.edges) {
        out[node.handle] = {
          handle: node.handle,
          available: node.availableForSale,
          minPrice: Math.round(Number(node.priceRange.minVariantPrice.amount)),
          minCompareAt: higherOf(
            node.compareAtPriceRange?.minVariantPrice?.amount,
            Math.round(Number(node.priceRange.minVariantPrice.amount))
          ),
          currency: node.priceRange.minVariantPrice.currencyCode,
          variants: node.variants.edges.map(({ node: v }) => ({
            id: v.id,
            title: v.title,
            price: Math.round(Number(v.price.amount)),
            compareAt: higherOf(v.compareAtPrice?.amount, Math.round(Number(v.price.amount))),
            currency: v.price.currencyCode,
            available: v.availableForSale,
            options: Object.fromEntries(v.selectedOptions.map((o) => [o.name, o.value])),
          })),
        };
      }
      return out;
    } catch (err) {
      console.error("[shopify] getCommerceMap failed, falling back to code prices:", err);
      return {};
    }
  }
);

/** Commerce data for one product, looked up by its display name. */
/**
 * Products renamed in the catalogue but not (yet) in Shopify. Maps the current
 * name-derived handle to the handle(s) the store may still use, so the match
 * survives a rename on either side. e.g. "Quietude" was relaunched as "Terrain".
 */
const HANDLE_ALIASES: Record<string, string[]> = {
  terrain: ["quietude"],
};

/** Every handle a product may be filed under: its own, plus any previous name
 *  the store still uses. Terrain, for instance, is "quietude" in Shopify. */
export function handleCandidates(handle: string): string[] {
  return [handle, ...(HANDLE_ALIASES[handle] ?? [])];
}

export async function getCommerceByName(
  name: string
): Promise<ShopifyCommerce | undefined> {
  const map = await getCommerceMap();
  const handle = shopifyHandle(name);
  if (map[handle]) return map[handle];
  for (const alias of HANDLE_ALIASES[handle] ?? []) {
    if (map[alias]) return map[alias];
  }
  return undefined;
}
