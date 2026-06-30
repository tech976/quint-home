import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "How and when your Quint Home order is processed, shipped, and delivered across India.",
};

const LAST_UPDATED = "5 June 2026";

const sections = [
  {
    chapter: "One",
    label: "Order Processing",
    paragraphs: [
      "Once your order is placed and confirmed, we require a processing time of 1–2 business days to prepare your items for shipment. This includes order verification, quality checks, and careful packaging.",
    ],
  },
  {
    chapter: "Two",
    label: "Delivery Time",
    paragraphs: [
      "After dispatch, orders are typically delivered within 3–5 business days anywhere in India, shipped from Mumbai through our courier partners. Delivery duration may vary based on destination and circumstances beyond our control.",
    ],
  },
  {
    chapter: "Three",
    label: "Shipping Charges",
    paragraphs: [
      "Shipping is complimentary on all orders above ₹3,000. A flat shipping fee applies to orders below this value and is shown clearly at checkout before payment.",
    ],
  },
  {
    chapter: "Four",
    label: "Shipping Methods",
    paragraphs: [
      "We partner with established courier services to ensure reliable, tracked delivery. The shipping method is selected based on the dimensions, weight, and destination of your order.",
    ],
  },
  {
    chapter: "Five",
    label: "Tracking & Support",
    paragraphs: [
      "Once your order ships, you will receive tracking details by email. If you have not received your order, or have experienced any issue with delivery, please contact us at hello@quinthome.in and we will assist you promptly.",
    ],
  },
  {
    chapter: "Six",
    label: "International Shipping",
    paragraphs: [
      "We currently ship within India only. International shipping is planned for a future phase — write to us if you would like to be notified when it becomes available.",
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
                Legal · Shipping
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
                Shipping{" "}
                <em className="text-[color:var(--color-aerial-deep)]">Policy.</em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                How and when your order reaches you. We ship across India from
                Mumbai, with complimentary delivery on orders above{" "}
                <span className="text-[color:var(--color-charcoal)]">₹3,000</span>.
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
              Note —{" "}
            </span>
            Quint Home is operated by Rusera Lifestyle, Mumbai, India. Delivery
            timelines are estimates and may vary with destination, courier
            processing, and events beyond our control.
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
                      <Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />{group.chapter}                    </p>
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
                A question about your order?{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  We&rsquo;ll track it down for you.
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
                  href="/refunds"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Exchange &amp; Cancellations
                </Link>{" "}
                and{" "}
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
