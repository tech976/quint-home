"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { META_PIXEL_ID, pageView } from "@/lib/analytics/pixel";

/**
 * Meta Pixel.
 *
 * The base snippet fires one PageView on load. This app navigates on the
 * client, so every route after the first would go uncounted — the listener
 * below sends a PageView when the path changes, and skips the first render so
 * the landing page is not counted twice.
 *
 * afterInteractive, like Clarity: a tracker should never render ahead of the
 * page.
 */
function RouteChangePageViews() {
  const pathname = usePathname();
  const search = useSearchParams();
  const first = useRef(true);
  // useSearchParams returns a fresh object on every render, so depending on it
  // directly sent a PageView each time the tree re-rendered — adding to the bag
  // counted as a page view. The serialised string only changes with the URL.
  const query = search.toString();

  useEffect(() => {
    if (first.current) {
      first.current = false; // the snippet already sent this one
      return;
    }
    pageView();
  }, [pathname, query]);

  return null;
}

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {/* useSearchParams needs a boundary, or every page opts out of static
          rendering. */}
      <Suspense fallback={null}>
        <RouteChangePageViews />
      </Suspense>
    </>
  );
}
