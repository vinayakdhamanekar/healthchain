import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=longitudinal&product=riskrev";

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
        <span>Risk adjustment</span>
        <span>·</span>
        <span>Early access</span>
      </div>

      {/* Headline */}
      <h1 className="text-[38px] md:text-[56px] lg:text-[64px] max-w-[880px] font-semibold tracking-[-0.03em] leading-[1.05] text-white mx-auto">
        Start with the member record. Not the suspect list.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white max-w-[700px] mx-auto">
        RiskRev Pro is AI assisted risk adjustment coding built on the
        longitudinal member record. Coders read charts with the evidence
        highlighted, accept or reject each suggested diagnosis, and see what
        CMS actually credited beside what the chart documents. Available now
        to a limited number of Medicare Advantage design partners.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          href={CONTACT_HREF}
          className="group inline-flex items-center gap-[14px] bg-white text-[#A8543C] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
        >
          Talk to a risk adjustment specialist
          <span className="w-[50px] h-[30px] rounded-full border border-white/40 bg-white inline-flex items-center justify-center text-[14px] shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
            →
          </span>
        </Link>
        <a
          href="#built"
          className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-white text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white hover:text-[#A8543C] transition-colors duration-300"
        >
          See what is built
        </a>
      </div>
    </section>
  );
}
