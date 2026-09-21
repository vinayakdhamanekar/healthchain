import type { JSX } from "react";

const EVIDENCE_POINTS: string[] = [
  "Supporting chart text stays with the suggested diagnosis.",
  "Coder, QA and auditor decisions remain traceable.",
  "Review history stays connected across MBI and member ID changes.",
];

function CheckBadge(): JSX.Element {
  return (
    <span className="w-6 h-6 rounded-full border border-[#22A722] flex items-center justify-center shrink-0 mt-[1px]">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8.5l3 3 7-7"
          stroke="#22A722"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Evidence(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
        {/* Left: label + headline + body */}
        <div>
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
            Evidence
          </div>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[520px] mb-5">
            Your coders decide. The evidence stays attached.
          </h2>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[520px]">
            Every suggestion stays connected to the clinical evidence behind it. Coders retain control, and QA and audit reviewers can follow the reason and decision history. 
          </p>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[520px]">
            Manual additions do not require clearing every AI suggestion. Encounter-specific corrections follow your agreed review and output process
          </p>
        </div>

        {/* Right: checklist card */}
        <div className="rounded-[18px] border border-[#928b86] bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5">
            {EVIDENCE_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-4">
                <CheckBadge />
                <p className="text-[15px] leading-[1.6] text-[#1A1A1A]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
