"use client";

import { useEffect, useRef } from "react";
import { purchase } from "@/lib/analytics/pixel";

/**
 * Purchase, fired once on the confirmation page.
 *
 * The amount and the lines arrive as query parameters from the PayU callback,
 * which has just verified the payment with PayU and written the order into
 * Shopify — so the figure is the one actually paid, not a client-side guess.
 *
 * The guard is sessionStorage keyed on the order reference: a refresh or a
 * back-button return to this page must not count a second sale.
 */
export function TrackPurchase({
  orderId,
  value,
  items,
}: {
  orderId: string;
  value: number;
  /** "variantId:quantity:price" per line, comma separated. */
  items: string;
}) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !orderId || value <= 0) return;
    done.current = true;

    const key = `qh.purchase.${orderId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private browsing can refuse storage; a duplicate is better than a miss.
    }

    const contents = items
      .split(",")
      .filter(Boolean)
      .map((line) => {
        const [id, quantity, price] = line.split(":");
        return {
          id,
          quantity: Number(quantity) || 1,
          item_price: Number(price) || 0,
        };
      });

    purchase({ contents, value, orderId });
  }, [orderId, value, items]);

  return null;
}
