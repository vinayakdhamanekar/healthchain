import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import PricingHero from "@/components/pricing/PricingHero";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import ScopedServices from "@/components/pricing/ScopedServices";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import ReadyCTA from "@/components/ReadyCTA";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Estimate your interoperability cost for Medicare Advantage and Medicaid managed care plans. Configure covered members, data preparation, and direct connectivity for an instant estimate.",
  path: "/pricing",
  keywords: [
    "CMS interoperability pricing",
    "payer data platform cost",
    "FHIR API pricing",
    "Medicare Advantage compliance cost",
    "Medicaid managed care compliance cost",
  ],
});

export default function PricingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] bg-[#F4EFE8]">
        <Navbar />
        {/* <PricingHero /> */}
        <PricingCalculator />
        <ScopedServices />
        <PricingFAQ />
        <ReadyCTA />
        <Footer />
      </div>
    </div>
  );
}
