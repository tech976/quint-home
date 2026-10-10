// PayU's server-to-server notice that a payment has reached a final state.
//
// The browser callback only runs if the customer's browser comes back. A
// customer who pays in a UPI app and never returns to the tab, or whose bank
// confirms a "failed" payment a minute later, has paid without that ever
// happening — and until this route existed, that payment had no order.
//
// PayU calls this directly, so it does not depend on the customer at all.
// Set it in the PayU dashboard (Settings → Webhooks) for successful payments:
//
//     https://www.quinthome.in/api/payu/webhook
//
// The notice is treated as a prompt, not as evidence. Whatever it claims,
// settlePayment asks PayU's own API whether the transaction succeeded and for
// how much, so a forged request to this URL can do nothing but make us check
// a transaction id — and if that id really was paid and has no order, writing
// the order is the right thing to have happened anyway.

import { after, NextResponse } from "next/server";
import { isOurTxnId, verifyPayuResponse } from "@/lib/payu/client";
import { settlePayment } from "@/lib/payu/settle";
import { flagDuplicateOrders } from "@/lib/shopify/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** PayU posts a form by default and JSON if configured to; take either. */
async function readFields(request: Request): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  const type = request.headers.get("content-type") ?? "";

  if (type.includes("multipart/form-data")) {
    for (const [k, v] of (await request.formData()).entries()) out[k] = String(v);
    return out;
  }

  const text = await request.text();
  if (type.includes("json") || text.trimStart().startsWith("{")) {
    try {
      for (const [k, v] of Object.entries(JSON.parse(text) as Record<string, unknown>)) {
        if (v !== null && typeof v !== "object") out[k] = String(v);
      }
      return out;
    } catch {
      /* fall through and read it as a form */
    }
  }
  for (const [k, v] of new URLSearchParams(text)) out[k] = v;
  return out;
}

const reply = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  let fields: Record<string, string>;
  try {
    fields = await readFields(request);
  } catch {
    return reply(400, { ok: false, error: "unreadable body" });
  }

  const txnid = (fields.txnid ?? "").trim();
  // Not one of ours — a payment link, a test ping, noise. Answer 200 so PayU
  // does not keep retrying something this site will never act on.
  if (!isOurTxnId(txnid)) return reply(200, { ok: true, ignored: true });

  const signed = verifyPayuResponse(fields) ? fields : null;
  const claimed = (fields.status ?? "").toLowerCase();

  // A signed notice of a failure needs nothing doing. An unsigned one is
  // checked regardless of what it says.
  if (signed && claimed && claimed !== "success") {
    return reply(200, { ok: true, state: "not-paid" });
  }

  const result = await settlePayment({ source: "webhook", txnid, signed });

  switch (result.state) {
    case "ordered":
      if (!result.existing) {
        after(() =>
          flagDuplicateOrders(txnid).catch((e) =>
            console.error("[payu] duplicate check failed", { txnid, error: String(e) })
          )
        );
        console.warn("[payu] order written from the webhook", {
          txnid,
          order: result.order,
          placeholder: result.placeholder,
        });
      }
      return reply(200, { ok: true, state: "ordered", order: result.order });

    case "not-paid":
      return reply(200, { ok: true, state: "not-paid" });

    // Everything below asks PayU to call again: the order is not safely in
    // Shopify yet, and a later attempt may be the one that puts it there.
    case "busy":
      return reply(503, { ok: false, state: "busy" });
    case "unconfirmed":
      return reply(503, { ok: false, state: "unconfirmed" });
    case "failed":
      return reply(500, { ok: false, state: "failed" });
  }
}

/** Lets the URL be checked from a browser or PayU's dashboard. */
export async function GET() {
  return reply(200, { ok: true, endpoint: "payu-webhook" });
}
