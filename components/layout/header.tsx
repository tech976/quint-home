"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Logo, Monogram } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { activeShopCategories } from "@/lib/data/categories";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/architects", label: "Trade" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b text-[color:var(--color-charcoal)] transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled
            ? "border-[color:var(--color-rule)] bg-[color:var(--color-white)]/90 backdrop-blur-xl"
            : "border-transparent bg-[color:var(--color-white)]"
        )}
        style={{ transitionTimingFunction: "var(--ease-quint)" }}
      >
        <div className="mx-auto grid max-w-[var(--container-full)] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-5 md:px-10">
          {/* Left nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {/* Shop — with category dropdown */}
            <div className="group relative py-1">
              <Link
                href="/shop"
                className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
              >
                Shop
              </Link>
              {/* pt-4 bridges the gap so hover survives the move into the panel */}
              <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-300 ease-[var(--ease-quint)] group-hover:visible group-hover:opacity-100">
                <div className="min-w-[13rem] border border-[color:var(--color-rule)] bg-[color:var(--color-white)] pb-2 shadow-[0_18px_50px_-24px_rgba(58,53,50,0.3)]">
                  {/* Monogram brand mark atop the panel */}
                  <div className="flex items-center gap-2.5 border-b border-[color:var(--color-rule)] px-5 pb-2.5 pt-3">
                    <Monogram className="h-5 w-5 text-[color:var(--color-aerial-deep)]" />
                    <span className="text-[0.54rem] uppercase tracking-[0.3em] text-[color:var(--color-charcoal-soft)]">
                      The Range
                    </span>
                  </div>
                  <div className="pt-1.5">
                    {activeShopCategories.map((c) => (
                      <Link
                        key={c.slug}
                        href={c.href}
                        className="block whitespace-nowrap px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-charcoal-soft)] transition-colors duration-200 hover:text-[color:var(--color-clay)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* About */}
            <Link
              href="/about"
              className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button (left) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center justify-self-start md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center logo — inline SVG, inherits header color */}
          <Link
            href="/"
            className="justify-self-center"
            aria-label="Quint Home — Home"
          >
            <Logo className="h-9 w-auto md:h-10" />
          </Link>

          {/* Right nav + actions */}
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.slice(2).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Search"
              className="hidden transition-colors duration-300 hover:text-[color:var(--color-clay)] md:block"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/cart"
              aria-label="Bag"
              className="relative flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--color-clay)]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="hidden text-[0.78rem] uppercase tracking-[0.18em] opacity-80 md:inline">
                Bag (0)
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[color:var(--color-white)]"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-full flex-col px-8 pt-8 pb-12">
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto text-[color:var(--color-charcoal)]" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[0.78rem] uppercase tracking-[0.18em]"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <nav className="mt-20 flex flex-col gap-6">
              {navLinks.map((l) => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-[color:var(--color-charcoal)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-3xl)",
                    }}
                  >
                    {l.label}
                  </Link>
                  {l.href === "/shop" && (
                    <div className="mt-4 flex flex-col gap-3 pl-0.5">
                      {activeShopCategories.map((c) => (
                        <Link
                          key={c.slug}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[0.82rem] uppercase tracking-[0.16em] text-[color:var(--color-charcoal-soft)]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]">
              Mumbai · Air Elevated
            </div>
          </div>
        </div>
      )}
    </>
  );
}
