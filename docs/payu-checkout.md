# Own checkout + PayU, with Shopify as the backend

Shopify charges a **2% third-party transaction fee** on payments taken through
Shopify Checkout (Shopify Payments is not available to this store, so there is
no 0% option). Taking the payment ourselves and writing the finished order into
Shopify avoids that fee — PayU's ~2% is then the only cost.

Shopify remains the source of truth: orders, inventory, customers, fulfilment
and reporting all still live in Shopify Admin. Only the *checkout page* moves.

```
/cart → /checkout (our form)
      → POST /api/payu/initiate   checks the order can be fulfilled, records
                                  who it is for, signs it, redirects to PayU
      → PayU hosted payment page  (cards / UPI / net banking / wallets)
      ┌ POST /api/payu/callback   the customer's browser coming back
      └ POST /api/payu/webhook    PayU telling us directly, browser or no browser
            both → settlePayment  confirms with PayU, writes the Shopify order
      → /order/confirmed
```

## One payment, one order — always

The rule the whole flow is built around: **a payment PayU has captured always
ends up as an order in Shopify.** It used to be possible to pay and leave no
trace outside PayU and a server log. Each way that happened is now closed:

| What used to lose the order | What happens now |
| --- | --- |
| Customer pays by UPI and never returns to the tab | PayU's webhook writes the order without them |
| Bank says "failed", then takes the money a minute later | The webhook fires on the late success and writes the order |
| Pending-order cookie gone (other browser, in-app browser, >30 min) | There is no cookie: the delivery details live on the Shopify cart, and the cart id travels inside the signed payment |
| Phone number already on another Shopify customer, or invalid | Bad numbers are refused at the form; a clash drops the number from the customer record, keeps it on the address, and the order still goes in |
| Item sold out between bag and payment | Stock is re-checked before payment; if it still happens the order is written and flagged |
| Sold-out item left in the bag as a zero-quantity line | Never sent to Shopify |
| Bag changed in another tab during payment | A placeholder order records the payment, the bag and both totals |
| PayU's verify API down at that moment | Retried; a success bearing PayU's signature is accepted |
| Shopify down at that moment | Nothing half-written; the bag is left intact and the webhook retry writes the proper order |

### The three layers

1. **Before payment** (`/api/payu/initiate`). Phone, email and PIN are
   validated; the bag is re-checked against live stock; the free-oil rule is
   enforced. Anything Shopify would refuse an order for is caught while the
   customer can still fix it and has not paid.
2. **Settlement** (`lib/payu/settle.ts`). One routine, called by the browser
   return, the webhook and the staff recovery page. It asks PayU whether the
   transaction succeeded, looks for an order already carrying that transaction,
   claims the bag so two callers cannot both write, and writes the order.
3. **Never nothing** (`lib/shopify/admin.ts`). If Shopify refuses the order as
   placed, it is retried with less — without the customer's phone, without the
   customer record, ignoring stock limits. If Shopify refuses every form, a
   **placeholder order** is written instead: one custom line for the amount
   received, with the reason, the customer and the bag in its note.

### Where the pending order lives

On the Shopify cart, not in the browser:

- **Cart attributes** hold the delivery details and the transaction id.
- **Cart note** holds where settlement has got to: empty, claimed, or done.
- **PayU `udf2`–`udf4`** carry the cart id (hex-encoded), inside the signature.

So any process that learns a transaction succeeded can rebuild the whole order
from PayU's answer plus Shopify.

### What to look for in Shopify

Every order from this checkout is tagged `PayU` and `txn-<transaction id>`.

| Tag | Meaning | What to do |
| --- | --- | --- |
| `PayU-needs-attention` | The order went in, but not exactly as placed — or it is a placeholder | Read the order note; it says what and why |
| `PayU-duplicate` | A second order was written for one payment | Cancel it; the first is the real one |

A filter on `PayU-needs-attention` is the whole reconciliation queue.

### Recovering a payment by hand

`/admin/payments` (staff login). Paste the PayU **Transaction ID** — it begins
`QH`; it is not the all-digit PayU ID. It runs the same settlement, so it is
safe on a payment that already has its order.

## Environment

The checkout only takes over once **both** PayU and the Shopify Admin API are
configured. Until then `/cart` keeps handing off to the Shopify-hosted
checkout, so nothing breaks in the meantime.

| Variable | Required | Notes |
| --- | --- | --- |
| `PAYU_MERCHANT_KEY` | yes | From PayU. Public half of the credentials. |
| `PAYU_MERCHANT_SALT` | yes | **Secret.** Signs requests and verifies responses — server-side only. |
| `PAYU_MODE` | no | `production` to use `secure.payu.in`; anything else uses `test.payu.in`. |
| `SHOPIFY_ADMIN_TOKEN` | yes | Custom app token with `write_orders`, `read_products`, `write_inventory`. |
| `NEXT_PUBLIC_SITE_URL` | no | Overrides the origin used for the PayU callback URLs. |
| `SHIPPING_FLAT_INR` | no | Flat shipping below ₹5,000. **Defaults to 0** — set it to the real fee. |

Create the Admin token in Shopify: *Settings → Apps and sales channels →
Develop apps → Create an app → Configure Admin API scopes*.

### PayU webhook — required, one-time

In the PayU dashboard, *Settings → Webhooks*, add for **successful** payments:

```
https://www.quinthome.in/api/payu/webhook
```

Without it the site still works, but an order is only written when the
customer's browser makes it back, and a customer who pays in a UPI app and
closes the tab has paid with no order to show for it. `GET /api/checkout/status` prints the URL to use and confirms the
Admin token can read orders (`adminApi.ordersList` should be `200`).

## Security

PayU require both checks, and both are implemented:

1. **Response hash** — the postback is re-hashed with the salt
   (`sha512(SALT|status||||||udf5|…|txnid|key)`) and compared before anything
   is trusted. A forged callback is rejected.
2. **Verify API** — an independent server-to-server confirmation that the
   transaction really succeeded, so a replayed browser postback cannot create
   an order.

Amounts are never taken from the browser: the bag is re-read from Shopify and
the total recomputed server-side, then compared with the amount PayU confirms.

Two deliberate details:

- **The webhook is not trusted, only acted on.** Whatever a request to
  `/api/payu/webhook` claims, settlement asks PayU's API about that transaction
  id. A forged request can only cause a lookup — and if the id really was paid
  and has no order, writing it is correct.
- **A signed success is enough when the Verify API is unreachable.** The
  signature cannot be produced without the salt, and replaying it finds the
  order already written. An explicit "failure" or "pending" from the Verify API
  always wins over what the browser carried.

## Known gaps

- **The claim on the bag is strong, not absolute.** Shopify carts have no
  compare-and-set, so the claim is write-then-confirm. Two callers landing
  within the same instant on a slow network could both proceed; the order
  lookup and the `PayU-duplicate` tag are there for that. A proper lock needs
  a small key-value store (Vercel KV / Upstash).
- **Webhook retries are PayU's.** If Shopify is down for longer than PayU keeps
  retrying, the payment has no order until someone uses `/admin/payments`. The
  log line to alert on is `[payu] PAID BUT NOTHING WRITTEN TO SHOPIFY`.
- **Payments started before the cart carried the record** fall back to the old
  cookie, and without it to a placeholder order. This only concerns payments
  in flight at the moment of deployment.
- **State is free text** on the form. Shopify accepts it, but a misspelling
  affects the CGST/SGST vs IGST split on the invoice.
- **Refunds** — issued in PayU *and* marked in Shopify; the two are not linked.
- **Tax rules** — Shopify's checkout engine no longer applies these, so
  anything beyond GST-inclusive pricing and flat shipping must be implemented
  here. Discount codes are honoured: Shopify prices the cart, and the order
  records the difference.
