import type { JSX } from "react";

export default function ProblemSection(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        The Problem
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[740px] mb-8">
        The problem you already know by heart
      </h2>

      {/* Body */}
      <div className="flex flex-col gap-6 max-w-[760px]">
        <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#3A352E]">
          Your coders are drowning in charts that may or may not even need to
          be pulled. Your team re-requests records you already have on file.
          RAF opportunity sits buried in PDFs, scans, and claims feeds that
          don&apos;t talk to each other. And every quarter, your compliance
          team holds their breath wondering if a RADV audit will find a gap
          nobody caught in time.
        </p>
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#57534C]">
          RiskRev Pro was built by people who watched this happen and decided
          the fix wasn&apos;t &quot;hire more coders.&quot; The fix was giving
          every person in the workflow — from the manager assigning work to
          the auditor signing off — one shared, living picture of the member,
          so nothing gets recaptured twice, nothing gets missed, and nothing
          goes out the door unchecked.
        </p>
      </div>
    </section>
  );
}
