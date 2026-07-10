import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CultureBenefits from "@/components/careers/CultureBenefits";
import CareersCTA from "@/components/careers/CareersCTA";
import JobOpenings from "@/components/careers/JobOpenings";


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
