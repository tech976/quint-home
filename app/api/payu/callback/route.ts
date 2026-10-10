// Where PayU returns the customer after payment (both surl and furl).
//
// Nothing here trusts the browser: the posted hash is re-computed with the
// merchant salt, then confirmed a second time straight from PayU's servers
// (their Verify API) before the order is written into Shopify.
//
// The writing itself is settlePayment's job, shared with the server-to-server
// webhook. This route only decides what the customer sees next.

import { after, NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { CART_COOKIE, PENDING_ORDER_COOKIE } from "@/lib/shopify/cart-cookie";
import { verifyPayuResponse } from "@/lib/payu/client";
import { settlePayment } from "@/lib/payu/settle";
import { flagDuplicateOrders, type OrderCustomer } from "@/lib/shopify/admin";

export const dynamic = "force-dynamic";
/** Room for PayU, Shopify and a retry or two — the default can be ten seconds. */
export const maxDuration = 60;

function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

/**
 * The pending-order cookie this route used to depend on. Still read, for a
 * customer who was already on PayU's page when the record moved to the cart.
 */
function readLegacyCookie(
  raw: string | undefined
): { cartId: string; customer: OrderCustomer } | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as { cartId?: string; customer?: OrderCustomer };
    return v.cartId && v.customer ? { cartId: v.cartId, customer: v.customer } : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const p: Record<string, string> = {};
  for (const [k, v] of form.entries()) p[k] = String(v);

  const txnid = p.txnid ?? "";

  // 1. The postback must be signed with our salt.
  if (!verifyPayuResponse(p)) {
    console.error("[payu] response hash mismatch", { txnid, status: p.status });
    return redirect(request, "/order/failed?reason=verification");
  }

  const status = (p.status ?? "").toLowerCase();
  if (status !== "success") {
    // Not an error, but worth a line: a payment the bank is still deciding on
    // can succeed later, and this is the only trace that the customer was
    // told otherwise.
    console.warn("[payu] returned without a completed payment", {
      txnid,
      status,
      unmappedstatus: p.unmappedstatus,
      error: p.error_Message,
    });
    return redirect(
      request,
      `/order/failed?reason=${status === "pending" ? "pending" : "declined"}`
    );
  }

  // 2. Confirm with PayU and write the order — once, whoever gets there first.
  const jar = await cookies();
  const result = await settlePayment({
    source: "browser",
    txnid,
    signed: p,
    legacy: readLegacyCookie(jar.get(PENDING_ORDER_COOKIE)?.value),
  });

  const ref = encodeURIComponent(txnid);

  switch (result.state) {
    case "ordered": {
      // Order placed — retire the bag and the pending record.
      jar.delete(PENDING_ORDER_COOKIE);
      jar.delete(CART_COOKIE);

      if (!result.existing) {
        // After the customer has their page: make sure this payment has not
        // ended up with two orders, and flag the extra if it has.
        after(() =>
          flagDuplicateOrders(txnid).catch((e) =>
            console.error("[payu] duplicate check failed", { txnid, error: String(e) })
          )
        );
      }

      // A placeholder is not an order the customer can be quoted a number
      // for; they are told it is being finalised by hand, which it is.
      if (result.placeholder) {
        return redirect(request, `/order/confirmed?ref=${ref}&pending=1`);
      }

      // The confirmation page fires the Purchase pixel, so it needs the amount
      // and the lines. Ids and quantities only — never anything about the
      // buyer, which would then sit in browser history and server logs.
      return redirect(
        request,
        `/order/confirmed?ref=${encodeURIComponent(result.order || txnid)}` +
          `&value=${result.value}&items=${encodeURIComponent(result.items)}`
      );
    }

    case "not-paid":
      // PayU's servers disagree with the message the browser carried.
      console.error("[payu] verify API did not confirm", { txnid, status: result.status });
      return redirect(
        request,
        `/order/failed?reason=${result.status === "pending" ? "pending" : "unconfirmed"}`
      );

    case "unconfirmed":
      return redirect(request, "/order/failed?reason=unconfirmed");

    case "busy":
      // Another process (the webhook, or a second tab) is writing this very
      // order. The payment is good; the order is seconds away.
      jar.delete(PENDING_ORDER_COOKIE);
      jar.delete(CART_COOKIE);
      return redirect(request, `/order/confirmed?ref=${ref}&pending=1`);

    case "failed":
      // Paid, and Shopify could not be written to. settlePayment has logged
      // it; PayU's webhook will try again, and staff can from /admin/payments.
      return redirect(request, `/order/confirmed?ref=${ref}&pending=1`);
  }
}

/** PayU always posts; a GET here means someone opened the URL directly. */
export async function GET(request: NextRequest) {
  return redirect(request, "/cart");
}
