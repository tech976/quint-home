import { oils } from "@/lib/data/oils";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

/**
 * Creates the ₹0 "Gift" variant on each fragrance oil.
 *
 * The complimentary bottle has to come out of its own stock: drawing it from
 * the paid pool would make the shop look sold out of an oil it can still sell,
 * and there would be no way to tell how many bottles were given away. A
 * separate variant gives Shopify a second inventory pool to decrement, which is
 * what the order writer already asks for with decrement_obeying_policy.
 *
 * Written to be safe to run twice: an oil that already has a ₹0 variant is
 * skipped rather than given another. Nothing here deletes or edits an existing
 * paid variant.
 */
export const GIFT_OPTION_VALUE = "Gift";
export const GIFT_STOCK = 50;

export interface GiftVariantResult {
  oil: string;
  status: "created" | "already-exists" | "product-not-found" | "failed";
  variantId?: number;
  sku?: string;
  inventorySet?: number;
  detail?: string;
}

async function admin<T>(
  path: string,
  init?: { method: string; body: unknown }
): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/admin/api/${VERSION}/${path}`, {
    method: init?.method ?? "GET",
    headers: {
      "X-Shopify-Access-Token": ADMIN_TOKEN as string,
      ...(init ? { "Content-Type": "application/json" } : {}),
    },
    ...(init ? { body: JSON.stringify(init.body) } : {}),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

interface RawVariant {
  id: number;
  title: string;
  price: string;
  sku: string | null;
  option1: string | null;
  grams?: number;
  weight?: number;
  weight_unit?: string;
  inventory_item_id: number;
  inventory_management: string | null;
}
interface RawProduct {
  id: number;
  title: string;
  handle: string;
  options: { name: string; values: string[] }[];
  variants: RawVariant[];
}

/** Shopify's handle for a product title, mirroring its own slugging. */
function handleFor(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function findProduct(oilName: string): Promise<RawProduct | null> {
  const handle = handleFor(oilName);
  const data = await admin<{ products: RawProduct[] }>(
    `products.json?handle=${encodeURIComponent(handle)}&limit=1`
  );
  if (data.products?.[0]) return data.products[0];

  // Some oils are filed under a previous name; fall back to a title search
  // rather than silently creating nothing.
  const all = await admin<{ products: RawProduct[] }>(`products.json?limit=250`);
  return (
    all.products.find(
      (p) => p.title.trim().toLowerCase() === oilName.trim().toLowerCase()
    ) ?? null
  );
}

/** Point an inventory item at a location and set its on-hand count. */
async function stockVariant(
  inventoryItemId: number,
  quantity: number
): Promise<number | undefined> {
  const locs = await admin<{ locations: { id: number; active: boolean }[] }>(
    "locations.json"
  );
  const location = locs.locations.find((l) => l.active) ?? locs.locations[0];
  if (!location) return undefined;

  // A brand-new variant is not stocked at any location until it is connected.
  // Shopify answers 422 if it already is, which is fine.
  try {
    await admin("inventory_levels/connect.json", {
      method: "POST",
      body: { location_id: location.id, inventory_item_id: inventoryItemId },
    });
  } catch {
    /* already connected */
  }

  await admin("inventory_levels/set.json", {
    method: "POST",
    body: {
      location_id: location.id,
      inventory_item_id: inventoryItemId,
      available: quantity,
    },
  });
  return quantity;
}

/** Creates every missing gift variant. Safe to call repeatedly. */
export async function createGiftVariants(
  quantity = GIFT_STOCK
): Promise<GiftVariantResult[]> {
  if (!DOMAIN || !ADMIN_TOKEN) {
    throw new Error("Shopify Admin API is not configured.");
  }

  const results: GiftVariantResult[] = [];

  for (const oil of oils) {
    try {
      const product = await findProduct(oil.name);
      if (!product) {
        results.push({ oil: oil.name, status: "product-not-found" });
        continue;
      }

      const existing = product.variants.find((v) => Number(v.price) === 0);
      if (existing) {
        // Already present from an earlier run — top its stock up rather than
        // creating a duplicate.
        const set = await stockVariant(existing.inventory_item_id, quantity);
        results.push({
          oil: oil.name,
          status: "already-exists",
          variantId: existing.id,
          sku: existing.sku ?? undefined,
          inventorySet: set,
        });
        continue;
      }

      // Match the paid bottle's weight so the parcel is declared correctly.
      const paid = product.variants[0];
      const sku = `${(paid?.sku || `OIL-${handleFor(oil.name).toUpperCase()}`)}-GIFT`;

      const created = await admin<{ variant: RawVariant }>(
        `products/${product.id}/variants.json`,
        {
          method: "POST",
          body: {
            variant: {
              option1: GIFT_OPTION_VALUE,
              price: "0.00",
              sku,
              // Tracked, so gift stock draws down and can be counted.
              inventory_management: "shopify",
              // Never oversell a gift: running out must be visible, not silent.
              inventory_policy: "deny",
              grams: paid?.grams ?? 0,
              taxable: true,
              requires_shipping: true,
            },
          },
        }
      );

      const set = await stockVariant(created.variant.inventory_item_id, quantity);
      results.push({
        oil: oil.name,
        status: "created",
        variantId: created.variant.id,
        sku: created.variant.sku ?? sku,
        inventorySet: set,
      });
    } catch (e) {
      results.push({
        oil: oil.name,
        status: "failed",
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return results;
}
