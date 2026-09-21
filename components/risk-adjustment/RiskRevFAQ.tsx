"use client";

import { useState } from "react";
import type { JSX } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Which models are supported?",
    answer:
      "Part C, Part D RxHCC, ESRD and ACA. We confirm model versions, scoring periods and inputs during scoping.",
  },
  {
    question: "Can we keep our coding and QA process? ",
    answer:
      "Yes. Use shared queues, QA and auditor review aligned to your roles and policies. Coders retain responsibility for decisions.",
  },
  {
    question: "Does it handle deletions as well as additions?",
    answer:
      "Yes. Raise encounter-specific deletion requests with reasons and evaluate later supporting evidence. Suppression does not delete a submitted diagnosis. ",
  },
  {
    question: "What data does it use?",
    answer:
      "Member lists, charts or PDFs, claims, identifiers and relevant response files. Formats, mappings and connections are agreed during implementation. ",
  },
  {
    question: "Can we use our current submission team?",
    answer:
      "Yes. Export approved outputs to your team or vendor, or use Health Chain under your authorized arrangement or through a submission partner.",
  },
  {
    question: "How is RiskRev Pro priced? ",
    answer:
      "Pricing is scoped to population, programs, workflow, integrations and submission responsibilities. Inclusions are confirmed in the proposal. ",
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

export default function RiskRevFAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? -1 : i);

  const midpoint = Math.ceil(FAQS.length / 2);
  const leftColumn = FAQS.slice(0, midpoint).map((item, i) => ({ item, index: i }));
  const rightColumn = FAQS.slice(midpoint).map((item, i) => ({ item, index: midpoint + i }));

  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px] border-t border-[#E5DECF]">
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-3">
        Questions
      </div>

      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.02em] leading-[1.08] text-[#1A1A1A] max-w-[600px] mb-10">
        Questions about RiskRev Pro.
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
    </section>
  );
}
