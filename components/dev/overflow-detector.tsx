"use client";

/**
 * OverflowDetector — dev-only horizontal-overflow finder.
 *
 * This component renders nothing and has ZERO effect in production:
 * it is gated on `process.env.NODE_ENV !== "production"`, so the body
 * of the effect is dead code that bundlers tree-shake out of prod builds.
 *
 * What it does in development:
 *  - After mount, and again on resize (debounced), it walks the DOM and
 *    finds every element whose rendered box is wider than the viewport
 *    (`document.documentElement.clientWidth`), i.e. the elements that
 *    cause horizontal page overflow.
 *  - Each offender gets a bright red outline so you can SEE it in the
 *    browser, plus a small `data-overflow` marker.
 *  - It logs a grouped table to the console listing each offender's
 *    CSS-path identifier and how many pixels it overflows by, so you
 *    can jump straight to the culprit.
 *
 * How a developer sees the output:
 *  1. Open the page in dev (npm run dev).
 *  2. Any overflowing element is outlined in red on the page.
 *  3. Open DevTools console: look for the
 *     "[overflow-detector] N element(s) wider than viewport" group.
 */

import { useEffect } from "react";

const OUTLINE_STYLE = "3px solid #ff0040";
const MARKER_ATTR = "data-overflow-offender";
// Tolerance to avoid flagging sub-pixel rounding noise.
const SLOP = 1;

function cssPath(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  let depth = 0;
  while (node && node.nodeType === 1 && depth < 6) {
    let selector = node.nodeName.toLowerCase();
    if (node.id) {
      selector += `#${node.id}`;
      parts.unshift(selector);
      break;
    }
    const cls =
      typeof node.className === "string" && node.className.trim()
        ? "." + node.className.trim().split(/\s+/).slice(0, 3).join(".")
        : "";
    selector += cls;
    parts.unshift(selector);
    node = node.parentElement;
    depth += 1;
  }
  return parts.join(" > ");
}

export function OverflowDetector() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    let raf = 0;

    const clearMarks = () => {
      document
        .querySelectorAll<HTMLElement>(`[${MARKER_ATTR}]`)
        .forEach((el) => {
          el.style.outline = "";
          el.removeAttribute(MARKER_ATTR);
        });
    };

    const scan = () => {
      clearMarks();

      const docEl = document.documentElement;
      const viewport = docEl.clientWidth;
      const offenders: {
        element: string;
        widthPx: number;
        overflowPx: number;
        node: HTMLElement;
      }[] = [];

      // True if some ancestor (excluding html/body, whose overflow-x:clip is
      // our intentional safety net) clips horizontally — then the element is
      // contained and is NOT a real page-overflow offender. This is what stops
      // the false positives: a wide native <select> inside an `overflow-hidden`
      // box is clipped and harmless, so we skip it.
      const isClipped = (el: HTMLElement): boolean => {
        let n = el.parentElement;
        while (n && n !== document.body && n !== docEl) {
          const ox = getComputedStyle(n).overflowX;
          if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") {
            return true;
          }
          n = n.parentElement;
        }
        return false;
      };

      const all = document.body.querySelectorAll<HTMLElement>("*");
      all.forEach((el) => {
        // Use offsetWidth (the LAYOUT width) rather than
        // getBoundingClientRect().width or scrollWidth:
        //  - getBoundingClientRect() includes CSS transforms (e.g. the smooth-
        //    scroll wrapper), which produced phantom widths.
        //  - scrollWidth counts content already clipped by an ancestor.
        // offsetWidth is transform-immune and reflects the real box size.
        const overflow = el.offsetWidth - viewport;

        // Flag only an element that is itself wider than the viewport and is
        // not contained by a clipping ancestor.
        if (overflow > SLOP && !isClipped(el)) {
          el.style.outline = OUTLINE_STYLE;
          el.setAttribute(MARKER_ATTR, "");
          offenders.push({
            element: cssPath(el),
            widthPx: el.offsetWidth,
            overflowPx: Math.round(overflow),
            node: el,
          });
        }
      });

      if (offenders.length > 0) {
        // eslint-disable-next-line no-console
        console.group(
          `%c[overflow-detector] ${offenders.length} element(s) wider than viewport (${viewport}px)`,
          "color:#ff0040;font-weight:bold",
        );
        // eslint-disable-next-line no-console
        console.table(
          offenders.map(({ element, widthPx, overflowPx }) => ({
            element,
            widthPx,
            overflowPx,
          })),
        );
        offenders.forEach((o) => {
          // eslint-disable-next-line no-console
          console.log(`↳ ${o.element}  (+${o.overflowPx}px)`, o.node);
        });
        // eslint-disable-next-line no-console
        console.groupEnd();
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    // Initial scan after layout settles.
    schedule();

    window.addEventListener("resize", schedule);
    // Re-scan when fonts finish loading (common cause of late reflow).
    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      clearMarks();
    };
  }, []);

  return null;
}

export default OverflowDetector;
