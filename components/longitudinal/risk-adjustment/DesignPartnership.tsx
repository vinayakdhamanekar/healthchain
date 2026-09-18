import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=longitudinal&product=riskrev";

const YOU_RECEIVE: string[] = [
  "RiskRev Pro running on your charts and your MAO-004",
  "Model suggestions compared against your own coders' decisions, with agreement rates",
  "Reconciliation of chart findings against CMS credited diagnoses for the same members",
  "A written readout on accuracy and fit",
  "A seat at the roadmap table",
];

const YOU_PROVIDE: string[] = [
  "A representative chart sample under BAA",
  "Your MAO-004 files for the same period",
  "A coding lead for QA, roughly eight hours",
  "A claims extract for the sample members",
];

function BulletList({ items }: { items: string[] }): JSX.Element {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-[#A8543C] shrink-0" />
          <span className="text-[14px] leading-[1.6] text-[#3A352E]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DesignPartnership(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        Where To Begin
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[640px] mb-12">
        A design partnership, not a subscription.
      </h2>

      <div className="rounded-[18px] border border-[#928b86] bg-white p-6 md:p-8 lg:p-10">
        {/* Engagement summary */}
        <div className="mb-10 pb-10 border-b border-[#E5DECF]">
          <p className="font-mono text-[12px] font-semibold tracking-[0.1em] uppercase text-[#A8543C] mb-3">
            Design Partner Engagement
          </p>
          <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-3">
            Risk adjustment design partnership
          </h3>
          <p className="text-[15px] leading-[1.65] text-[#57534C] mb-5 max-w-[640px]">
            One representative chart sample with coder QA. Design partner
            terms are discussed individually.
          </p>
          <p className="text-[15px] leading-[1.65] text-[#3A352E] max-w-[640px]">
            This is a partnership, not a subscription. You get a working
            system on your own data and a straight readout on what it found.
            We get a partner who shapes what we build next.
          </p>
        </div>

        {/* You Receive / You Provide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <h4 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-4">
              You Receive
            </h4>
            <BulletList items={YOU_RECEIVE} />
          </div>
          <div>
            <h4 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-4">
              You Provide
            </h4>
            <BulletList items={YOU_PROVIDE} />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={CONTACT_HREF}
          className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-white text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F]"
        >
          Talk to a risk adjustment specialist
          <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C]">
            →
          </span>
        </Link>

        <p className="mt-6 text-[12.5px] leading-[1.6] text-[#928b86] max-w-[640px]">
          Limited to Medicare Advantage plans. Production terms are agreed
          with design partners at the end of the engagement.
        </p>
      </div>
    </section>
  );
}
