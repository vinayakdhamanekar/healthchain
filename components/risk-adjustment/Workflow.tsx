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
      "Build targeted cohorts from member lists. Bring charts, claims and relevant response files into review; reuse available member evidence.",
  },
  {
    number: "02",
    title: "Read",
    description:
      "Review suggested diagnoses with supporting chart text. Configure confidence thresholds, note types and extraction sections. ",
  },
  {
    number: "03",
    title: "Decide",
    description:
      "Accept, reject or manually add supported diagnoses. Coordinate shared queues, QA, auditor review and encounter-specific deletion requests.",
  },
  {
    number: "04",
    title: "Score and submit",
    description:
      "Compare baseline and reviewed scores. Export approved outputs, or use Health Chain for submission and response reconciliation.",
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
        From member review to reconciliation, with your team in control.
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

      {/* <p className="mt-6 text-[12.5px] text-[#928b86]">
        Awaiting · Product · model version and CY2026 factors to confirm
        before naming a version.
      </p> */}
    </section>
  );
}
