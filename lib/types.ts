export type ProductCategory = "diffuser" | "oil";

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface HotelCredential {
  line: string;
  story: string;
}

export interface FragranceOil {
  slug: string;
  name: string;
  category: "oil";
  tier: "standard" | "hotel-credential";
  tagline: string;
  description: string;
  priceINR: number;
  volumeML: number;
  notes: ScentNotes;
  mood: string;
  origin: string;
  credential?: HotelCredential;
  image: string;
  swatch: string;
  textColor: string;
}

/** A colour/finish variant of a diffuser (same model, different finish + photos). */
export interface DiffuserColor {
  name: string;
  /** CSS colour for the selector swatch. */
  swatch: string;
  finish: string;
  image: string;
  gallery: string[];
  /** Optional finish-specific copy. When present, the PDP swaps these in for the
   *  product-level defaults while this finish is selected. */
  tagline?: string;
  description?: string;
  keyFeatures?: string[];
}

export interface Diffuser {
  slug: string;
  /** Manufacturer model code from the product catalogue, e.g. "A815". */
  model: string;
  name: string;
  category: "diffuser";
  tier: "entry" | "premium";
  tagline: string;
  description: string;
  priceINR: number;
  /** Companion-app control. 5 of 6 catalogue models support it (A815 does not). */
  bluetooth: boolean;
  coverageSqFt: [number, number];
  /** Display string for coverage, in sq ft only (e.g. "Up to 1,075 sq ft"). */
  coverageLabel: string;
  /** Catalogue "BEST FOR" placement tags. */
  bestFor: string[];
  /** Catalogue "KEY FEATURES" bullet list, verbatim. */
  keyFeatures: string[];
  image: string;
  gallery: string[];
  /** Optional product video (vertical, muted autoplay loop) for the PDP. */
  video?: string;
  finish: string;
  height: string;
  /** Present when the model ships in more than one colour/finish. The top-level
   *  image/gallery/finish mirror colors[0] (the default). */
  colors?: DiffuserColor[];
  specs: { label: string; value: string }[];
}

export type Product = Diffuser | FragranceOil;

export interface JournalPost {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  /**
   * One string per block. Plain strings are paragraphs, and may carry
   * [label](/path) links to pages on this site. A string beginning "## " is a
   * section heading, and "![alt](/images/…)" on its own is a full-width image.
   */
  body: string[];
  cover: string;
  publishedAt: string;
  readMinutes: number;
  /** Shorter title for the browser tab and search results, where the
   *  editorial headline would be truncated. Falls back to `title`. */
  seoTitle?: string;
  /** Set when the piece is revised, so search engines see it as fresh. */
  updatedAt?: string;
  /** Topics the piece covers, emitted in its Article markup. */
  keywords?: string[];
}
