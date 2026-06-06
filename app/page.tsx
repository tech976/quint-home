import { Banner } from "@/components/sections/banner";
import { Hero } from "@/components/sections/hero";
import { SmartHome } from "@/components/sections/smart-home";
import { BrandStatement } from "@/components/sections/brand-statement";
import { DiffuserShowcase } from "@/components/sections/diffuser-showcase";
import { ScentLibrary } from "@/components/sections/scent-library";
import { FounderTeaser } from "@/components/sections/founder-teaser";
import { Atmosphere } from "@/components/sections/atmosphere";
import { TrustRow } from "@/components/sections/trust-row";
import { MonogramDivider } from "@/components/brand/monogram-divider";

export default function Home() {
  return (
    <>
      {/* 0 · Promotional banner */}
      <Banner />
      {/* 1 · Opening visual */}
      <Hero />
      {/* 2 · What the product is — set once, app-controlled */}
      <SmartHome />
      {/* 3 · What we do / why we exist */}
      <BrandStatement />
      {/* 4 · The diffusers */}
      <DiffuserShowcase />
      {/* 5 · The fragrances */}
      <ScentLibrary />
      {/* monogram divider */}
      <MonogramDivider className="py-[var(--spacing-section-sm)]" />
      {/* 6 · A short letter from the founder */}
      <FounderTeaser />
      {/* 7 · The pictures that taught us how a room should feel */}
      <Atmosphere />
      {/* — trust close — */}
      <TrustRow />
    </>
  );
}
