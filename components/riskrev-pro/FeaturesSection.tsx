import type { JSX } from "react";
import Image from "next/image";

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: "Never pay to retrieve what you already have.",
    description:
      "Before your team requests a single record, RiskRev Pro checks what's already on file and tells you, in dollars, whether pulling a new chart is even worth it. Retrieval spend goes toward records you actually need - not duplicates.",
    icon: "/icons/Accounting-Calculator-1--Streamline-Ultimate.svg",
  },
  {
    title: "AI that codes like your best coder, at the speed of software.",
    description:
      "Every chart gets read, coded, and scored automatically the moment it lands. Your coders spend their time confirming and refining - not typing from scratch.",
    icon: "/icons/Ai-Chip-Spark--Streamline-Ultimate.svg",
  },
  {
    title: "A safety net with more than one layer.",
    description:
      "Coding, quality review, and final audit aren't three separate systems bolted together - they're one continuous chain of custody, and you decide how tight to make it: review everything, sample randomly, or target only the highest-risk charts.",
    icon: "/icons/Technology-Privacy-Consent-Profile-Browser-Shield--Streamline-Ultimate.svg",
  },
  {
    title: "Submission-ready, not just \"coded.\"",
    description:
      "When a chart is confirmed, RiskRev Pro prepares it for submission and tracks it all the way through acknowledgment - accepted, rejected, or resubmitted - so nothing quietly falls off a list.",
    icon: "/icons/Medical-File--Streamline-Ultimate.svg",
  },
  {
    title: "One platform, every payer model.",
    description:
      "Medicare Advantage and ACA Commercial Exchange populations are scored under the right model automatically, so mixed books of business don't mean mixed-up workflows.",
    icon: "/icons/Network-And-Content-Delivery--Streamline-Ultimate.svg",
  },
];

function FeatureCardContent({ card }: { card: FeatureCard }): JSX.Element {
  return (
    <div className="p-7 md:p-9 flex flex-col gap-4 h-full">
      <Image src={card.icon} alt="" width={28} height={28} className="shrink-0" />
      <h3 className="text-[19px] md:text-[21px] font-semibold tracking-[-0.01em] leading-tight text-[#1A1A1A]">
        {card.title}
      </h3>
      <p className="text-[14px] md:text-[14.5px] leading-[1.7] text-[#57534C] flex-1">
        {card.description}
      </p>
    </div>
  );
}

export default function FeaturesSection(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      {/* Label */}
      <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-[#A8543C] mb-4">
        Features
      </p>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.07] text-[#1A1A1A] max-w-[740px] mb-10">
        The features that actually change your numbers.
      </h2>

      {/* Card grid: 2 top, 3 bottom */}
      <div className="rounded-[18px] overflow-hidden border border-[#928b86]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-[#928b86]">
            <FeatureCardContent card={FEATURES[0]} />
          </div>
          <div className="border-b md:border-b-0 border-[#928b86]">
            <FeatureCardContent card={FEATURES[1]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#928b86]">
          <div className="border-b md:border-r border-[#928b86]">
            <FeatureCardContent card={FEATURES[2]} />
          </div>
          <div className="border-b md:border-r border-[#928b86]">
            <FeatureCardContent card={FEATURES[3]} />
          </div>
          <div className="border-b border-[#928b86]">
            <FeatureCardContent card={FEATURES[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
