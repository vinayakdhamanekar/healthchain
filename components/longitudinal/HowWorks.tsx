"use client";

import { useLayoutEffect, useRef, type JSX } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const pinRef = useRef<HTMLDivElement>(null); // the element ScrollTrigger pins directly
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll distance (px) dedicated to EACH crossfade transition between two
  // steps. With N steps there are (N - 1) transitions, so the pin holds for
  // TRANSITION_SCROLL * (N - 1) px total - GSAP's `pin: true` inserts its own
  // spacer sized to exactly that, so no manual height math is needed.
  const TRANSITION_SCROLL = 700;

  // Vertical travel distance (px) for the slide.
  const SLIDE_DISTANCE = 48;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Scoped to md+ only - mobile uses the separate whileInView list below.
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const panels = panelRefs.current;

        // Baseline: step 0 visible, the rest hidden and offset downward
        // (mirrors the old AnimatePresence `initial`/`exit` offsets).
        gsap.set(panels[0], { opacity: 1, y: 0 });
        gsap.set(panels.slice(1), { opacity: 0, y: SLIDE_DISTANCE });

        const totalTransitions = steps.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            // Pin when the (content-height) stack reaches viewport center, so
            // the crossfade plays out mid-screen instead of jammed under the
            // navbar. GSAP inserts its own spacer for the scroll distance.
            start: "center center",
            end: `+=${TRANSITION_SCROLL * totalTransitions}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // One crossfade per pair of adjacent steps, evenly spaced across the
        // timeline (position `i` to `i + 1`) - outgoing step slides up/out
        // while the incoming one slides in from below, at the same scroll
        // position.
        for (let i = 0; i < totalTransitions; i++) {
          tl.to(panels[i], { opacity: 0, y: -SLIDE_DISTANCE, duration: 1, ease: "power1.inOut" }, i);
          tl.to(panels[i + 1], { opacity: 1, y: 0, duration: 1, ease: "power1.inOut" }, i);
        }
      }, pinRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    // Grid stack: every step occupies the same cell (grid-area 1/1) so they
    // overlap for the crossfade while the container sizes itself to the
    // tallest step - no `h-screen`/sticky-offset hacks needed. `md:grid` (not
    // `md:block`) is what actually enables the stacking layout.
    <div ref={pinRef} className="hidden md:grid relative">
      {steps.map((step, idx) => (
        <div
          key={step.number}
          ref={(el) => {
            panelRefs.current[idx] = el;
          }}
          className="[grid-area:1/1] will-change-transform"
        >
          <StepContent step={step} />
        </div>
      ))}
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

export default function HowWorks(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[20px]">
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