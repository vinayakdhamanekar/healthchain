import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformHero from "@/components/platform/PlatformHero";
import TrustedData from "@/components/platform/TrustedData";
import EnterpriseSuccess from "@/components/platform/EnterpriseSuccess";
import MiddlewareSlot from "@/components/platform/MiddlewareSlot";
import DataFoundation from "@/components/platform/DataFoundation";
import ComplianceStandards from "@/components/platform/ComplianceStandards";
import PlatformCTA from "@/components/platform/PlatformCTA";

export default function HCHPlatformPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <PlatformHero />
        <TrustedData />
        <EnterpriseSuccess />
        <MiddlewareSlot />
        <DataFoundation />
        <ComplianceStandards />
        <PlatformCTA />
        <Footer />
      </div>
    </div>
  );
}
