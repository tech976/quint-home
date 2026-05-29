import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Quint Home — five hotels, three continents, and the question that started it.",
};

const hotels = [
  {
    no: "01",
    place: "Taj Lake Palace · Udaipur",
    year: "2023",
    image: "/images/vibe/vibe-07.jpg",
    note: "Warm jasmine, lake water, white marble after rain.",
    paragraph:
      "It started here. I checked into one of India's most celebrated hotels and the architecture is what I expected. What I didn't expect was to stop in the corridor and stand there, trying to understand what I was breathing — woven into the air of the entire palace, warm, unhurried, unlike anything I had ever smelled in someone's home.",
  },
  {
    no: "02",
    place: "The Aria · Las Vegas",
    year: "2024",
    image: "/images/vibe/vibe-04.jpg",
    note: "Green tea, fig leaf, the cool authority of a casino lobby.",
    paragraph:
      "A different continent, a different aesthetic — but the same arrested moment in a lobby. The same quiet certainty that someone had thought deeply about how this space should smell, and had made it so. I tried to source it. Same answer.",
  },
  {
    no: "03",
    place: "Four Seasons Safari Lodge · Serengeti",
    year: "2024",
    image: "/images/vibe/vibe-03.jpg",
    note: "Baobab wood, wild earth, the Tanzanian plains at dusk.",
    paragraph:
      "It kept happening. Warm baobab wood, the breath of the savannah after the sun drops. Intimate, vast, and impossible to describe to anyone who hadn't stood there with you.",
  },
  {
    no: "04",
    place: "Alila Fort Bishangarh · Rajasthan",
    year: "2025",
    image: "/images/vibe/vibe-15.jpg",
    note: "Jasmine, ancient sandstone, 236 years of warrior fort.",
    paragraph:
      "Jasmine and ancient stone — a 236-year-old warrior fort reimagined as something quietly sacred. The scent felt like an inheritance the building was passing through us.",
  },
  {
    no: "05",
    place: "The Ritz-Carlton · Nusa Dua, Bali",
    year: "2025",
    image: "/images/vibe/vibe-09.jpg",
    note: "Balinese frangipani, sea breeze, the Indian Ocean.",
    paragraph:
      "Cool, luminous, the Indian Ocean present in every breath. By the fifth time, I had stopped asking. The answer was always the same: proprietary. And so the question became its own answer.",
  },
];

export default function AboutPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO MASTHEAD
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                About · The Story
              </p>
              <h1
                className="mt-7 max-w-[16ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  fontWeight: 400,
                }}
              >
                Five hotels.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Three continents. One question.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                Quint Home was born from an obsession — why our homes smell
                like nothing in particular while the world&rsquo;s great hotels
                smell extraordinary.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  ONE — THE QUINTESSENCE
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-4">
              <div className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <p>§ One</p>
                <p className="mt-1">The Word</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.08} className="md:col-span-8">
              <p
                className="text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.014em",
                  fontWeight: 400,
                }}
              >
                <em className="text-[color:var(--color-aerial-deep)]">
                  Quintessence (n.):
                </em>{" "}
                the most perfect or typical example of a quality. The fifth and
                highest element in ancient and medieval philosophy, supposed to
                be the substance of the heavenly bodies.
              </p>
              <p className="mt-8 max-w-[60ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                We didn&rsquo;t name the brand for the dictionary. We named it
                because hotels understand something most of us don&rsquo;t:
                scent is the invisible layer of luxury. It sets the tone before
                you see anything, before you touch anything. Why do we accept
                that our homes — the spaces where we spend the majority of our
                lives — smell like nothing in particular?
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO — THE FIVE
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-16 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Two · The Pilgrimage
                </p>
                <h2
                  className="mt-5 max-w-[22ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Five rooms,{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    over three years, each unforgettable.
                  </em>
                </h2>
              </div>
              <p className="max-w-[26ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                Each one stopped us mid-corridor. Each one&rsquo;s answer was
                the same.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-y-20 md:gap-y-28">
            {hotels.map((h, i) => (
              <FadeUp key={h.no} delay={0.05}>
                <div
                  className={`grid items-center gap-10 md:grid-cols-12 md:gap-14 ${
                    i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative md:col-span-7">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                      <Image
                        src={h.image}
                        alt={h.place}
                        fill
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute left-5 top-5 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-stardust)]">
                        {h.place.split(" · ")[1]} · {h.year}
                      </div>
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      <span>{h.note}</span>
                      <span>{h.year}</span>
                    </figcaption>
                  </figure>
                  <div className="md:col-span-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                      {h.no} of 05
                    </p>
                    <h3
                      className="mt-5"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.08,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {h.place}
                    </h3>
                    <p className="mt-6 max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                      {h.paragraph}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  THREE — VISION
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Three · The Vision</span>
              <span className="h-px flex-1 bg-[color:var(--color-stardust)]/15" />
            </div>
          </FadeUp>

          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              <h2
                className="text-balance text-[color:var(--color-stardust)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-4xl)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.022em",
                  fontWeight: 400,
                }}
              >
                To become India&rsquo;s defining premium scenting brand —{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  and then to take it global.
                </em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <dl className="grid gap-10">
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/55">
                    In five years
                  </dt>
                  <dd className="mt-3 text-[var(--text-base)] leading-[1.7]" style={{ color: "rgba(238, 228, 216, 0.85)" }}>
                    A nationally recognised brand. Diffusers and oils in
                    homes, restaurants, hotels, malls, and offices across
                    India.
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/55">
                    In ten to twenty
                  </dt>
                  <dd className="mt-3 text-[var(--text-base)] leading-[1.7]" style={{ color: "rgba(238, 228, 216, 0.85)" }}>
                    Indian-curated, hotel-grade fragrance culture exported to
                    UAE, Singapore, the UK, and the wider diaspora.
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/55">
                    Today
                  </dt>
                  <dd className="mt-3 text-[var(--text-base)] leading-[1.7]" style={{ color: "rgba(238, 228, 216, 0.85)" }}>
                    Designed in Mumbai. D2C through this site, with a B2B
                    channel for architects and hospitality.
                  </dd>
                </div>
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  CLOSING CTA
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              § Begin
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="mx-auto mt-7 max-w-[22ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              Five seconds in a hotel corridor.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Forever in your home.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Shop the range
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/journal"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
              >
                Read the Journal
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
