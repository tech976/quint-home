import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const cols = [
  {
    heading: "Shop",
    links: [
      { href: "/shop?category=diffusers", label: "Diffusers" },
      { href: "/shop?category=oils", label: "Fragrance Oils" },
      { href: "/shop?category=hotel", label: "Hotel Credential" },
      { href: "/shop", label: "All Objects" },
    ],
  },
  {
    heading: "House",
    links: [
      { href: "/about", label: "About" },
      { href: "/journal", label: "Journal" },
      { href: "/architects", label: "For Architects" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Considered",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping" },
      { href: "/refunds", label: "Returns" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-white)] text-[color:var(--color-charcoal)]">
      <div className="mx-auto max-w-[var(--container-full)] px-6 pt-20 pb-10 md:px-10">
        {/* Newsletter / Wordmark row */}
        <div className="grid gap-12 border-b border-[color:var(--color-rule)] pb-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            <p className="font-eyebrow mb-6">The Newsletter</p>
            <h3
              className="max-w-[18ch] text-balance"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-3xl)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              The next breath. Quint Home, into your inbox.
            </h3>
            <form className="mt-8 flex max-w-md items-end gap-3 border-b border-[color:var(--color-charcoal)] pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent text-[0.95rem] outline-none placeholder:text-[color:var(--color-charcoal-soft)]"
                aria-label="Email"
              />
              <button
                type="submit"
                className="text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal)] transition-colors hover:text-[color:var(--color-clay)]"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col items-start md:items-end md:justify-between">
            <Logo className="h-9 w-auto text-[color:var(--color-charcoal)]" />
            <p className="mt-6 max-w-[28ch] text-[0.9rem] leading-[1.7] text-[color:var(--color-charcoal-soft)] md:text-right">
              Mumbai-born. Built around the question of why your home doesn&rsquo;t smell like a great hotel.
            </p>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid gap-10 pt-14 md:grid-cols-4">
          <div>
            <p className="font-eyebrow mb-5">Quint Home</p>
            <p className="max-w-[24ch] text-[0.92rem] leading-[1.7] text-[color:var(--color-charcoal-soft)]">
              Hotel-grade fragrance for the considered Indian home. Designed in Mumbai.
            </p>
            <p className="mt-6 text-[0.78rem] tracking-[0.06em] text-[color:var(--color-charcoal-soft)]">
              Rusera Lifestyle
              <br />
              Mumbai, India
              <br />
              <a
                href="mailto:hello@quinthome.in"
                className="underline-offset-4 hover:underline"
              >
                hello@quinthome.in
              </a>
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.heading}>
              <p className="font-eyebrow mb-5">{c.heading}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[0.95rem] text-[color:var(--color-charcoal)] underline-offset-4 transition-colors hover:text-[color:var(--color-clay)] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Baseline */}
        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-[color:var(--color-rule)] pt-6 text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)] md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Quint Home · Air Elevated</span>
          <span>IFRA-compliant · Made in India</span>
        </div>
      </div>
    </footer>
  );
}
