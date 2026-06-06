import { FadeUp } from "@/components/motion/fade-up";
import { reviews, reviewAverage } from "@/lib/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1 text-[0.78rem] text-[color:var(--color-clay)]"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                § Word of Mouth
              </p>
              <h2
                className="mt-5 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                What people keep{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  telling us.
                </em>
              </h2>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[0.74rem] tracking-[0.12em] text-[color:var(--color-clay)]">
                  ★★★★★
                </span>
                <span className="tabular-nums text-[0.92rem] text-[color:var(--color-charcoal)]">
                  {reviewAverage.toFixed(1)} / 5
                </span>
              </div>
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                From homes across India
              </span>
            </div>
          </div>
        </FadeUp>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <FadeUp key={r.name} delay={(i % 3) * 0.06}>
              <figure className="flex h-full flex-col border-t border-[color:var(--color-charcoal)]/15 pt-6">
                <Stars rating={r.rating} />
                <blockquote
                  className="mt-5 text-balance text-[color:var(--color-charcoal)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-xl)",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <p className="text-[0.92rem] text-[color:var(--color-charcoal)]">
                    {r.name}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.58rem] uppercase tracking-[0.26em] text-[color:var(--color-charcoal-soft)]">
                    <span>{r.city}</span>
                    <span className="opacity-50">·</span>
                    <span>{r.product}</span>
                  </p>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
