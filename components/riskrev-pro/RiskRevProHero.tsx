import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=riskrev-pro";

export default function RiskRevProHero(): JSX.Element {
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
      {/* Category tag */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-semibold tracking-[0.1em] uppercase text-white mb-6">
        <span>RiskRev Pro</span>
      </div>

      {/* Headline */}
      <h1 className="text-[38px] md:text-[56px] lg:text-[64px] max-w-[880px] font-semibold tracking-[-0.03em] leading-[1.05] text-white mx-auto">
        Every dollar of risk you&apos;ve already earned. Finally captured.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-white max-w-[720px] mx-auto">
        RiskRev Pro is the risk adjustment platform that turns scattered
        charts, claims, and CMS files into confirmed, submission-ready
        diagnoses - automatically matched, AI-coded, and quality-checked
        before a human ever has to chase a record again.
      </p>

      {/* CTA */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          href={CONTACT_HREF}
          className="group inline-flex items-center gap-[14px] bg-white text-[#A8543C] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
        >
          See RiskRev Pro on your book of work
          <span className="w-[50px] h-[30px] rounded-full border border-white/40 bg-white inline-flex items-center justify-center text-[14px] shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
