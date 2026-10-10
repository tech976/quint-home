/** Cookie holding the Shopify cart id. Shared by the cart actions and the
 *  checkout routes so the two can never drift apart. */
export const CART_COOKIE = "quint_cart_id";

/**
 * Cookie that used to hold the order awaiting payment. The record now lives on
 * the cart (lib/payu/pending.ts); this is only read, and cleared, for payments
 * that were already in progress when it moved.
 */
export const PENDING_ORDER_COOKIE = "quint_pending_order";
