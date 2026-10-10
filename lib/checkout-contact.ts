// Contact details, checked before a payment page is ever shown.
//
// Shopify validates the phone and the email when the order is written — which,
// in this checkout, is after the money has been taken. A number it will not
// accept therefore has to be caught here, at the form, where the customer can
// still correct it.

export interface Phone {
  /** "+919876543210" — the form Shopify stores and validates against. */
  e164: string;
  /** Digits only; for Indian numbers the ten-digit mobile PayU expects. */
  national: string;
}

/**
 * Reads a phone number the way people actually type one — "98765 43210",
 * "09876543210", "+91-98765-43210" — and returns it in both forms, or null
 * when it cannot be a real number.
 *
 * Indian mobiles are the rule (the store ships within India, and the courier
 * rings this number). A number written with another country's code is passed
 * through as given, for someone abroad sending a gift home.
 */
export function normalisePhone(raw: string): Phone | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  if (trimmed.startsWith("+") && !digits.startsWith("91")) {
    return digits.length >= 8 && digits.length <= 15
      ? { e164: `+${digits}`, national: digits }
      : null;
  }

  let local = digits;
  if (local.length === 13 && local.startsWith("091")) local = local.slice(3);
  else if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  else if (local.length === 11 && local.startsWith("0")) local = local.slice(1);

  // Indian mobile numbers are ten digits and begin 6–9.
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return { e164: `+91${local}`, national: local };
}

/** An address Shopify will take: something@domain.tld, nothing exotic. */
export function isPlausibleEmail(raw: string): boolean {
  const email = raw.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
}

/** Indian PIN codes are six digits and never start with zero. */
export function isPinCode(raw: string): boolean {
  return /^[1-9]\d{5}$/.test(raw.trim());
}
