import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FadeUp } from "@/components/motion/fade-up";

export const metadata: Metadata = {
  title: "For Architects",
  description:
    "A trade channel for interior architects, designers, and hospitality specifiers. Specification, commercial machines, project pricing.",
};

const pillars = [
  {
    no: "01",
    title: "Specification Support",
    body: "Spec sheets, coverage calculators, BIM/IES files for the studio. We work alongside your studio on residential and hospitality fit-outs.",
  },
  {
    no: "02",
    title: "Commercial Machines",
    body: "Lobby, restaurant, and retail-scale diffusers up to 4,000 sq ft per unit. HVAC-integrated systems, on request.",
  },
  {
    no: "03",
    title: "Trade Pricing",
    body: "Architect and designer accounts receive project pricing on residential systems and bespoke scent compositions for commercial.",
  },
  {
    no: "04",
    title: "Co-Design",
    body: "Bespoke scent profiles for hospitality, retail, and private residence projects. A 6–10 week development cycle.",
  },
];

export default function ArchitectsPage() {
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
                Trade · For Architects &amp; Designers
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
                For the studios who treat air{" "}
                <em className="text-[color:var(--color-aerial-deep)]">
                  as part of the build.
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1} className="md:col-span-5">
              <p className="max-w-[40ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                Specification, commercial systems, project pricing, and
                bespoke scent development — for interior architects, designers,
                and hospitality specifiers across India.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  ONE — PILLARS
          ==================================================== */}
      <section className="bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-14 flex flex-col gap-6 border-b border-[color:var(--color-rule)] pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § One · The Service
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
                  Four pillars.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Everything a specifier needs.
                  </em>
                </h2>
              </div>
              <p className="max-w-[28ch] text-[0.86rem] leading-[1.65] text-[color:var(--color-charcoal-soft)] md:text-right">
                Direct work with the founder &amp; design lead — not a sales
                desk.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-16">
            {pillars.map((p, i) => (
              <FadeUp key={p.no} delay={i * 0.06}>
                <div className="border-t border-[color:var(--color-rule)] pt-7">
                  <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                    № {p.no}
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
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-[44ch] text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                    {p.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          §  TWO — A NOTE ON PROCESS
          ==================================================== */}
      <section className="py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-6">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <figure className="col-span-2">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src="/images/vibe/vibe-04.jpg"
                      alt="A commissioned residence in Bandra"
                      fill
                      sizes="(min-width: 768px) 48vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-stardust)]">
                      A residence · Bandra
                    </div>
                  </div>
                </figure>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src="/images/diffusers/diffuser-02.png"
                      alt="The Monolith specified in travertine"
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    Specified in travertine
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-aerial-soft)]">
                    <Image
                      src="/images/vibe/vibe-11.jpg"
                      alt="Drawing room"
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.58rem] uppercase tracking-[0.36em] text-[color:var(--color-charcoal-soft)]">
                    A drawing room
                  </figcaption>
                </figure>
              </div>
            </FadeUp>

            <div className="md:col-span-6 md:pl-2 lg:pl-8">
              <FadeUp>
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                  § Two · A Note on Process
                </p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2
                  className="mt-6 max-w-[20ch] text-balance"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-3xl)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.016em",
                    fontWeight: 400,
                  }}
                >
                  Quiet engagement.{" "}
                  <em className="text-[color:var(--color-aerial-deep)]">
                    Specification you can rely on.
                  </em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <div className="mt-8 space-y-5 text-[var(--text-base)] leading-[1.85] text-[color:var(--color-charcoal-soft)]">
                  <p className="max-w-[48ch]">
                    Most trade enquiries are answered within 48 hours. We send
                    a project questionnaire, then schedule a 30-minute call to
                    establish brief, area, and operating profile.
                  </p>
                  <p className="max-w-[48ch]">
                    For commissioned scent profiles, the development cycle is
                    typically 6–10 weeks, including two scent panels and a
                    sealed final reference.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          §  THREE — ENQUIRY (FORM stub)
          ==================================================== */}
      <section className="bg-[color:var(--color-verdant)] py-[var(--spacing-section)] text-[color:var(--color-stardust)]">
        <div className="mx-auto max-w-[var(--container-content)] px-6 md:px-10">
          <FadeUp>
            <div className="mb-10 flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-stardust)]/65">
              <span className="h-px w-12 bg-[color:var(--color-stardust)]/25" />
              <span>§ Three · Enquiry</span>
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
              Write to us.{" "}
              <em className="not-italic text-[color:var(--color-aerial-soft)]">
                We&rsquo;ll come back within 48 hours.
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.12}>
            <form className="mt-12 grid gap-7 md:grid-cols-2 md:gap-x-10">
              <Field label="Studio" placeholder="Studio or firm name" />
              <Field label="Your name" placeholder="First and last" />
              <Field label="Email" placeholder="you@studio.com" type="email" />
              <Field label="Project city" placeholder="Mumbai, Bangalore, Delhi…" />
              <Field
                label="Project type"
                placeholder="Residential · Hospitality · Retail · Other"
              />
              <Field
                label="Square footage"
                placeholder="Approximate area to be scented"
              />
              <div className="md:col-span-2">
                <Field
                  label="A note"
                  placeholder="Tell us about the project, timeline, or anything specific."
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
