"use client";

import { useLayoutEffect, useRef, type JSX } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  number: string;
  phase: string;
  title: string;
  bullets: string[];
}

const steps: Step[] = [
  {
    number: "01",
    phase: "Phase 01 → Stand up",
    title: "Deploy into your stack",
    bullets:[
      "Runs in your cloud, alongside your existing tools",
      "Connects to your warehouse without a migration",
      "Single sign-on and audit logging from day one ",
    ],
  },
  {

    number: "02",
    phase: "Phase 02 → Connect",
    title: "Bring your data sources online",
    bullets: [
      "Onboard claims, EHR, lab, and eligibility fields",
      "Auto-mapped to current standards with gap reports",
      "Member matching with operator review queues",
    ],
  },
  {
    number: "03",
    phase: "Phase 03 → Go Live",
    title: "Light up the five APIs",
    bullets: [
      "Patient Access, Provider Access, Payer-to-Payer, Prior Auth, and Provider Directory",
      "Required CMS metrics captured automatically",
      "Sandbox environment for your partners to test",
    ],
  },
  {
    number: "04",
    phase: "Phase 04 → Stay Current",
    title: "Compliance that keeps up with you",
    bullets: [
      "Attestation reports generated on a schedule",
      "Regulatory updates ship as platform releases",
      "NCQA and ONC certification support included",
    ],
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
        <div className="font-mono font-semibold text-[13px] tracking-[1.2px] uppercase mb-[4px] text-[#A8543C] ">
          {step.phase}
        </div>

        <h3 className="text-[30px] font-semibold tracking-[-0.01em] text-[#34332C] mb-4">
          {step.title}
        </h3>
      </div>

      {/* Bullet List */}
      <div className="pt-2">
        <ul className="space-y-3">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#403C36]"
            >
              <span className="mt-[11px] w-[4px] h-[4px] rounded-full bg-[#403C36] shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
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

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Scoped to md+ only - mobile uses the separate whileInView list below.
    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const panels = panelRefs.current;

        // Baseline: step 0 visible, the rest hidden and offset down slightly
        // (mirrors the old AnimatePresence `initial`/`exit` y offsets).
        gsap.set(panels[0], { opacity: 1, y: 0 });
        gsap.set(panels.slice(1), { opacity: 0, y: 24 });

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
        // timeline (position `i` to `i + 1`) - outgoing step fades down/out
        // while the incoming one fades up/in, at the same scroll position.
        for (let i = 0; i < totalTransitions; i++) {
          tl.to(panels[i], { opacity: 0, y: -24, duration: 1, ease: "power1.inOut" }, i);
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

export default function CompliancePath(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Section label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-3">
        Effective Deployment
      </div>

      <div className=" items-start mb-16">
        <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C] max-w-[720px]">
          A clear path to compliance.
        </h2>
        <p className="max-w-[680px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[20px]">
          Your team doesn&apos;t have time for platform migration or rip-and-replace. We deploy directly into your stack and roll out in phases your team can absorb.
        </p>
      </div>

      {/* Steps */}
      
        {/* Desktop: pinned scroll-crossfade */}
        <PinnedSteps />

        {/* Mobile: simple fade-in list */}
        <MobileStepsList />
      
    </section>
  );
}