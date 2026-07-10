import type { JSX } from "react";
import Image from "next/image";

interface DataFeature {
  title: string;
  description: string;
  icon: string;
}

const FEATURES: DataFeature[] = [
  {
    title: "Full data lineage",
    description:
      "Every value traces back to its source. When auditors ask where a number came from, you have the answer in seconds.",
    icon: "/icons/Merge-Account--Streamline-Ultimate.svg",
  },
  {
    title: "Defensible history",
    description:
      "Reproduce any member record as it looked on any past date. Defend prior submissions and reconstruct attestations on demand.",
    icon: "/icons/Server-Clock--Streamline-Ultimate.svg",
  },
  {
    title: "Reports that generate themselves",
    description:
      "Last minute reports are stressful for everyone. PARDD, NCQA DAV, HEDIS supplemental, and EHI export are produced continuously.",
    icon: "/icons/Medical-File--Streamline-Ultimate.svg",
  },
  {
    title: "Streaming audit log",
    description:
      "Every time data is accessed or changed, the change and reason for request is logged in your security tools.",
    icon: "/icons/Technology-Privacy-Consent-Profile-Browser-Shield--Streamline-Ultimate.svg",
  },
];

export default function AuditableData(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Centered header */}
      <div className="text-center max-w-[680px] mx-auto mb-14">
        <p className="text-[13px] font-bold tracking-[0.16em] uppercase text-[#C05A3A] mb-4">
          Auditable Data Flows
        </p>
        <h2 className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] leading-[1.07] text-[#1A1A1A] mb-5">
          Making data visible and usable.
        </h2>
        <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#57534C]">
          A black box of data exchange creates stress for everyone. Health Chain
          delivers interoperability and governance from a single platform, so the
          proof of compliance is always there when you need it.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-[#F7F3EF] border border-[#928b86] rounded-[14px] p-6 flex flex-col gap-5"
          >
            {/* Icon */}
            <div>
              <Image
                src={f.icon}
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
            </div>

            {/* Title */}
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-snug">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] md:text-[14px] text-[#57534C] leading-[1.7]">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
