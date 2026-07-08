import type { NextConfig } from "next";

// Old model-code product paths → new title-based slugs. Permanent (301) so the
// SEO value of any indexed/linked old URLs carries over to the new URLs.
const SLUG_REDIRECTS: Record<string, string> = {
  "tabletop-a326": "monolith",
  "tabletop-fabric-a974": "loom",
  "clock-at370": "ember",
  "dual-mist-at302": "pillar",
  "plug-in-a815": "pebble",
  quietude: "terrain",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(SLUG_REDIRECTS).map(([from, to]) => ({
      source: `/shop/${from}`,
      destination: `/shop/${to}`,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
