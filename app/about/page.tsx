import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import LeadershipCards from "@/components/about/LeadershipCards";
import AdvisorsGrid from "@/components/about/AdvisorsGrid";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Health Chain is building the trusted data foundation health plans use for every critical decision. Meet the team and advisors behind our platform.",
  path: "/about",
  keywords: [
    "health data company",
    "healthcare data platform team",
    "payer data infrastructure company",
    "health plan technology partner",
  ],
});

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
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
