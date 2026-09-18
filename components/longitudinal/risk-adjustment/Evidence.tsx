import type { JSX } from "react";

const EVIDENCE_POINTS: string[] = [
  "Every suggested code is linked to the highlighted text that produced it.",
  "Every code is a coder's decision, accept or reject, recorded by name and date.",
  "The review history for every member is kept and can be reopened.",
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
            AI that shows its work.
          </h2>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[520px]">
            The model does not code. It reads, highlights and proposes. Every
            suggested diagnosis is shown beside the exact text in the chart
            that produced it, and a coder decides. The suggestion, the
            evidence and the decision stay together.
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
