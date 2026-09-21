import type { JSX } from "react";

export default function WhatCoderSees(): JSX.Element {
  return (
    <section id="built" className="bg-[#F7F3EF] px-7 md:px-14 py-[32px] scroll-mt-24">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        What The Coder Sees
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[760px] mb-5">
        Evidence, coding{" "}
        <span className="underline decoration-[#928b86] underline-offset-4">
          decision
        </span>{" "}
        and score impact in one review.
      </h2>

      {/* Body */}
      <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[680px] mb-12">
        Review each suggested diagnosis beside its supporting chart text.
        Accept, reject or manually add a supported diagnosis, then follow
        approved changes into QA,{" "}
        <span className="underline decoration-[#928b86] underline-offset-4">
          scoring
        </span>{" "}
        and the next submission step.
      </p>

      {/* Illustration */}
      <div className="rounded-[18px] border border-[#928b86] bg-white overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-1 border-b border-[#E5DECF] px-4 md:px-6 pt-4">
          <span className="text-[13px] font-semibold text-[#1A1A1A] bg-[#F7F3EF] rounded-t-[10px] px-4 py-2 border border-b-0 border-[#E5DECF]">
            From the Chart
          </span>
          <span className="text-[13px] font-semibold text-[#1A1A1A] bg-[#F7F3EF] rounded-t-[10px] px-4 py-2 border border-b-0 border-[#E5DECF]">
            Program{" "}
            <span className="underline decoration-[#928b86] underline-offset-2">
              Responses
            </span>{" "}
            / Member Claims
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* From the Chart */}
          <div className="p-6 md:p-8 lg:border-r border-[#E5DECF]">
            <p className="text-[12px] text-[#928b86] mb-4">
              Illustrative review layout • no patient data
            </p>

            <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">
              Clinical evidence
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#57534C] mb-4">
              View the source passage and encounter supporting a suggested
              diagnosis. Keep the evidence visible while the coder reviews
              the finding.
            </p>

            <p className="text-[13px] font-medium text-[#A8543C] mb-6">
              Suggested diagnosis&nbsp;&nbsp;|&nbsp;&nbsp;Encounter&nbsp;&nbsp;|&nbsp;&nbsp;Supporting
              text
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-semibold text-[#1A1A1A]">
              <span className="inline-flex items-center gap-2">
                Accept <span className="text-[#22A722]">✓</span>
              </span>
              <span className="inline-flex items-center gap-2">
                Reject <span className="text-[#928b86]">✗</span>
              </span>
              <span className="inline-flex items-center gap-2">
                Add diagnosis <span className="text-[#1A1A1A]">+</span>
              </span>
            </div>
          </div>

          {/* Program Responses / Member Claims */}
          <div className="p-6 md:p-8">
            <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">
              Follow the approved result
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#57534C] mb-4">
              Review submission and response status through the applicable
              program pathway. Keep response status distinct from
              risk-score calculation and payment.
            </p>

            <p className="text-[13px] font-medium text-[#A8543C]">
              Medicare example: MAO-004 review
            </p>
            <p className="text-[13px] font-medium text-[#A8543C]">
              Use program-specific labels and response files.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
