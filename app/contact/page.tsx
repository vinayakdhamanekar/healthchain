import type { JSX } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us & Request a Demo",
  description:
    "Tell us about your data challenges. Book a meeting with Health Chain and get ready for CMS-0057-F interoperability compliance and what comes next.",
  path: "/contact",
  keywords: [
    "request a healthcare data demo",
    "contact Health Chain",
    "CMS-0057-F consultation",
    "payer data platform demo",
  ],
});

export default function ContactPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <Navbar />
        <ContactSection />
        <ContactCTA />
        <Footer />
      </div>
    </div>
  );
}
