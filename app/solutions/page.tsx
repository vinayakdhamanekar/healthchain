import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import MandatesTimeline from "@/components/solutions/MandatesTimeline";
import FiveAPIs from "@/components/solutions/FiveAPIs";
import AuditableData from "@/components/solutions/AuditableData";
import CompliancePath from "@/components/solutions/CompliancePath";
import ComplianceStandards from "@/components/platform/ComplianceStandards";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";

export default function SolutionsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <SolutionsHero />
        <MandatesTimeline />
        <FiveAPIs />
        <AuditableData />
        <CompliancePath />
        <ComplianceStandards />
        <SolutionsCTA />
        <Footer />
      </div>
    </div>
  );
}
