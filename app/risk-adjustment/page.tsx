import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiskRevHero from "@/components/risk-adjustment/RiskRevHero";
import WhyDifferent from "@/components/risk-adjustment/WhyDifferent";
import WhatCoderSees from "@/components/risk-adjustment/WhatCoderSees";
import Workflow from "@/components/risk-adjustment/Workflow";
import Evidence from "@/components/risk-adjustment/Evidence";
import Roadmap from "@/components/risk-adjustment/Roadmap";
import WhyNow from "@/components/risk-adjustment/WhyNow";
import DesignPartnership from "@/components/risk-adjustment/DesignPartnership";
import TrustSecurity from "@/components/risk-adjustment/TrustSecurity";
import RiskRevFAQ from "@/components/risk-adjustment/RiskRevFAQ";
import RiskRevCTA from "@/components/risk-adjustment/RiskRevCTA";

export const metadata: Metadata = pageMetadata({
  title: "RiskRev Pro - Risk Adjustment",
  description:
    "AI assisted risk adjustment coding built on the longitudinal member record. Coders review chart evidence beside CMS-credited MAO-004 diagnoses. Now onboarding Medicare Advantage design partners.",
  path: "/risk-adjustment",
  keywords: [
    "risk adjustment coding software",
    "Medicare Advantage RADV",
    "MAO-004 reconciliation",
    "HCC coding software",
    "CMS-HCC risk adjustment",
  ],
});

export default function RiskAdjustmentPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <RiskRevHero />
        <WhyDifferent />
        <WhatCoderSees />
        <Workflow />
        <Evidence />
        {/* <Roadmap /> */}
        <WhyNow />
        <DesignPartnership />
        <TrustSecurity />
        <RiskRevFAQ />
        <RiskRevCTA />
        <Footer />
      </div>
    </div>
  );
}
