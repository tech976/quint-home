"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { CartGift } from "@/lib/cart-gift";

/**
 * Frames a diffuser and the complimentary oil it ships with as one parcel —
 * which is what the customer actually receives. The label sits on the rule the
 * way a fieldset legend does, so the frame reads as packaging rather than as a
 * second card. `ground` has to match whatever the frame sits on, since the
 * label punches a hole in the border.
 */
export function InTheBox({
  ground = "var(--color-background)",
  compact = false,
  children,
}: {
  ground?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative border border-[color:var(--color-rule)] ${
        compact ? "px-3.5 pb-4 pt-5" : "px-5 pb-6 pt-7"
      }`}
    >
      <span
        className="font-eyebrow absolute left-4 top-0 -translate-y-1/2 px-2"
        style={{ background: ground }}
      >
        In the box
      </span>
      {children}
    </div>
  );
}

/**
 * The complimentary oil, inside the parcel frame and below a dashed rule — the
 * perforation of the box. No quantity stepper and no remove button: it belongs
 * to the diffuser above it and leaves the bag with it. No struck-through price
 * either; a gift with a price tag on it reads as a transaction.
 */
export function GiftLine({
  gift,
  quantity = 1,
  compact = false,
}: {
  gift: CartGift;
  quantity?: number;
  compact?: boolean;
}) {
  const name = (
    <span className={compact ? "text-[0.82rem]" : "text-[0.92rem]"}>
      {gift.label}
    </span>
  );

  return (
    <div
      className={`flex items-center gap-3 border-t border-dashed border-[color:var(--color-rule)] ${
        compact ? "mt-3.5 pt-3.5" : "mt-5 pt-5"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[color:var(--color-stardust-soft)] ${
          compact ? "h-11 w-9" : "h-14 w-11"
        }`}
      >
        {gift.image && (
          // Same reasoning as the line thumbnails: plain img, not next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gift.image}
            alt=""
            className="h-[100%] w-[100%] object-cover"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate">
          {gift.href ? (
            <Link
              href={gift.href}
              className="transition-colors duration-500 hover:text-[color:var(--color-clay)]"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </p>
        <p className="mt-0.5 truncate text-[0.68rem] text-[color:var(--color-charcoal-soft)]">
          Your chosen scent
        </p>
      </div>

      {/* The one warm note in the frame. "Free", never ₹0 — a zero in the
          price column reads as a bug rather than as a gift. */}
      <span
        className="shrink-0 text-[color:var(--color-clay)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: compact ? "0.95rem" : "1.05rem",
        }}
      >
        Free{quantity > 1 ? ` × ${quantity}` : ""}
      </span>
    </div>
  );
}
