import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "Trade & B2B",
  description:
    "Commercial diffusers, bulk orders, and custom scent development for hotels, restaurants, retail, and offices. Trade enquiries answered within 48 hours.",
};

const offerings = [
  {
    no: "01",
    title: "Commercial Machines",
    body: "High-capacity diffusers for large floors, restaurants, retail, and offices, sized to the space and built to run quietly in the background.",
  },
  {
    no: "02",
    title: "Bulk Orders",
    body: "Volume pricing on diffusers and fragrance oils for multi-room fit-outs, gifting programmes, and rollouts across multiple locations.",
  },
  {
    no: "03",
    title: "Custom Scent Development",
    body: "A signature scent composed for your brand or space, so the fragrance is your own and recognisable the moment someone walks in.",
  },
];

export default function TradePage() {
  return (
    <article className="bg-[color:var(--color-white)]">
      {/* ====================================================
          §  HERO
          ==================================================== */}
      <section className="border-b border-[color:var(--color-rule)] pt-10 md:pt-14">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-end gap-10 pb-12 md:grid-cols-12 md:gap-16">
            <FadeUp delay={0.05} className="md:col-span-7">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Trade · B2B Enquiries
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
                Scent your space,{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  at scale.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[42ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                Commercial machines, bulk orders, and custom scent development
                for hotels, restaurants, retail, offices, and developers. Tell
                us about your project and we&rsquo;ll come back within 48 hours.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  ONE — WHAT WE OFFER
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-14 border-b border-[color:var(--color-rule)] pb-6">
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                § One · What We Offer
              </p>
              <h2
                className="mt-5 max-w-[24ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.016em",
                  fontWeight: 400,
                }}
              >
                Three ways we work{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  with business.
                </em>
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-y-12 md:grid-cols-3 md:gap-x-12">
            {offerings.map((o, i) => (
              <FadeUp key={o.no} delay={i * 0.06}>
                <div className="border-t border-[color:var(--color-rule)] pt-7">
                  <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                    № {o.no}
                  </p>
                  <h3
                    className="mt-5"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-2xl)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.014em",
                      fontWeight: 400,
                    }}
                  >
                    {o.title}
                  </h3>
                  <p className="mt-5 max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                    {o.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO — TRADE ENQUIRY FORM
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-10 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Two · Trade Enquiry</span>
              <span className="h-px flex-1 bg-[color:var(--color-stardust)]/15" />
            </div>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h2
              className="max-w-[22ch] text-balance text-[color:var(--color-stardust)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.016em",
                fontWeight: 400,
              }}
            >
              Tell us about your project.{" "}
              <em className="not-italic text-[color:var(--color-aerial-soft)]">
                We&rsquo;ll get back within 48 hours.
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <form className="mt-12 grid gap-7 md:grid-cols-2 md:gap-x-10">
              <Field label="Company / Brand" placeholder="Hotel, restaurant, studio, or company" />
              <Field label="Your name" placeholder="First and last" />
              <Field label="Email" placeholder="you@company.com" type="email" />
              <Field label="Phone" placeholder="Optional" />
              <div className="md:col-span-2">
                <Field
                  label="What you need"
                  placeholder="Commercial machines · Bulk order · Custom scent · Not sure yet"
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  label="A note"
                  placeholder="Tell us about your space, project, scale, or timeline."
                  textarea
                />
              </div>

              <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/55">
                  Or write directly: trade@quinthome.in
                </p>
                <button
                  type="button"
                  className="group inline-flex h-12 items-center justify-center gap-3 bg-[color:var(--color-clay)] px-8 text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-ivory)] transition-colors duration-500 hover:bg-[color:var(--color-clay-deep)]"
                >
                  Submit enquiry
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>
    </article>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[color:var(--color-stardust)]/60">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-full resize-none border-b border-[color:var(--color-stardust)]/25 bg-transparent py-2.5 text-[0.96rem] text-[color:var(--color-stardust)] placeholder:text-[color:var(--color-stardust)]/40 outline-none focus:border-[color:var(--color-stardust)]"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="mt-2 w-full border-b border-[color:var(--color-stardust)]/25 bg-transparent py-2.5 text-[0.96rem] text-[color:var(--color-stardust)] placeholder:text-[color:var(--color-stardust)]/40 outline-none focus:border-[color:var(--color-stardust)]"
        />
      )}
    </label>
  );
}
