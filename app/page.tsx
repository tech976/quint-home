import { Hero } from "@/components/sections/hero";
import { BrandStatement } from "@/components/sections/brand-statement";
import { DiffuserShowcase } from "@/components/sections/diffuser-showcase";
import { ScentLibrary } from "@/components/sections/scent-library";
import { Ritual } from "@/components/sections/ritual";
import { Atmosphere } from "@/components/sections/atmosphere";
import { SmartHome } from "@/components/sections/smart-home";
import { FounderTeaser } from "@/components/sections/founder-teaser";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { TrustRow } from "@/components/sections/trust-row";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <DiffuserShowcase />
      <ScentLibrary />
      <Ritual />
      <Atmosphere />
      <SmartHome />
      <FounderTeaser />
      <JournalTeaser />
      <TrustRow />
    </>
  );
}
