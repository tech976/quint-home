import { storefront } from "./client";
import { oils } from "@/lib/data/oils";
import { diffusers } from "@/lib/data/diffusers";

/**
 * Shopify's product photos are generic stand-ins, and some handles still carry
 * the old product name (Terrain is filed as "quietude"), so a bag line could
 * show the wrong bottle and link through a redirect. Resolve the catalogue
 * entry from the handle, falling back to the title, and use our own artwork
 * and slug.
 */
const CATALOGUE = [...oils, ...diffusers];
const BY_SLUG = new Map(CATALOGUE.map((p) => [p.slug, p]));

/** Products Shopify still files under their previous name. Mirrors the
 *  redirects in next.config.ts. */
const RENAMED: Record<string, string> = {
  quietude: "terrain",
  "tabletop-a326": "monolith",
  "tabletop-fabric-a974": "loom",
  "clock-at370": "ember",
  "dual-mist-at302": "pillar",
  "plug-in-a815": "pebble",
};

const key = (v: string) =>
  v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Matches on the handle first, then the title, allowing for either still
 *  carrying the old name. */
/** Also keyed on the product name, since a Shopify handle can differ from our
 *  slug ("the-ember" vs "ember"). */
const BY_NAME = new Map(CATALOGUE.map((p) => [key(p.name), p]));

function localProduct(handle: string, title: string) {
  for (const raw of [handle, title]) {
    const k = key(raw);
    const hit =
      BY_SLUG.get(k) ?? BY_NAME.get(k) ?? BY_SLUG.get(RENAMED[k] ?? "");
    if (hit) return hit;
  }
  return undefined;
}

/** Shopify reports weight in whichever unit the variant was saved with. */
function toKilograms(weight: number | null, unit: string | null): number {
  if (!weight || weight <= 0) return 0;
  switch (unit) {
    case "GRAMS":
      return weight / 1000;
    case "POUNDS":
      return weight * 0.453592;
    case "OUNCES":
      return weight * 0.0283495;
    default:
      return weight; // KILOGRAMS
  }
}

/** A single line in the Shopify cart, flattened for the UI. */
export interface CartLine {
  id: string;
  quantity: number;
  /** Buyer choices carried on the line, e.g. the included oil. */
  attributes: { key: string; value: string }[];
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  handle: string;
  price: number;
  currency: string;
  image: string | null;
  /** Shipping weight in kilograms, used only for the delivery estimate. */
  weightKg: number;
  /** False once the variant has sold out — it can sit in a bag after that. */
  available: boolean;
}

/** Normalised cart used across the app. */
export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  /** Before any discount — what the lines add up to. */
  subtotal: number;
  /**
   * After Shopify has applied whatever codes are on the cart. Equal to the
   * subtotal when there is no discount; this is the figure the customer pays
   * for goods, and the one PayU must be asked for.
   */
  total: number;
  /** What the applied codes took off, in rupees. */
  discount: number;
  /** The code in force, if Shopify accepted one. */
  discountCode: string | null;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  discountCodes { code applicable }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges { node {
      id
      quantity
      attributes { key value }
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          availableForSale
          weight
          weightUnit
          image { url }
          product { title handle }
        }
      }
    } }
  }
`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  discountCodes: { code: string; applicable: boolean }[];
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        attributes: { key: string; value: string }[];
        merchandise: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          weight: number | null;
          weightUnit: string | null;
          image: { url: string } | null;
          product: { title: string; handle: string };
        };
      };
    }[];
  };
}

function normalise(c: RawCart | null | undefined): Cart | null {
  if (!c) return null;
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: Math.round(Number(c.cost.subtotalAmount.amount)),
    total: Math.round(Number(c.cost.totalAmount.amount)),
    discount: Math.max(
      0,
      Math.round(Number(c.cost.subtotalAmount.amount)) -
        Math.round(Number(c.cost.totalAmount.amount))
    ),
    discountCode:
      (c.discountCodes ?? []).find((d) => d.applicable)?.code ?? null,
    currency: c.cost.subtotalAmount.currencyCode,
    // Adding a sold-out variant does not fail: Shopify keeps the line at
    // quantity zero. It costs nothing and ships nothing, but sent on to the
    // Admin API it gets the whole order refused — after the payment. Such
    // lines are not part of the bag.
    lines: c.lines.edges.filter(({ node }) => node.quantity > 0).map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      attributes: node.attributes ?? [],
      merchandiseId: node.merchandise.id,
      productTitle:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.name ?? node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      handle:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.slug ?? node.merchandise.product.handle,
      price: Math.round(Number(node.merchandise.price.amount)),
      currency: node.merchandise.price.currencyCode,
      image:
        localProduct(
          node.merchandise.product.handle,
          node.merchandise.product.title
        )?.image ??
        node.merchandise.image?.url ??
        null,
      weightKg: toKilograms(node.merchandise.weight, node.merchandise.weightUnit),
      available: node.merchandise.availableForSale !== false,
    })),
  };
}

// Mutations must never be cached.
const noCache = 0;

export async function cartCreate(): Promise<Cart> {
  const data = await storefront<{ cartCreate: { cart: RawCart } }>(
    `mutation { cartCreate(input: {}) { cart { ${CART_FIELDS} } } }`,
    undefined,
    noCache
  );
  return normalise(data.cartCreate.cart)!;
}

export async function cartGet(id: string): Promise<Cart | null> {
  const data = await storefront<{ cart: RawCart | null }>(
    `query getCart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id },
    noCache
  );
  return normalise(data.cart);
}

export async function cartLinesAdd(
  cartId: string,
  lines: {
    merchandiseId: string;
    quantity: number;
    attributes?: { key: string; value: string }[];
  }[]
): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: { cart: RawCart } }>(
    `mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines },
    noCache
  );
  return normalise(data.cartLinesAdd.cart)!;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: { cart: RawCart } }>(
    `mutation upd($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines },
    noCache
  );
  return normalise(data.cartLinesUpdate.cart)!;
}

/**
 * Hand a discount code to Shopify and take back whatever it decides. Shopify
 * owns every rule — eligibility, minimums, dates, usage limits — so a code the
 * store will not honour comes back `applicable: false` and the cart is
 * unchanged. Passing an empty list clears the code.
 */
export async function cartDiscountCodesUpdate(
  cartId: string,
  codes: string[]
): Promise<Cart> {
  const data = await storefront<{ cartDiscountCodesUpdate: { cart: RawCart } }>(
    `mutation updateDiscounts($cartId: ID!, $codes: [String!]!) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $codes) {
        cart { ${CART_FIELDS} }
      }
    }`,
    { cartId, codes },
    0
  );
  return normalise(data.cartDiscountCodesUpdate.cart)!;
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: { cart: RawCart } }>(
    `mutation rm($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lineIds },
    noCache
  );
  return normalise(data.cartLinesRemove.cart)!;
}

/**
 * The cart together with its note and attributes.
 *
 * Kept apart from `Cart` on purpose. `Cart` is handed to client components,
 * and the attributes hold the delivery details of an order awaiting payment —
 * the customer's own, but with no business in a browser bundle's state.
 */
export interface CartRecord {
  cart: Cart;
  note: string;
  attributes: Record<string, string>;
}

type RawCartRecord = RawCart & {
  note: string | null;
  attributes: { key: string; value: string | null }[] | null;
};

const RECORD_FIELDS = `${CART_FIELDS} note attributes { key value }`;

/** Null when Shopify no longer has the cart (they expire after ten idle days). */
export async function cartGetRecord(id: string): Promise<CartRecord | null> {
  const data = await storefront<{ cart: RawCartRecord | null }>(
    `query getCartRecord($id: ID!) { cart(id: $id) { ${RECORD_FIELDS} } }`,
    { id },
    noCache
  );
  const cart = normalise(data.cart);
  if (!cart || !data.cart) return null;
  return {
    cart,
    note: data.cart.note ?? "",
    attributes: Object.fromEntries(
      (data.cart.attributes ?? []).map((a) => [a.key, a.value ?? ""])
    ),
  };
}

/**
 * Sets the cart's attributes. Shopify replaces the whole list rather than
 * merging into it, so whatever is passed here is all the cart will hold.
 */
export async function cartAttributesSet(
  cartId: string,
  attributes: Record<string, string>
): Promise<void> {
  const data = await storefront<{
    cartAttributesUpdate: { userErrors: { message: string }[] };
  }>(
    `mutation setAttributes($cartId: ID!, $attributes: [AttributeInput!]!) {
      cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
        userErrors { message }
      }
    }`,
    {
      cartId,
      attributes: Object.entries(attributes).map(([key, value]) => ({ key, value })),
    },
    noCache
  );
  const errors = data.cartAttributesUpdate.userErrors;
  if (errors.length) throw new Error(`cartAttributesUpdate: ${errors[0].message}`);
}

/** Sets the cart's note — a single value, separate from the attributes. */
export async function cartNoteSet(cartId: string, note: string): Promise<void> {
  const data = await storefront<{
    cartNoteUpdate: { userErrors: { message: string }[] };
  }>(
    `mutation setNote($cartId: ID!, $note: String!) {
      cartNoteUpdate(cartId: $cartId, note: $note) { userErrors { message } }
    }`,
    { cartId, note },
    noCache
  );
  const errors = data.cartNoteUpdate.userErrors;
  if (errors.length) throw new Error(`cartNoteUpdate: ${errors[0].message}`);
}

/** A line the store can no longer fill as it stands in the bag. */
export interface StockShortfall {
  title: string;
  wanted: number;
  /** What is left. Zero means sold out. */
  available: number;
}

/**
 * Checks the bag against live stock, immediately before payment.
 *
 * A bag is not a reservation: an oil added on Monday can sell out by Tuesday
 * and still be sitting there. Shopify re-applies its stock limits whenever a
 * line is written, so writing every line back at its current quantity makes it
 * say what it can actually fill — a short line comes back smaller, a sold-out
 * one unavailable. Nothing is charged for an order the store would refuse.
 *
 * The bag is left as Shopify corrected it, so the customer returns to one that
 * reflects what is really there.
 */
export async function cartRecheckStock(
  cart: Cart
): Promise<{ cart: Cart; shortfalls: StockShortfall[] }> {
  if (cart.lines.length === 0) return { cart, shortfalls: [] };

  const fresh = await cartLinesUpdate(
    cart.id,
    cart.lines.map((l) => ({ id: l.id, quantity: l.quantity }))
  );

  const shortfalls: StockShortfall[] = [];
  for (const wanted of cart.lines) {
    const now = fresh.lines.find((l) => l.id === wanted.id);
    const left = now && now.available ? now.quantity : 0;
    if (left < wanted.quantity) {
      shortfalls.push({
        title: wanted.productTitle,
        wanted: wanted.quantity,
        available: left,
      });
    }
  }
  return { cart: fresh, shortfalls };
}
