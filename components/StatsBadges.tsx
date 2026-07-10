import type { JSX } from "react";

interface Badge {
  code: string;
  label: string;
  chipClass: string;
  iconColor: string;
}

const BADGES: Badge[] = [
  {
    code: "HIPAA",
    label: "Fully Compliant",
    chipClass: "bg-[#D2E3AC] text-[#51602F]",
    iconColor: "#6E7A3A",
  },
  {
    code: "CMS-0057-F",
    label: "Jan 2027 Ready",
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
    iconColor: "#A8543C",
  },
  {
    code: "NCQA",
    label: "Certified Data Aggregator",
    chipClass: "bg-[#CBCDF1] text-[#3C3E8C]",
    iconColor: "#4346A0",
  },
  {
    code: "VINCI",
    label: "Certified Data Partner",
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
    iconColor: "#A8543C",
  },
];

function CheckIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function BadgePill({ badge }: { badge: Badge }): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <CheckIcon color={badge.iconColor} />
      <span
        className={`font-mono text-[12px] font-medium px-[11px] py-[5px] rounded-[6px] tracking-wide ${badge.chipClass}`}
      >
        {badge.code}
      </span>
      <span className="text-[15px] text-[#3A352E]">{badge.label}</span>
    </div>
  );
}

export default function StatsBadges(): JSX.Element {
  return (
    <section className="bg-white border-y border-[#E5DECF]">
  <div className="flex flex-col md:flex-row md:items-center md:justify-center px-7 md:px-14 py-6 gap-4 md:gap-10">
    <div className="text-[16px] font-medium text-[#3A352E] md:pr-[38px] md:border-r md:border-[#E5DECF]">
      Credentials
    </div>

    <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
      {BADGES.map((badge) => (
        <BadgePill key={badge.code} badge={badge} />
      ))}
    </div>
  </div>
</section>
  );
}
