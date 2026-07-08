import Image from "next/image";
import Link from "next/link";
import { diffusers } from "@/lib/data/diffusers";
import { formatINR } from "@/lib/utils";
import { FadeUp } from "@/components/motion/fade-up";
import type { Diffuser } from "@/lib/types";

/**
 * Device comparison – coverage, power/connectivity, headline features, material
 * and placement, side by side. Keyed by the stable manufacturer model code so
 * it survives URL/slug changes. Facts not in the per-model spec sheet
 * (power type, clock, light) are curated here.
 */
type Fact = {
  power: string;
  control: string;
  clock: string;
  light: string;
  material: string;
};

const FACTS: Record<string, Fact> = {
  A326: {
    power: "Wireless — rechargeable battery",
    control: "App + touch panel",
    clock: "—",
    light: "Ambient mood light",
    material: "Aluminium",
  },
  A974: {
    power: "USB-corded",
    control: "App + knob",
    clock: "—",
    light: "Candle-like glow",
    material: "PP + fabric",
  },
  "A-T370": {
    power: "USB-corded",
    control: "App + touch panel",
    clock: "LED clock",
    light: "Breathing night light",
    material: "PMMA acrylic",
  },
  "A-T302": {
    power: "USB-corded",
    control: "App + touch panel",
    clock: "—",
    light: "—",
    material: "Aluminium alloy",
  },
  A815: {
    power: "Plug-in — wall socket",
    control: "No app — 24h cyclic timer",
    clock: "—",
    light: "—",
    material: "PP + glass",
  },
};

const ROWS: { label: string; get: (d: Diffuser) => string }[] = [
  { label: "Coverage", get: (d) => d.coverageLabel },
  { label: "Power", get: (d) => FACTS[d.model].power },
  { label: "Control", get: (d) => FACTS[d.model].control },
  { label: "Clock", get: (d) => FACTS[d.model].clock },
  { label: "Ambient light", get: (d) => FACTS[d.model].light },
  { label: "Material", get: (d) => FACTS[d.model].material },
  { label: "Best for", get: (d) => d.bestFor.join(", ") },
];

export function DiffuserCompare({
  highlightModel,
}: {
  /** When set (e.g. on a PDP), that device's column is emphasised. */
  highlightModel?: string;
} = {}) {
  return (
    <section
      id="compare"
      className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[var(--container-full)] px-6 md:px-10">
        <FadeUp>
          <div className="mb-10 flex flex-col gap-3 border-b border-[color:var(--color-rule)] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[color:var(--color-charcoal-soft)]">
                Compare
              </p>
              <h2
                className="mt-4 text-balance"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-3xl)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Find the diffuser that fits.
              </h2>
            </div>
            <p className="max-w-[32ch] text-[0.86rem] leading-[1.6] text-[color:var(--color-charcoal-soft)] md:text-right">
              Five devices, one scent system — compare coverage, power and
              features at a glance.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Fixed layout so all 5 devices fit the width with no horizontal
              scroll; small fixed thumbnails keep the header compact. */}
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[4.25rem] md:w-[7rem]" />
              {diffusers.map((d) => (
                <col key={d.model} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="pb-4 pr-2 align-bottom" />
                {diffusers.map((d) => (
                  <th
                    key={d.model}
                    className={`px-1.5 pb-4 align-bottom ${
                      d.model === highlightModel
                        ? "bg-[color:var(--color-stardust-soft)]"
                        : ""
                    }`}
                  >
                    <Link
                      href={`/shop/${d.slug}`}
                      className="group block text-center"
                    >
                      <div className="relative mx-auto mb-2 aspect-[4/5] w-12 overflow-hidden bg-[color:var(--color-stardust-soft)] sm:w-16">
                        <Image
                          src={d.image}
                          alt={d.name}
                          fill
                          sizes="64px"
                          className="object-cover transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-[1.04]"
                        />
                      </div>
                      {d.model === highlightModel && (
                        <span className="mb-0.5 block text-[0.44rem] uppercase tracking-[0.14em] text-[color:var(--color-clay)]">
                          Viewing
                        </span>
                      )}
                      <p className="font-[family-name:var(--font-serif)] text-[0.72rem] leading-tight transition-colors group-hover:text-[color:var(--color-clay)] sm:text-[0.85rem]">
                        {d.name}
                      </p>
                      <p className="mt-0.5 text-[0.62rem] tabular-nums text-[color:var(--color-charcoal-soft)] sm:text-[0.72rem]">
                        {formatINR(d.priceINR)}
                      </p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-[color:var(--color-rule)] align-top"
                >
                  <th
                    scope="row"
                    className="py-3 pr-2 text-[0.5rem] uppercase leading-tight tracking-[0.16em] text-[color:var(--color-charcoal-soft)]"
                  >
                    {row.label}
                  </th>
                  {diffusers.map((d) => (
                    <td
                      key={d.model}
                      className={`px-1.5 py-3 text-[0.68rem] leading-snug text-[color:var(--color-charcoal)] sm:text-[0.76rem] ${
                        d.model === highlightModel
                          ? "bg-[color:var(--color-stardust-soft)]"
                          : ""
                      }`}
                    >
                      {row.get(d)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>
      </div>
    </section>
  );
}
