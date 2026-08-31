import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalBody from "@/components/legal/LegalBody";
import { PRIVACY_POLICY } from "@/data/legal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Health Chain collects, uses, and shares information from visitors and users of our Services.",
  path: "/privacy",
  keywords: ["Health Chain privacy policy", "health data privacy practices"],
});

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <LegalHero title={PRIVACY_POLICY.title}/>
        <LegalBody doc={PRIVACY_POLICY} />
        <Footer />
      </div>
    </div>
  );
}
