import type { JSX } from "react";
import Image from "next/image";

interface RoleCard {
  role: string;
  description: string;
  icon: string;
}

const ROLES: RoleCard[] = [
  {
    role: "For the program leader",
    description:
      "See the whole book of work at a glance: charts in, HCCs identified, codes accepted, RAF secured, and exactly which members still have open opportunity and no chart to back it up. No more waiting for a Friday spreadsheet - the number is live, every day.",
    icon: "/icons/Analytics-Graph-Bar--Streamline-Ultimate.svg",
  },
  {
    role: "For the coding manager",
    description:
      "Stop hand-assigning charts by gut feel. RiskRev Pro routes work automatically to the right coder based on provider coverage and workload, flags the members most worth working next, and shows you - in real time - who's fast, who's accurate, and where coaching will actually move the needle.",
    icon: "/icons/Settings-Horizontal--Streamline-Ultimate.svg",
  },
  {
    role: "For the certified coder",
    description:
      "Open a chart and RiskRev Pro has already read it. Every diagnosis comes with an AI-suggested code and the evidence behind it, side by side with what's already been billed or accepted by CMS, so you're never coding something that's already been paid. You review, confirm, or override - the final call is always yours, but you're never starting from a blank page again.",
    icon: "/icons/Medical-Data-Clipboard-Cross--Streamline-Ultimate.svg",
  },
  {
    role: "For the QA reviewer",
    description:
      "Every submitted chart flows through a clear, trackable review lane. You see agreement rates, overturn rates, and exactly which HCCs are getting reworked most - so quality isn't a gut feeling, it's a number you can defend.",
    icon: "/icons/Certified-Ribbon--Streamline-Ultimate.svg",
  },
  {
    role: "For the RADV auditor / compliance lead",
    description:
      "Nothing reaches a claim without a full paper trail behind it: where every diagnosis came from, who touched it, and when. When an auditor - internal or CMS - asks \"prove it,\" RiskRev Pro already has the answer built in, not bolted on after the fact.",
    icon: "/icons/Shield-Unlock--Streamline-Ultimate.svg",
  },
];

function RoleCardContent({ card }: { card: RoleCard }): JSX.Element {
  return (
    <div className="p-7 md:p-9 flex flex-col gap-4 h-full">
      <Image src={card.icon} alt="" width={28} height={28} className="shrink-0" />
      <h3 className="text-[19px] md:text-[21px] font-semibold tracking-[-0.01em] leading-tight text-[#1A1A1A]">
        {card.role}
      </h3>
      <p className="text-[14px] md:text-[14.5px] leading-[1.7] text-[#57534C] flex-1">
        {card.description}
      </p>
    </div>
  );
}

export default function RolesSection(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#A8543C] mb-4">
        By Role
      </p>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.07] text-[#1A1A1A] max-w-[740px] mb-10">
        Built role by role, because risk adjustment isn&apos;t one job.
      </h2>

      {/* Card grid: 2 top, 3 bottom */}
      <div className="rounded-[18px] overflow-hidden border border-[#928b86]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-[#928b86]">
            <RoleCardContent card={ROLES[0]} />
          </div>
          <div className="border-b md:border-b-0 border-[#928b86]">
            <RoleCardContent card={ROLES[1]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#928b86]">
          <div className="border-b md:border-r border-[#928b86]">
            <RoleCardContent card={ROLES[2]} />
          </div>
          <div className="border-b md:border-r border-[#928b86]">
            <RoleCardContent card={ROLES[3]} />
          </div>
          <div className="border-b border-[#928b86]">
            <RoleCardContent card={ROLES[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
