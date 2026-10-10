import { NextResponse } from "next/server";
import { currentStaffShop } from "@/lib/admin/session";
import { isOurTxnId } from "@/lib/payu/client";
import { settlePayment } from "@/lib/payu/settle";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Settles one PayU payment on demand.
 *
 * For the payment PayU shows as received and Shopify has no order for. It runs
 * exactly what the customer's return and PayU's webhook run — ask PayU whether
 * it was paid, look for an existing order, write one if there is none — so it
 * is safe to press twice, and safe to press on a payment that already has its
 * order: it reports the order rather than making another.
 *
 * Behind the staff session, and guarded here as well: a route handler does not
 * inherit the /admin layout.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!(await currentStaffShop())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const form = await request.formData();
  // Copied out of a dashboard, so allow for stray spaces and lower case.
  const txnid = String(form.get("txnid") ?? "").trim().toUpperCase();

  const to = (params: Record<string, string>) =>
    NextResponse.redirect(
      new URL(`/admin/payments?${new URLSearchParams(params)}`, request.url),
      303
    );

  if (!isOurTxnId(txnid)) return to({ txn: txnid.slice(0, 60), state: "invalid" });

  const result = await settlePayment({ source: "admin", txnid, signed: null });

  switch (result.state) {
    case "ordered":
      return to({
        txn: txnid,
        state: "ordered",
        order: result.order,
        existing: result.existing ? "1" : "0",
        placeholder: result.placeholder ? "1" : "0",
        attention: result.attention ? "1" : "0",
      });
    case "not-paid":
      return to({ txn: txnid, state: "not-paid", detail: result.status });
    case "failed":
      return to({ txn: txnid, state: "failed", detail: result.reason.slice(0, 300) });
    default:
      return to({ txn: txnid, state: result.state });
  }
}
