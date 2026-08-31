import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LongitudinalHero from "@/components/longitudinal/LongitudinalHero";
import ProblemSection from "@/components/longitudinal/ProblemSection";
import HowWorks from "@/components/longitudinal/HowWorks";
import SixDomains from "@/components/longitudinal/SixDomains";
import ActivationCards from "@/components/longitudinal/ActivationCards";
import ComplianceStandards from "@/components/longitudinal/ComplianceStandards";
import PlatformCTA from "@/components/longitudinal/PlatformCTA";

export const metadata: Metadata = pageMetadata({
  title: "Longitudinal Data Enablement",
  description:
    "Match members across EHR, claims, pharmacy, lab, and HIE feeds to build one trustworthy longitudinal health record payers can query and trust.",
  path: "/longitudinal-data-enablement",
  keywords: [
    "longitudinal patient record",
    "member identity matching",
    "healthcare data interoperability",
    "payer data integration",
    "clinical data reconciliation",
  ],
});

export default function LongitudinalDataEnablementPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <LongitudinalHero />
        <ProblemSection />
        <HowWorks />
        <SixDomains />
        <ActivationCards />
        <ComplianceStandards />
        <PlatformCTA />
        <Footer />
      </div>
    </div>
  );
}
