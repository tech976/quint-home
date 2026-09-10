import { NextResponse } from "next/server";
import { currentStaffShop } from "@/lib/admin/session";
import { createGiftVariants, GIFT_STOCK } from "@/lib/admin/gift-variants";

export const dynamic = "force-dynamic";

/**
 * Creates the ₹0 gift variants and stocks them.
 *
 * POST rather than GET, and behind the staff session, because it writes to the
 * live catalogue. Guarded independently: a route handler does not inherit the
 * /admin layout, so without this check the URL would be public.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!(await currentStaffShop())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const url = new URL(request.url);
  const raw = Number(url.searchParams.get("qty"));
  const quantity = Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : GIFT_STOCK;

  try {
    const results = await createGiftVariants(quantity);
    return NextResponse.json({ quantity, results }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
