import type { Diffuser, FragranceOil, Product } from "@/lib/types";
import type { ShopifyCommerce } from "@/lib/shopify/commerce";
import { SITE, BRAND, abs } from "@/lib/seo";

/**
 * JSON-LD for the storefront.
 *
 * Everything emitted here has to be true of the rendered page: Google's
 * structured-data policy treats markup that contradicts the visible content as
 * spam, and the penalty is manual. So price comes from the same Shopify lookup
 * the page renders, and nothing is invented — notably there is no
 * aggregateRating or review anywhere, because the site holds no review data.
 */

const ORG_ID = `${SITE}/#organization`;

/** Shopify availability → the schema.org term Google expects. */
function availability(available: boolean): string {
  return available
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
}

export function productJsonLd(
  product: Product,
  commerce: ShopifyCommerce | undefined,
  price: number
): Record<string, unknown> {
  const isOil = product.category === "oil";
  const url = abs(`/range/${product.slug}`);
  const oil = isOil ? (product as FragranceOil) : null;
  const diffuser = isOil ? null : (product as Diffuser);

  // Every finish is a real, separately purchasable variant, so they belong in
  // the markup as such rather than being flattened into one offer.
  const offers =
    commerce && commerce.variants.length > 1
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: Math.min(...commerce.variants.map((v) => v.price)),
          highPrice: Math.max(...commerce.variants.map((v) => v.price)),
          offerCount: commerce.variants.length,
          availability: availability(commerce.available),
          url,
          seller: { "@id": ORG_ID },
        }
      : {
          "@type": "Offer",
          priceCurrency: "INR",
          price,
          availability: availability(commerce?.available ?? true),
          url,
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": ORG_ID },
        };

  const additional = [
    ...(oil
      ? [
          { "@type": "PropertyValue", name: "Volume", value: `${oil.volumeML} ml` },
          { "@type": "PropertyValue", name: "Top notes", value: oil.notes.top.join(", ") },
          { "@type": "PropertyValue", name: "Heart notes", value: oil.notes.heart.join(", ") },
          { "@type": "PropertyValue", name: "Base notes", value: oil.notes.base.join(", ") },
        ]
      : []),
    ...(diffuser
      ? [
          { "@type": "PropertyValue", name: "Coverage", value: diffuser.coverageLabel },
          { "@type": "PropertyValue", name: "Finish", value: diffuser.finish },
          {
            "@type": "PropertyValue",
            name: "App control",
            value: diffuser.bluetooth ? "Bluetooth companion app" : "On-device only",
          },
        ]
      : []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description.split("\n\n")[0],
    image: [abs(product.image)],
    url,
    category: isOil ? "Home Fragrance Oil" : "Electric Aroma Diffuser",
    brand: { "@type": "Brand", name: BRAND },
    // Model codes are real manufacturer identifiers; oils have none, and
    // inventing one would be worse than omitting the field.
    ...(diffuser ? { mpn: diffuser.model, sku: diffuser.model } : {}),
    offers,
    ...(additional.length ? { additionalProperty: additional } : {}),
  };
}

/** home → range → product, so Google can render the trail under the result. */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: abs(step.path),
    })),
  };
}

/**
 * FAQPage. Google requires the question and answer to be visible on the page,
 * so this is built from the same array the page renders rather than a
 * hand-written copy that could drift out of step.
 */
export function faqJsonLd(
  entries: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

/** Renders a JSON-LD block. */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}
