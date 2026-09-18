"use client";

import { useState } from "react";
import type { JSX } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do I need to provide an email to see pricing?",
    answer:
      "No. You can configure and review an estimate without sharing contact details. Provide an email if you want a copy or a scoped proposal.",
  },
  {
    question: "Is data preparation included?",
    answer:
      "The standard package assumes prepared inputs in our agreed format. Select mapping, merging or identity matching if you need Health Chain to perform those services.",
  },
  {
    question: "Is the Prior Authorization API included?",
    answer:
      "Yes. All four APIs due in January 2027 are in the standard package. The Prior Authorization API needs a connection to your utilization management system, which we confirm during scoping.",
  },
  {
    question: "Can I buy direct connectivity without data preparation?",
    answer:
      "Yes, when your team or data partner provides suitably prepared data. We confirm source access and interface requirements during scoping.",
  },
  {
    question: "Is this also the price for Benefit Intelligence and Design?",
    answer:
      "No. Benefit Intelligence and Design is scoped around the markets, data, reconciliation work and decision workflows in the engagement.",
  },
  {
    question: "Can I cover more than 50,000 members, or a different payer type?",
    answer:
      "Yes, through a scoped enterprise discussion. This calculator is limited to Medicare Advantage and Medicaid managed care plans up to 50,000 members.",
  },
  {
    question: "Why is only interoperability priced online?",
    answer:
      "Because it is the one requirement with a date on it and a scope every plan shares. The others depend on your data and your markets, and a number published before we have seen either would be wrong for you.",
  },
];

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}): JSX.Element {
  return (
    <div className="border-b border-[#E5DECF] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group focus:outline-none"
      >
        <span className="text-[15.5px] md:text-[16.5px] font-medium text-[#1A1A1A] group-hover:text-[#A8543C] transition-colors">
          {item.question}
        </span>
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

      {isOpen && (
        <p className="pb-5 pr-8 text-[14.5px] leading-[1.65] text-[#57534C]">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function PricingFAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  const midpoint = Math.ceil(FAQS.length / 2);
  const leftColumn = FAQS.slice(0, midpoint).map((item, i) => ({ item, index: i }));
  const rightColumn = FAQS.slice(midpoint).map((item, i) => ({ item, index: midpoint + i }));

  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-3">
        FAQ
      </div>

      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.02em] leading-[1.08] text-[#1A1A1A] max-w-[600px] mb-10">
        Questions about pricing.
      </h2>

      <div className="rounded-[16px] border border-[#E5DECF] bg-white max-w-[1100px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#E5DECF]">
          <div className="min-w-0 px-6 md:px-8">
            {leftColumn.map(({ item, index }) => (
              <FAQRow
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
          <div className="min-w-0 px-6 md:px-8">
            {rightColumn.map(({ item, index }) => (
              <FAQRow
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[13px] text-[#928b86]">
        Pricing last updated 17 September 2026.
      </p>
    </section>
  );
}
