import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import type { Candle } from "@/lib/types";

/**
 * SCENES – the scent's own band on a candle page.
 *
 * Four atmosphere photographs, full bleed, standing on the jar's glass colour
 * washed over the brand's deepest sage. The band interrupts the page's white
 * rhythm, so it reads as the highlight by contrast rather than by decoration.
 * Every plate hangs from one bottom rail: the captions share a baseline while
 * the frames step, which is where the rhythm comes from.
 *
 * Server component – the entrance is FadeUp, everything else is CSS. No type
 * is ever set over a photograph, so no scrim is needed.
 */

/**
 * Frames alternate tall/short — the step is what makes the band a frieze
 * rather than a row. The two ratios sit inside the sources' own range
 * (portrait, 0.665–0.80), so object-cover crops single digits.
 */
const PLATE_FRAMES = ["aspect-[5/7]", "aspect-[3/4]"] as const;

/**
 * Which frame each candle's first plate takes. The Palace's archway is the
 * narrowest file in the set (0.667); starting it on the short frame would cut
 * a tenth of its height, so that candle begins on the tall one instead.
 */
const PLATE_PHASE: Record<string, number> = { "the-palace": 1 };

export function CandleScenes({ candle }: { candle: Candle }) {
  if (!candle.mood.length) return null;
  const headingId = `scenes-${candle.slug}`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate mt-[var(--spacing-section)] overflow-hidden bg-[color:var(--color-verdant)] pb-[var(--spacing-section-sm)] pt-[var(--spacing-section)]"
    >
      {/* The jar's own glass, laid over the deepest sage – colour by
          association, never at full strength. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: candle.swatch, opacity: 0.55 }}
      />

      {/* ── Masthead – keeps the page gutter; the plates deliberately do not ── */}
      <div className="mx-auto max-w-[var(--container-page)] px-6 md:px-10">
        <FadeUp>
          <div className="flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-stardust)]/75 md:text-[0.95rem] md:tracking-[0.22em]">
            <span>
              <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
              Scenes · {candle.notesLine}
            </span>
            <span className="h-px flex-1 bg-[color:var(--color-stardust)]/15" />
          </div>
        </FadeUp>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-12">
          <FadeUp delay={0.06} className="md:col-span-7">
            <h2
              id={headingId}
              className="max-w-[20ch] text-balance text-[color:var(--color-stardust)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              {candle.scenes.heading}{" "}
              <em className="text-[color:var(--color-aerial-soft)]">
                {candle.scenes.headingItalic}
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12} className="md:col-span-5 md:self-end">
            <p
              className="max-w-[42ch] text-[0.92rem] leading-[1.85] md:ml-auto md:text-right"
              style={{ color: "rgba(238, 228, 216, 0.72)" }}
            >
              {candle.scenes.lede}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── The plates – edge to edge, hung from one rail ── */}
      <ul
        role="list"
        className="mx-auto mt-14 grid max-w-[var(--container-page)] grid-cols-2 gap-x-2 gap-y-12 px-6 md:mt-20 md:gap-x-4 md:gap-y-16 md:px-10 lg:grid-cols-4 lg:gap-x-6"
      >
        {candle.mood.map((scene, i) => (
          <FadeUp key={scene.src} as="li" delay={0.18 + i * 0.07} className="flex flex-col justify-end">
            <figure className="group">
              <div
                className={`relative overflow-hidden border border-[color:var(--color-stardust)]/10 ${
                  PLATE_FRAMES[(i + (PLATE_PHASE[candle.slug] ?? 0)) % PLATE_FRAMES.length]
                }`}
              >
                <Image
                  src={scene.src}
                  alt={scene.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline gap-3">
                <span className="text-[0.62rem] tabular-nums tracking-[0.2em] text-[color:var(--color-stardust)]/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[0.82rem] leading-[1.45] text-[color:var(--color-stardust)]/85"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {scene.caption}
                </span>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </ul>
    </section>
  );
}
