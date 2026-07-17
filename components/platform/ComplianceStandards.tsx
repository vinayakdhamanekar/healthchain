import type { JSX } from "react";

interface Badge {
  code: string;
  label: string;
  chipClass: string;
  description: string;
}

const BADGES: Badge[] = [
  {
    code: "NCQA",
    label: "Certified Data Aggregator",
    chipClass: "bg-[#fff] text-[#3C3E8C]",
    description: "Nationally recognized certification for health data aggregation quality, accuracy, and security standards.",
  },
  {
    code: "VINCI",
    label: "Certified Data Partner",
    chipClass: "bg-[#fff] text-[#3C3E8C]",
    description: "Validated integration capabilities with the VA's VINCI research data ecosystem for clinical data exchange.",
  },
  {
    code: "HIPAA",
    label: "Fully Compliant",
    chipClass: "bg-[#fff] text-[#3C3E8C]",
    description: "End-to-end encryption, access controls, audit logging, and BAA coverage across all data handling processes.",
  },
  {
    code: "CMS-0057-F",
    label: "Jan 2027 Ready",
    chipClass: "bg-[#fff] text-[#3C3E8C]",
    description: "Pre-built compliance for the CMS Interoperability and Prior Authorization final rule-automated reporting and data exchange.",
  },
];

const SECURITY_BULLETS = [
  "SOC 2 Type II audited infrastructure",
  "AES-256 encryption at rest and in transit",
  "Full audit trail and provenance tracking",
  "Role-based access control (RBAC)",
  "PHI de-identification pipelines",
  "Automated compliance reporting",
];

export default function ComplianceStandards(): JSX.Element {
  return (
    <section style={{
    backgroundImage: "url('/Patterns/pattern7.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }} className="relative overflow-hidden px-7 md:px-14 py-[66px]">
      

      {/* Gradient layers */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(95deg,#3f5a4a_0%,#6b7a5e_18%,#94977c_34%,#cdb78f_50%,#8b9389_64%,#5e6f78_80%,#454a5e_100%)]" />*/}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,48,41,0.13),rgba(30,34,30,0.78))]" /> 

      {/* Content */}
      <div className="relative grid lg:grid-cols-[50%_42%] gap-16 items-start">

        {/* Left: label + headline + body + enterprise security */}
        <div>
          <div className="font-mono font-semibold text-[13px] tracking-[2px] text-[rgba(244,241,234,0.55)] uppercase mb-6">
            Security &amp; Compliance
          </div>

          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.04] tracking-[-0.025em] text-[#F7F4EE]">
            Built for healthcare&apos;s highest standards.
          </h2>

          {/* Enterprise Security subsection */}
          <div className="mt-8">
            <div className="text-[16px] font-semibold text-[rgba(244,241,234,0.85)] mb-4">
              Enterprise Security
            </div>
           <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
              {SECURITY_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <svg
  className="w-5 h-5 shrink-0 mt-[1px]"
  viewBox="0 0 20 20"
  fill="none"
>
  <circle
    cx="10"
    cy="10"
    r="8"
    stroke="rgba(244,241,234,0.65)"
    strokeWidth="1.2"
  />
  <path
    d="M6.5 10L8.8 12.3L13.5 7.7"
    stroke="rgba(244,241,234,0.8)"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                  <span className="text-[13px] leading-[1.55] text-[rgba(244,241,234,0.65)]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: 2×2 badge grid */}
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.code}
              className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-2xl p-5 min-w-[160px] md:min-w-[190px]"
            >
              {/* Badge code + chip label row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[22px] font-semibold text-[#F7F4EE] tracking-[-0.01em] leading-none">
                  {badge.code}
                </span>
                <span className={`font-mono text-[10px] font-medium px-[9px] py-[4px] rounded-[5px] whitespace-nowrap shrink-0 ${badge.chipClass}`}>
                  {badge.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-[14px] leading-[1.55] text-[rgba(244,241,234,0.55)]">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
