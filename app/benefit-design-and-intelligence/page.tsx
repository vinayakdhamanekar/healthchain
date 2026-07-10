import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BenefitdesignHero from "@/components/benefitdesign/BenefitdesignHero";
import ThePressureSection from "@/components/benefitdesign/ThePressureSection";
import DesignOptions from "@/components/benefitdesign/DesignOptions"
import WhoItServes from "@/components/benefitdesign/WhoItServes";
import ComplianceStandards from "@/components/benefitdesign/ComplianceStandards";
import BenefitDesignCTA from "@/components/benefitdesign/BenefitDesignCTA";



export default function BenefitDesignAndIntelligencePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">

        <Navbar />
        <BenefitdesignHero />
        <ThePressureSection />
        <DesignOptions />
        <WhoItServes />
        <ComplianceStandards />
        <BenefitDesignCTA />
        <Footer />
      </div>
    </div>
  );
}
