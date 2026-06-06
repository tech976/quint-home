import { FadeUp } from "@/components/motion/fade-up";
import { EditorialCarousel, type Slide } from "@/components/ui/editorial-carousel";

/**
 * A drag-scroll gallery of real rooms with a Quint diffuser in them.
 * Eyebrows name the room; captions are short and plain.
 */
const slides: Slide[] = [
  { src: "/images/home/home-01.png", alt: "A living room at dusk with a Quint diffuser on a side table", eyebrow: "The Living Room", caption: "Warm light, and the air to match." },
  { src: "/images/home/home-03.png", alt: "A sitting room with a black Quint diffuser on the coffee table", eyebrow: "The Sitting Room", caption: "On the table, not hidden away." },
  { src: "/images/home/home-04.png", alt: "A bedroom nightstand with a Quint diffuser and a low lamp", eyebrow: "The Bedroom", caption: "The last thing on at night." },
  { src: "/images/home/home-05.png", alt: "A lounge lit with warm ceiling spots and a Quint diffuser by the sofa", eyebrow: "The Lounge", caption: "Lit low, after dark." },
  { src: "/images/home/home-06.png", alt: "A reading corner with an armchair, a round mirror, and a Quint diffuser", eyebrow: "The Reading Corner", caption: "A corner kept for yourself." },
  { src: "/images/home/home-07.png", alt: "A bright drawing room with a curved sofa and a Quint diffuser on the table", eyebrow: "The Drawing Room", caption: "Late morning, with the curtains open." },
  { src: "/images/home/home-08.png", alt: "A minimal living room with Quint diffusers on a marble console", eyebrow: "The Quiet Room", caption: "Where less is the point." },
];

export function Atmosphere() {
  return (
    <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                § Atmosphere
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
                The rooms we{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  built Quint to live in.
                </em>
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.88rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
              The diffuser at home, in the rooms it was made for.
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
