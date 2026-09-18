import type { JSX } from "react";

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: WorkflowStep[] = [
  {
    number: "01",
    title: "Ingest",
    description:
      "Member charts arrive as PDFs. The monthly MAO-004 arrives from CMS. Claims come from the member's FHIR record. Charts are assigned to a project by chase year and date of service.",
  },
  {
    number: "02",
    title: "Read",
    description:
      "The model reads each chart and highlights the conditions it finds, in place, in the chart text. Each one is proposed as an ICD-10-CM code with its date of service.",
  },
  {
    number: "03",
    title: "Decide",
    description:
      "A coder accepts or rejects each proposed code. Nothing is coded without a coder's decision. Every decision is recorded with who made it and when.",
  },
  {
    number: "04",
    title: "Score",
    description:
      "Accepted codes map to HCCs through the CMS reference tables. The demographic and disease factors combine into a risk adjustment factor, and the member's review history is kept.",
  },
];

function cellBorderClasses(idx: number, total: number): string {
  const isLastLgCol = (idx + 1) % total === 0;
  const isLastSmCol = (idx + 1) % 2 === 0;
  return [
    idx !== total - 1 && "border-b",
    !isLastSmCol && "sm:border-r",
    idx < total - 2 && "sm:border-b",
    "lg:border-b-0",
    !isLastLgCol && "lg:border-r",
    "border-[#928b86]",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Workflow(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[32px]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        Workflow
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[740px] mb-12">
        From chart to risk score, with a coder at every decision.
      </h2>

      {/* Steps */}
      <div className="border border-[#928b86] rounded-[18px] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className={`p-6 md:p-7 flex flex-col gap-3 ${cellBorderClasses(idx, STEPS.length)}`}
            >
              <div className="text-[15px] font-semibold text-[#A8543C]">
                {step.number}
              </div>
              <h3 className="text-[19px] font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-[#57534C]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[12.5px] text-[#928b86]">
        Awaiting · Product · model version and CY2026 factors to confirm
        before naming a version.
      </p>
    </section>
  );
}
