import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=risk-adjustment&product=riskrev";

export default function RiskRevHero(): JSX.Element {
  return (
    <section
      className="relative px-7 md:px-14 pt-[60px] pb-[72px] text-center"
      style={{
        backgroundImage: "url('/Patterns/pattern8.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Back link */}
      <div className="mt-14 flex justify-center">
      
      </div>

      {/* Category tag */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-6">
        <span>RISK ADJUSTMENT</span>
        <span>·</span>
        <span>RISKREV PRO</span>
      </div>

      {/* Headline */}
      <h1 className="text-[38px] md:text-[56px] lg:text-[64px] max-w-[980px] font-semibold tracking-[-0.03em] leading-[1.05] text-white mx-auto">
        Make every risk adjustment coding decision easier to support.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white max-w-[700px] mx-auto">
        RiskRev Pro gives health plans one evidence-linked workflow for AI-assisted coding, QA, risk-score analysis and submission reconciliation—while coders retain control of every decision.
      </p>

      <p className="mt-6 text-[14px] md:text-[16px] leading-[1.6] text-white max-w-[700px] mx-auto">
        In production with multiple customers. <br></br>Medicare Advantage Part C  ·  Part D RxHCC  ·  ESRD  ·  ACA 
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          href={CONTACT_HREF}
          className="group inline-flex items-center gap-[14px] bg-white text-[#A8543C] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
        >
          Request a RiskRev Pro Demo
          <span className="w-[50px] h-[30px] rounded-full border border-white/40 bg-white inline-flex items-center justify-center text-[14px] shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
            →
          </span>
        </Link>
        <a
          href="#built"
          className="gap-[14px] inline-flex items-center bg-transparent border border-[#CFC7B8] text-white text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white hover:text-[#A8543C] transition-colors duration-300"
        >
          See what is built
          <span className="w-[50px] h-[30px] inline-flex items-center justify-center text-[14px] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
