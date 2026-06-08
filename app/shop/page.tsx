import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { diffusers } from "@/lib/data/diffusers";
import { oils } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Diffusers and fragrance oils — the Quint Home range. Editorial, considered, IFRA-compliant.",
};

export default function ShopPage() {
  const standardOils = oils.filter((o) => o.tier === "standard");
  const hotelOils = oils.filter((o) => o.tier === "hotel-credential");

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
                Shop · Diffusers · Oils · Hotel
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
                One object,{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  nine signatures, two credentials.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5 md:pl-2">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                Browse the diffuser models below, then choose from nine
                fragrance oils — including two compositions licensed from the
                world&rsquo;s great hospitality programs.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  ONE · DIFFUSERS
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § One · Diffusers
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
                  Three objects.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Each designed to live in plain sight.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                Brushed brass, glazed ceramic, hand-finished.
                <br />
                <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                  Designed for 30 to 800 sq ft →
                </span>
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-y-16 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-20 lg:gap-x-10">
            {diffusers.map((d, i) => (
              <FadeUp key={d.slug} delay={i * 0.05}>
                <Link href={`/shop/${d.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-stardust-soft)]">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                      <span>№{String(i + 1).padStart(2, "0")}</span>
                      <span>{d.tier === "premium" ? "Premium" : "Entry"}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] md:p-6">
                      <span>
                        {d.coverageSqFt[0]}–{d.coverageSqFt[1]} sq ft
                      </span>
                      <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                        Explore →
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
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
                    <p className="max-w-[38ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                      {d.tagline}
                    </p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      {d.finish}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO · OILS LIBRARY
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Two · The Library
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
                  Seven signatures.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Top, heart, and base.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                Each 100 ml bottle is 70–90% concentrate.
                <br />
                <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                  Lasts 60–140 days →
                </span>
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-px overflow-hidden bg-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {standardOils.map((o, i) => {
              // Alternate: every other card is a photographic plate, the rest are colored swatches.
              const photographic = i % 2 === 0;
              return (
                <FadeUp key={o.slug} delay={i * 0.03} className="contents">
                  <Link
                    href={`/shop/${o.slug}`}
                    className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-7"
                    style={
                      photographic
                        ? { backgroundColor: "var(--color-stardust-soft)" }
                        : { backgroundColor: o.swatch, color: o.textColor }
                    }
                  >
                    {photographic && (
                      <Image
                        src={o.image}
                        alt={`${o.name} — bottle study`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                      />
                    )}
                    {photographic && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(58,53,50,0.25) 0%, rgba(58,53,50,0.0) 35%, rgba(58,53,50,0.72) 100%)",
                        }}
                      />
                    )}

                    <div
                      className={`relative flex items-start justify-between text-[0.58rem] uppercase tracking-[0.32em] ${
                        photographic ? "text-[color:var(--color-stardust)]" : ""
                      } opacity-80`}
                    >
                      <span>№{String(i + 1).padStart(2, "0")}</span>
                      <span>{o.notes.heart[0]}</span>
                    </div>
                    <div className={`relative ${photographic ? "mt-auto" : "my-auto"}`}>
                      <h3
                        className={`text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-1 ${
                          photographic ? "text-[color:var(--color-stardust)]" : ""
                        }`}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "var(--text-2xl)",
                          lineHeight: 1.02,
                          letterSpacing: "-0.018em",
                        }}
                      >
                        {o.name}
                      </h3>
                      <p
                        className={`mt-3 max-w-[26ch] text-[0.82rem] leading-[1.55] opacity-80 ${
                          photographic ? "text-[color:var(--color-stardust)]" : ""
                        }`}
                      >
                        {o.tagline}
                      </p>
                      <div
                        className={`mt-4 flex items-end justify-between text-[0.68rem] opacity-80 ${
                          photographic ? "text-[color:var(--color-stardust)]" : ""
                        }`}
                      >
                        <span className="uppercase tracking-[0.18em] text-[0.58rem]">
                          {o.origin}
                        </span>
                        <span className="tabular-nums">{formatINR(o.priceINR)}</span>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  THREE · HOTEL CREDENTIALS
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-stardust)]/15 pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
                  § Three · Hotel Credentials
                </p>
                <h2
                  className="mt-5 max-w-[22ch] text-balance text-[color:var(--color-stardust)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Two scents,{" "}
                  <em className="text-[color:var(--color-aerial-soft)]">
                    licensed from the lobbies themselves.
                  </em>
                </h2>
              </div>
              <p
                className="max-w-[32ch] text-[0.86rem] leading-[1.65] md:text-right"
                style={{ color: "rgba(238, 228, 216, 0.7)" }}
              >
                Composed in partnership with the world&rsquo;s great
                hospitality scent programs. ₹1,999 per 100 ml.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {hotelOils.map((o, i) => (
              <FadeUp key={o.slug} delay={i * 0.08}>
                <Link href={`/shop/${o.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden text-[color:var(--color-stardust)]">
                    <Image
                      src={o.image}
                      alt={`${o.name} — bottle study`}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="absolute inset-0 object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(41,51,41,0.25) 0%, rgba(41,51,41,0.0) 35%, rgba(41,51,41,0.65) 100%)",
                      }}
                    />
                    <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
                      <div className="flex items-start justify-between text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]">
                        <span>№0{i + 8}</span>
                        <span className="rounded-full border border-[color:var(--color-stardust)]/70 px-3 py-1 text-[0.52rem]">
                          Hotel Credential
                        </span>
                      </div>
                      <div>
                        <h3
                          className="text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-1"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-3xl)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.022em",
                            color: "var(--color-stardust)",
                          }}
                        >
                          {o.name}
                        </h3>
                        <p className="mt-3 max-w-[32ch] text-[0.86rem] leading-[1.55] text-[color:var(--color-stardust)]/85">
                          {o.tagline}
                        </p>
                        <div className="mt-5 flex items-end justify-between text-[0.72rem] text-[color:var(--color-stardust)]/85">
                          <span className="uppercase tracking-[0.18em] text-[0.6rem]">
                            {o.credential?.hotel}
                          </span>
                          <span className="tabular-nums">
                            {formatINR(o.priceINR)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  CLOSING — Pair & Save
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 text-center md:px-10">
          <FadeUp>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              § Pair & Subscribe
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
              One diffuser, one signature.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                Subscribe and save 15% on refills.
              </em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
              Configure your Monolith with a starting oil and we&rsquo;ll set a
              refill cadence you can pause anytime.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                href="/shop/the-monolith"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Configure the diffuser
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] hover:text-[color:var(--color-charcoal)]"
              >
                Speak to us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
