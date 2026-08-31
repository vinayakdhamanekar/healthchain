import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyCTA from "@/components/ReadyCTA";
import ResourcesHero from "@/components/resources/ResourcesHero";
import ResourcesSections from "@/components/resources/ResourcesSections";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Regulatory briefs, case studies, and whitepapers on payer data infrastructure, interoperability, and compliance.",
  path: "/resources",
  keywords: [
    "healthcare interoperability resources",
    "CMS regulatory briefs",
    "payer case studies",
    "health data whitepapers",
  ],
});

export default function ResourcesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <ResourcesHero />
        <ResourcesSections />
        <ReadyCTA />
        <Footer />
      </div>
    </div>
  );
}
