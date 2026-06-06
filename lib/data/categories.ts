export interface ShopCategory {
  slug: string;
  label: string;
  href: string;
  /**
   * Inactive categories are defined for the roadmap but hidden from customers
   * for now. Flip `active` to true to surface one in the Shop dropdown.
   */
  active: boolean;
}

/**
 * Shop categories. Diffusers and Fragrance Oils are live; Reed Diffusers,
 * Candles and Room Sprays are planned and intentionally hidden for now.
 */
export const shopCategories: ShopCategory[] = [
  { slug: "browse", label: "Search the range", href: "/shop#browse", active: true },
  { slug: "diffusers", label: "Diffusers", href: "/shop#diffusers", active: true },
  { slug: "oils", label: "Fragrance Oils", href: "/shop#oils", active: true },
  { slug: "reed-diffusers", label: "Reed Diffusers", href: "/shop#reed-diffusers", active: false },
  { slug: "candles", label: "Candles", href: "/shop#candles", active: false },
  { slug: "room-sprays", label: "Room Sprays", href: "/shop#room-sprays", active: false },
];

/** Only the categories customers should see today. */
export const activeShopCategories = shopCategories.filter((c) => c.active);
