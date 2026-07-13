"use client";

import { useState } from "react";
import type { JSX } from "react";

interface Domain {
  number: string;
  title: string;
  items: string[];
}

const DOMAINS: Domain[] = [
  {
    number: "01",
    title: "Demographics & coverage",
    items: [
      "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
  {
    number: "02",
    title: "Medical claims",
    items: [
       "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
  {
    number: "03",
    title: "Clinical",
    items: [
       "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
  {
    number: "04",
    title: "Pharmacy",
    items: [
       "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
  {
    number: "05",
    title: "Risk & quality",
    items: [
       "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
  {
    number: "06",
    title: "Social & behavioral",
    items: [
       "Member identifiers",
      "Eligibility history",
      "PCP attribution",
      "Address history",
    ],
  },
];

function DomainRow({
  domain,
  isOpen,
  onToggle,
}: {
  domain: Domain;
  isOpen: boolean;
  onToggle: () => void;
}): JSX.Element {
  return (
    <div className="border-b border-[#928b86] last:border-b-0">
      <button
        className="w-full flex items-center gap-4 py-5 text-left group focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span className="text-[17px] font-semibold text-[#A8543C] w-7 shrink-0">
          {domain.number}
        </span>

        {/* Title */}
        <span className="flex-1 text-[16px] md:text-[17px] font-medium text-[#1A1A1A] group-hover:text-[#C05A3A] transition-colors">
          {domain.title}
        </span>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M3 6l5 5 5-5"
            stroke="#6B6B6B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded items */}
      {isOpen && (
        <div className="pl-11 pb-5 grid grid-cols-2 gap-x-6 gap-y-2">
          {domain.items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C05A3A] shrink-0" />
              <span className="text-[13px] text-[#57534C]">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SixDomains(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  // Split into two columns: left = odd indices (0,2,4), right = even indices (1,3,5)
  const leftDomains = DOMAINS.filter((_, i) => i % 2 === 0);
  const rightDomains = DOMAINS.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 md:py-[72px] text-center">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
            The Record
      </div>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] mb-4">
        Six domains. One trustworthy view.
      </h2>

      {/* Subtext */}
      <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] mx-auto max-w-[580px] mb-12 text-center">
        Every domain is standardized, validated, and traceable back to its source. Query the full member record or any individual slice.
      </p>

      {/* Two-column accordion */}
      <div className="grid grid-cols-1 border-b border-[#928b86] md:grid-cols-2 gap-x-14  overflow-hidden p-2 md:p-6">
        {/* Left column */}
        <div>
          {leftDomains.map((domain) => {
            const globalIndex = DOMAINS.indexOf(domain);
            return (
              <DomainRow
                key={domain.number}
                domain={domain}
                isOpen={openIndex === globalIndex}
                onToggle={() => toggle(globalIndex)}
              />
            );
          })}
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden md:block border-l border-[#928b86] pl-14">
          {rightDomains.map((domain) => {
            const globalIndex = DOMAINS.indexOf(domain);
            return (
              <DomainRow
                key={domain.number}
                domain={domain}
                isOpen={openIndex === globalIndex}
                onToggle={() => toggle(globalIndex)}
              />
            );
          })}
        </div>

        {/* Right column (mobile — shown below left) */}
        <div className="md:hidden">
          {rightDomains.map((domain) => {
            const globalIndex = DOMAINS.indexOf(domain);
            return (
              <DomainRow
                key={`mobile-${domain.number}`}
                domain={domain}
                isOpen={openIndex === globalIndex}
                onToggle={() => toggle(globalIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
