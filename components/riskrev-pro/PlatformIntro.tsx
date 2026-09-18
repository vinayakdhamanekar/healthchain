import type { JSX } from "react";

export default function PlatformIntro(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        The Platform
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[740px] mb-8">
        Meet RiskRev Pro: one member, one record, zero guesswork
      </h2>

      {/* Body */}
      <div className="flex flex-col gap-6 max-w-[760px]">
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#3A352E]">
          The moment a member roster lands, RiskRev Pro quietly does the
          unglamorous work that used to eat your team&apos;s week. It matches
          every member across rosters, claims, CMS return files, and
          retrieved charts into a single longitudinal record - so instead of
          eleven disconnected documents, your team sees one member with one
          clear picture: what&apos;s been captured, what CMS has accepted, and
          what&apos;s sitting on the table as pure, uncaptured RAF
          opportunity.
        </p>
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#57534C]">
          That distinction matters more than almost anything else in this
          business. RiskRev Pro doesn&apos;t just tell you &quot;here&apos;s a
          diagnosis.&quot; It tells you whether that diagnosis is already
          paid or genuinely new revenue - separating restatement from real,
          net-new lift, so your leadership can trust the number they&apos;re
          reporting up.
        </p>
      </div>
    </section>
  );
}
