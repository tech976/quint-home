"use client";

import { useEffect } from "react";
import { viewContent } from "@/lib/analytics/pixel";

/**
 * ViewContent for a product page. A client island inside a server page, so the
 * page itself stays static and only this fires on mount.
 *
 * `id` must be the same id the Meta catalogue uses, which for a Shopify feed is
 * the numeric variant id. Where a page has no Shopify variant yet, it passes
 * the handle and the event still records the view — it simply will not match a
 * catalogue item.
 */
export function TrackView({
  id,
  name,
  value,
  category,
}: {
  id: string;
  name: string;
  value: number;
  category?: string;
}) {
  useEffect(() => {
    viewContent({ id, name, value, category });
  }, [id, name, value, category]);

  return null;
}
