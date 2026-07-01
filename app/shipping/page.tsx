import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How your Quint Home order is shipped across India, our exchange policy for damaged or defective items, and the limited 1-year warranty.",
};

const LAST_UPDATED = "1 July 2026";

const sections = [
  {
    chapter: "One",
    label: "Processing & Delivery",
    paragraphs: [
      "Orders are prepared and dispatched within 1–2 business days of confirmation, shipped from Mumbai through our courier partners. Delivery typically takes 3–5 business days anywhere in India; timelines are estimates and may vary with destination.",
      "Once your order ships, you will receive tracking details by email. If anything is delayed or amiss, write to us at hello@quinthome.in and we will follow up promptly.",
    ],
  },
  {
    chapter: "Two",
    label: "Shipping Charges",
    paragraphs: [
      "Shipping is complimentary on all orders above ₹5,000. A flat fee applies below that and is shown clearly at checkout before payment. We currently ship within India only.",
    ],
  },
  {
    chapter: "Three",
    label: "Refunds & Cancellations",
    paragraphs: [
      "We do not offer refunds or cancellations. A product is eligible for exchange only if it arrives damaged or defective — see below.",
    ],
  },
  {
    chapter: "Four",
    label: "Damaged or Defective Items",
    paragraphs: [
      "Please inspect your order carefully on delivery. If an item arrives damaged or defective, notify us within 3 days at hello@quinthome.in with your order number, the product, and a clear photo or description of the issue.",
      "Once verified, the item will be exchanged for a new one — no refund is issued. Returns are not accepted for products that have been used, altered, or damaged through customer negligence. The item must be returned in its original packaging with all accessories and documentation, and shipped back within 3 days of the exchange being authorised.",
    ],
  },
  {
    chapter: "Five",
    label: "Limited Warranty",
    paragraphs: [
      "Every Quint Home device carries a limited warranty of up to one year from the date of purchase against manufacturing defects. The warranty covers the device itself — not fragrance oils, nor damage from misuse, accident, or unauthorised repair. To make a claim, write to us with your order number and we will take it from there.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Legal · Shipping &amp; Returns
              </p>
              <h1
                className="mt-7 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-5xl)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.024em",
                  fontWeight: 400,
                }}
              >
                Shipping &amp;{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Returns.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                How your order reaches you, and what happens if something
                arrives damaged. We ship across India from Mumbai, with
                complimentary delivery over{" "}
                <span className="text-[color:var(--color-charcoal)]">₹5,000</span>.
              </p>
              <p className="mt-5 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                Last updated {LAST_UPDATED}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 py-7 md:px-10">
          <p className="max-w-[80ch] text-[0.86rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal)]">
              In short —{" "}
            </span>
            We don&rsquo;t offer refunds or cancellations. Damaged or defective
            items are exchanged for a replacement if reported within 3 days, and
            every device is covered by a limited 1-year warranty.
          </p>
        </div>
      </section>

      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-y-14 md:gap-y-20">
            {sections.map((group) => (
              <div
                key={group.chapter}
                className="grid gap-6 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-16"
              >
                <FadeUp className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                      <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />
                      {group.chapter}
                    </p>
                    <h2
                      className="mt-5 max-w-[16ch] text-balance"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.014em",
                        fontWeight: 400,
                      }}
                    >
                      {group.label}
                    </h2>
                  </div>
                </FadeUp>

                <FadeUp delay={0.08} className="md:col-span-8">
                  <div className="space-y-5 text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                    {group.paragraphs.map((p, i) => (
                      <p key={i} className="max-w-[68ch]">
                        {p}
                      </p>
                    ))}
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              <h2
                className="text-balance text-[color:var(--color-stardust)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                }}
              >
                Something arrived damaged?{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  Write to us within 3 days.
                </em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1} className="md:col-span-5">
              <a
                href="mailto:hello@quinthome.in"
                className="group inline-flex items-center gap-3 border-b border-[color:var(--color-stardust)]/60 pb-1.5 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)] transition-colors duration-500 hover:border-[color:var(--color-aerial-soft)] hover:text-[color:var(--color-aerial-soft)]"
              >
                hello@quinthome.in
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p className="mt-8 text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-stardust)]/55">
                Rusera Lifestyle · Mumbai, India · +91 98193 45550
              </p>
              <p className="mt-6 text-[0.78rem] leading-[1.7] text-[color:var(--color-stardust)]/70">
                See also our{" "}
                <Link
                  href="/terms"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </article>
  );
}
