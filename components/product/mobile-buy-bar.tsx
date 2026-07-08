import { formatINR } from "@/lib/utils";

/**
 * Sticky price + CTA bar for mobile PDPs. On small screens the gallery stacks
 * above the buy box, pushing the price below the fold — this keeps the price
 * and a jump-to-buy action visible at all times. Hidden on lg and up.
 */
export function MobileBuyBar({
  name,
  priceINR,
}: {
  name: string;
  priceINR: number;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)]/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[var(--container-full)] items-center justify-between gap-4 px-5 py-3">
        <div className="min-w-0">
          <p className="truncate text-[0.6rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal-soft)]">
            {name}
          </p>
          <p
            className="tabular-nums leading-none text-[color:var(--color-charcoal)]"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem" }}
          >
            {formatINR(priceINR)}
          </p>
        </div>
        <a
          href="#buy"
          className="shrink-0 bg-[color:var(--color-charcoal)] px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--color-ivory)] transition-colors hover:bg-[color:var(--color-clay-deep)]"
        >
          Add to bag
        </a>
      </div>
    </div>
  );
}
