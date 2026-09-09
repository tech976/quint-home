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

/**
 * The wordmark, inlined as a data URI.
 *
 * The invoice is a single self-contained file — it is served from a route,
 * printed to PDF, and may be saved or emailed on. A <img src="/images/..."> in
 * any of those places renders as a broken icon once the file leaves the site,
 * so the mark travels inside the document.
 */
const LOGO_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAwIDMwMDAiPiA8Zz4gPHBhdGggZD0iTTcyMi43NiwxNTgwLjg5YzI3Ljg1LTMxLjYzLDQ3LjItNjcuNTYsNTcuOTctMTA3Ljk0LDEwLjg1LTQwLjMsMTAuNDMtODEuODYtMS4xNy0xMjQuNjktMTYuNjYtNTQuOTQtNDcuNTQtOTkuMTktOTIuNjMtMTMyLjg1LTQ1LjE4LTMzLjc0LTk1LjU3LTUwLjU2LTE1MS4yNy01MC41Ni0yMS42MiwwLTQzLjQxLDIuOTQtNjUuNDUsOC43NS02Ni4xMywyMC43OC0xMTUuOTQsNjAuMTYtMTQ5LjQyLDExOC4yMS0zMy40OSw1Ny45Ny00Mi4wNywxMjEuNzQtMjUuOTEsMTkxLjE1LDE0Ljk4LDUzLjI2LDQ1LjYsOTYuOTIsOTEuNzEsMTMxLDQ2LjE5LDM0LjA3LDk4LjYxLDUxLjE1LDE1Ny4xNiw1MS4xNSwyMC4wMiwwLDQwLjM5LTIuMzYsNjEuMTctNi45LDI0LjQ4LTcuOTEsNDYuOTUtMTguNjgsNjcuMzEtMzIuMzksMTAuNDMsMTIuNDUsMTkuMzUsMjUuNzQsMjYuODQsMzkuODhoODcuMzNjLTE1LjQtMzIuODEtMzYuNi02MS4xNy02My42MS04NC44MVpNNTU5LjM3LDE2NDAuNzFjLTIyLjQ2LDAtNDQtNS4zLTY0LjYxLTE1LjktMjAuNTMtMTAuNi0zOS4xMi0yNC44Mi01NS43OC00Mi42NiwyNi4xNi0yNC4xNSw1Ni4zNy0zNi4xOCw5MC40NC0zNi4xOCwyMi40NiwwLDQ0LjA4LDUuMyw2NC44NywxNS45LDIwLjc4LDEwLjYsMzkuODgsMjQuNCw1Ny4zOCw0MS40OC0yNy4wMSwyNC45LTU3LjgsMzcuMzYtOTIuMywzNy4zNlpNNjg3Ljg0LDE1NTUuMzJjLTQxLjE0LTI0Ljk5LTg1LjIzLTM3LjQ0LTEzMi4yNi0zNy40NHMtOTMuMTMsMTMuOTctMTM1Ljk2LDQxLjgxYy0yMi40Ni0yOS45NS0zOC4yOC02Mi4xOC00Ny4zNy05Ni42Ny05LjE3LTM2LjE4LTExLjk1LTcyLjg2LTguNDEtMTEwLjEzLDMuNTMtMzcuMTksMTQuNTUtNzAsMzMuMDctOTguNTIsMTguNDItMjguNDQsNDUuNi00Ny43LDgxLjM2LTU3LjcyLDEwLjM1LTIuNDQsMjAuNzgtMy43LDMxLjIxLTMuNywyOS40NSwwLDU3LjU1LDguODMsODQuMTMsMjYuNSwyNi42NywxNy42Nyw0OS40NywzOS44LDY4LjY1LDY2LjM4LDE5LjA5LDI2LjY3LDMyLjY0LDU0LjI3LDQwLjU1LDgyLjk2LDE3LDY0LjQ1LDEyLjAzLDEyNi42Mi0xNC45OCwxODYuNTNaIi8+IDxwYXRoIGQ9Ik0xMzQwLjU2LDExNzMuMTVjLTguNzcsMTEuMjUtMTQuNTYsMjUuNC0xNC41Niw0MC43OWwtLjE3LDExLjM0Yy0uMTcsMi43My0uMjUsNS42My0uMzMsOC42MXYyMzkuODZjMCwxMzAuNC02MS40OCwxOTYuNDItMTg0LjU5LDE5OC4wOC03OC4xMSwwLTEzMS4zOS0yNy4wNi0xNTkuNzctODEuMTctMTItMjMtMTcuMjEtNDguOS0xNy4yMS03NC43MXYtMjY2LjA5bC0uNS0zNS45MWMwLTE1LjM5LTUuNzktMjkuNTQtMTQuNTYtNDAuNzloMTAxLjZjLTguNzcsMTEuMjUtMTQuNTYsMjUuNC0xNC41Niw0MC43OWwtLjUsMzV2MjEyLjQ4YzAsNTguMDgsOS41MiwxMDEuOTQsMjguNTUsMTMxLjY0LDE4Ljk1LDI5LjYyLDQ5LjU2LDQ0LjQzLDkxLjY3LDQ0LjQzczczLjcyLTE0LjMxLDk3LjIyLTQyLjk0YzIzLjUtMjguNjMsMzUuMjUtNzEuMTYsMzUuMjUtMTI3LjU4di0yMTcuMTFsLS4yNS0xNS40Ny0uMjUtMjAuNDRjMC0xNS4zOS01Ljc5LTI5LjU0LTE0LjU2LTQwLjc5aDY3LjUyWiIvPiA8Zz4gPHBhdGggZD0iTTE2MTcuMzEsMTIxMy45NGMwLTE1LjM5LDUuNzktMjkuNTQsMTQuNTYtNDAuNzloLTEwMS42YzguODUsMTEuMjUsMTQuNTYsMjUuNCwxNC41Niw0MC43OXY0MTAuOTdjMCwxNS4zOS01LjcxLDI5LjU0LTE0LjU2LDQwLjc5aDEwMS42Yy04Ljc3LTExLjI1LTE0LjU2LTI1LjQtMTQuNTYtNDAuNzl2LTQxMC45N1oiLz4gPHBhdGggZD0iTTIxOTkuNzUsMTE3My4xNWgtNjYuODVjOS4wMiwxMS40MiwxNC44MSwyNS44MSwxNC44MSw0MS4zN2wuMDgsNDAxLjU0LTIyMi41Ny00NDIuOTFoLTk0Ljk5YzguODUsMTEuMjUsMTQuNTYsMjUuNCwxNC41Niw0MC43OXY0MTAuOTdjMCwxNS4zOS01LjcxLDI5LjU0LTE0LjU2LDQwLjc5aDY1Ljg2Yy04Ljg1LTExLjI1LTE0LjQ4LTI1LjQtMTQuNDgtNDAuNzl2LTM3OC43OGwyMTAuOTksNDE5LjU3aDkyLjU5cy4yNS00NDMuNS41LTQ1OS45MmMxLjY5LTEyLjE4LDYuNzYtMjMuMzksMTQuMDYtMzIuNjNaIi8+IDxwYXRoIGQ9Ik0yNzEzLjA1LDExNzMuMTVoLTM3My44MnY0NC41N2MxMS4xMi04LjY3LDI1LjA3LTE0LjQsNDAuMjUtMTQuNTRoMTA5LjUxYy41OCwzLjQ3LjkxLDcuMTIuOTEsMTAuNzZ2NDEwLjk3YzAsMTUuMzktNS43MSwyOS41NC0xNC41Niw0MC43OWgxMDEuNjFjLTguNzctMTEuMjUtMTQuNTYtMjUuNC0xNC41Ni00MC43OXYtNDEwLjk3YzAtMy42NC4zMy03LjI4Ljk5LTEwLjc2aDcyLjk4YzkuNDgsMCwyOC4xOS4zNCw0NC43Ni42OSwxMS45MiwxLjc0LDIyLjg0LDYuODEsMzEuODgsMTMuODV2LTEzLjEzcy4wNiwwLC4wNiwwdi0zMS40NFoiLz4gPC9nPiA8L2c+IDxnPiA8cGF0aCBkPSJNMTA5MS4xNywxODI4LjkyaDI3LjEzczAsMTY0LjU3LDAsMTY0LjU3aC0yNy4xM3MwLTE2NC41NywwLTE2NC41N1pNMTEwNC40NywxODk3Ljg2aDEwMi45NHMwLDI0LjQxLDAsMjQuNDFoLTEwMi45NHMwLTI0LjQxLDAtMjQuNDFaTTExOTYuMjQsMTgyOC45MmgyNy4zOXMwLDE2NC41NywwLDE2NC41N2gtMjcuMzlzMC0xNjQuNTcsMC0xNjQuNTdaIi8+IDxwYXRoIGQ9Ik0xMzE1LjkzLDE5NzUuMjRjLTEzLjMtMTUuMzUtMTkuOTUtMzYuNjktMTkuOTUtNjQuMDMsMC0yNy4zNCw2LjY5LTQ4Ljc4LDIwLjA4LTY0LjI5LDEzLjM5LTE1LjUyLDMxLjM0LTIzLjI3LDUzLjg3LTIzLjI3LDIxLjEsMCwzOC42NSw3Ljg4LDUyLjY3LDIzLjY1LDE0LjAxLDE1Ljc3LDIxLjAxLDM3LjA3LDIxLjAxLDYzLjkxLDAsMjcuMzQtNi42MSw0OC42OC0xOS44Miw2NC4wMy0xMy4yMSwxNS4zNS0zMS4xNiwyMy4wMy01My44NiwyMy4wMy0yMi43LDAtNDAuNy03LjY3LTU0LTIzLjAzWk0xMzM1Ljc1LDE4NjUuMTVjLTguMjUsMTEuMDctMTIuMzcsMjYuNDItMTIuMzcsNDYuMDUsMCwxOS42Miw0LjEyLDM0Ljg1LDEyLjM3LDQ1LjY3LDguMjUsMTAuODIsMTkuNjQsMTYuMjMsMzQuMTgsMTYuMjMsMTQuNTMsMCwyNS44OS01LjQxLDM0LjA0LTE2LjIzLDguMTYtMTAuODIsMTIuMjMtMjYuMDQsMTIuMjMtNDUuNjcsMC0xOS42My00LjA4LTM0Ljk4LTEyLjIzLTQ2LjA1LTguMTYtMTEuMDctMTkuNTEtMTYuNjEtMzQuMDQtMTYuNjEtMTQuNTUsMC0yNS45NCw1LjUzLTM0LjE4LDE2LjYxWiIvPiA8cGF0aCBkPSJNMTYxNS43LDE5NTcuNWw1Ni45My0xMjguNThoMzUuOTFzMCwxNjQuNTcsMCwxNjQuNTdoLTI2LjA3czAtMTI1LjMxLDAtMTI1LjMxbC01My43MywxMjUuMzFoLTMyLjk4cy01Mi42Ny0xMjUuMzEtNTIuNjctMTI1LjMxdjEyNS4zMXMtMjcuMTMsMC0yNy4xMywwdi0xNjQuNTdzMzcuMjQsMCwzNy4yNCwwbDU1LjYsMTI4LjU4LDMuMTksMTEuMDcsMy43Mi0xMS4wN1oiLz4gPHBhdGggZD0iTTE3ODUuMTQsMTgyOC45MmgxMjMuNjlzMCwyNC4xNiwwLDI0LjE2aC05Ni41NnMwLDQ2LjA0LDAsNDYuMDRoOTIuNTdzMCwyNC40MSwwLDI0LjQxaC05Mi41N3MwLDQ1LjU0LDAsNDUuNTRoOTYuNTZzMCwyNC40MSwwLDI0LjQxaC0xMjMuNjlzMC0xNjQuNTcsMC0xNjQuNTdaIi8+IDwvZz4gPC9zdmc+";

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
        ? `<span class="item">${esc(l.title)} <span class="variant">· ${esc(l.variantTitle)}</span></span>`
        : `<span class="item">${esc(l.title)}</span>`;
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
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  /* Brand tokens, copied from app/globals.css rather than imported: this file
     is served standalone and printed, so it cannot rely on the site's
     stylesheet being present. */
  :root{
    --white:#ffffff; --stardust:#eee4d8; --stardust-soft:#f5efe6; --ivory:#faf8f3;
    --aerial:#77918d; --aerial-deep:#5a7370; --verdant:#293329;
    --clay:#c15a27; --clay-deep:#6a2e0c;
    --charcoal:#3a3532; --charcoal-soft:#6a625e;
    --rule:#e6dfd2; --rule-soft:#efe9dd;
  }
  *{box-sizing:border-box}
  body{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
       font-size:12.5px;line-height:1.55;color:var(--charcoal);margin:0;padding:34px 30px;
       background:var(--white);-webkit-font-smoothing:antialiased}
  .sheet{max-width:860px;margin:0 auto}
  .serif{font-family:'Literata',Georgia,'Times New Roman',serif}

  .warn{background:var(--stardust-soft);border-left:2px solid var(--clay);
        padding:10px 14px;margin-bottom:20px;font-size:11.5px;color:var(--charcoal)}

  /* Masthead — the wordmark leads, on the warm ground the site uses. */
  .masthead{display:flex;justify-content:space-between;align-items:center;gap:34px;
            background:var(--stardust-soft);border:1px solid var(--rule);
            padding:24px 28px}
  .brand{display:flex;flex-direction:column;gap:14px}
  .logo{width:150px;height:auto;display:block}
  .doctype{font-family:'Literata',Georgia,serif;font-size:23px;font-weight:400;
           letter-spacing:-0.01em;margin:0;color:var(--charcoal);
           padding-top:13px;border-top:1px solid var(--rule)}
  .supplier{text-align:right;font-size:11.5px;max-width:290px;line-height:1.65}
  .supplier .name{font-family:'Literata',Georgia,serif;font-weight:600;font-size:15px;
                  margin:0 0 5px;color:var(--charcoal)}
  .supplier p{margin:0;color:var(--charcoal-soft)}
  .supplier .gstin{margin-top:8px;font-weight:600;color:var(--charcoal);
                   letter-spacing:.02em}

  /* Meta strip */
  .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:0;
        border:1px solid var(--rule);border-top:none}
  .meta div{padding:11px 14px;border-right:1px solid var(--rule)}
  .meta div:nth-child(3n){border-right:none}
  .meta dt{font-size:8.5px;text-transform:uppercase;letter-spacing:.18em;
           color:var(--charcoal-soft);margin:0 0 3px;font-weight:500}
  .meta dd{margin:0;font-size:12px;color:var(--charcoal);font-weight:500}

  .parties{display:flex;gap:0;margin-top:22px;border:1px solid var(--rule)}
  .party{flex:1;padding:16px 18px;font-size:11.5px;line-height:1.6}
  .party + .party{border-left:1px solid var(--rule)}
  .party h3{font-size:8.5px;text-transform:uppercase;letter-spacing:.18em;
            color:var(--clay);margin:0 0 7px;font-weight:600}
  .party p{margin:0;color:var(--charcoal-soft)}
  .party .name{font-family:'Literata',Georgia,serif;font-weight:600;font-size:13.5px;
               color:var(--charcoal);margin-bottom:4px}
  .party .gstin{margin-top:6px;font-weight:600;color:var(--charcoal)}

  table{width:100%;border-collapse:collapse;margin-top:22px;font-size:11.5px}
  th{background:var(--verdant);color:var(--ivory);text-align:left;padding:10px 9px;
     font-size:8.5px;text-transform:uppercase;letter-spacing:.14em;font-weight:600}
  td{padding:11px 9px;border-bottom:1px solid var(--rule-soft);vertical-align:top}
  tbody tr:nth-child(even){background:var(--ivory)}
  .num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  .hsn{font-variant-numeric:tabular-nums;color:var(--charcoal-soft);letter-spacing:.02em}
  .strong{font-weight:600}
  .item{font-family:'Literata',Georgia,serif;font-size:13px;color:var(--charcoal)}
  .variant{color:var(--charcoal-soft);font-weight:400}
  .sku{display:block;color:var(--aerial);font-size:9px;margin-top:3px;
       letter-spacing:.1em;text-transform:uppercase}
  .flag{background:var(--clay);color:var(--ivory);font-size:8.5px;padding:2px 6px;
        letter-spacing:.08em;text-transform:uppercase}
  tfoot td{border-bottom:none;border-top:1.5px solid var(--charcoal);font-weight:600;
           padding-top:11px;background:var(--white)}

  .tablewrap{position:relative}
  .paid{position:absolute;top:46%;left:50%;transform:translate(-50%,-50%) rotate(-15deg);
        font-family:'Literata',Georgia,serif;font-size:82px;font-weight:600;
        letter-spacing:.16em;color:var(--clay);opacity:.13;pointer-events:none;z-index:2;
        border:4px solid var(--clay);border-radius:8px;padding:6px 26px}
  .tablewrap table{position:relative;z-index:1;background:transparent}
  .tablewrap tbody tr:nth-child(even){background:rgba(250,248,243,.72)}

  .foot{display:flex;justify-content:space-between;align-items:flex-start;
        gap:36px;margin-top:24px}
  .summary{width:320px;font-size:11.5px;flex-shrink:0}
  .summary div{display:flex;justify-content:space-between;padding:6px 12px;
               border-bottom:1px solid var(--rule-soft)}
  .summary .sub{color:var(--charcoal-soft)}
  .summary .band{background:var(--stardust-soft)}
  .summary .grand{background:var(--verdant);color:var(--ivory);border-bottom:none;
                  padding:13px 12px;margin-top:8px;font-size:15px;font-weight:600}
  .summary .grand span:last-child{font-family:'Literata',Georgia,serif;font-size:17px}

  .words{max-width:400px}
  .words h4{font-size:8.5px;text-transform:uppercase;letter-spacing:.18em;
            color:var(--clay);margin:0 0 6px;font-weight:600}
  .inwords{margin:0;font-family:'Literata',Georgia,serif;font-size:12.5px;
           font-weight:500;line-height:1.55;color:var(--charcoal)}
  .fine{margin:10px 0 0;font-size:10.5px;color:var(--charcoal-soft);line-height:1.6}

  footer{margin-top:30px;border-top:1px solid var(--rule);padding-top:16px;
         display:flex;justify-content:space-between;gap:26px;font-size:10.5px;
         color:var(--charcoal-soft)}
  footer strong{color:var(--charcoal);font-family:'Literata',Georgia,serif;
                font-size:12px;font-weight:600}
  .sign{text-align:right}
  .sign .line{margin-top:40px;border-top:1px solid var(--rule);padding-top:6px;
              min-width:200px;color:var(--charcoal-soft)}

  @media print{
    body{padding:0}
    .noprint{display:none}
    thead{display:table-header-group}
    tr{break-inside:avoid}
  }
</style></head><body><div class="sheet">

${gaps.length ? `<div class="warn noprint"><strong>Not ready to issue.</strong>
  The supplier block is missing: ${esc(gaps.join(", "))}.</div>` : ""}
${inv.needsAttention.length ? `<div class="warn noprint"><strong>Needs attention.</strong>
  ${inv.needsAttention.map(esc).join("; ")}.</div>` : ""}

<div class="masthead">
  <div class="brand">
    <img class="logo" src="${LOGO_DATA_URI}" alt="${esc(SUPPLIER.legalName)}" />
    <p class="doctype">Tax Invoice</p>
  </div>
  <div class="supplier">
    <p class="name">${esc(SUPPLIER.legalName)}</p>
    ${supplierAddressLines().map((l) => `<p>${esc(l)}</p>`).join("")}
    <p>${esc(SUPPLIER.phone)}</p>
    <p>${esc(SUPPLIER.email)}</p>
    <p class="gstin">GSTIN ${esc(SUPPLIER.gstin)}</p>
  </div>
</div>

<div class="meta">
  <div><dt>Invoice No.</dt><dd>${esc(inv.invoiceNumber)}</dd></div>
  <div><dt>Order No.</dt><dd>${esc(inv.orderName)}</dd></div>
  <div><dt>Invoice Date</dt><dd>${esc(DATE_FMT.format(new Date(inv.createdAt)))}</dd></div>
  <div><dt>Payment</dt><dd>${esc(inv.paymentMode)}</dd></div>
  <div><dt>Place of Supply</dt><dd>${esc(inv.placeOfSupply)}</dd></div>
  <div><dt>Supply Type</dt><dd>${inter ? "Inter-state · IGST" : "Intra-state · CGST + SGST"}</dd></div>
</div>

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

<div class="foot">
<div class="words">
  <h4>Total in words</h4>
  <p class="inwords">${esc(amountInWords(inv.totals.gross).toUpperCase())}</p>
  <p class="fine">Prices are inclusive of GST. Amounts in Indian Rupees.</p>
</div>

<div class="summary">
  <div><span>Discount</span><span>−${money(0)}</span></div>
  <div><span>Total Before Tax</span><span>${money(inv.totals.taxable)}</span></div>
  ${inter
    ? `<div><span>IGST @ 18%</span><span>${money(inv.totals.igst)}</span></div>`
    : `<div><span>CGST @ 9%</span><span>${money(inv.totals.cgst)}</span></div>
       <div><span>SGST @ 9%</span><span>${money(inv.totals.sgst)}</span></div>`}
  <div class="band"><span>Total Tax</span><span>${money(inv.totals.gst)}</span></div>
  <div><span>Total After Tax</span><span>${money(inv.totals.gross)}</span></div>
  <div class="sub"><span>Shipping Amount</span><span>${money(inv.shipping ? inv.shipping.taxable : 0)}</span></div>
  <div class="sub"><span>Shipping Tax</span><span>${money(inv.shipping ? inv.shipping.gst : 0)}</span></div>
  <div class="sub"><span>Shipping Total</span><span>${money(inv.shipping ? inv.shipping.gross : 0)}</span></div>
  <div class="grand"><span>Grand Total</span><span>${money(inv.totals.gross)}</span></div>
</div>
</div>

<footer>
  <div><strong>Thank you for your business.</strong><br />
    Questions? ${esc(SUPPLIER.email)}</div>
  <div class="sign">For ${esc(SUPPLIER.legalName)}<div class="line">Authorised signatory</div></div>
</footer>
</div></body></html>`;
}
