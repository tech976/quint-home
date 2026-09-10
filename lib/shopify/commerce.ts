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
  currency: string;
  available: boolean;
  /** selectedOptions flattened, e.g. { Finish: "Gold" } */
  options: Record<string, string>;
}
export interface ShopifyCommerce {
  handle: string;
  available: boolean;
  minPrice: number;
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
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
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
      variants(first: 20) { edges { node {
        id title availableForSale
        price { amount currencyCode }
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
          currency: node.priceRange.minVariantPrice.currencyCode,
          variants: node.variants.edges.map(({ node: v }) => ({
            id: v.id,
            title: v.title,
            price: Math.round(Number(v.price.amount)),
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
