import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LongitudinalHero from "@/components/longitudinal/LongitudinalHero";
import ProblemSection from "@/components/longitudinal/ProblemSection";
import HowWorks from "@/components/longitudinal/HowWorks";
import SixDomains from "@/components/longitudinal/SixDomains";
import ActivationCards from "@/components/longitudinal/ActivationCards";
import ComplianceStandards from "@/components/longitudinal/ComplianceStandards";
import PlatformCTA from "@/components/longitudinal/PlatformCTA";



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
