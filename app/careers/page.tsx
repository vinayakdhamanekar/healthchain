import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CultureBenefits from "@/components/careers/CultureBenefits";
import CareersCTA from "@/components/careers/CareersCTA";
import JobOpenings from "@/components/careers/JobOpenings";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Health Chain and help close the biggest gap in healthcare data: complete data readiness for payers. Explore open roles and our culture.",
  path: "/careers",
  keywords: [
    "healthcare data jobs",
    "health tech careers",
    "payer technology jobs",
    "data infrastructure careers",
  ],
});

export default function CareersPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <CareersHero />
        <CultureBenefits />
        <JobOpenings />
        <CareersCTA />
        <Footer />
      </div>
    </div>
  );
}
