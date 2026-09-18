import type { JSX } from "react";

export default function ImpactSection(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        The Impact
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[740px] mb-8">
        Why teams feel the difference immediately
      </h2>

      {/* Body */}
      <div className="flex flex-col gap-6 max-w-[760px]">
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#3A352E]">
          Within the first batch, your team stops asking &quot;did we already
          have this chart?&quot; and starts trusting the answer on screen.
          Coders stop re-keying diagnoses that are already sitting on a
          claim. Managers stop guessing who&apos;s overloaded. And leadership
          stops waiting until quarter-end to find out how much RAF is
          actually sitting uncaptured.
        </p>
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#57534C]">
          That&apos;s the feeling RiskRev Pro is built to create: the relief
          of finally seeing the whole picture, and the confidence that comes
          from knowing every number on the page has a record behind it.
        </p>
      </div>
    </section>
  );
}
