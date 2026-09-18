import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiskRevProHero from "@/components/riskrev-pro/RiskRevProHero";
import ProblemSection from "@/components/riskrev-pro/ProblemSection";
import PlatformIntro from "@/components/riskrev-pro/PlatformIntro";
import RolesSection from "@/components/riskrev-pro/RolesSection";
import FeaturesSection from "@/components/riskrev-pro/FeaturesSection";
import ImpactSection from "@/components/riskrev-pro/ImpactSection";
import ClosingCTA from "@/components/riskrev-pro/ClosingCTA";

export const metadata: Metadata = pageMetadata({
  title: "RiskRev Pro",
  description:
    "RiskRev Pro turns scattered charts, claims, and CMS files into confirmed, submission-ready diagnoses — automatically matched, AI-coded, and quality-checked before a human ever has to chase a record again.",
  path: "/riskrev-pro",
  keywords: [
    "risk adjustment platform",
    "RAF capture software",
    "AI coding risk adjustment",
    "RADV audit readiness",
    "Medicare Advantage risk adjustment",
  ],
});

export default function RiskRevProPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <RiskRevProHero />
        <ProblemSection />
        <PlatformIntro />
        <RolesSection />
        <FeaturesSection />
        <ImpactSection />
        <ClosingCTA />
        <Footer />
      </div>
    </div>
  );
}
