import type { JSX } from "react";
import Image from "next/image";

interface ProblemCard {
  icon: string;
  badge: string;
  title: string;
  description: string;
  label: string;
  labelBg: string;
  labelText: string;
}

const CARDS: ProblemCard[] = [
  {
    icon: "/icons/Road-Sign-Warning--Streamline-Ultimate.svg",
    title: "Bid cycles run on stale extracts",
    badge: "Impact",
    description:
      "Actuaries wait weeks for a data pull, then model on a snapshot that's already months old. Deadlines force assumptions instead of evidence.",
    label: "Pricing risk and reserve volatility",
    labelBg: "bg-[#FCEAE7]",
    labelText: "text-[#A84830]",
  },
  {
    icon: "/icons/Road-Sign-Warning--Streamline-Ultimate.svg",
    title: "Benefits priced one at a time",
    badge: "Impact",
    description:
      "Interactions between copays, formulary tiers, and supplemental benefits are what actually move margin, but they’re still modeled in isolation.",
    label: "Margin erosion in year one",
    labelBg: "bg-[#FDF4E3]",
    labelText: "text-[#9A6820]",
  },
  {
    icon: "/icons/Road-Sign-Warning--Streamline-Ultimate.svg",
    title: "Every team carries its own version of truth",
    description:
      "Different cohorts, attribution logic, and cost bases lead to misalignment. Decisions stall while teams debate whose numbers are right.",
    label: "Slower launches, weaker filings",
    badge: "Impact",
    labelBg: "bg-[#F0EDE8]",
    labelText: "text-[#6B6B6B]",
  },
];

export default function ThePressureSection(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        The pressure
      </div>


      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[640px] mb-4">
        Costs rise, outcomes lag, and legacy systems keep running.
      </h2>

      {/* Subtext */}
      <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[600px] mb-12">
        Disparate data, siloed opinions, and manual analytics are hurting competitive bid opportunities.
      </p>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-[#F7F3EF] border border-[#928b86] rounded-[16px] p-6 flex flex-col gap-3"
          >
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src={card.icon}
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
            </div>

            {/* Title */}
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-snug">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] md:text-[14px] text-[#57534C] leading-[1.7] flex-1">
              {card.description}
            </p>

            {/* Status label */}


            <div
              key={card.title}
              className="bg-white border-[5px] border-[#F7F3EF] p-6 rounded-[4px]"
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`
                      inline-flex
                      items-center
                      justify-center
                      px-[12px]
                      py-[5px]
                      rounded-[4px]
                      font-mono
                      text-[11px]
                      tracking-[0.02em]
                      bg-[#a4a6d8]
                      text-[#40211c]
                    `}
                >
                  {card.badge}
                </div>
              </div>

              <h3 className="text-center font-semibold text-[14px] leading-[1.25] tracking-[-0.03em] text-[#34332C]">
                {card.label}
              </h3>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
