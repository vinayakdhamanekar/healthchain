import type { JSX } from "react";

const BUILT_TODAY: string[] = [
  "Chart ingestion as PDF, MAO-004 ingestion, and claims from the member's FHIR record",
  "Model extraction of conditions, highlighted in place in the chart text",
  "Coder acceptance or rejection of every proposed ICD-10-CM code",
  "ICD-10-CM to HCC mapping on CMS reference tables",
  "Demographic and disease factor calculation to a risk adjustment factor",
  "Chart, MAO-004 and claims views for the same member on one screen",
  "Projects by chase year, admin, manager and coder roles, per member review history",
];

const PLANNED: string[] = [
  "Evidence aware suspecting from clinical and administrative signals",
  "Chart retrieval, chase prioritisation and vendor tracking",
  "Deletes and corrections workflow for previously submitted diagnoses",
  "Second review, QA sampling and inter-rater measurement",
  "Prospective and concurrent workflows, including provider queries",
  "Submission, CMS disposition tracking and reconciliation",
  "RADV defense file assembly from retained evidence and reviewer actions",
  "Part D RxHCC scoring",
];

function BuiltIcon(): JSX.Element {
  return (
    <span className="w-5 h-5 rounded-full bg-[#E4F5EA] flex items-center justify-center shrink-0 mt-[1px]">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8.5l3 3 7-7"
          stroke="#236E3A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlannedIcon(): JSX.Element {
  return (
    <span className="w-5 h-5 rounded-full border border-dashed border-[#928b86] shrink-0 mt-[1px]" />
  );
}

export default function Roadmap(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        Roadmap
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[600px] mb-4">
        What exists, and what comes next.
      </h2>
      <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[600px] mb-12">
        Design partners help set the order of the right hand column.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Built Today */}
        <div className="rounded-[18px] border border-[#928b86] bg-white p-6 md:p-8">
          <h3 className="text-[19px] font-semibold text-[#1A1A1A] mb-5">
            Built Today
          </h3>
          <ul className="flex flex-col gap-4">
            {BUILT_TODAY.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <BuiltIcon />
                <span className="text-[14px] leading-[1.6] text-[#3A352E]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Planned */}
        <div className="rounded-[18px] border border-dashed border-[#CFC7B8] bg-[#FBF9F4] p-6 md:p-8">
          <h3 className="text-[19px] font-semibold text-[#1A1A1A] mb-5">
            Planned
          </h3>
          <ul className="flex flex-col gap-4">
            {PLANNED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <PlannedIcon />
                <span className="text-[14px] leading-[1.6] text-[#57534C]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
