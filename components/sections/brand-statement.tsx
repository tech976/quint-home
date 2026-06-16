import { FadeUp } from "@/components/motion/fade-up";

/**
 * Brand Statement — the "why Quint" beat. A large serif claim paired with a
 * concentration-contrast panel (70–90% vs 1–3%) that visualises the single
 * fact the brand turns on. Editorial: hairline rules, one clay accent, no cards.
 */
export function BrandStatement() {
  const facts = [
    "No water",
    "No heat",
    "Near-silent",
    "Set once, walk into it for years",
  ];

  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Centered eyebrow — symmetric rules on each side */}
        <FadeUp>
          <div className="flex items-center justify-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
            <span className="h-px w-10 bg-[color:var(--color-rule)]" />
            <span>Why Quint</span>
            <span className="h-px w-10 bg-[color:var(--color-rule)]" />
          </div>
        </FadeUp>

        {/* Centered lead statement */}
        <FadeUp delay={0.06}>
          <h2
            className="mx-auto mt-10 max-w-[46ch] text-balance text-center md:mt-12"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-3xl)",
              lineHeight: 1.28,
              letterSpacing: "-0.014em",
              fontWeight: 400,
            }}
          >
            You think about every surface in a room, then leave the air to
            chance.{" "}
            <em className="text-[color:var(--color-aerial-deep)]">
              Scent is the part of a home you actually breathe — and most homes
              forget it.
            </em>
          </h2>
        </FadeUp>

        {/* Concentration contrast — a symmetric two-side comparison */}
        <FadeUp delay={0.12}>
          <div className="mx-auto mt-14 max-w-[46rem] md:mt-16">
            <p className="text-center text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
              Fragrance concentration
            </p>

            <div className="mt-8 grid grid-cols-2 border-t border-[color:var(--color-rule)] divide-x divide-[color:var(--color-rule)]">
              {/* Quint */}
              <div className="flex flex-col items-center px-4 pt-8 text-center md:px-8">
                <span className="text-[0.58rem] uppercase tracking-[0.3em] text-[color:var(--color-charcoal)]">
                  Quint oils
                </span>
                <span
                  className="mt-4 tabular-nums text-[color:var(--color-clay)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-5xl)",
                    letterSpacing: "-0.022em",
                    lineHeight: 1,
                  }}
                >
                  70–90%
                </span>
                <div className="mt-6 h-1.5 w-full max-w-[14rem] overflow-hidden bg-[color:var(--color-rule)]">
                  <div
                    className="ml-auto h-full bg-[color:var(--color-clay)]"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              {/* Ordinary water diffuser */}
              <div className="flex flex-col items-center px-4 pt-8 text-center md:px-8">
                <span className="text-[0.58rem] uppercase tracking-[0.3em] text-[color:var(--color-charcoal-soft)]">
                  Ordinary water diffuser
                </span>
                <span
                  className="mt-4 tabular-nums text-[color:var(--color-charcoal-soft)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-5xl)",
                    letterSpacing: "-0.022em",
                    lineHeight: 1,
                  }}
                >
                  1–3%
                </span>
                <div className="mt-6 h-1.5 w-full max-w-[14rem] overflow-hidden bg-[color:var(--color-rule)]">
                  <div
                    className="h-full bg-[color:var(--color-aerial-deep)]"
                    style={{ width: "4%" }}
                  />
                </div>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-[40ch] text-center text-[0.82rem] leading-[1.6] text-[color:var(--color-charcoal-soft)]">
              The full perfume in the room — never watered down.
            </p>
          </div>
        </FadeUp>

        {/* Supporting line — large serif statement */}
        <FadeUp delay={0.06}>
          <p
            className="mx-auto mt-16 max-w-[50ch] text-balance border-t border-[color:var(--color-rule)] pt-12 text-center md:mt-20"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-3xl)",
              lineHeight: 1.28,
              letterSpacing: "-0.014em",
              fontWeight: 400,
            }}
          >
            That is the difference between a scent that fades by the door{" "}
            <em className="text-[color:var(--color-aerial-deep)]">
              and one that fills the whole room, and holds for hours.
            </em>
          </p>
        </FadeUp>

        {/* Proof points — a symmetric, centered 4-up row */}
        <div className="mx-auto mt-14 grid max-w-[64rem] grid-cols-2 border-t border-[color:var(--color-rule)] md:mt-16 md:grid-cols-4 md:divide-x md:divide-[color:var(--color-rule)]">
          {facts.map((f, i) => (
            <FadeUp key={f} delay={0.1 + i * 0.06}>
              <div className="flex h-full flex-col items-center px-4 pt-8 text-center md:px-6">
                <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-clay)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="mx-auto mt-4 max-w-[14ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-2xl)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.014em",
                    fontWeight: 400,
                  }}
                >
                  {f}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
