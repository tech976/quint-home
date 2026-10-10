// PayU (India) Hosted Checkout — server-side only.
//
// Flow: we POST a signed form to PayU, the customer pays on PayU's page, and
// PayU posts the result back to our callback. Payment never touches Shopify
// Checkout, so Shopify's third-party transaction fee does not apply; the paid
// order is written into Shopify afterwards via the Admin API.
//
// The SALT is a secret and must never reach the browser.

import crypto from "node:crypto";

const KEY = process.env.PAYU_MERCHANT_KEY;
const SALT = process.env.PAYU_MERCHANT_SALT;
const PRODUCTION = process.env.PAYU_MODE === "production";

/** True once the merchant key + salt are present in the environment. */
export const payuConfigured = Boolean(KEY && SALT);

/** Where the signed checkout form is submitted. */
export const PAYU_PAYMENT_URL = PRODUCTION
  ? "https://secure.payu.in/_payment"
  : "https://test.payu.in/_payment";

/** Server-to-server transaction verification endpoint. */
const PAYU_VERIFY_URL = PRODUCTION
  ? "https://info.payu.in/merchant/postservice.php?form=2"
  : "https://test.payu.in/merchant/postservice.php?form=2";

const sha512 = (value: string): string =>
  crypto.createHash("sha512").update(value).digest("hex");

/** PayU rejects amounts that are not plain decimals, e.g. "7999.00". */
export function formatAmount(rupees: number): string {
  return rupees.toFixed(2);
}

/** A transaction id unique per attempt. Letters/digits only — PayU is picky. */
export function newTxnId(): string {
  return `QH${Date.now().toString(36)}${crypto
    .randomBytes(5)
    .toString("hex")}`.toUpperCase();
}

/** Shape of the ids minted above: "QH", the time in base 36, ten hex digits. */
const TXNID = /^QH([0-9A-Z]{7,10})([0-9A-F]{10})$/;

/** True for a transaction id this site issued — anything else is not ours. */
export function isOurTxnId(value: string): boolean {
  return TXNID.test(value);
}

/**
 * When a transaction was started, read back out of its id. Lets the order
 * lookup ask Shopify only for orders placed since, instead of everything.
 */
export function txnStartedAt(txnid: string): Date | null {
  const m = TXNID.exec(txnid);
  if (!m) return null;
  const ms = parseInt(m[1], 36);
  // Reject anything that does not decode to a plausible moment.
  return ms > 1_600_000_000_000 && ms < Date.now() + 86_400_000 ? new Date(ms) : null;
}

/**
 * The bag a payment is for, carried inside the payment itself.
 *
 * udf1–udf5 are fields PayU stores with the transaction and hands back with
 * every result, and they are part of the signature in both directions. Putting
 * the Shopify cart id there means the order can be rebuilt from PayU's answer
 * alone — in a browser that lost its cookies, or with no browser at all when
 * the result arrives server-to-server.
 *
 * Hex, because PayU is particular about punctuation and a cart id is full of
 * it ("gid://shopify/Cart/…?key=…"). udf1 is already the transaction id, so
 * the reference uses udf2 onwards, spilling into udf3 and udf4 if it is long.
 */
const UDF_MAX = 240;
const CART_GID = "gid://shopify/Cart/";

export function encodeCartRef(cartId: string): {
  udf2: string;
  udf3: string;
  udf4: string;
} {
  const hex = Buffer.from(cartId, "utf8").toString("hex");
  if (hex.length > UDF_MAX * 3) {
    throw new Error("Cart id is too long to carry through PayU.");
  }
  return {
    udf2: hex.slice(0, UDF_MAX),
    udf3: hex.slice(UDF_MAX, UDF_MAX * 2),
    udf4: hex.slice(UDF_MAX * 2),
  };
}

/** The cart id back out of PayU's fields, or null if they do not hold one. */
export function decodeCartRef(
  fields: { udf2?: string; udf3?: string; udf4?: string } | null | undefined
): string | null {
  if (!fields) return null;
  const hex = `${fields.udf2 ?? ""}${fields.udf3 ?? ""}${fields.udf4 ?? ""}`.trim();
  if (!hex || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return null;
  const id = Buffer.from(hex, "hex").toString("utf8");
  return id.startsWith(CART_GID) ? id : null;
}

export interface PayuOrderInput {
  txnid: string;
  amount: string; // already formatted, e.g. "7999.00"
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * Builds the full set of form fields for PayU, including the request hash:
 *   sha512(key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT)
 */
export function buildPayuFields(input: PayuOrderInput): Record<string, string> {
  if (!payuConfigured) {
    throw new Error("PayU is not configured (missing PAYU_MERCHANT_KEY / PAYU_MERCHANT_SALT).");
  }

  const udf1 = input.udf1 ?? "";
  const udf2 = input.udf2 ?? "";
  const udf3 = input.udf3 ?? "";
  const udf4 = input.udf4 ?? "";
  const udf5 = input.udf5 ?? "";

  // The five trailing empty strings are the reserved udf6–udf10 slots; they are
  // part of the signature even though we never send them.
  const hash = sha512(
    [
      KEY,
      input.txnid,
      input.amount,
      input.productinfo,
      input.firstname,
      input.email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      "",
      "",
      "",
      "",
      "",
      SALT,
    ].join("|")
  );

  const fields: Record<string, string> = {
    key: KEY as string,
    txnid: input.txnid,
    amount: input.amount,
    productinfo: input.productinfo,
    firstname: input.firstname,
    email: input.email,
    phone: input.phone,
    surl: input.surl,
    furl: input.furl,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    hash,
  };

  // Optional address fields, only when present.
  for (const k of [
    "lastname",
    "address1",
    "address2",
    "city",
    "state",
    "country",
    "zipcode",
  ] as const) {
    const v = input[k];
    if (v) fields[k] = v;
  }

  return fields;
}

/**
 * Verifies the hash PayU posts back:
 *   sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 *
 * When PayU applies additional charges the amount is prefixed to the sequence,
 * so both variants are accepted.
 */
export function verifyPayuResponse(p: Record<string, string>): boolean {
  if (!payuConfigured || !p.hash) return false;

  const base = [
    p.status ?? "",
    "",
    "",
    "",
    "",
    "",
    p.udf5 ?? "",
    p.udf4 ?? "",
    p.udf3 ?? "",
    p.udf2 ?? "",
    p.udf1 ?? "",
    p.email ?? "",
    p.firstname ?? "",
    p.productinfo ?? "",
    p.amount ?? "",
    p.txnid ?? "",
    KEY,
  ];

  const candidates = [
    sha512([SALT, ...base].join("|")),
    // additionalCharges variant
    p.additionalCharges
      ? sha512([p.additionalCharges, SALT, ...base].join("|"))
      : null,
  ].filter(Boolean) as string[];

  const received = p.hash.toLowerCase();
  return candidates.some((expected) => {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(received, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

export interface PayuVerification {
  status: string; // "success" / "failure" / "pending"
  amount: string;
  /**
   * Every figure PayU reports for the sale, in rupees. Normally one number
   * twice over; they part company only when PayU adds a charge of its own, and
   * the order is checked against whichever is the price of the goods.
   */
  amounts: number[];
  mihpayid: string;
  /** How it was paid — "UPI", "CC", "NB"… */
  mode: string;
  firstname: string;
  /** The fields we sent with the payment; udf2–udf4 hold the cart reference. */
  udf: { udf1: string; udf2: string; udf3: string; udf4: string; udf5: string };
}

const VERIFY_TIMEOUT_MS = 6000;

/**
 * Second, independent confirmation straight from PayU's servers. The browser
 * postback alone is never trusted — PayU explicitly requires this check.
 * Returns null when the call fails; an id PayU does not know comes back with
 * a status that is simply not "success".
 */
export async function verifyPaymentWithPayu(
  txnid: string
): Promise<PayuVerification | null> {
  if (!payuConfigured) return null;

  const command = "verify_payment";
  const hash = sha512([KEY, command, txnid, SALT].join("|"));

  try {
    const res = await fetch(PAYU_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: KEY as string,
        command,
        var1: txnid,
        hash,
      }),
      cache: "no-store",
      // A hung call would otherwise hold the customer on a blank page.
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      status?: number;
      transaction_details?: Record<string, Record<string, unknown> | undefined>;
    };

    const tx = json.transaction_details?.[txnid];
    if (!tx?.status) return null;

    const text = (k: string): string => {
      const v = tx[k];
      return v === null || v === undefined ? "" : String(v);
    };
    const amounts = [text("transaction_amount"), text("amt"), text("amount")]
      .map(Number)
      .filter((n) => Number.isFinite(n) && n > 0);

    return {
      status: text("status").toLowerCase(),
      amount: text("amt") || text("amount") || text("transaction_amount"),
      amounts: [...new Set(amounts)],
      mihpayid: text("mihpayid"),
      mode: text("mode"),
      firstname: text("firstname"),
      udf: {
        udf1: text("udf1"),
        udf2: text("udf2"),
        udf3: text("udf3"),
        udf4: text("udf4"),
        udf5: text("udf5"),
      },
    };
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Asks PayU until it gives a final answer, or the attempts run out.
 *
 * One failed call must not decide the fate of a paid order: PayU's API has
 * its off moments, and a payment can read "pending" for a beat after the
 * customer has already been sent back. "success" and "failure" are final;
 * anything else — including no answer — is worth asking again.
 */
export async function confirmPaymentWithPayu(
  txnid: string,
  attempts = 3
): Promise<PayuVerification | null> {
  let last: PayuVerification | null = null;
  for (let i = 0; i < attempts; i++) {
    if (i > 0) await sleep(700 * i);
    const answer = await verifyPaymentWithPayu(txnid);
    if (answer) {
      last = answer;
      if (answer.status === "success" || answer.status === "failure") break;
    }
  }
  return last;
}
