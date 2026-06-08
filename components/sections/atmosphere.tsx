import { FadeUp } from "@/components/motion/fade-up";
import { EditorialCarousel, type Slide } from "@/components/ui/editorial-carousel";

/**
 * A drag-scroll moodboard — what the brand looks like at the edges of vision.
 * Uses the brand vibe library as a curated visual library.
 */
const slides: Slide[] = [
  { src: "/images/vibe/vibe-01.jpg", alt: "An open window, summer afternoon", eyebrow: "Morning Light", caption: "The light an hour before guests arrive." },
  { src: "/images/vibe/vibe-14.jpg", alt: "Linen and morning shadow", eyebrow: "Linen", caption: "Still warm from the sun." },
  { src: "/images/vibe/vibe-17.jpg", alt: "Sun through a canopy at dawn", eyebrow: "Daybreak", caption: "Light through the canopy, slowly." },
  { src: "/images/vibe/vibe-16.jpg", alt: "Petals on stone", eyebrow: "Petals", caption: "On warm stone, late afternoon." },
  { src: "/images/vibe/vibe-20.jpg", alt: "A doorway at dusk", eyebrow: "The Doorway", caption: "At the close of day." },
  { src: "/images/vibe/vibe-22.jpg", alt: "A study, late afternoon", eyebrow: "The Study", caption: "Late afternoon. Unhurried." },
  { src: "/images/vibe/vibe-13.jpg", alt: "An interior in winter light", eyebrow: "Winter Light", caption: "Through Mumbai windows." },
  { src: "/images/vibe/vibe-21.jpg", alt: "Stillness", eyebrow: "Stillness", caption: "The quietest part of the day." },
];

export function Atmosphere() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                § Four · Atmosphere
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
                The pictures that{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  taught us how a room should feel.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.88rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              A working moodboard — light, texture, and quiet — pulled from
              three years of looking.
              <br />
              <span className="text-[0.62rem] uppercase tracking-[0.32em]">
                Drag to browse →
              </span>
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <EditorialCarousel
            slides={slides}
            slideWidth={360}
            slideWidthMobile={280}
            withPlateNumbers={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
