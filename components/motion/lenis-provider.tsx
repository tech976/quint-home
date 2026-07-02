"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    /** The active Lenis instance, when smooth-scroll is enabled (pointer devices). */
    __lenis?: Lenis;
  }
}

/**
 * Smooth scroll (pointer devices only) PLUS navigation scroll management.
 *
 * Next's App Router *maintains* scroll position on client navigation by default,
 * and Lenis owns the scroll container — so without this, pages open wherever you
 * last were. On every route change we jump to the top, or, when the URL carries a
 * hash (e.g. /shop#oils), land precisely on that section (honouring its
 * `scroll-margin-top` / `scroll-mt-*`). Same-page hash clicks are routed through
 * Lenis too, so its internal position never desyncs.
 */
export function LenisProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Create Lenis once — off for touch (floaty) and reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices keep native scrolling — the smooth-scroll inertia feels
    // "floaty"/unstable on phones. Smooth scroll stays on for pointer devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  // On every route change: land on the hash target, or scroll to the very top.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      const hash = window.location.hash;
      const target =
        hash.length > 1
          ? document.getElementById(decodeURIComponent(hash.slice(1)))
          : null;

      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else target.scrollIntoView();
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Same-page hash links (pathname unchanged, so the effect above won't fire).
  // Intercept in the capture phase so Next's own hash scroll never competes with
  // Lenis. Native scroll (no Lenis) is left alone — scroll-mt handles the offset.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const lenis = lenisRef.current;
      if (!lenis) return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]") as
        | HTMLAnchorElement
        | null;
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1))
      );
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target);
      if (url.hash !== window.location.hash) {
        history.pushState(null, "", url.hash);
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
