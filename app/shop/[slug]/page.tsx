import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { diffusers, getDiffuser } from "@/lib/data/diffusers";
import { oils, getOil } from "@/lib/data/oils";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToBag } from "@/components/product/add-to-bag";
import { EditorialCarousel, type Slide } from "@/components/ui/editorial-carousel";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return [
    ...diffusers.map((d) => ({ slug: d.slug })),
    ...oils.map((o) => ({ slug: o.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getDiffuser(slug) ?? getOil(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getDiffuser(slug);

  // For now, oils fall through to the existing stub — diffuser-specific PDP below.
  if (!product) {
    const oil = getOil(slug);
    if (!oil) notFound();
    return <OilStub slug={slug} />;
  }

  // The related companion scents — first 4 oils, with two hotel-credentialled ones surfaced.
  const relatedOils = oils
    .slice()
    .sort((a, b) => (a.tier === "hotel-credential" ? -1 : 1))
    .slice(0, 4);

  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO  —  split editorial composition
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto grid max-w-[var(--container-full)] gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — gallery */}
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="mb-6 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Link href="/shop" className="hover:text-[color:var(--color-clay)]">
                  Shop
                </Link>
                <span className="h-px w-6 bg-[color:var(--color-rule)]" />
                <span>Diffusers</span>
                <span className="h-px w-6 bg-[color:var(--color-rule)]" />
                <span>№ {String(diffusers.findIndex((d) => d.slug === slug) + 1).padStart(2, "0")} · {product.name}</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <ProductGallery images={product.gallery} alt={`${product.name} — Quint Home`} />
            </FadeUp>
          </div>

          {/* Right — sticky info column */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  Object № 01 · Diffuser
                </p>
              </FadeUp>

              <FadeUp delay={0.06}>
                <h1
                  className="mt-7 text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-5xl)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.024em",
                    fontWeight: 400,
                  }}
                >
                  {product.name}
                </h1>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p className="mt-6 max-w-[44ch] text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)]">
                  {product.tagline}
                </p>
              </FadeUp>

              {/* Hairline + key facts row */}
              <FadeUp delay={0.18}>
                <dl className="mt-10 grid grid-cols-2 gap-y-5 border-y border-[color:var(--color-rule)] py-6 text-[0.75rem]">
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      Coverage
                    </dt>
                    <dd className="mt-2">
                      {product.coverageSqFt[0]}–{product.coverageSqFt[1]} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      Finish
                    </dt>
                    <dd className="mt-2">{product.finish}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      Dimensions
                    </dt>
                    <dd className="mt-2">{product.height}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                      Smart Home
                    </dt>
                    <dd className="mt-2">Apple · Alexa · Google</dd>
                  </div>
                </dl>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div className="mt-10">
                  <AddToBag priceINR={product.priceINR} />
                </div>
              </FadeUp>

              {/* Trust strip */}
              <FadeUp delay={0.3}>
                <ul className="mt-12 grid gap-3 text-[0.78rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                  <li className="flex items-baseline gap-3">
                    <span className="text-[color:var(--color-clay)]">—</span>
                    Includes diffuser, ceramic base, USB-C adapter, and a
                    100 ml oil of your choice (selected at checkout).
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-[color:var(--color-clay)]">—</span>
                    Two-year limited warranty on the device.
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-[color:var(--color-clay)]">—</span>
                    Refills shipped on a schedule you set. Pause whenever.
                  </li>
                </ul>
              </FadeUp>
            </div>
          </aside>
        </div>
      </section>

      {/* ====================================================
          §  THE OBJECT  —  intro long-form description
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-4">
              <div className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <p>§ One</p>
                <p className="mt-1">The Object</p>
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
                A single seamless cylinder. Brushed by hand. Sized to disappear
                into a sideboard — or to be displayed,{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  the way a small sculpture is.
                </em>
              </p>
              <p className="mt-8 max-w-[60ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                {product.description}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  THE FORM  —  2x2 grid mixing diffuser plates +
              companion oil photography. Native portrait aspects
              so nothing is cropped.
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-stretch gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              {/* 2x2 balanced grid — diffuser top-left & bottom-right, oils top-right & bottom-left */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src={product.gallery[1] ?? product.gallery[0]}
                      alt={`${product.name} — detail`}
                      fill
                      sizes="(min-width: 768px) 27vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    The object — in detail
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src={oils[0].image}
                      alt={`${oils[0].name} — bottle study`}
                      fill
                      sizes="(min-width: 768px) 27vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    Companion · {oils[0].name}
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src={oils[4].image}
                      alt={`${oils[4].name} — bottle study`}
                      fill
                      sizes="(min-width: 768px) 27vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    Companion · {oils[4].name}
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src={product.gallery[2] ?? product.gallery[0]}
                      alt={`${product.name} — in context`}
                      fill
                      sizes="(min-width: 768px) 27vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    The object — in context
                  </figcaption>
                </figure>
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5 md:pl-2">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                On the form
              </p>
              <p
                className="mt-6 max-w-[20ch]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                  color: "var(--color-charcoal)",
                }}
              >
                Sculptural.
                <br />
                Hand-finished.
                <br />
                <em className="text-[color:var(--color-aerial-deep)]">
                  Built to live with you.
                </em>
              </p>
              <div className="mt-8 space-y-5 max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                <p>
                  A single object, machined and finished by hand. The base
                  decouples vibration so the body never trembles. The companion
                  oils are blended like fine perfumery — top, heart, and base —
                  at 70–90% concentration.
                </p>
                <p>
                  Built to sit unannounced on a shelf and be discovered. It
                  tells you nothing about itself until the room it occupies
                  tells you everything.
                </p>
              </div>

              {/* Anchor — three small material chips */}
              <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-[color:var(--color-rule)] pt-6">
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    Object
                  </dt>
                  <dd className="mt-1.5 text-[0.86rem]">{product.finish.split(" on ")[0]}</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    Oil
                  </dt>
                  <dd className="mt-1.5 text-[0.86rem]">100 ml, 70–90%</dd>
                </div>
                <div>
                  <dt className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    Together
                  </dt>
                  <dd className="mt-1.5 text-[0.86rem]">~90 days</dd>
                </div>
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  THE ENGINEERING  —  cold-air nebulisation
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        {/* Atmospheric mesh */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(119,145,141,0.20) 0%, rgba(41,51,41,0) 50%)",
          }}
        />
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Two · The Engineering</span>
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
                  lineHeight: 1.04,
                  letterSpacing: "-0.022em",
                  fontWeight: 400,
                }}
              >
                No water.
                <br />
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  No heat.
                </em>
                <br />
                No daily attention.
              </h2>
              <p
                className="mt-8 max-w-[58ch] text-[var(--text-base)] leading-[1.85]"
                style={{ color: "rgba(238, 228, 216, 0.78)" }}
              >
                Most diffusers ultrasonically vibrate a tank of water, releasing
                a faint, diluted mist into the room. The Monolith does
                something different. Pressurised air atomises pure oil
                directly — 70 to 90% concentration, not 1 to 3 — so what
                reaches you is the fragrance itself, in its full architecture
                of top, heart, and base notes. Quieter than a candle.
                Cleaner than a spray. The room performs.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <ol className="grid gap-px overflow-hidden bg-[color:var(--color-stardust)]/15">
                {[
                  {
                    no: "01",
                    title: "Fill",
                    body: "Pour a 100 ml refill into the reservoir. No water, no carrier oil.",
                  },
                  {
                    no: "02",
                    title: "Pair",
                    body: "One-time Wi-Fi pairing via the Quint Home companion app.",
                  },
                  {
                    no: "03",
                    title: "Schedule",
                    body: "Set a morning and evening profile. Intensity, duration, days.",
                  },
                  {
                    no: "04",
                    title: "Return",
                    body: "The device runs on its own. You come home to scent.",
                  },
                ].map((step) => (
                  <li
                    key={step.no}
                    className="grid grid-cols-[auto_1fr] gap-x-5 bg-[color:var(--color-verdant)] p-5"
                  >
                    <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-aerial-soft)]">
                      {step.no}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.05rem",
                          letterSpacing: "-0.008em",
                          color: "var(--color-stardust)",
                        }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="mt-1 text-[0.82rem] leading-[1.6]"
                        style={{ color: "rgba(238, 228, 216, 0.65)" }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  IN SITU  —  drag carousel of environments
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Three · In Situ
                </p>
                <h2
                  className="mt-5 max-w-[20ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Six rooms.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    One object, in each of them.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
                Studies of the same diffuser, photographed in six different
                atmospheres.
                <br />
                <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                  Drag to browse →
                </span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <EditorialCarousel
              slides={
                [
                  {
                    src: product.gallery[0],
                    alt: "The Monolith on a sideboard against terracotta plaster",
                    eyebrow: "01 · The Hallway",
                    caption: "Against terracotta plaster. The first thing you notice on returning home.",
                  },
                  {
                    src: product.gallery[2],
                    alt: "The Monolith on a stone disc against travertine",
                    eyebrow: "02 · The Atelier",
                    caption: "On a stone disc. A small object, given weight.",
                  },
                  {
                    src: product.gallery[3],
                    alt: "Under a felt pendant lamp on a vintage wood table",
                    eyebrow: "03 · The Snug",
                    caption: "Under a felt pendant. Warm light, warm wood, warm scent.",
                  },
                  {
                    src: product.gallery[4],
                    alt: "On linen, a single sunbeam, dark teal wall",
                    eyebrow: "04 · The Study",
                    caption: "On linen. A single sunbeam. Three hours of unbroken work.",
                  },
                  {
                    src: product.gallery[5],
                    alt: "On orange velvet, dramatic spot lighting",
                    eyebrow: "05 · The Drawing Room",
                    caption: "On velvet, at dusk. A room reset for the evening.",
                  },
                  {
                    src: product.gallery[1],
                    alt: "Detail shot, amber light",
                    eyebrow: "06 · The Bar",
                    caption: "Amber light. The pause before guests arrive.",
                  },
                ] satisfies Slide[]
              }
              slideWidth={380}
              slideWidthMobile={280}
              withPlateNumbers={false}
            />
          </FadeUp>
        </div>
      </section>

      {/* ====================================================
          §  SPECIFICATIONS  —  editorial spec sheet
          ==================================================== */}
      <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-14 flex items-end justify-between border-b border-[color:var(--color-rule)] pb-6">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Four · Specification
                </p>
                <h2
                  className="mt-5"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.018em",
                    fontWeight: 400,
                  }}
                >
                  The technical card.
                </h2>
              </div>
              <p className="hidden text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] md:block">
                Verified · {new Date().getFullYear()} · IFRA-Compliant
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-x-12 md:grid-cols-2">
            {product.specs.map((spec, i) => (
              <FadeUp key={spec.label} delay={i * 0.03}>
                <dl className="grid grid-cols-[160px_1fr] items-baseline gap-x-6 border-b border-[color:var(--color-rule)] py-5 md:grid-cols-[200px_1fr]">
                  <dt className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                    {spec.label}
                  </dt>
                  <dd className="text-[0.95rem] leading-[1.55] text-[color:var(--color-charcoal)]">
                    {spec.value}
                  </dd>
                </dl>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  PAIRS WITH  —  curated companion oils
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  The Pairings
                </p>
                <h2
                  className="mt-5 text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.018em",
                    fontWeight: 400,
                  }}
                >
                  An object is hardware.{" "}
                  <em className="not-italic text-[color:var(--color-aerial-deep)]">
                    The oil is the script.
                  </em>
                </h2>
              </div>
              <Link
                href="/shop?category=oils"
                className="text-[0.74rem] uppercase tracking-[0.32em] underline-offset-4 hover:underline"
              >
                All scents →
              </Link>
            </div>
          </FadeUp>

          <div className="grid gap-px overflow-hidden bg-[color:var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
            {relatedOils.map((o, i) => (
              <FadeUp key={o.slug} delay={i * 0.05} className="contents">
                <Link
                  href={`/shop/${o.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-6 text-[color:var(--color-stardust)]"
                >
                  <Image
                    src={o.image}
                    alt={`${o.name} — bottle study`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 object-cover transition-transform duration-[1800ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(58,53,50,0.25) 0%, rgba(58,53,50,0.0) 35%, rgba(58,53,50,0.72) 100%)",
                    }}
                  />

                  <div className="relative flex items-start justify-between text-[0.58rem] uppercase tracking-[0.32em] opacity-90">
                    <span>№{String(oils.findIndex((x) => x.slug === o.slug) + 1).padStart(2, "0")}</span>
                    {o.tier === "hotel-credential" && (
                      <span className="rounded-full border border-current px-2 py-0.5 text-[0.5rem]">
                        Hotel
                      </span>
                    )}
                  </div>
                  <div className="relative mt-auto">
                    <h3
                      className="text-balance transition-transform duration-700 ease-[var(--ease-quint)] group-hover:-translate-y-1"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.02,
                        letterSpacing: "-0.018em",
                        color: "var(--color-stardust)",
                      }}
                    >
                      {o.name}
                    </h3>
                    <p className="mt-3 max-w-[28ch] text-[0.82rem] leading-[1.55] opacity-90">
                      {o.tagline}
                    </p>
                  </div>
                  <div className="relative flex items-end justify-between text-[0.66rem] tracking-[0.04em] opacity-90">
                    <span className="uppercase tracking-[0.18em] text-[0.58rem]">
                      {o.notes.heart[0]}
                    </span>
                    <span className="tabular-nums">
                      {formatINR(o.priceINR)}
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  CLOSING  —  native portrait image + CTA
          ==================================================== */}
      <section className="bg-[color:var(--color-white)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-5">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                  <Image
                    src={product.gallery[1]}
                    alt={`${product.name} — closing portrait`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                  <span>The Object, in detail</span>
                </figcaption>
              </figure>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                {product.name} · {formatINR(product.priceINR)}
              </p>
              <h2
                className="mt-7 max-w-[22ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                }}
              >
                One object, one ritual.{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  A room reset, twice a day, forever.
                </em>
              </h2>
              <p className="mt-7 max-w-[44ch] text-[var(--text-base)] leading-[1.8] text-[color:var(--color-charcoal-soft)]">
                Choose a scent at checkout and we&rsquo;ll include your first
                100 ml refill in the box. Future refills arrive on a schedule
                you set.
              </p>
              <Link
                href="#top"
                className="group mt-10 inline-flex items-center gap-3 border-b border-[color:var(--color-charcoal)] pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-500 hover:text-[color:var(--color-clay)] hover:border-[color:var(--color-clay)]"
              >
                Configure your Monolith
                <span className="transition-transform duration-500 group-hover:translate-x-1">↑</span>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}

// ============================================================
//  Oils stub — handled in next pass
// ============================================================
function OilStub({ slug }: { slug: string }) {
  const oil = getOil(slug);
  if (!oil) return null;
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-6 py-[var(--spacing-section)] md:px-10">
      <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
        Fragrance Oil
      </p>
      <h1
        className="mt-6 max-w-[14ch] text-balance"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-5xl)",
          lineHeight: 0.98,
          letterSpacing: "-0.024em",
          fontWeight: 400,
        }}
      >
        {oil.name}
      </h1>
      <p className="mt-6 max-w-[44ch] text-[var(--text-lg)] leading-[1.55] text-[color:var(--color-charcoal-soft)]">
        {oil.tagline}
      </p>
      <p className="mt-12 text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-charcoal-soft)]">
        Oil PDP layout shipping next pass — for now, the diffuser PDP is the editorial template.
      </p>
    </div>
  );
}
