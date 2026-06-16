import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Exchange & Cancellations",
  description:
    "Quint Home's returns, exchange, and cancellation policy — how to report a damaged or defective order and request a return.",
};

const LAST_UPDATED = "5 June 2026";

const sections = [
  {
    chapter: "§ One",
    label: "Eligibility for Return",
    paragraphs: [
      "Returns are accepted within 7 days of delivery for unused product in its original, undamaged condition and packaging. For hygiene and safety reasons, fragrance-oil bottles must remain sealed and unopened to be eligible for return.",
    ],
  },
  {
    chapter: "§ Two",
    label: "Damaged or Defective Items",
    paragraphs: [
      "Please inspect your order carefully on delivery. If a product is found to be damaged or defective, notify us within 3 days of receipt. Verified damaged or defective items are replaced or refunded at no cost to you. This does not cover products that have been used, altered, or damaged due to customer handling.",
    ],
  },
  {
    chapter: "§ Three",
    label: "How to Request",
    paragraphs: [
      "To start a return or report damage, get in touch with our team within the applicable window at hello@quinthome.in. Please include your order number, a description of the product, and — for damage or defects — clear photographs. Once your request is approved, we will arrange a pickup.",
      "The item must be returned in its original packaging, along with all accessories and documentation.",
    ],
  },
  {
    chapter: "§ Four",
    label: "Refunds",
    paragraphs: [
      "Approved refunds are processed to your original payment method within 7–10 business days of our receiving and inspecting the returned item. You will be notified by email once your refund has been issued.",
    ],
  },
  {
    chapter: "§ Five",
    label: "Cancellations",
    paragraphs: [
      "Orders may be cancelled for a full refund any time before they are dispatched. Once an order has shipped, our returns process applies.",
    ],
  },
  {
    chapter: "§ Six",
    label: "Exclusions",
    paragraphs: [
      "Used, opened, altered, or customer-damaged items, and items returned without their original packaging, are not eligible for return or exchange. Commercial and bulk (B2B) orders are governed by the separate terms agreed at the time of purchase.",
    ],
  },
];

export default function RefundsPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Legal · Returns
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
                Exchange &amp;{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  Cancellations.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                We want you to be happy with what arrives. Here is how returns,
                exchanges, and cancellations work — and how to reach us if
                anything is wrong.
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
            Quint Home is operated by Rusera Lifestyle, Mumbai, India. We reserve
            the right to withhold or decline a transaction at our discretion.
            Please report any damage or defect within 3 days of receipt.
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
                Something not right?{" "}
                <em className="not-italic text-[color:var(--color-aerial-soft)]">
                  Tell us and we&rsquo;ll make it right.
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
                  href="/shipping"
                  className="underline-offset-4 hover:text-[color:var(--color-aerial-soft)] hover:underline"
                >
                  Shipping Policy
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
