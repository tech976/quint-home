"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToBag } from "@/components/product/add-to-bag";
import { MobileBuyBar } from "@/components/product/mobile-buy-bar";
import { PairBundle, type PairOption } from "@/components/product/pair-bundle";
import { oils, oilNoteSummary } from "@/lib/data/oils";
import { cn } from "@/lib/utils";
import type { Diffuser } from "@/lib/types";
import { shopifyHandle, sellableVariant, type ShopifyCommerce } from "@/lib/shopify/commerce";
import { COMPLIMENTARY_OIL, giftVariantFor } from "@/lib/cart-gift";

/**
 * Diffuser PDP – images on the left (sticky), and a single right column. The
 * buy box (price + add to bag) sits at the top, followed immediately by the
 * overview and key features so the product story is reachable without scrolling
 * past the configurators; the "included oil" picker and bundle sit below. The
 * technical specifications live as their own slide in the gallery carousel.
 */
export function DiffuserHero({
  product,
  commerce,
  commerceMap,
}: {
  product: Diffuser;
  commerce?: ShopifyCommerce;
  /** Whole catalogue, so bundle partners can resolve their Shopify variant. */
  commerceMap?: Record<string, ShopifyCommerce>;
}) {
  const colors = product.colors;
  const [active, setActive] = useState(0);
  const color = colors?.[active];

  // Match the Shopify variant to the selected finish (or the sole variant).
  const variant =
    colors && colors.length > 1
      ? commerce?.variants.find((v) => v.options.Finish === color?.name)
      : sellableVariant(commerce);

  const gallery = color?.gallery ?? product.gallery;

  // Finish-specific copy – when a colour variant carries its own tagline /
  // description / key features, they replace the product-level defaults while
  // that finish is selected (e.g. the A326 in gold vs black).
  const tagline = color?.tagline ?? product.tagline;
  const keyFeatures = color?.keyFeatures ?? product.keyFeatures;

  // Included starting oil – chosen here rather than at checkout. A scent can
  // only be offered when the store actually holds a free bottle of it:
  // otherwise the diffuser goes in the bag alone and the customer is quietly
  // short a ₹899 oil the page promised them.
  const giftableOils = oils.filter((o) => giftVariantFor(o.name, commerceMap));
  const offeredOils = giftableOils.length ? giftableOils : oils;
  const [oilSlug, setOilSlug] = useState(offeredOils[0].slug);
  const selectedOil =
    offeredOils.find((o) => o.slug === oilSlug) ?? offeredOils[0];

  // The complimentary bottle that ships with every diffuser. It is not a line
  // item of its own, so this note is the only record of it — in the bag, on the
  // Shopify order and on the packing slip. Every path that puts a diffuser in
  // the bag has to carry it, or the scent the customer picked is lost (which is
  // exactly what the bundle button used to do).
  // The ₹0 variant of whichever scent is selected. Null when the store has no
  // gift variant for it yet — the note still records what is owed.
  const giftVariantId = product.includesOil
    ? (giftVariantFor(selectedOil.name, commerceMap)?.id ?? null)
    : null;

  const complimentaryOil = product.includesOil
    ? [
        {
          key: COMPLIMENTARY_OIL,
          value: `${selectedOil.name} · ${selectedOil.volumeML} ml`,
        },
      ]
    : undefined;

  const descriptionParagraphs = (color?.description ?? product.description).split(
    "\n\n"
  );

  // Bundle – add an extra oil to the order at a discount. Carry the note
  // summary so the picker reads as a fragrance, not just a name.
  const oilOptions: PairOption[] = oils.map((o) => {
    // Shopify is the source of truth for price. Quoting the catalogue figure
    // here while adding the Shopify variant to the bag is how the bundle came
    // to promise one total and charge another.
    const oilVariant = sellableVariant(commerceMap?.[shopifyHandle(o.name)]);
    return {
      slug: o.slug,
      name: o.name,
      priceINR: oilVariant?.price ?? o.priceINR,
      image: o.image,
      variantId: oilVariant?.id,
      meta: o.mood,
      note: oilNoteSummary(o),
    };
  });

  // Technical specifications – the per-model spec sheet, taken verbatim from the
  // Aroma Diffuser Collection product catalogue.
  const techSpecs = product.specs;

  const sectionLabel =
    "text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]";

  // Designed specifications slide – the last gallery photo (a visual spec sheet,
  // not a plain table in the column).
  const specsCard = (
    <div className="flex h-full w-full flex-col justify-center overflow-hidden bg-[color:var(--color-stardust-soft)] px-7 py-6 md:px-9 md:py-8">
      <div className="flex items-center gap-3">
        <Monogram className="h-5 w-5 text-[color:var(--color-clay)]" />
        {color && (
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color.swatch }}
          />
        )}
      </div>
      <p className="mt-4 text-[0.54rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
        Technical specifications
      </p>
      <p
        className="mt-1.5 text-[color:var(--color-charcoal)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.35rem",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
        }}
      >
        {product.name}
      </p>
      <dl className="mt-4 border-t border-[color:var(--color-rule)]">
        {techSpecs.map((s) => (
          <div
            key={s.label}
            className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-[color:var(--color-rule)] py-1.5"
          >
            <dt className="pt-0.5 text-[0.46rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]">
              {s.label}
            </dt>
            <dd className="text-[0.74rem] leading-snug text-[color:var(--color-charcoal)]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <>
    <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
      <div className="mx-auto grid max-w-[var(--container-full)] gap-12 px-6 pb-[var(--spacing-section)] md:px-10 lg:grid-cols-[minmax(0,38rem)_minmax(0,40rem)] lg:justify-center lg:gap-16">
        {/* ===== Gallery – sticky on the left ===== */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <FadeUp>
            <div className="mb-6 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span>The Range</span>
              <span className="h-px w-6 bg-[color:var(--color-rule)]" />
              <span>Diffusers</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            {/* key={active} remounts the gallery so it resets to the new colour's first image */}
            <ProductGallery
              key={active}
              images={gallery}
              alt={`${product.name}${color ? ` – ${color.name}` : ""} – Quint Home`}
              cards={[{ key: "specs", thumbLabel: "Specs", content: specsCard }]}
            />
          </FadeUp>
        </div>

        {/* ===== Right column – buy box, overview, key features, then configurators ===== */}
        <aside className="min-w-0">
          {/* --- Buy box --- */}
          <FadeUp>
            <p className={sectionLabel}>Diffuser</p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h1
              className="mt-6 text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-5xl)",
                lineHeight: 1.0,
                letterSpacing: "-0.024em",
                fontWeight: 400,
              }}
            >
              {product.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-5 max-w-[40ch] text-[var(--text-lg)] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
              {tagline}
            </p>
          </FadeUp>

          {/* Colour selector – only when the model ships in more than one finish */}
          {colors && colors.length > 1 && (
            <FadeUp delay={0.16}>
              <div className="mt-8">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Finish – {color?.name}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={c.name}
                      aria-pressed={i === active}
                      title={c.name}
                      className={cn(
                        "relative h-8 w-8 rounded-full transition-transform duration-300 hover:scale-105",
                        i === active
                          ? "ring-1 ring-[color:var(--color-charcoal)] ring-offset-2 ring-offset-[color:var(--color-white)]"
                          : "ring-1 ring-[color:var(--color-rule)]"
                      )}
                      style={{ backgroundColor: c.swatch }}
                    />
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {/* Price + Add to bag – directly under the finish, so the price and
               the button are in view with the product rather than below a long
               scent picker. The chosen oil follows and still rides along. */}
          <FadeUp delay={0.18}>
            <div id="buy" className="mt-10 scroll-mt-24">
              {/* No subscribe & save on diffusers – that offer is for the oils only */}
              <AddToBag
                priceINR={variant?.price ?? product.priceINR}
                subscribeOffer={false}
                variantId={variant?.id}
                // No Shopify variant means the product is not sellable yet (a new
                // listing not imported, or one unpublished from this channel).
                // Defaulting to "available" let a customer bag something that
                // cannot be bought.
                available={variant ? variant.available : false}
                attributes={complimentaryOil}
                giftVariantId={giftVariantId}
              />
            </div>
          </FadeUp>

          {/* --- Choose your included oil – it ships with the diffuser either
               way, so the choice can follow the decision to buy. --- */}
          {product.includesOil && (
          <FadeUp delay={0.2}>
            <div className="mt-8 border-t border-[color:var(--color-rule)] pt-8">
              {/* Tiles rather than a dropdown: the oils are photographed, and a
                  scent name means little without seeing the bottle. Native radios
                  underneath, so arrow keys and screen readers behave. */}
              <fieldset className="min-w-0">
                <legend className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Choose your included oil
                </legend>
                <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-2.5">
                  {offeredOils.map((o) => {
                    const active = o.slug === oilSlug;
                    return (
                      <label
                        key={o.slug}
                        className="group cursor-pointer"
                        title={`${o.name} – ${oilNoteSummary(o)}`}
                      >
                        <input
                          type="radio"
                          name="starting-oil"
                          value={o.slug}
                          checked={active}
                          onChange={() => setOilSlug(o.slug)}
                          className="peer sr-only"
                        />
                        <span
                          className={cn(
                            "relative block aspect-square overflow-hidden bg-[color:var(--color-stardust-soft)] outline-offset-2 transition-all duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[color:var(--color-clay)]",
                            active
                              ? "ring-1 ring-[color:var(--color-clay)] ring-offset-2 ring-offset-[color:var(--color-white)]"
                              : "opacity-[0.72] group-hover:opacity-100"
                          )}
                        >
                          <Image
                            src={o.image}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 7rem, 23vw"
                            className="object-cover transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-[1.05]"
                          />
                          {o.tier === "hotel-credential" && (
                            <span className="absolute right-0 top-0 bg-[color:var(--color-clay)] px-1.5 py-0.5 text-[0.5rem] uppercase tracking-[0.14em] text-[color:var(--color-ivory)]">
                              +₹200
                            </span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 block font-[family-name:var(--font-serif)] text-[0.72rem] leading-tight transition-colors",
                            active
                              ? "text-[color:var(--color-clay)]"
                              : "text-[color:var(--color-charcoal)]"
                          )}
                        >
                          {o.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Live scent profile for the chosen oil – so the name in the
                  dropdown is never a mystery. Updates as the selection changes. */}
              <div className="mt-3 border-t border-[color:var(--color-rule)] pt-3">
                <p className="font-[family-name:var(--font-serif)] text-[0.92rem] italic leading-[1.5] text-[color:var(--color-charcoal)]">
                  {selectedOil.tagline}
                </p>
                <dl className="mt-2.5 grid gap-1.5">
                  {([
                    ["Top", selectedOil.notes.top],
                    ["Heart", selectedOil.notes.heart],
                    ["Base", selectedOil.notes.base],
                  ] as const).map(([label, notes]) => (
                    <div key={label} className="flex gap-3">
                      <dt className="w-9 shrink-0 pt-0.5 text-[0.56rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal-soft)]">
                        {label}
                      </dt>
                      <dd className="text-[0.78rem] leading-[1.5] text-[color:var(--color-charcoal)]">
                        {notes.join(" · ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-3 text-[0.72rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
                Your first 50 ml is included free (Hotel Credential oils carry a
                ₹200 supplement). Swap scents or add more anytime.
              </p>
            </div>
          </FadeUp>
          )}

          {/* Bundle – add another oil to the set */}
          <FadeUp delay={0.24}>
            <div className="mt-12 border-t border-[color:var(--color-rule)] pt-10">
              <p className="mb-3 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Build your set
              </p>
              <PairBundle
                basePriceINR={variant?.price ?? product.priceINR}
                baseName={product.name}
                partnerNoun="oil"
                heading="Add another oil"
                options={oilOptions}
              />
            </div>
          </FadeUp>

          {/* Assurances */}
          <FadeUp delay={0.24}>
            <ul className="mt-8 grid gap-2.5 border-t border-[color:var(--color-rule)] pt-8 text-[0.8rem] leading-[1.5] text-[color:var(--color-charcoal-soft)]">
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">–</span>
                Ships with your chosen 50 ml oil, ready to use.
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">–</span>
                1-year limited device warranty.
              </li>
              <li className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-clay)]">–</span>
                IFRA-compliant oils at 70–90% concentration.
              </li>
            </ul>
          </FadeUp>

          {/* --- Overview – moved up, right after the buy box --- */}
          <FadeUp delay={0.06}>
            <div className="mt-14 border-t border-[color:var(--color-rule)] pt-10">
              <p className={sectionLabel}>Overview</p>
              <div className="mt-6 space-y-5">
                {descriptionParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[var(--text-lg)] leading-[1.6] text-[color:var(--color-charcoal)]"
                        : "text-[0.95rem] leading-[1.8] text-[color:var(--color-charcoal-soft)]"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[color:var(--color-rule)] pt-5">
                <span className="text-[0.58rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Best for
                </span>
                <span className="text-[0.9rem] text-[color:var(--color-charcoal)]">
                  {product.bestFor.join("  ·  ")}
                </span>
              </div>
            </div>
          </FadeUp>

          {/* --- Key features – moved up --- */}
          <FadeUp delay={0.06}>
            <div className="mt-12 border-t border-[color:var(--color-rule)] pt-10">
              <p className={sectionLabel}>Key features</p>
              <ul className="mt-6 grid gap-4">
                {keyFeatures.map((feature, i) => {
                  const dash = feature.indexOf(" – ");
                  const lead = dash > -1 ? feature.slice(0, dash) : feature;
                  const desc = dash > -1 ? feature.slice(dash + 3) : "";
                  return (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 pt-0.5 text-[0.7rem] tabular-nums text-[color:var(--color-clay)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.95rem] leading-[1.4] text-[color:var(--color-charcoal)]">
                          {lead}
                        </p>
                        {desc && (
                          <p className="mt-1 text-[0.84rem] leading-[1.55] text-[color:var(--color-charcoal-soft)]">
                            {desc}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>

        </aside>
      </div>
    </section>
    <MobileBuyBar
      name={product.name}
      priceINR={variant?.price ?? product.priceINR}
    />
    </>
  );
}
