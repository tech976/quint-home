"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";
import {
  advancedMatch,
  identify,
  initiateCheckout,
  pixelId,
} from "@/lib/analytics/pixel";

/**
 * The checkout page's two pixel jobs.
 *
 * InitiateCheckout fires once the bag has loaded — the cart arrives from a
 * server action after mount, so firing on mount alone would send an empty
 * basket.
 *
 * Advanced matching reads the details the customer is already typing into the
 * form and hands them to the pixel, which hashes them in the browser before
 * anything leaves the page. Raw values are never sent anywhere by us, and they
 * are never put in a URL. It runs on submit, when the fields are complete.
 */
export function TrackCheckout() {
  const { cart } = useCart();
  const sent = useRef(false);

  useEffect(() => {
    const lines = cart?.lines ?? [];
    if (sent.current || lines.length === 0) return;
    sent.current = true;
    initiateCheckout({
      contents: lines.map((l) => ({
        id: pixelId(l.merchandiseId),
        quantity: l.quantity,
        item_price: l.price,
      })),
      value: cart?.subtotal ?? 0,
    });
  }, [cart]);

  useEffect(() => {
    // Delegated from the document: the form only renders once the bag has
    // loaded, so a listener bound on mount would attach to nothing.
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.getAttribute("action") !== "/api/payu/initiate") return;

      const value = (name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";
      identify(
        advancedMatch({
          email: value("email"),
          phone: value("phone"),
          firstName: value("firstName"),
          lastName: value("lastName"),
          city: value("city"),
          state: value("state"),
          zip: value("zip"),
          country: value("country") || "in",
        })
      );
    };

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  return null;
}
