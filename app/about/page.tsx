import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";
import { MonogramDivider } from "@/components/brand/monogram-divider";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Quint Home began: one question about why our homes smell like nothing, and what we built to answer it. The story, the mission, and the vision.",
};

export default function AboutPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO MASTHEAD — the question
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-14 md:pt-24">
        <div className="mx-auto flex max-w-[var(--container-content)] flex-col items-center px-6 pb-16 text-center md:px-10 md:pb-28">
          {/* Eyebrow — centered with symmetric rules on each side */}
          <FadeUp delay={0.05}>
            <div className="flex items-center justify-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
              <span>About · The Story</span>
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>

          {/* Framing line, centered */}
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-12 text-[var(--text-lg)] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:mt-16">
              It began with one question we couldn&rsquo;t let go of.
            </p>
          </FadeUp>

          {/* The question — the hero, centered and balanced */}
          <FadeUp delay={0.16}>
            <h1
              className="mx-auto mt-5 max-w-[18ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 1.06,
                letterSpacing: "-0.022em",
                fontWeight: 400,
              }}
            >
              Why do our homes smell like nothing in particular, when the great
              hotels of the world{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                smell unforgettable?
              </em>
            </h1>
          </FadeUp>

          {/* Closing detail, centered — keeps the masthead balanced top and bottom */}
          <FadeUp delay={0.22}>
            <p className="mx-auto mt-12 text-[0.6rem] uppercase tracking-[0.38em] text-[color:var(--color-charcoal-soft)] md:mt-16">
              Mumbai · Est. 2026
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  ONE — THE WORD (quintessence)
          ==================================================== */}
      <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          {/* Eyebrow */}
          <FadeUp>
            <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span>§ One · The Word</span>
              <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>

          {/* The word itself, treated as the entry headword */}
          <div className="mt-10 grid gap-x-16 gap-y-6 md:grid-cols-12 md:items-end md:gap-y-0">
            <FadeUp delay={0.05} className="min-w-0 md:col-span-9">
              <h2
                className="leading-[0.9]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-display)",
                  letterSpacing: "-0.03em",
                  fontWeight: 400,
                }}
              >
                Quint
                <span className="text-[color:var(--color-clay)]">essence</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.12} className="min-w-0 md:col-span-3">
              <p className="text-[0.62rem] uppercase leading-[1.8] tracking-[0.28em] text-[color:var(--color-charcoal-soft)] md:text-right">
                noun
                <br />
                /kwɪnˈtɛsəns/
                <br />
                <span className="text-[color:var(--color-aerial-deep)]">
                  the fifth element
                </span>
              </p>
            </FadeUp>
          </div>

          {/* Definition + why we chose it */}
          <div className="mt-12 grid gap-x-16 gap-y-10 border-t border-[color:var(--color-rule)] pt-10 md:mt-14 md:grid-cols-12">
            <FadeUp delay={0.06} className="min-w-0 md:col-span-6">
              <p
                className="max-w-[34ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1.28,
                  letterSpacing: "-0.012em",
                  fontWeight: 400,
                }}
              >
                The most perfect or typical example of a quality.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  The fifth and highest element
                </em>{" "}
                in ancient and medieval philosophy, supposed to be the substance
                of the heavenly bodies.
              </p>
            </FadeUp>

            <FadeUp delay={0.12} className="min-w-0 md:col-span-6">
              <p className="text-[var(--text-base)] leading-[1.9] text-[color:var(--color-charcoal-soft)]">
                We didn&rsquo;t pick the name out of a dictionary. We picked it
                because the best version of a thing is rare, and scent is no
                exception. Done well, it sets the tone of a room before you
                notice anything else in it. Most of us spend the majority of our
                lives in homes that smell of nothing at all.
              </p>
              <p
                className="mt-6 max-w-[24ch] font-[family-name:var(--font-serif)] text-[color:var(--color-charcoal)]"
                style={{
                  fontSize: "var(--text-xl)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                }}
              >
                We thought that was{" "}
                <em className="text-[color:var(--color-clay)]">
                  worth fixing.
                </em>
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO — THE PILGRIMAGE (the founder's story)
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          {/* Centered header — symmetric eyebrow + heading */}
          <FadeUp>
            <div className="flex items-center justify-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
              <span>§ Two · The Pilgrimage</span>
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2
              className="mx-auto mt-8 max-w-[20ch] text-balance text-center"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              It started with a scent{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                I couldn&rsquo;t buy anywhere.
              </em>
            </h2>
          </FadeUp>

          {/* Centered focal image — the founding hallway */}
          <FadeUp delay={0.1}>
            <figure className="mx-auto mt-12 max-w-[44rem] md:mt-16">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color:var(--color-stardust)]">
                <Image
                  src="/images/home/home-02.png"
                  alt="A quiet, warm hallway at dusk"
                  fill
                  sizes="(min-width: 768px) 44rem, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-[var(--text-xs)] italic text-[color:var(--color-charcoal-soft)]">
                The hallway — where the question began.
              </figcaption>
            </figure>
          </FadeUp>

          {/* Symmetric two-column narrative — equal measures, left and right */}
          <div className="mt-14 grid gap-x-16 gap-y-8 border-t border-[color:var(--color-rule)] pt-10 md:mt-16 md:grid-cols-2 md:gap-x-20">
            <FadeUp delay={0.06} className="min-w-0">
              <p className="text-[var(--text-base)] leading-[1.9] text-[color:var(--color-charcoal-soft)] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-[family-name:var(--font-serif)] [&::first-letter]:text-[3.2rem] [&::first-letter]:font-normal [&::first-letter]:leading-[0.9] [&::first-letter]:text-[color:var(--color-charcoal)]">
                It started in Udaipur, three years ago, at a palace on the water.
                I had gone for the architecture and the lake. What I remember is
                standing still in a hallway, trying to work out what I was
                breathing. The fragrance was everywhere and nowhere. Not a
                candle, not a spray. Warm, unhurried, woven through the whole
                place, and nothing like the air in any home I knew. I asked the
                staff where it came from. They were kind about it, but the answer
                was proprietary. I spent weeks back in Mumbai trying to track it
                down, and got nowhere.
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="min-w-0">
              <div className="space-y-7 text-[var(--text-base)] leading-[1.9] text-[color:var(--color-charcoal-soft)]">
                <p>
                  Then it kept happening. A casino tower on the Las Vegas Strip,
                  a year later. A safari lodge in the Serengeti, all baobab wood
                  and wild earth. A restored fort in Rajasthan, heavy with
                  jasmine and old stone. A beach retreat in Bali, frangipani
                  carried in on the sea air. Different countries, different
                  rooms, the same arrested moment every time. Someone had decided
                  exactly how that space should smell, and made it so. Each time
                  I asked. Each time, the same answer.
                </p>
                <p className="text-[color:var(--color-charcoal)]">
                  Places like that get something the rest of us miss. Scent
                  reaches you before anything you can see or touch, and it
                  decides how a room feels. So why do we put up with homes, where
                  we spend most of our lives, that smell of nothing at all?
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Centered closing line */}
          <FadeUp delay={0.08}>
            <p
              className="mx-auto mt-14 max-w-[26ch] border-t border-[color:var(--color-rule)] pt-10 text-center font-[family-name:var(--font-serif)] text-[color:var(--color-clay)] md:mt-16"
              style={{
                fontSize: "var(--text-2xl)",
                lineHeight: 1.2,
                letterSpacing: "-0.014em",
              }}
            >
              Quint Home exists because I couldn&rsquo;t stop thinking about that.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  THREE — THE MISSION
          ==================================================== */}
      <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          {/* Centered header — symmetric eyebrow + heading */}
          <FadeUp>
            <div className="flex items-center justify-center gap-4 text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
              <span>§ Three · The Mission</span>
              <span className="h-px w-10 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p
              className="mx-auto mt-8 max-w-[24ch] text-balance text-center"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-4xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                fontWeight: 400,
              }}
            >
              Exceptional scent,{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                made effortless for the Indian home.
              </em>
            </p>
          </FadeUp>

          {/* Three pillars — equal columns, symmetric left to right */}
          <div className="mt-14 grid grid-cols-1 border-t border-[color:var(--color-rule)] sm:grid-cols-3 sm:divide-x sm:divide-[color:var(--color-rule)] md:mt-16">
            {[
              {
                label: "Access",
                body: "To give India’s design-conscious homes access to hotel-grade fragrance, through beautifully made devices, carefully blended oils, and smart technology that makes exceptional scenting effortless.",
              },
              {
                label: "The Standard",
                body: "We hold every product to one standard: diffusers that perform the same on day one and day five hundred, and oils with the depth and strength to fill a room and stay there.",
              },
              {
                label: "Home & Trade",
                body: "That goes for the people furnishing a single bedroom and for the restaurants and stores that want a scent their customers remember long after they leave.",
              },
            ].map((pillar, i) => (
              <FadeUp key={pillar.label} delay={0.08 + i * 0.06}>
                <div className="flex h-full flex-col items-center px-4 pt-10 text-center sm:px-8">
                  <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-clay)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-xl)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {pillar.label}
                  </p>
                  <p className="mx-auto mt-5 max-w-[34ch] text-[var(--text-base)] leading-[1.8] text-[color:var(--color-charcoal-soft)]">
                    {pillar.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  FOUR — THE VISION  (inverted, with one atmospheric plate)
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Four · The Vision</span>
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

            <FadeUp delay={0.1} className="min-w-0 md:col-span-5">
              <div
                className="space-y-5 text-[var(--text-base)] leading-[1.8]"
                style={{ color: "rgba(238, 228, 216, 0.85)" }}
              >
                <p>
                  To change how homes, restaurants, hotels, malls, and offices
                  across India experience fragrance — good engineering and
                  serious scent built into one considered object.
                </p>
                <p>
                  Within five years: nationally recognised, scenting both homes
                  and commercial spaces across India. In ten to twenty: carrying
                  Indian-curated fragrance to the world.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* One quiet, atmospheric plate to close the section — a held breath
              before the invitation, not decoration. */}
          <FadeUp delay={0.16}>
            <figure className="mt-14 md:mt-16">
              <div className="relative aspect-[2.4/1] w-full overflow-hidden">
                <Image
                  src="/images/vibe/vibe-04.jpg"
                  alt="Late light moving over water"
                  fill
                  sizes="(min-width: 1600px) 1520px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[var(--text-xs)] italic text-[color:var(--color-stardust)]/55">
                Light on the water — the kind of atmosphere we are after.
              </figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* Monogram divider into the close */}
      <FadeUp>
        <MonogramDivider className="pt-[var(--spacing-section)]" />
      </FadeUp>

      {/* ====================================================
          §  CLOSING — the invitation
          ==================================================== */}
      <section className="pb-[var(--spacing-section)] pt-12 md:pt-16">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              The Invitation
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
              The scent that stopped me in a hallway.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Now it lives at home.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:border-[color:var(--color-clay)] hover:text-[color:var(--color-clay)]"
              >
                Shop the range
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
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
