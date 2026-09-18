import type { JSX } from "react";

interface TrustBadge {
  code: string;
  label: string;
  title: string;
  description: string;
  chips?: string[];
  linkLabel: string;
  linkHref: string;
  external?: boolean;
}

const BADGES: TrustBadge[] = [
  {
    code: "NCQA",
    label: "Certified Data Partner",
    title: "Data Aggregator Validation",
    description:
      "January 2026 cohort, through 31 May 2027. Standards focus PSD 5.0.",
    linkLabel: "Verify at NCQA →",
    linkHref:
      "https://www.ncqa.org/programs/data-and-information-technology/hit-and-data-certification/hedis-compliance-audit-certification/data-aggregator-validation/directory-data-aggregator-validation/",
    external: true,
  },
  {
    code: "Security",
    label: "SOC 2 Type II",
    title: "HITRUST e1 certification in progress, expected Q4 2026",
    description: "HIPAA aligned controls, BAA available.",
    linkLabel: "Request our security evidence pack →",
    linkHref: "/contact?interest=platform",
  },
  {
    code: "CMS-0057-F",
    label: "Jan 2027 Ready",
    title: "Built for the four January 2027 APIs",
    chips: ["Patient Access", "Provider Access", "Payer-to-Payer", "Prior Authorization"],
    description: "Provider Directory supported under the existing requirement.",
    linkLabel: "See the detail →",
    linkHref: "/interoperability-and-compliance#applicability",
  },
];

export default function TrustSecurity(): JSX.Element {
  return (
    <section
      style={{
        backgroundImage: "url('/Patterns/pattern7.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative overflow-hidden px-7 md:px-14 py-[66px]"
    >
      {/* Gradient layer */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,48,41,0.13),rgba(30,34,30,0.78))]" />

      {/* Content */}
      <div className="relative">
        <div className="font-mono font-semibold text-[13px] tracking-[2px] text-[rgba(244,241,234,0.55)] uppercase mb-6">
          Trust &amp; Security
        </div>

        <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.06] tracking-[-0.025em] text-[#F7F4EE] max-w-[620px] mb-10">
          Independently verified, built to be audited.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-[1100px]">
          {BADGES.map((badge) => (
            <div
              key={badge.code}
              className="flex flex-col bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[20px] font-semibold text-[#F7F4EE] tracking-[-0.01em] leading-none">
                  {badge.code}
                </span>
                <span className="font-mono text-[10px] font-medium px-[9px] py-[4px] rounded-[5px] whitespace-nowrap shrink-0 bg-white text-[#3C3E8C]">
                  {badge.label}
                </span>
              </div>

              <p className="text-[15px] font-medium text-[rgba(244,241,234,0.9)] mb-2">
                {badge.title}
              </p>

              {badge.chips && (
                <div className="flex flex-wrap gap-[6px] mb-3">
                  {badge.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] font-medium px-[9px] py-[4px] rounded-[5px] bg-[rgba(255,255,255,0.1)] text-[rgba(244,241,234,0.85)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[13.5px] leading-[1.6] text-[rgba(244,241,234,0.6)] mb-5">
                {badge.description}
              </p>

              <a
                href={badge.linkHref}
                target={badge.external ? "_blank" : undefined}
                rel={badge.external ? "noopener noreferrer" : undefined}
                className="mt-auto text-[13.5px] font-medium text-[#F1D9D1] hover:text-white underline underline-offset-4 transition-colors"
              >
                {badge.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
