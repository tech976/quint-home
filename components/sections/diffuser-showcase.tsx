import Link from "next/link";
import Image from "next/image";
import { diffusers } from "@/lib/data/diffusers";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";

/**
 * Diffuser Showcase — features the full diffuser range in editorial cards.
 * Replaces the old generic "Diffusers vs Oils" CategoryDuo with something that
 * actually tells the buyer what they are choosing between.
 */
export function DiffuserShowcase() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Section header */}
        <FadeUp>
          <div className="mb-14 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                The Diffusers
              </p>
              <h2
                className="mt-5 max-w-[20ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Five objects.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  One for every room.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              Aluminium, soft fabric, and acrylic — each model sized for a
              different room, from a compact plug-in to an open-plan column.
            </p>
          </div>
        </FadeUp>

        {/* Three product cards */}
        <div className="grid gap-y-16 md:grid-cols-3 md:gap-x-8 md:gap-y-0">
          {diffusers.map((d, i) => (
            <FadeUp key={d.slug} delay={i * 0.08}>
              <Link href={`/shop/${d.slug}`} className="group block h-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      {d.tier === "premium" ? "Premium" : "Entry"}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-end p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                    <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                      Explore →
                    </span>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-3">
                    <h3
                      className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {d.name}
                    </h3>
                    <span className="tabular-nums text-[0.9rem]">
                      {formatINR(d.priceINR)}
                    </span>
                  </div>
                  <p className="max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    {d.tagline}
                  </p>
                  <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    {d.finish}
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Closing link */}
        <FadeUp delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-[color:var(--color-rule)] pt-10">
            <Link
              href="/shop?category=diffusers"
              className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
            >
              See every diffuser
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/shop?category=oils"
              className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)] transition-colors duration-500"
            >
              Or browse the oils →
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
