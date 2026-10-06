import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { SHIPPING_FLAT } from "@/lib/checkout-config";
import { TrackCheckout } from "@/components/analytics/track-checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Quint Home order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  // Read on the server so the flat rate can be changed by env without a rebuild
  // of the client bundle.
  return (
    <>
      <TrackCheckout />
      <CheckoutForm shippingFlat={SHIPPING_FLAT} />
    </>
  );
}
