import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=longitudinal&product=riskrev";

const YOU_RECEIVE: string[] = [
  "Evidence-linked coding with QA and auditor review",
  "Baseline and reviewed risk scores with explanations",
  "Approved exports or submission and reconciliation ",
  "Operational reporting and review history ",
];

const YOU_PROVIDE: string[] = [
  "Programs, model versions and review population",
  "Charts, claims, identifiers and relevant response files",
  "Coding policies, roles and source connections ",
  "Authorized submitter or partner responsibilities",
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
        Start with your current workflow.
      </h2>

      <div className="rounded-[18px] border border-[#928b86] bg-white p-6 md:p-8 lg:p-10">
        {/* Engagement summary */}
        <div className="mb-10 pb-10 border-b border-[#E5DECF]">
          <p className="font-mono text-[12px] font-semibold tracking-[0.1em] uppercase text-[#A8543C] mb-3">
            PRODUCTION ENGAGEMENT
          </p>
          <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-3">
            What your team gets and what we scope together. 
          </h3>
          <p className="text-[15px] leading-[1.65] text-[#57534C] mb-5 max-w-[640px]">
            RiskRev Pro is in production with multiple customers. We configure the engagement around your programs, review operation, integrations and submission responsibilities. 
          </p>
         
        </div>

        {/* You Receive / You Provide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <h4 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-4">
              INCLUDED CAPABILITIES 
            </h4>
            <BulletList items={YOU_RECEIVE} />
          </div>
          <div>
            <h4 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-[#1A1A1A] mb-4">
              SCOPED FOR YOUR OPERATION
            </h4>
            <BulletList items={YOU_PROVIDE} />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={CONTACT_HREF}
          className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-white text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F]"
        >
          Discuss RiskRev Pro Scope
          <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C]">
            →
          </span>
        </Link>

        <p className="mt-6 text-[12.5px] leading-[1.6] text-[#928b86] max-w-[640px]">
          Pricing reflects covered population, programs, workflow, integrations and submission responsibilities. Inclusions are confirmed in the proposal. 
        </p>
      </div>
    </section>
  );
}
