import type { JSX } from "react";
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
