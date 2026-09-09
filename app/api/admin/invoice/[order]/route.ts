import { NextResponse } from "next/server";
import { currentStaffShop } from "@/lib/admin/session";
import { getInvoice } from "@/lib/admin/orders";
import { invoiceHtml } from "@/lib/admin/invoice-html";

export const dynamic = "force-dynamic";

/**
 * The printable invoice. Serving it as its own document means the browser's
 * own "Print → Save as PDF" produces the file, so no PDF library or headless
 * browser has to run in the deployment.
 *
 * Guarded independently of the /admin layout: a route handler does not inherit
 * a layout, so without this check the URL would be public.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ order: string }> }
) {
  if (!(await currentStaffShop())) {
    return new NextResponse("Not authorised", { status: 401 });
  }

  const { order } = await params;
  const orderNumber = Number(order);
  if (!Number.isInteger(orderNumber) || orderNumber <= 0) {
    return new NextResponse("Invalid order number", { status: 400 });
  }

  const invoice = await getInvoice(orderNumber);
  if (!invoice) return new NextResponse("Order not found", { status: 404 });

  return new NextResponse(invoiceHtml(invoice), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
