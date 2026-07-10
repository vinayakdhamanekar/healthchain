"use client";

import { useRef, useState, type JSX } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"

import Image from "next/image";;

interface Step {
  number: string;
  icon: string;
  phase: string;
  title: string;
  content: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: "/icons/Medical-Profile-Patiant-2--Streamline-Ultimate.svg",
    phase: "Identity matching",
    title: "Resolve the member",
    content:"Match members across EHR, claims, Rx, lab, and HIE feeds. Get one member and one ID, even when names, DOBs, or MRNs disagree across sources.",

  },
  {

    number: "02",
    icon: "/icons/Calendar--Streamline-Ultimate.svg",
    phase: "Longitudinal View",
    title: "Stitch the timeline",
    content: "Group claims, encounters, labs, fills, and notes into a coherent history. Reconcile dates, providers, and settings across sources so the record reads like one story.",
  },
  {
    number: "03",
    icon: "/icons/Technology-Privacy-Consent-Profile-Browser-Shield--Streamline-Ultimate.svg",
    phase: "Conflict resolution",
    title: "Reconcile the truth",
    content: "When sources disagree on a piece of data, apply source-of-truth rules to determine the most reliable signal. Every decision is versioned and explainable on demand.",

  },
  {
    number: "04",
    icon: "/icons/Merge-Account--Streamline-Ultimate.svg",
    phase: "Standardization & overlays",
    title: "Enrich the record",
    content: "Standardize codes, and layer in social and provider context so the data arrives already clean and ready for downstream teams to use.",
  },
];

function StepContent({ step }: { step: Step }): JSX.Element {
  return (
    <div className="grid md:grid-cols-[140px_1fr_420px] gap-8 md:gap-12 px-7 md:px-14 py-12 w-full">
      {/* Number */}
      <div className="text-[88px] font-medium text-[#E3DCCD] leading-[0.8] tracking-[-0.02em]">
        {step.number}
      </div>

      {/* Phase + Title */}
      <div className="pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[9px] bg-[#F7F3EF] flex items-center justify-center shrink-0">
            <Image
              src={step.icon}
              alt={step.phase}
              width={18}
              height={18}
            />
          </div>
          <span className="font-mono font-semibold text-[12px] tracking-[1.2px] uppercase mb-[4px] text-[#A8543C]">
            {step.phase}
          </span>
        </div>

        <h3 className="text-[24px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
          {step.title}
        </h3>
      </div>

      {/* Content */}
      <div className="pt-2">
        {step.content}
      </div>
    </div>
  );
}

function PinnedSteps(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      steps.length - 1,
      Math.floor(latest * steps.length)
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
            <StepContent step={steps[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileStepsList(): JSX.Element {
  return (
    <div className="md:hidden">
      {steps.map((step) => (
        <motion.div
          key={step.number}
          className="border-b border-[#D8D1C6] last:border-b-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <StepContent step={step} />
        </motion.div>
      ))}
    </div>
  );
}

export default function HowItWorks(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Section label */}
      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#A8543C] mb-4">
        How it works
      </p>

      <div className=" items-start mb-16">
        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.025em] max-w-[560px] leading-[1.1] text-[#1A1A1A] mb-3">
          From scattered records to one you can trust.
        </h2>
        <p className="text-[16px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[680px]">
          Four steps that run continuously across every feed. Every match, merge, and reconciliation is versioned and replayable.
        </p>
      </div>

      {/* Steps */}
      <div className="border-y border-[#D8D1C6]">
        {/* Desktop: pinned scroll-crossfade */}
        <PinnedSteps />

        {/* Mobile: simple fade-in list */}
        <MobileStepsList />
      </div>
    </section>
  );
}
