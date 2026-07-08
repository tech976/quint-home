"use client";

import { useEffect } from "react";

/**
 * Deters casual image downloading: blocks the right-click / long-press context
 * menu when the target is an image. (Not bulletproof – nothing on the web is –
 * but it stops the obvious "Save image as…".) Pairs with the CSS in globals
 * that disables image dragging and the iOS long-press callout.
 */
export function ImageGuard() {
  useEffect(() => {
    function onContext(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      if (el && el.tagName === "IMG") e.preventDefault();
    }
    document.addEventListener("contextmenu", onContext);
    return () => document.removeEventListener("contextmenu", onContext);
  }, []);

  return null;
}
