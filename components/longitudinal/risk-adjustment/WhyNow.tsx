import type { JSX } from "react";

interface RegulatoryFact {
  tag: string;
  text: string;
}

const FACTS: RegulatoryFact[] = [
  {
    tag: "CY2026",
    text: "CMS calculates 100 percent of the Medicare Advantage risk score on the 2024 CMS-HCC model. The phase in is over.",
  },
  {
    tag: "May 2025",
    text: "CMS announced it will audit all eligible Medicare Advantage contracts for every payment year, rather than a sample.",
  },
  {
    tag: "28 Aug 2026",
    text: "CMS notified plans selected for payment year 2024 RADV audits.",
  },
  {
    tag: "Ongoing",
    text: "HHS-OIG continues to scrutinise diagnoses reported through health risk assessments and chart reviews that are not supported by other service records.",
  },
];

export default function WhyNow(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        Why Now
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[720px] mb-12">
        Built for a more auditable era of Medicare Advantage.
      </h2>

      {/* Facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {FACTS.map((fact) => (
          <div
            key={fact.tag}
            className="flex flex-col gap-3 h-full rounded-[16px] border border-[#928b86] bg-white p-6"
          >
            <div className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#A8543C]">
              {fact.tag}
            </div>
            <p className="text-[14px] leading-[1.65] text-[#3A352E]">
              {fact.text}
            </p>
          </div>
        ))}
      </div>

      {/* Closing statement */}
      <p className="text-[16px] md:text-[18px] leading-[1.65] text-[#1A1A1A] max-w-[680px] font-medium mb-8">
        Every diagnosis a plan reports now has a higher chance of being asked
        to show its evidence. RiskRev Pro keeps the evidence and the decision
        together from the start.
      </p>

      {/* Sources footnote */}
      <p className="text-[12px] leading-[1.6] text-[#928b86] max-w-[760px]">
        Sources: CMS 2026 Rate Announcement. CMS press release, 21 May 2025.
        CMS RADV announcements, 28 August 2026. HHS-OIG Medicare Advantage
        risk adjustment reports. Last reviewed 17 September 2026.
      </p>
    </section>
  );
}
