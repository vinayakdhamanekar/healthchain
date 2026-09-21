import type { JSX } from "react";

interface RegulatoryFact {
  tag: string;
  text: string;
}

const FACTS: RegulatoryFact[] = [
  {
    tag: "BASELINE SCORE ",
    text: "Start with the defined member data, model and scoring period.",
  },
  {
    tag: "REASONS FOR CHANGE",
    text: "See which conditions and model rules explain the difference.",
  },
  {
    tag: "Part C  ·  Part D RxHCC  ·  ESRD  ·  ACA",
    text: "Use the applicable model, version and period. Calculated risk scores are distinct from program-reported results and payment amounts. ",
  },
  {
    tag: "REVIEWED SCORE",
    text: "Recalculate after approved coding changes using the applicable model.",
  },
  {
    tag: "RESPONSE RECONCILIATION ",
    text: "Track submission and response status separately from calculated scores and payments.",
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
        See how review controls work.
      </p>

      {/* Sources footnote */}
      <p className="text-[12px] leading-[1.6] text-[#928b86] max-w-[760px]">
        Suppress repeat suggestions while allowing stronger evidence and later supported occurrences. Configure suggestion thresholds and document sections. Add diagnoses independently, reuse evidence across cohorts, maintain identifier continuity and track productivity, decisions, progress and exceptions. 
      </p>
    </section>
  );
}
