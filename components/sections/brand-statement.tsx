import { FadeUp } from "@/components/motion/fade-up";

/**
 * Brand Statement — matched to PDP "The Object" pattern.
 * Chapter mark in left column, large serif statement in right column.
 */
export function BrandStatement() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <FadeUp className="md:col-span-4">
            <div className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <p>§ Prelude</p>
              <p className="mt-1">A short letter</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08} className="md:col-span-8">
            <p
              className="text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.18,
                letterSpacing: "-0.014em",
                fontWeight: 400,
              }}
            >
              Five hotels. Three continents. Each one stopped us
              mid-corridor —{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                not for the architecture, for the scent.
              </em>
            </p>
            <p className="mt-8 max-w-[60ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
              Every time we asked where the fragrance could be sourced, the
              answer was the same — <em>proprietary</em>. Quint Home exists
              because we couldn&rsquo;t stop thinking about why our homes
              smell like nothing in particular while the world&rsquo;s great
              hotels smell extraordinary.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-12 bg-[color:var(--color-rule)]" />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                }}
              >
                S. Rambhiya — Founder, Mumbai
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
