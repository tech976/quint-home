import Link from "next/link";
import { Monogram } from "@/components/brand/logo";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Quint Home. Mumbai · WhatsApp · email.",
};

export default function ContactPage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          § HERO
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Contact · Mumbai, India
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
                Email us or{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  message us on WhatsApp.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                The team is small and based in Mumbai. We reply to every
                message within 24 hours, usually faster.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          § THREE CHANNELS
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid gap-px overflow-hidden bg-[color:var(--color-rule)] md:grid-cols-3">
            <FadeUp className="contents">
              <a
                href="mailto:hello@quinthome.in"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 01 · Email
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    hello@quinthome.in
                  </p>
                  <p className="mt-3 max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    For all general enquiries, press, and partnerships.
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Write to us →
                  </p>
                </div>
              </a>
            </FadeUp>

            <FadeUp className="contents">
              <a
                href="https://wa.me/919819345550"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 02 · WhatsApp
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    +91 98193 45550
                  </p>
                  <p className="mt-3 max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    Direct line to the founder. Open Mon–Sat, 10:00–19:00 IST.
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Open WhatsApp →
                  </p>
                </div>
              </a>
            </FadeUp>

            <FadeUp className="contents">
              <Link
                href="/businesses"
                className="group flex flex-col justify-between gap-12 bg-[color:var(--color-white)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-stardust-soft)] md:min-h-[360px]"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  № 03 · For Businesses
                </p>
                <div>
                  <p
                    className="transition-colors duration-500 group-hover:text-[color:var(--color-clay)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    Trade &amp; B2B
                  </p>
                  <p className="mt-3 max-w-[36ch] text-[0.92rem] leading-[1.65] text-[color:var(--color-charcoal-soft)]">
                    Commercial machines, bulk orders, and custom scent
                    development for hotels, restaurants, retail, and offices.
                  </p>
                  <p className="mt-7 text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)] transition-transform duration-500 group-hover:translate-x-1">
                    Trade enquiries →
                  </p>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          § FORM
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-12 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
              <span className="h-px w-12 bg-[color:var(--color-rule)]" />
              <span><Monogram className="mr-1.5 inline-block h-[0.9em] w-[0.9em] align-[-0.12em]" />Two · A message</span>
              <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h2
              className="max-w-[24ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              Send us a note.{" "}
              <em className="text-[color:var(--color-aerial-deep)]">
                We&rsquo;ll come back to you.
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <form className="mt-12 grid gap-7 md:grid-cols-2 md:gap-x-10">
              <label className="block">
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Your name
                </span>
                <input
                  type="text"
                  placeholder="First and last"
                  className="mt-2 w-full border-b border-[color:var(--color-rule)] bg-transparent py-2.5 text-[0.96rem] outline-none placeholder:text-[color:var(--color-charcoal-soft)]/60 focus:border-[color:var(--color-charcoal)]"
                />
              </label>
              <label className="block">
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full border-b border-[color:var(--color-rule)] bg-transparent py-2.5 text-[0.96rem] outline-none placeholder:text-[color:var(--color-charcoal-soft)]/60 focus:border-[color:var(--color-charcoal)]"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Subject
                </span>
                <input
                  type="text"
                  placeholder="What can we help with?"
                  className="mt-2 w-full border-b border-[color:var(--color-rule)] bg-transparent py-2.5 text-[0.96rem] outline-none placeholder:text-[color:var(--color-charcoal-soft)]/60 focus:border-[color:var(--color-charcoal)]"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Message
                </span>
                <textarea
                  rows={5}
                  placeholder="Tell us more…"
                  className="mt-2 w-full resize-none border-b border-[color:var(--color-rule)] bg-transparent py-2.5 text-[0.96rem] outline-none placeholder:text-[color:var(--color-charcoal-soft)]/60 focus:border-[color:var(--color-charcoal)]"
                />
              </label>

              <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-charcoal-soft)]">
                  Or write directly: hello@quinthome.in
                </p>
                <button
                  type="button"
                  className="group inline-flex h-12 items-center justify-center gap-3 bg-[color:var(--color-charcoal)] px-8 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
                >
                  Send message
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}
