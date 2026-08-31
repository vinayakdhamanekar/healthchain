import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalBody from "@/components/legal/LegalBody";
import { TERMS_OF_USE } from "@/data/legal";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of the Health Chain website and Services.",
  path: "/terms-of-use",
  keywords: ["Health Chain terms of use", "website terms and conditions"],
});

export default function TermsOfUsePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <LegalHero title={TERMS_OF_USE.title} effectiveDate={TERMS_OF_USE.effectiveDate} />
        <LegalBody doc={TERMS_OF_USE} />
        <Footer />
      </div>
    </div>
  );
}
