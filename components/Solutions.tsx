"use client";

import { useRef, useState, type JSX } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

interface Solution {
  number: string;
  category: string;
  categoryColorClass: string;
  title: string;
  description: string;
  chips: string[];
  chipClass: string;
}

const SOLUTIONS: Solution[] = [
  {
    number: "01",
    category: "Interoperability & Compliance",
    categoryColorClass: "text-[#6E7A3A]",
    title: "Connect every system. Meet every mandate.",
    description:
      "Automate FHIR, HL7, and X12 data exchange across your network with built-in compliance for TEFCA, CMS-0057-F, and state-level regulations—so you're ready for Jan 2027 deadlines.",
    chips: ["FHIR R4", "HL7 / X12", "TEFCA", "CMS-0057-F"],
    chipClass: "bg-[#D2E3AC] text-[#51602F]",
  },
  {
    number: "02",
    category: "Longitudinal Data Enablement",
    categoryColorClass: "text-[#4346A0]",
    title: "From fragments to full member stories.",
    description:
      "Aggregate clinical, claims, pharmacy, and SDOH data into a single longitudinal record—powering population health, risk adjustment, and care coordination at scale.",
    chips: ["Clinical", "Claims", "Pharmacy", "SDOH"],
    chipClass: "bg-[#CBCDF1] text-[#3C3E8C]",
  },
  {
    number: "03",
    category: "Benefit Design & Intelligence",
    categoryColorClass: "text-[#A8543C]",
    title: "Smarter benefits, powered by real data.",
    description:
      "Leverage real-world utilization patterns and outcomes data to design, price, and optimize benefit structures that reduce waste and improve member health outcomes.",
    chips: ["Utilization", "Outcomes", "Cost Modeling", "Optimization"],
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
  },
];

function SolutionDesktopContent({
  solution,
}: {
  solution: Solution;
}): JSX.Element {
  return (
    <div className="grid grid-cols-[170px_1fr_auto] items-start gap-0 w-full">
      {/* Ghost number */}
      <div className="text-[88px] font-medium text-[#E3DCCD] leading-[0.8] tracking-[-0.02em]">
        {solution.number}
      </div>

      {/* Content */}
      <div className="max-w-[560px]">
        <div
          className={`font-mono font-semibold text-[13px] tracking-[1.2px] uppercase mb-[14px] ${solution.categoryColorClass}`}
        >
          {solution.category}
        </div>
        <h3 className="text-[30px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
          {solution.title}
        </h3>
        <p className="text-[16px] leading-[1.55] text-[#5E594F] mb-[22px]">
          {solution.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {solution.chips.map((chip) => (
            <span
              key={chip}
              className={`font-mono text-[12px] py-[6px] px-3 rounded-[6px] ${solution.chipClass}`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Explore link */}
     <a
  href="#"
  className="inline-block text-[15px] text-[#34332C] no-underline whitespace-nowrap border-b border-dotted border-transparent hover:border-[#34332C] transition-all duration-300"
>
  Explore →
</a>
    </div>
  );
}

function SolutionMobileContent({
  solution,
  isLast,
}: {
  solution: Solution;
  isLast: boolean;
}): JSX.Element {
  return (
    <div
      className={`border-t border-[#E5DECF] ${isLast ? "border-b" : ""} py-10`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="text-[48px] font-medium text-[#E3DCCD] leading-[0.8] tracking-[-0.02em]">
          {solution.number}
        </div>
        <a
          href="#"
          className="text-[15px] text-[#34332C] no-underline whitespace-nowrap hover:opacity-60 transition-opacity mt-1"
        >
          Explore →
        </a>
      </div>
      <div
        className={`font-mono text-[13px] tracking-[1.2px] uppercase mb-3 ${solution.categoryColorClass}`}
      >
        {solution.category}
      </div>
      <h3 className="text-[24px] font-semibold tracking-[-0.01em] text-[#34332C] mb-3">
        {solution.title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-[#5E594F] mb-5">
        {solution.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {solution.chips.map((chip) => (
          <span
            key={chip}
            className={`font-mono text-[12px] py-[6px] px-3 rounded-[6px] ${solution.chipClass}`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function PinnedSolutions(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      SOLUTIONS.length - 1,
      Math.floor(latest * SOLUTIONS.length)
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div ref={containerRef} className="hidden md:block relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <SolutionDesktopContent solution={SOLUTIONS[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileSolutionsList(): JSX.Element {
  return (
    <div className="md:hidden">
      {SOLUTIONS.map((solution, idx) => (
        <motion.div
          key={solution.number}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SolutionMobileContent
            solution={solution}
            isLast={idx === SOLUTIONS.length - 1}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Solutions(): JSX.Element {
  return (
    <section className="pt-[66px] px-7 md:px-14 pb-[30px] bg-[#f7f3EF]">
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-[18px]">
        Solutions
      </div>

      {/* Header row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-6">
        <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
          One partner. Every payer<br className="hidden md:block" /> initiative. Solved.
        </h2>
        <a
          href="#"
          className="self-start md:self-auto whitespace-nowrap inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[15px] py-[13px] px-6 rounded-[40px] hover:bg-black/5 transition-colors"
        >
          Explore Platform
        </a>
      </div>

      {/* Desktop: pinned scroll-crossfade */}
      <PinnedSolutions />

      {/* Mobile: simple fade-in list */}
      <MobileSolutionsList />
    </section>
  );
}
