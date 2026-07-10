import type { JSX } from "react";
import Image from "next/image";

/* ─── Card data ─────────────────────────────────────────────── */

interface APICard {
  audience: string;
  labelColor: string;
  title: string;
  description: string;
  chips: string[];
  chipBg: string;
  chipText: string;
  icon: string;
}


const CARDS: APICard[] = [
  {
    audience: "For Members",
    labelColor: "text-[#C05A3A]",
    title: "Patient Access",
    description:
      "Members get a complete view of their claims, coverage, and clinical history through any app they choose.",
    chips: ["Claims & encounters", "Coverage & formulary", "Clinical & provider directory"],
    chipBg: "bg-[#FCEAE7]",
    chipText: "text-[#A84830]",
    icon: "/icons/Medical-Profile-Patiant-2--Streamline-Ultimate.svg",
  },
  {
    audience: "For Treating Providers",
    labelColor: "text-[#5055A8]",
    title: "Provider Access",
    description:
      "In-network providers pull attributed member history with automatic enforcement of consent and attribution rules.",
    chips: ["Attributed member rosters", "Full member history", "Bulk export by panel"],
    chipBg: "bg-[#EAEBF7]",
    chipText: "text-[#434AA0]",
    icon: "/icons/Insurance-Hands--Streamline-Ultimate.svg",
  },
  {
    audience: "Between Plans",
    labelColor: "text-[#3A65A8]",
    title: "Payer-to-Payer",
    description:
      "When members opt-in, their data automatically follows them when they switch plans.",
    chips: ["Member matching", "Full history transfer", "Asynchronous bulk handoff"],
    chipBg: "bg-[#E5EEF8]",
    chipText: "text-[#2E5CA0]",
    icon: "/icons/Coding-Apps-Website-Data-Conversion-Documents-1--Streamline-Ultimate.svg",
  },
  {
    audience: "Automated End-to-End",
    labelColor: "text-[#B85A20]",
    title: "Prior Authorization",
    description:
      "Submit, retrieve decisions, and capture the metrics CMS will ask for, all within your own systems.",
    chips: ["Automated submission", "Decision retrieval", "PARDD metrics built in"],
    chipBg: "bg-[#FDEEE4]",
    chipText: "text-[#A05020]",
    icon: "/icons/Shield-Unlock--Streamline-Ultimate.svg",
  },
  {
    audience: "Accurate Networks",
    labelColor: "text-[#2A8A4A]",
    title: "Provider Directory",
    description:
      "Publish an always-current, FHIR-based directory of in-network providers for members, partners, and regulators.",
    chips: ["Provider & practitioner roles", "Locations & organizations", "Network & speciality search"],
    chipBg: "bg-[#E4F5EA]",
    chipText: "text-[#236E3A]",
    icon: "/icons/Single-Neutral-Phone-Book--Streamline-Ultimate.svg",
  },
];

/* ─── Sub-components ─────────────────────────────────────────── */

function CardContent({ card }: { card: APICard }): JSX.Element {
  return (
    <div className="p-7 md:p-9 flex flex-col gap-4 h-full">
      {/* Icon + label */}
      <div className="flex items-center gap-2.5">
        
        <Image
          src={card.icon}
          alt=""
          width={28}
          height={28}
          className="shrink-0"
        />
        <span
          className={`text-[12px] font-bold tracking-[0.12em] uppercase ${card.labelColor}`}
        >
          {card.audience}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] leading-tight text-[#1A1A1A]">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] md:text-[15px] leading-[1.7] text-[#57534C] flex-1">
        {card.description}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        {card.chips.map((chip) => (
          <span
            key={chip}
            className={`text-[11px] font-medium px-[10px] py-[5px] rounded-[5px] ${card.chipBg} ${card.chipText}`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export default function FiveAPIs(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[42px]">
      {/* Section label */}
      <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#A8543C] mb-4">
        Full CMS-0057-F Compliance
      </p>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.07] text-[#1A1A1A] max-w-[740px]">
        Simplifying the five required APIs.
      </h2>

      {/* Subtext */}
      <p className="mt-5 text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[560px]">
        Patient Access, Provider Access, Payer-to-Payer, Prior Authorization,
        and Provider Directory are all pre-built, hosted in your environment,
        and ready to meet the metrics CMS expects on day one.
      </p>

      {/* Card grid */}
      <div className="mt-10  rounded-[18px] overflow-hidden">
        {/* Top row — 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-[#928b86]">
            <CardContent card={CARDS[0]} />
          </div>
          <div className="border-b md:border-b-0 border-[#928b86]">
            <CardContent card={CARDS[1]} />
          </div>
        </div>

        {/* Bottom row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#928b86]">
          <div className="border-b md:border-r border-[#928b86]">
            <CardContent card={CARDS[2]} />
          </div>
          <div className="border-b  md:border-r border-[#928b86]">
            <CardContent card={CARDS[3]} />
          </div>
          <div className="border-b  border-[#928b86]">
            <CardContent card={CARDS[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
