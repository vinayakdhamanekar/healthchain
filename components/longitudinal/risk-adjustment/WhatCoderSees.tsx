import type { JSX } from "react";

interface ChartRow {
  dos: string;
  code: string;
  detail: string;
}

const CHART_ROWS: ChartRow[] = [
  { dos: "03/12", code: "K58.9", detail: "Awaiting · Product · demo HCC" },
  { dos: "03/12", code: "K59.0", detail: "None" },
];

interface CmsRow {
  dos: string;
  code: string;
  status: string;
}

const CMS_ROWS: CmsRow[] = [
  { dos: "03/12", code: "R10.84", status: "Allowed" },
  { dos: "03/12", code: "K58.9", status: "Allowed" },
];

function AcceptRejectIcons(): JSX.Element {
  return (
    <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
      <span className="w-6 h-6 rounded-full border border-[#22A722] text-[#22A722] flex items-center justify-center text-[12px]">
        ✓
      </span>
      <span className="w-6 h-6 rounded-full border border-[#928b86] text-[#928b86] flex items-center justify-center text-[12px]">
        ✗
      </span>
    </div>
  );
}

export default function WhatCoderSees(): JSX.Element {
  return (
    <section id="built" className="bg-[#F7F3EF] px-7 md:px-14 py-[32px] scroll-mt-24">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        What The Coder Sees
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[760px] mb-5">
        What you documented. What you submitted. What CMS credited. One
        screen.
      </h2>

      {/* Body */}
      <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[680px] mb-12">
        Most chart review tools tell you what you might have missed. RiskRev
        Pro puts the diagnoses extracted from the chart directly beside the
        diagnoses CMS accepted as risk adjustment eligible on your MAO-004,
        with the member&apos;s claims one tab away. The coder sees the gap,
        not a suspect list about the gap.
      </p>

      {/* Illustration */}
      <div className="rounded-[18px] border border-[#928b86] bg-white overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-1 border-b border-[#E5DECF] px-4 md:px-6 pt-4">
          <span className="text-[13px] font-semibold text-[#1A1A1A] bg-[#F7F3EF] rounded-t-[10px] px-4 py-2 border border-b-0 border-[#E5DECF]">
            From the Chart
          </span>
          <span className="text-[13px] font-semibold text-[#1A1A1A] bg-[#F7F3EF] rounded-t-[10px] px-4 py-2 border border-b-0 border-[#E5DECF]">
            From CMS (MAO-004)
          </span>
          <span className="text-[13px] text-[#928b86] px-4 py-2">
            Member claims
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* From the Chart */}
          <div className="p-6 md:p-8 lg:border-r border-[#E5DECF]">
            <p className="text-[14px] leading-[1.75] text-[#3A352E] mb-5">
              Chief complaint: patient presents with{" "}
              <mark className="bg-[#FCEAE7] text-[#A84830] rounded-[3px] px-[3px]">
                abdominal pain and bloating
              </mark>
              .
              <br />
              <br />
              Recurrent episodes for six months, accompanied by{" "}
              <mark className="bg-[#FCEAE7] text-[#A84830] rounded-[3px] px-[3px]">
                changes in bowel habits including alternating constipation and
                diarrhea
              </mark>
              .
              <br />
              <br />
              Medical history:{" "}
              <mark className="bg-[#FCEAE7] text-[#A84830] rounded-[3px] px-[3px]">
                Irritable bowel syndrome (IBS)
              </mark>
              .
            </p>
            <p className="text-[12px] text-[#928b86] mb-6">
              Highlighted terms are extracted evidence, in place.
            </p>

            <div className="flex flex-col gap-3">
              {CHART_ROWS.map((row) => (
                <div
                  key={`${row.dos}-${row.code}`}
                  className="flex items-center justify-between gap-4 rounded-[10px] border border-[#E5DECF] bg-[#FBF9F4] px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">
                      {row.dos} · {row.code}
                    </p>
                    <p className="text-[12px] text-[#57534C]">{row.detail}</p>
                  </div>
                  <AcceptRejectIcons />
                </div>
              ))}
            </div>
          </div>

          {/* From CMS (MAO-004) */}
          <div className="p-6 md:p-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#928b86]">
                  <th className="pb-3 pr-4 font-semibold">DOS</th>
                  <th className="pb-3 pr-4 font-semibold">ICD-10</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {CMS_ROWS.map((row) => (
                  <tr
                    key={`${row.dos}-${row.code}`}
                    className="border-t border-[#E5DECF] text-[14px] text-[#1A1A1A]"
                  >
                    <td className="py-3 pr-4">{row.dos}</td>
                    <td className="py-3 pr-4 font-medium">{row.code}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center text-[12px] font-medium px-[10px] py-[3px] rounded-[5px] bg-[#E4F5EA] text-[#236E3A]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Placeholder notice */}
        
      </div>
    </section>
  );
}
