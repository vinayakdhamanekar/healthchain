import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

interface ScopedService {
  title: string;
  description: string;
  timeline: string;
  href: string;
  icon: string;
}

const SERVICES: ScopedService[] = [
  {
    title: "Longitudinal Data Enablement",
    description: "Source to output data sprint. Two feeds, one cohort, one accepted output.",
    timeline: "3 to 4 weeks",
    href: "/longitudinal-data-enablement",
    icon: "/icons/Merge-Account--Streamline-Ultimate.svg",
  },
  {
    title: "Benefit Intelligence and Design - Medicare Advantage",
    description: "Financial proof, scoped to one contract or region.",
    timeline: "4 to 6 weeks",
    href: "/benefit-intelligence-and-design",
    icon: "/icons/Accounting-Calculator-1--Streamline-Ultimate.svg",
  },
  {
    title: "Benefit Intelligence and Design - Medicaid",
    description: "Forecasting proof, scoped to one state and population.",
    timeline: "4 to 6 weeks",
    href: "/benefit-intelligence-and-design",
    icon: "/icons/Analytics-Graph-Bar--Streamline-Ultimate.svg",
  },
  {
    title: "RiskRev Pro",
    description: "Design partnership. One representative chart sample with coder QA.",
    timeline: "Terms discussed individually",
    href: "/longitudinal-data-enablement/risk-adjustment",
    icon: "/icons/Medical-Data-Clipboard-Cross--Streamline-Ultimate.svg",
  },
];

export default function ScopedServices(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Centered header */}
      <div className="text-center max-w-[680px] mx-auto mb-14">
        <p className="text-[13px] font-bold tracking-[0.16em] uppercase text-[#C05A3A] mb-4">
          Scoped Engagements
        </p>
        <h2 className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] leading-[1.07] text-[#1A1A1A] mb-5">
          Scoped to your data and markets.
        </h2>
        <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#57534C]">
          Everything else starts with a conversation.
        </p>
      </div>

      {/* Engagement cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group flex flex-col gap-5 bg-[#F7F3EF] border border-[#928b86] rounded-[14px] p-6 hover:border-[#A8543C] transition-colors"
          >
            {/* Icon */}
            <div>
              <Image
                src={service.icon}
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
            </div>

            <div className="flex-1">
              {/* Title */}
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-snug mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-[#57534C] leading-[1.7]">
                {service.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E5DECF]">
              <span className="text-[12px] font-medium tracking-[0.04em] uppercase text-[#928b86]">
                {service.timeline}
              </span>
              <span className="text-[13.5px] font-medium text-[#A8543C] flex items-center gap-1.5 whitespace-nowrap">
                Details
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
