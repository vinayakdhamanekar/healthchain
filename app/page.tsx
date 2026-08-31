import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBadges from "@/components/StatsBadges";
import IngestSection from "@/components/IngestSection";
import PlatformSteps from "@/components/PlatformSteps";
import StatsBanner from "@/components/StatsBanner";
import Solutions from "@/components/Solutions";
import Testimonial from "@/components/Testimonial";
import BlogCards from "@/components/BlogCards";
import ReadyCTA from "@/components/ReadyCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = pageMetadata({
  title: "Payer Data Readiness Platform",
  description:
    "Health Chain captures, curates, and delivers clean longitudinal member data so payers can act on FHIR-ready data, not wrestle with it.",
  path: "/",
  keywords: [
    "healthcare data interoperability",
    "payer data integration",
    "health plan data platform",
    "longitudinal member data",
    "FHIR data platform",
  ],
});

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
       
        <Navbar />
        <Hero />
        <StatsBadges />
        <IngestSection />
        <PlatformSteps />
        <StatsBanner />
        <Solutions />
        <Testimonial />
        <BlogCards />
        <ReadyCTA />
        <Footer />
        </div>
    </div>
  );
}
