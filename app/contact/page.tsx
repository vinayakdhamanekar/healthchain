import type { JSX } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ContactCTA from "@/components/contact/ContactCTA";


export default function ContactPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <Navbar />
      <ContactSection />
      <ContactCTA/>
      <Footer />
    </div>
  );
}
