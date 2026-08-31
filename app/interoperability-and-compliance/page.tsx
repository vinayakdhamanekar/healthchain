import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import MandatesTimeline from "@/components/solutions/MandatesTimeline";
import FiveAPIs from "@/components/solutions/FiveAPIs";
import AuditableData from "@/components/solutions/AuditableData";
import CompliancePath from "@/components/solutions/CompliancePath";
import ComplianceStandards from "@/components/platform/ComplianceStandards";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";

export const metadata: Metadata = pageMetadata({
  title: "Interoperability & Compliance Solutions",
  description:
    "Build a real CMS interoperability compliance foundation with FHIR-based APIs for Patient Access, Provider Access, Payer-to-Payer, and Prior Authorization.",
  path: "/interoperability-and-compliance",
  keywords: [
    "CMS interoperability compliance",
    "FHIR APIs for payers",
    "CMS-0057-F compliance",
    "prior authorization API",
    "payer-to-payer data exchange",
  ],
});

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
