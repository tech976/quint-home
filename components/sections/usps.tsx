import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import {
  Wind,
  Smartphone,
  Droplets,
  Sparkles,
  BatteryCharging,
  type LucideIcon,
} from "lucide-react";

/**
 * USPs — the brand's selling points, from the brief. Magazine-style bento:
 * a tall feature image (01) beside a mosaic of the rest, each with the number,
 * lead and stat set over the photograph like an editorial caption.
 */
type Usp = {
  n: string;
  lead: string;
  image: string;
  stat: { icon: LucideIcon; value: string };
  /** Grid placement classes. */
  span: string;
};

const usps: Usp[] = [
  {
    n: "01",
    lead: "Waterless cold-air nebulization",
    image: "/images/usp/usp-1.webp",
    stat: { icon: Wind, value: "200–500+ sq ft coverage" },
    span: "md:row-span-2",
  },
  {
    n: "02",
    lead: "App-controlled, smart-home ready",
    image: "/images/usp/usp-2.webp",
    stat: { icon: Smartphone, value: "Apple · Alexa · Google" },
    span: "",
  },
  {
    n: "03",
    lead: "Luxury hotel scents, for home",
    image: "/images/usp/usp-3.webp",
    stat: { icon: Droplets, value: "70–90% concentration" },
    span: "",
  },
  {
    n: "04",
    lead: "A decor object, not an appliance",
    image: "/images/usp/usp-4.webp",
    stat: { icon: Sparkles, value: "Made to be seen" },
    span: "",
  },
  {
    n: "05",
    lead: "Wireless and rechargeable",
    image: "/images/usp/usp-5.webp",
    stat: { icon: BatteryCharging, value: "Cord-free, runs for weeks" },
    span: "",
  },
];

export function USPs() {
  return (
    <section className="border-y border-[color:var(--color-rule)] bg-[color:var(--color-stardust-soft)] py-[var(--spacing-section-sm)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        {/* Header */}
        <FadeUp>
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                <Monogram className="h-4 w-4 shrink-0" />
                Why Quint
              </p>
              <h2
                className="mt-4 max-w-[18ch] text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Five things that{" "}
                <em className="not-italic text-[color:var(--color-aerial-deep)]">
                  set it apart.
                </em>
              </h2>
            </div>
            <p className="max-w-[26ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
              Engineering, design and fragrance, in one object.
            </p>
          </div>
        </FadeUp>

        {/* Magazine bento */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:auto-rows-[13.5rem] md:gap-4 lg:auto-rows-[15.5rem]">
          {usps.map((u, i) => {
            const Icon = u.stat.icon;
            const featured = i === 0;
            return (
              <FadeUp
                key={u.n}
                delay={(i % 5) * 0.05}
                className={`min-h-[14rem] md:min-h-0 md:h-[100%] ${u.span}`}
              >
                <article className="group relative h-[100%] min-h-[14rem] overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.lead}
                    fill
                    sizes={
                      featured
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(41,51,41,0.12) 0%, rgba(41,51,41,0) 32%, rgba(41,51,41,0.78) 100%)",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col justify-between p-5 text-[color:var(--color-stardust)] md:p-6">
                    <span className="text-[0.6rem] tabular-nums uppercase tracking-[0.3em] opacity-85">
                      {u.n}
                    </span>
                    <div>
                      <h3
                        className="max-w-[20ch] text-balance"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: featured
                            ? "var(--text-3xl)"
                            : "var(--text-xl)",
                          lineHeight: 1.08,
                          letterSpacing: "-0.014em",
                          fontWeight: 400,
                        }}
                      >
                        {u.lead}
                      </h3>
                      <div className="mt-3 flex items-center gap-2.5 opacity-90">
                        <Icon
                          className="h-4 w-4 shrink-0 text-[color:var(--color-aerial-soft)]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="text-[0.62rem] uppercase tracking-[0.18em]">
                          {u.stat.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
