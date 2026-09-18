import type { JSX } from "react";

interface FlowNode {
  name: string;
  caption: string;
}

const FLOW: FlowNode[] = [
  { name: "Centaur", caption: "Clinical data foundation" },
  { name: "Hyperion", caption: "FHIR native member record" },
  { name: "RiskRev Pro", caption: "Risk adjustment coding" },
];

export default function WhyDifferent(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">
        {/* Left: label + headline + body */}
        <div>
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
            Why It Is Different
          </div>

          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] mb-5">
            Start with the member record. Not the suspect list.
          </h2>

          <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[600px]">
            Most risk adjustment tools begin after the data has already been
            fragmented across claims, charts, vendors and point solutions.
            Each one rebuilds the member story from its own slice. RiskRev
            Pro begins with the longitudinal member record Health Chain
            already maintains, so the same clinical evidence that supports
            coding also supports quality, care management and audit, with
            provenance preserved from the source through every decision.
          </p>
        </div>

        {/* Right: Centaur → Hyperion → RiskRev Pro, stacked vertically */}
        <div className="flex flex-col items-center gap-3 w-full">
          {FLOW.map((node, idx) => (
            <div key={node.name} className="flex flex-col items-center gap-3 w-full">
              <div
                className={`w-full rounded-[16px] border p-6 text-center ${
                  idx === FLOW.length - 1
                    ? "border-[#A8543C] bg-[#FCEAE7]"
                    : "border-[#928b86] bg-white"
                }`}
              >
                <div
                  className={`text-[19px] font-semibold tracking-[-0.01em] mb-1 ${
                    idx === FLOW.length - 1 ? "text-[#A84830]" : "text-[#1A1A1A]"
                  }`}
                >
                  {node.name}
                </div>
                <p className="text-[13px] text-[#57534C]">{node.caption}</p>
              </div>

              {idx < FLOW.length - 1 && (
                <div className="text-[#A8543C] text-[22px] font-semibold leading-none" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
