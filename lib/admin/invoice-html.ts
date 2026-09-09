import type { Invoice, InvoiceCustomer } from "./orders";
import { SUPPLIER, supplierAddressLines, supplierGaps } from "./supplier";
import { amountInWords } from "./words";

/**
 * Renders a tax invoice as self-contained HTML — no external CSS or fonts, so
 * it prints identically from a browser and converts to PDF unchanged.
 *
 * Laid out to match the invoice the store already issues, so the switch is
 * invisible to customers and to whoever files the returns.
 */

const esc = (v: unknown): string =>
  String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );

/** ₹ with two decimals and Indian grouping — invoices show paise. */
const money = (n: number): string =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit", month: "short", year: "numeric",
  timeZone: "Asia/Kolkata",
});

function partyBlock(title: string, c: InvoiceCustomer): string {
  const lines = [
    ...c.addressLines,
    [c.city, c.zip].filter(Boolean).join(", "),
    [c.province, c.country].filter(Boolean).join(", "),
  ].filter(Boolean);
  return `<div class="party">
    <h3>${esc(title)}</h3>
    <p class="name">${esc(c.name)}</p>
    ${lines.map((l) => `<p>${esc(l)}</p>`).join("")}
    ${c.phone ? `<p>Phone: ${esc(c.phone)}</p>` : ""}
    ${c.email ? `<p>Email: ${esc(c.email)}</p>` : ""}
    ${c.gstin ? `<p class="gstin">GSTIN: ${esc(c.gstin)}</p>` : ""}
  </div>`;
}

export function invoiceHtml(inv: Invoice): string {
  const gaps = supplierGaps();
  const inter = inv.interState;

  // Only the columns that apply: CGST+SGST inside the state, IGST outside.
  const taxHeads = inter
    ? `<th class="num">IGST</th>`
    : `<th class="num">CGST</th><th class="num">SGST</th>`;

  const rows = inv.lines
    .map((l) => {
      const name = l.variantTitle && l.variantTitle !== "Default Title"
        ? `${l.title} <span class="variant">· ${esc(l.variantTitle)}</span>`
        : esc(l.title);
      const taxCells = inter
        ? `<td class="num">${money(l.tax.igst)}</td>`
        : `<td class="num">${money(l.tax.cgst)}</td><td class="num">${money(l.tax.sgst)}</td>`;
      return `<tr>
        <td>${name}${l.unclassified ? ` <span class="flag">HSN unconfirmed</span>` : ""}
            ${l.sku ? `<span class="sku">${esc(l.sku)}</span>` : ""}</td>
        <td class="hsn">${esc(l.hsn)}</td>
        <td class="num">${l.quantity}</td>
        <td class="num">${money(l.unitPrice)}</td>
        <td class="num">${money(l.tax.taxable)}</td>
        <td class="num">${l.tax.ratePercent}%</td>
        ${taxCells}
        <td class="num">${money(0)}</td>
        <td class="num strong">${money(l.tax.gross)}</td>
      </tr>`;
    })
    .join("");

  const shippingRow = inv.shipping
    ? `<tr>
        <td>Shipping</td><td class="hsn">—</td><td class="num">1</td>
        <td class="num">${money(inv.shipping.gross)}</td>
        <td class="num">${money(inv.shipping.taxable)}</td>
        <td class="num">${inv.shipping.ratePercent}%</td>
        ${inter
          ? `<td class="num">${money(inv.shipping.igst)}</td>`
          : `<td class="num">${money(inv.shipping.cgst)}</td><td class="num">${money(inv.shipping.sgst)}</td>`}
        <td class="num">${money(0)}</td>
        <td class="num strong">${money(inv.shipping.gross)}</td>
      </tr>`
    : "";

  const totalTaxCells = inter
    ? `<td class="num">${money(inv.totals.igst)}</td>`
    : `<td class="num">${money(inv.totals.cgst)}</td><td class="num">${money(inv.totals.sgst)}</td>`;

  const qty = inv.lines.reduce((t, l) => t + l.quantity, 0);

  return `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<title>Tax Invoice ${esc(inv.invoiceNumber)} · ${esc(SUPPLIER.legalName)}</title>
<style>
  *{box-sizing:border-box}
  body{font:13px/1.5 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
       color:#1c1917;margin:0;padding:32px;background:#fff}
  .sheet{max-width:820px;margin:0 auto}
  .warn{background:#fdf3e7;border-left:3px solid #c15a27;padding:10px 14px;margin-bottom:20px;font-size:12px}
  header{display:flex;justify-content:space-between;gap:32px;border-bottom:2px solid #1c1917;padding-bottom:18px}
  .doctype{font-size:20px;font-weight:600;letter-spacing:.02em;margin:0 0 10px}
  .meta{font-size:12px}
  .meta div{display:flex;gap:10px;margin-bottom:3px}
  .meta dt{color:#78716c;min-width:92px}
  .supplier{text-align:right;font-size:12px;max-width:290px}
  .supplier .name{font-weight:600;font-size:14px;margin:0 0 4px}
  .supplier p{margin:0 0 2px}
  .supplier .gstin{margin-top:6px;font-weight:600}
  .parties{display:flex;gap:32px;margin:22px 0}
  .party{flex:1;font-size:12px}
  .party h3{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#78716c;margin:0 0 6px;font-weight:600}
  .party p{margin:0 0 2px}
  .party .name{font-weight:600;font-size:13px;margin-bottom:3px}
  .party .gstin{margin-top:5px;font-weight:600}
  table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}
  th{background:#f5f5f4;text-align:left;padding:8px 9px;font-size:10px;
     text-transform:uppercase;letter-spacing:.08em;color:#57534e;border-bottom:1px solid #d6d3d1}
  td{padding:9px;border-bottom:1px solid #e7e5e4;vertical-align:top}
  .num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  .hsn{font-variant-numeric:tabular-nums;color:#57534e}
  .strong{font-weight:600}
  .variant{color:#78716c;font-weight:400}
  .sku{display:block;color:#a8a29e;font-size:10px;margin-top:2px}
  .flag{background:#fdf3e7;color:#c15a27;font-size:10px;padding:1px 5px;border-radius:3px}
  tfoot td{border-bottom:none;border-top:2px solid #1c1917;font-weight:600;padding-top:10px}
  .tablewrap{position:relative}
  .paid{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%) rotate(-16deg);
        font-size:74px;font-weight:700;letter-spacing:.1em;color:rgba(28,25,23,.07);
        pointer-events:none;z-index:0}
  .tablewrap table{position:relative;z-index:1;background:transparent}
  .summary{margin-top:20px;margin-left:auto;width:300px;font-size:12px}
  .summary div{display:flex;justify-content:space-between;padding:5px 0;
               border-bottom:1px solid #f5f5f4}
  .summary .sub{color:#78716c}
  .summary .grand{border-top:2px solid #1c1917;border-bottom:none;margin-top:6px;
                  padding-top:9px;font-size:16px;font-weight:600}
  .words{margin-top:18px;max-width:420px}
  .words h4{font-size:10px;text-transform:uppercase;letter-spacing:.12em;
            color:#78716c;margin:0 0 4px;font-weight:600}
  .inwords{margin:0;font-size:12px;font-weight:600;line-height:1.5}
  .fine{margin:8px 0 0;font-size:11px;color:#57534e}
  footer{margin-top:34px;border-top:1px solid #e7e5e4;padding-top:14px;
         display:flex;justify-content:space-between;gap:24px;font-size:11px;color:#57534e}
  .sign{text-align:right}
  .sign .line{margin-top:38px;border-top:1px solid #a8a29e;padding-top:5px;min-width:190px}
  @media print{body{padding:0}.noprint{display:none}}
</style></head><body><div class="sheet">

${gaps.length ? `<div class="warn noprint"><strong>Not ready to issue.</strong>
  The supplier block is missing: ${esc(gaps.join(", "))}.</div>` : ""}
${inv.needsAttention.length ? `<div class="warn noprint"><strong>Needs attention.</strong>
  ${inv.needsAttention.map(esc).join("; ")}.</div>` : ""}

<header>
  <div>
    <p class="doctype">Tax Invoice</p>
    <div class="meta">
      <div><dt>Invoice No.</dt><dd>${esc(inv.invoiceNumber)}</dd></div>
      <div><dt>Order No.</dt><dd>${esc(inv.orderName)}</dd></div>
      <div><dt>Invoice Date</dt><dd>${esc(DATE_FMT.format(new Date(inv.createdAt)))}</dd></div>
      <div><dt>Payment</dt><dd>${esc(inv.paymentMode)}</dd></div>
      <div><dt>Place of Supply</dt><dd>${esc(inv.placeOfSupply)}</dd></div>
      <div><dt>Supply Type</dt><dd>${inter ? "Inter-state (IGST)" : "Intra-state (CGST + SGST)"}</dd></div>
    </div>
  </div>
  <div class="supplier">
    <p class="name">${esc(SUPPLIER.legalName)}</p>
    ${supplierAddressLines().map((l) => `<p>${esc(l)}</p>`).join("")}
    <p>Phone: ${esc(SUPPLIER.phone)}</p>
    <p>Email: ${esc(SUPPLIER.email)}</p>
    <p class="gstin">GSTIN: ${esc(SUPPLIER.gstin)}</p>
  </div>
</header>

<div class="parties">
  ${partyBlock("Bill to", inv.billTo)}
  ${partyBlock("Ship to", inv.customer)}
</div>

<div class="tablewrap">
<span class="paid" aria-hidden="true">PAID</span>
<table>
  <thead><tr>
    <th>Item description</th><th>HSN</th><th class="num">Qty</th>
    <th class="num">Unit price</th><th class="num">Taxable value</th>
    <th class="num">GST</th>${taxHeads}<th class="num">Discount</th><th class="num">Total</th>
  </tr></thead>
  <tbody>${rows}${shippingRow}</tbody>
  <tfoot><tr>
    <td>Total</td><td></td><td class="num">${qty}</td>
    <td class="num">${money(inv.totals.gross)}</td>
    <td class="num">${money(inv.totals.taxable)}</td>
    <td></td>
    ${totalTaxCells}
    <td class="num">${money(0)}</td>
    <td class="num">${money(inv.totals.gross)}</td>
  </tr></tfoot>
</table>
</div>

<div class="summary">
  <div><span>Discount</span><span>−${money(0)}</span></div>
  <div><span>Total Before Tax</span><span>${money(inv.totals.taxable)}</span></div>
  ${inter
    ? `<div><span>IGST @ 18%</span><span>${money(inv.totals.igst)}</span></div>`
    : `<div><span>CGST @ 9%</span><span>${money(inv.totals.cgst)}</span></div>
       <div><span>SGST @ 9%</span><span>${money(inv.totals.sgst)}</span></div>`}
  <div><span>Total Tax</span><span>${money(inv.totals.gst)}</span></div>
  <div><span>Total After Tax</span><span>${money(inv.totals.gross)}</span></div>
  <div class="sub"><span>Shipping Amount</span><span>${money(inv.shipping ? inv.shipping.taxable : 0)}</span></div>
  <div class="sub"><span>Shipping Tax</span><span>${money(inv.shipping ? inv.shipping.gst : 0)}</span></div>
  <div class="sub"><span>Shipping Total</span><span>${money(inv.shipping ? inv.shipping.gross : 0)}</span></div>
  <div class="grand"><span>Grand Total</span><span>${money(inv.totals.gross)}</span></div>
</div>

<div class="words">
  <h4>Total in words</h4>
  <p class="inwords">${esc(amountInWords(inv.totals.gross).toUpperCase())}</p>
  <p class="fine">Prices are inclusive of GST. Amounts in Indian Rupees.</p>
</div>

<footer>
  <div><strong>Thank you for your business.</strong><br />
    Questions? ${esc(SUPPLIER.email)}</div>
  <div class="sign">For ${esc(SUPPLIER.legalName)}<div class="line">Authorised signatory</div></div>
</footer>
</div></body></html>`;
}
