"use client";

import { useState, useTransition } from "react";
import { applyDiscountAction } from "@/app/actions/cart";
import { useCart } from "@/components/cart/cart-provider";
import { formatINR } from "@/lib/utils";

/**
 * Discount code entry.
 *
 * Every rule lives in Shopify — eligibility, minimum spend, dates, usage
 * limits — so this only hands the code over and shows what comes back. An
 * applied code is shown as a line the customer can remove, rather than a field
 * they have to clear.
 *
 * Starts collapsed: a prominent empty box invites people to go hunting for a
 * code they do not have, and abandon the bag to look for one.
 */
export function DiscountField({ compact = false }: { compact?: boolean }) {
  const { cart, setCart } = useCart();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const applied = cart?.discountCode ?? null;
  const discount = cart?.discount ?? 0;

  const submit = (value: string) => {
    setError(null);
    start(async () => {
      const res = await applyDiscountAction(value);
      if (res.cart) setCart(res.cart);
      setError(res.error);
      if (!res.error && value) setCode("");
    });
  };

  if (applied) {
    return (
      <div
        className={`flex items-baseline justify-between gap-4 ${
          compact ? "" : "border-t border-[color:var(--color-rule)] pt-4"
        }`}
      >
        <span className="text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal)]">
          {applied}
          <span className="ml-2 normal-case tracking-normal text-[color:var(--color-charcoal-soft)]">
            applied
          </span>
        </span>
        <span className="flex items-baseline gap-4">
          {discount > 0 && (
            <span className="tabular-nums text-[0.86rem] text-[color:var(--color-clay)]">
              − {formatINR(discount)}
            </span>
          )}
          <button
            type="button"
            onClick={() => submit("")}
            disabled={pending}
            className="text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)] underline underline-offset-4 transition-colors hover:text-[color:var(--color-clay)] disabled:opacity-50"
          >
            {pending ? "…" : "Remove"}
          </button>
        </span>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "border-t border-[color:var(--color-rule)] pt-4"}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)] underline underline-offset-4 transition-colors hover:text-[color:var(--color-clay)]"
        >
          Have a discount code?
        </button>
      ) : (
        <div>
          <div className="flex items-end gap-3">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="discount-code"
                className="text-[0.56rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]"
              >
                Discount code
              </label>
              <input
                id="discount-code"
                value={code}
                autoFocus
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && code.trim() && !pending) {
                    e.preventDefault();
                    submit(code);
                  }
                }}
                placeholder="ENTER CODE"
                className="mt-2 w-full border-b border-[color:var(--color-charcoal)] bg-transparent py-1.5 text-[0.95rem] tracking-[0.08em] text-[color:var(--color-charcoal)] outline-none transition-colors placeholder:tracking-[0.2em] placeholder:text-[color:var(--color-charcoal-soft)]/50 focus:border-[color:var(--color-clay)]"
              />
            </div>
            <button
              type="button"
              onClick={() => submit(code)}
              disabled={pending || !code.trim()}
              className="shrink-0 pb-2 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal)] transition-colors hover:text-[color:var(--color-clay)] disabled:opacity-40"
            >
              {pending ? "Checking…" : "Apply"}
            </button>
          </div>
          {error && (
            <p
              role="status"
              className="mt-2.5 text-[0.76rem] leading-[1.5] text-[color:var(--color-clay-deep)]"
            >
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
