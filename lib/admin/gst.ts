/**
 * GST maths for tax invoices.
 *
 * The store prices GST-inclusive: an oil listed at ₹899 is ₹761.86 taxable plus
 * ₹137.14 GST at 18%. Every figure below is therefore derived by extracting tax
 * out of the gross, never by adding it on top — adding it on would overstate
 * every invoice and every return filed from them.
 *
 * Place of supply decides the split. Supply inside the home state is CGST+SGST
 * at half the rate each; supply to another state is IGST at the full rate. Both
 * come to the same money — the split only decides which government is paid.
 *
 * WARNING: HSN codes and the rate itself are a compliance matter, not a coding
 * one. The values in lib/admin/hsn.ts are placeholders and must be confirmed by
 * a chartered accountant before an invoice built here is issued to a customer.
 */

/** Where the business is registered. Intra-state supply is CGST+SGST. */
export const HOME_STATE = "Maharashtra";
export const HOME_STATE_CODE = "27";

export interface TaxSplit {
  /** Price actually charged, GST included. */
  gross: number;
  /** Value the tax is computed on. */
  taxable: number;
  /** Total GST contained in `gross`. */
  gst: number;
  cgst: number;
  sgst: number;
  igst: number;
  ratePercent: number;
  interState: boolean;
}

/** Rounds to paise. Currency must never carry binary-float noise into a return. */
const paise = (n: number): number => Math.round(n * 100) / 100;

/**
 * Split a GST-inclusive amount into taxable value and tax.
 *
 * `taxable = gross / (1 + rate)`, so ₹8,898 at 18% is ₹7,540.68 taxable and
 * ₹1,357.32 tax — which is what the current invoices show.
 */
export function splitInclusive(
  gross: number,
  ratePercent: number,
  interState: boolean
): TaxSplit {
  const rate = ratePercent / 100;
  const taxable = paise(gross / (1 + rate));
  // Derived from the rounded taxable value so the parts always re-sum to gross.
  const gst = paise(gross - taxable);
  const half = paise(gst / 2);

  return {
    gross: paise(gross),
    taxable,
    gst,
    // The halves must still total `gst` exactly; give any stray paise to CGST.
    cgst: interState ? 0 : paise(gst - half),
    sgst: interState ? 0 : half,
    igst: interState ? gst : 0,
    ratePercent,
    interState,
  };
}

/** True when the buyer is outside the home state, so IGST applies. */
export function isInterState(provinceOrCode: string | null | undefined): boolean {
  const v = (provinceOrCode ?? "").trim().toLowerCase();
  if (!v) return false; // No state recorded: treat as local rather than guess.
  return v !== HOME_STATE.toLowerCase() && v !== HOME_STATE_CODE;
}

/** Sum many splits into an invoice total. */
export function totalSplits(splits: TaxSplit[]): Omit<TaxSplit, "ratePercent"> {
  const sum = (pick: (s: TaxSplit) => number) => paise(splits.reduce((t, s) => t + pick(s), 0));
  return {
    gross: sum((s) => s.gross),
    taxable: sum((s) => s.taxable),
    gst: sum((s) => s.gst),
    cgst: sum((s) => s.cgst),
    sgst: sum((s) => s.sgst),
    igst: sum((s) => s.igst),
    interState: splits.some((s) => s.interState),
  };
}
