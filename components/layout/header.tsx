"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/architects", label: "For Architects" },
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
            {navLinks.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
              >
                {l.label}
              </Link>
            ))}
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
                <Link
                  key={l.href}
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
