"use client";

import { useRef, useState, type JSX } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";

interface SolutionRow {
  number: string;
  category: string;
  categoryColorClass: string;
  categoryIcon: string;
  title: string;
  description: string;
  chips: string[];
  chipClass: string;
}

const ROWS: SolutionRow[] = [
  {
    number: "01",
    category: "Solution 01",
    categoryColorClass: "text-[#A8543C]",
    categoryIcon: "/icons/Technology-Privacy-Consent-Profile-Browser-Shield--Streamline-Ultimate.svg",
    title: "Interoperability & Compliance",
    description:
      "Automate FHIR, HL7, and X12 exchange across your network with built-in compliance for TEFCA, state mandates, and CMS-0057-F—ahead of Jan 2027 deadlines.",
    chips: ["FHIR R4", "HL7 / X12", "TEFCA", "CMS-0057-F"],
    chipClass: "bg-[#D2E3AC] text-[#51602F]",
  },
  {
    number: "02",
    category: "Solution 02",
    categoryColorClass: "text-[#A8543C]",
    categoryIcon: "/icons/Merge-Account--Streamline-Ultimate.svg",
    title: "Longitudinal data enablement",
    description:
      "One trustworthy longitudinal health record from claims, clinical, pharmacy, lab, and SDOH—ready for the tools your teams already use.",
    chips: ["Clinical", "Claims", "Pharmacy", "SDOH"],
    chipClass: "bg-[#CBCDF1] text-[#3C3E8C]",
  },
  {
    number: "03",
    category: "Solution 03",
    categoryColorClass: "text-[#A8543C]",
    categoryIcon: "/icons/Analytics-Graph-Bar--Streamline-Ultimate.svg",
    title: "Benefit design & intelligence",
    description:
      "Run scenarios on your real member data so actuarial, product, and network can land every benefit decision with evidence.",
    chips: ["Utilization", "Outcomes", "Cost Modeling", "Optimization"],
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
  },
];

function RowDesktopContent({ row }: { row: SolutionRow }): JSX.Element {
  return (
    <div className="grid grid-cols-[170px_1fr_auto] items-start gap-0 w-full">
      <div className="text-[88px] font-medium text-[#E3DCCD] leading-[0.8] tracking-[-0.02em]">
        {row.number}
      </div>
      <div className="max-w-[560px]">
        <div
  className={`flex items-center gap-2 font-mono font-semibold text-[13px] tracking-[1.2px] uppercase mb-[14px] ${row.categoryColorClass}`}
>
  <Image
    src={row.categoryIcon}
    alt=""
    width={18}
    height={18}
    className="shrink-0"
  />

  <span>{row.category}</span>
</div>
        <h3 className="text-[30px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
          {row.title}
        </h3>
        <p className="text-[16px] leading-[1.55] text-[#5E594F] mb-[22px]">
          {row.description}
        </p>
        {/* <div className="flex flex-wrap gap-2">
          {row.chips.map((chip) => (
            <span key={chip} className={`font-mono text-[12px] py-[6px] px-3 rounded-[6px] ${row.chipClass}`}>
              {chip}
            </span>
          ))}
        </div> */}
      </div>
      <a href="#" className="text-[15px] text-[#34332C] no-underline whitespace-nowrap hover:opacity-60 transition-opacity">
        Explore the Solution →
      </a>
    </div>
  );
}

function RowMobileContent({ row, isLast }: { row: SolutionRow; isLast: boolean }): JSX.Element {
  return (
    <div className={`border-t border-[#E5DECF] ${isLast ? "border-b" : ""} py-10`}>
      <div className="flex items-start justify-between mb-5">
        <div className="text-[48px] font-medium text-[#E3DCCD] leading-[0.8] tracking-[-0.02em]">
          {row.number}
        </div>
        <a href="#" className="text-[15px] text-[#34332C] no-underline hover:opacity-60 transition-opacity mt-1">
          Explore →
        </a>
      </div>
      <div className={`font-mono text-[13px] tracking-[1.2px] uppercase mb-3 ${row.categoryColorClass}`}>
        {row.category}
      </div>
      <h3 className="text-[24px] font-semibold tracking-[-0.01em] text-[#34332C] mb-3">
        {row.title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-[#5E594F] mb-5">
        {row.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {row.chips.map((chip) => (
          <span key={chip} className={`font-mono text-[12px] py-[6px] px-3 rounded-[6px] ${row.chipClass}`}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function PinnedRows(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      ROWS.length - 1,
      Math.floor(latest * ROWS.length)
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div ref={containerRef} className="hidden md:block relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center -mt-40 -mb-40 pt-6 md:pt-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <RowDesktopContent row={ROWS[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileRowsList(): JSX.Element {
  return (
    <div className="md:hidden">
      {ROWS.map((row, idx) => (
        <motion.div
          key={row.number}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <RowMobileContent row={row} isLast={idx === ROWS.length - 1} />
        </motion.div>
      ))}
    </div>
  );
}

export default function EnterpriseSuccess(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 pt-[66px] pb-[30px]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-6">
        <div>
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-3">
            Buildable Solutions
          </div>
          <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C] max-w-[720px]">
            Powering enterprise-wide success.
          </h2>
          <p className="max-w-[600px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[20px]">
            The same governed data layer powers every Health Chain solution. Start where the need is highest and compound from there.
          </p>
        </div>
      </div>

      {/* Desktop: pinned scroll-crossfade */}
      <PinnedRows />

      {/* Mobile: simple fade-in list */}
      <MobileRowsList />
    </section>
  );
}
