import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import LeadershipCards from "@/components/about/LeadershipCards";
import AdvisorsGrid from "@/components/about/AdvisorsGrid";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <LeadershipCards />
        <AdvisorsGrid />
        <AboutCTA />
        <Footer />
      </div>
    </div>
  );
}
