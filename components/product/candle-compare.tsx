import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { candles } from "@/lib/data/candles";
import { formatINR } from "@/lib/utils";

/**
 * The two scents you are not looking at, side by side: a small portrait and a
 * line or two beside it. With only three candles a full comparison table said
 * the same thing six times over — the useful difference is the room each one
 * suits, which fits in a sentence.
 */
export function CandleCompare({ current }: { current?: string }) {
  const others = candles.filter((c) => c.slug !== current);
  if (!others.length) return null;

  return (
    <section className="border-t border-[color:var(--color-rule)] py-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
            The other candles
          </p>
        </FadeUp>

        <div className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-x-10">
          {others.map((c, i) => (
            <FadeUp key={c.slug} delay={i * 0.06}>
              <Link
                href={`/range/${c.slug}`}
                className="group grid grid-cols-[12rem_1fr] items-start gap-5 border-t border-[color:var(--color-rule)] pt-2 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-7"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src={c.image}
                    alt={`${c.name} – ${c.notesLine} soy wax candle`}
                    fill
                    sizes="(min-width: 768px) 24rem, 12rem"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                  />
                </div>

                <div className="md:pt-2">
                  <p className="text-[0.52rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                    {c.notesLine}
                  </p>
                  <h3
                    className="mt-1.5 transition-colors group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-lg)",
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-1.5 max-w-[32ch] text-[0.82rem] leading-[1.55] text-[color:var(--color-charcoal-soft)]">
                    {c.tagline} For {c.placement.toLowerCase().replace(" · ", " and ")}.
                  </p>
                  <p className="mt-2.5 flex items-center gap-3 text-[0.54rem] uppercase tracking-[0.28em] text-[color:var(--color-charcoal-soft)]">
                    <span className="tabular-nums tracking-normal text-[0.78rem] text-[color:var(--color-charcoal)]">
                      {formatINR(c.priceINR)}
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      View →
                    </span>
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
