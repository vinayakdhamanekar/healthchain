"use client";
import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { cubicBezier, motion, useInView, useScroll, useTransform } from "framer-motion";

interface SourceTagProps {
  label: string;
  delay?: number;
  fromX?: number;
}

function SourceTag({ label, delay = 0, fromX = 0 }: SourceTagProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="font-mono text-[12px] tracking-[0.5px] text-[#4A463F] bg-[#FBF9F4] border border-[#E4DED0] rounded-[8px] py-[9px] px-[14px] shadow-[0_3px_9px_rgba(60,45,30,0.05)] whitespace-nowrap"
    >
      {label}
    </motion.div>
  );
}

function UseCaseTag({ label }: { label: string }): JSX.Element {
  return (
    <div className="font-mono text-[13px] text-[#4A463F] bg-[#FBF9F4] border border-[#E4DED0] rounded-[8px] py-[9px] px-[16px] whitespace-nowrap">
      {label}
    </div>
  );
}

interface FloatingSquareProps {
  className: string;
  delay?: number;
  floatY?: number;
  floatDuration?: number;
}

function FloatingSquare({ className, delay = 0, floatY = 8, floatDuration = 3.5 }: FloatingSquareProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: [0, -floatY, 0] }
          : { opacity: 0, scale: 0.5 }
      }
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay, ease: "easeOut" },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.6,
        },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    />
  );
}

const TAG_ROWS = [
  ["Directories", "Risk Adjustment", "Quality Measures", "HEDIS Reporting", "Care Gap Closure", "Population Health", "Member Adequacy"],
  ["Network Adequacy", "Star Ratings", "SDOH Screening", "Prior Authorization", "Credentialing", "Claims Analytics", "Utilization Mgmt"],
  ["Predictive Analytics", "Value-Based Contracts", "Member Experience", "Regulatory Filing", "Benefit Design", "Cost Modeling", "Fraud Detection"],
];

interface RevealHeadingProps {
  title: string;
  description: string;
  className?: string;
  baseDelay?: number;
}

function RevealHeading({ title, description, className = "", baseDelay = 0 }: RevealHeadingProps): JSX.Element {
  const words = title.split(" ");
  const paragraphDelay = baseDelay + words.length * 0.06 + 0.12;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      <h2 className="text-[32px] lg:text-[40px] xl:text-[45px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#34332C]">
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.65,
              delay: baseDelay + index * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block mr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{
          duration: 0.7,
          delay: paragraphDelay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="text-[15px] lg:text-[17px] leading-[1.5] text-[#6B665D] mt-[18px] max-w-[430px] mx-auto"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default function IngestSection(): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // The pinned box's height is fluid (aspect-ratio, clamped by max-width) so it
  // varies with viewport width — it has to be measured, not hardcoded. Native
  // `position: sticky` releases once the track can no longer contain
  // `TOP_OFFSET + content height`; that release point has nothing to do with
  // scrollYProgress unless we derive the offsets from the same measurement.
  const TOP_OFFSET = 110; // matches `sticky top-[110px]` below
  const EXTRA_SCROLL = 700; // scroll distance (px) dedicated to driving the pinned animation
  const [contentHeight, setContentHeight] = useState(1010); // fallback ≈ aspect-ratio height at max-width

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    // Debounce via rAF: ResizeObserver can fire on every sub-pixel tick during
    // layout/animation. Without the guard, rapid setState calls can cause the
    // derived scroll offsets (trackHeight/releaseOffset) to jitter mid-scroll
    // on some browsers (notably mobile Safari). Coalescing to one update per
    // frame keeps the scroll range stable while still tracking real resizes.
    let frame: number;
    const observer = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setContentHeight(entry.contentRect.height);
      });
    });
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const trackHeight = TOP_OFFSET + contentHeight + EXTRA_SCROLL;
  const releaseOffset = TOP_OFFSET + contentHeight;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 110px", `end ${releaseOffset}px`],
  });

  // Section 1 items recede in a staggered, overlapping stack (deepjudge.ai-style
  // pinned scroll-stack): each cluster gets its own progress slice, converges
  // toward the center, scales down, and dims — but never drops straight to 0 —
  // so it reads as a compacted layer sitting behind the next one, not a hard
  // cutout. z-index increases per item so later items sit visually on top.
  const STACK3_END = 0.55; // point by which the whole stack has fully compacted
  const RELEASE_END = 0.68; // point by which the compacted stack has fully dissolved
  const REVEAL_START = 0.58; // Section 2 begins fading in with a bit more overlap
  const REVEAL_END = 0.92;

  const stackEase = cubicBezier(0.22, 1, 0.36, 1);

  // Left tags cluster — recedes first, converges right/up toward center.
  const leftX = useTransform(scrollYProgress, [0, 0.3], [0, 90], { ease: stackEase });
  const leftY = useTransform(scrollYProgress, [0, 0.3], [0, -60], { ease: stackEase });
  const leftScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.55], { ease: stackEase });
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, STACK3_END, RELEASE_END], [1, 0.35, 0.35, 0]);

  // Right tags cluster — starts receding slightly after left, overlapping it.
  const rightX = useTransform(scrollYProgress, [0.1, 0.4], [0, -90], { ease: stackEase });
  const rightY = useTransform(scrollYProgress, [0.1, 0.4], [0, -60], { ease: stackEase });
  const rightScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.55], { ease: stackEase });
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.4, STACK3_END, RELEASE_END], [1, 0.35, 0.35, 0]);

  // Center heading + diagram — recedes last, ends up as the topmost compacted
  // layer (stays fully opaque while shrinking, only dissolves at the very end).
  const centerY = useTransform(scrollYProgress, [0.22, STACK3_END], [0, -40], { ease: stackEase });
  const centerScale = useTransform(scrollYProgress, [0.22, STACK3_END], [1, 0.82], { ease: stackEase });
  const centerOpacity = useTransform(scrollYProgress, [0.22, STACK3_END, RELEASE_END], [1, 1, 0]);

  // Section 2 (downstream delivery) reveals as the compacted stack dissolves,
  // with a short overlap so the transition feels continuous rather than blank.
  const enterOpacity = useTransform(scrollYProgress, [REVEAL_START, REVEAL_END], [0, 1]);
  const enterY = useTransform(scrollYProgress, [REVEAL_START, REVEAL_END], [24, 0]);

  return (
    <section className="pt-12 pb-8 bg-[#f7f3EF]">

      {/* ── DESKTOP VISUALIZATION (md+) — pinned scroll track ──
           NOTE: no overflow-hidden on this <section> or any ancestor of the
           `sticky` frame below — overflow other than visible on an ancestor
           silently breaks position:sticky. Overflow containment instead
           happens on the aspect-ratio box itself (a descendant of the sticky
           element, which is safe). */}
      <div ref={trackRef} className="hidden md:block relative" style={{ height: trackHeight }}>
        <div className="sticky top-[110px]">
          <div ref={boxRef} className="relative w-full max-w-[1100px] mx-auto aspect-[1100/1010] overflow-hidden">

            {/* Section 1 — center group: heading, connector lines, floating squares.
                 Recedes last, so it sits on top of the two tag clusters (z-20) as
                 they converge and compact beneath it. */}
            <motion.div
              className="absolute inset-0 z-20"
              style={{ opacity: centerOpacity, scale: centerScale, y: centerY, willChange: "transform, opacity" }}
            >
              {/* SVG dashed connection lines — fade in as section enters view */}
              <svg
                viewBox="0 0 1100 1010"
                className="absolute inset-0 w-full h-full"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <g
                  stroke="#C7BFB0"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="1.5 7"
                >
                  {/* Left sources → center */}
                  <motion.path
                    d="M175,100 C 330,190 430,300 548,392"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.55 }}
                  />
                  <motion.path
                    d="M295,170 C 390,240 470,330 550,390"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.65 }}
                  />
                  <motion.path
                    d="M235,290 C 350,335 460,368 549,396"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.75 }}
                  />
                  {/* Right sources → center */}
                  <motion.path
                    d="M868,90 C 760,190 650,300 552,392"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.55 }}
                  />
                  <motion.path
                    d="M900,238 C 800,300 655,360 555,396"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.65 }}
                  />
                  <motion.path
                    d="M905,308 C 815,352 660,382 554,400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.75 }}
                  />
                  {/* Center → output row */}
                  <motion.path
                    d="M550,405 L550,632"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 1.05 }}
                  />
                </g>
              </svg>

              {/* Top heading — centered, word-by-word blur reveal */}
              <div className="absolute top-[3.4%] left-1/2 -translate-x-1/2 w-[54%] text-center pointer-events-none">
                <RevealHeading
                  title="Ingest from 50+ sources into one normalized model"
                  description="Claims, clinical, pharmacy, and SDOH data—captured from any source, transformed into a single longitudinal record."
                />
              </div>

              {/* Floating decorative squares — converging center, each with unique float timing */}
              <FloatingSquare
                className="absolute left-[48%] top-[36.8%] w-9 h-9 bg-[#FCFAF6] border border-[#EAE3D5] rounded-[7px] shadow-[0_5px_12px_rgba(60,45,30,0.06)]"
                delay={0.80}
                floatY={6}
                floatDuration={3.2}
              />
              <FloatingSquare
                className="absolute left-[50.9%] top-[39.8%] w-[25px] h-[25px] bg-[#FCFAF6] border border-[#EAE3D5] rounded-[6px] shadow-[0_5px_12px_rgba(60,45,30,0.06)]"
                delay={0.90}
                floatY={9}
                floatDuration={4.1}
              />
              <FloatingSquare
                className="absolute left-[49.1%] top-[44%] w-[30px] h-[30px] bg-[#FCFAF6] border border-[#EAE3D5] rounded-[7px] shadow-[0_5px_12px_rgba(60,45,30,0.06)]"
                delay={1.00}
                floatY={5}
                floatDuration={3.7}
              />
              <FloatingSquare
                className="absolute left-[48%] top-[53.5%] w-[30px] h-[30px] bg-[#FCFAF6] border border-[#EAE3D5] rounded-[7px] shadow-[0_5px_12px_rgba(60,45,30,0.06)]"
                delay={1.10}
                floatY={7}
                floatDuration={4.4}
              />
              <FloatingSquare
                className="absolute left-[48.3%] top-[60.8%] w-9 h-9 bg-[#FCFAF6] border border-[#EAE3D5] rounded-[7px] shadow-[0_5px_12px_rgba(60,45,30,0.06)]"
                delay={1.20}
                floatY={6}
                floatDuration={3.6}
              />
            </motion.div>

            {/* Section 1 — left source tags: fly in from left on entry, then stack-recede
                 (converge right, move up, scale down, dim) first on exit */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{ opacity: leftOpacity, scale: leftScale, x: leftX, y: leftY, willChange: "transform, opacity" }}
            >
              <div className="absolute left-[10%] top-[6.3%]">
                <SourceTag label="CLAIMS DATA" delay={0.3} fromX={-44} />
              </div>
              <div className="absolute left-[20.7%] top-[13.9%]">
                <SourceTag label="FLAT FILES" delay={0.42} fromX={-44} />
              </div>
              <div className="absolute left-[11.6%] top-[26%]">
                <SourceTag label="SDOH SOURCES" delay={0.54} fromX={-44} />
              </div>
            </motion.div>

            {/* Section 1 — right source tags: fly in from right on entry, then stack-recede
                 (converge left, move up, scale down, dim) shortly after the left cluster */}
            <motion.div
              className="absolute inset-0 z-10"
              style={{ opacity: rightOpacity, scale: rightScale, x: rightX, y: rightY, willChange: "transform, opacity" }}
            >
              <div className="absolute left-[73.3%] top-[4.2%]">
                <SourceTag label="PHARMACY DATA" delay={0.3} fromX={44} />
              </div>
              <div className="absolute left-[76.5%] top-[21%]">
                <SourceTag label="LAB RESULTS" delay={0.42} fromX={44} />
              </div>
              <div className="absolute left-[78%] top-[29.7%]">
                <SourceTag label="EHR / HIE" delay={0.54} fromX={44} />
              </div>
            </motion.div>

            {/* Section 2 — heading only: reveals in the SAME screen zone Section 1
                 occupied, overlapping the tail end of the stack's dissolve (z-30, on top)
                 so the handoff reads as continuous rather than a hard cut. Vertically
                 centered (instead of top-anchored like Section 1) so it sits in the
                 middle of the box with no leftover blank space beneath it. */}
            <motion.div
              className="absolute inset-0 z-30"
              style={{ opacity: enterOpacity, y: enterY, willChange: "transform, opacity" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54%] text-center pointer-events-none">
                <RevealHeading
                  title="Deliver clean data to every downstream initiative"
                  description="Analytics-ready and AI-ready output to every system in your stack—powering every payer initiative"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden px-7 text-center">
        <RevealHeading
          title="Ingest from 50+ sources into one normalized model"
          description="Claims, clinical, pharmacy, and SDOH data—captured from any source, transformed into a single longitudinal record."
        />
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {(["CLAIMS DATA", "FLAT FILES", "SDOH SOURCES", "PHARMACY DATA", "LAB RESULTS", "EHR / HIE"] as const).map(
            (tag, i) => (
              <SourceTag key={tag} label={tag} delay={i * 0.08} fromX={0} />
            )
          )}
        </div>
        <RevealHeading
          title="Deliver clean data to every downstream initiative"
          description="Analytics-ready and AI-ready output to every system in your stack—powering every payer initiative"
        />
      </div>

      {/* ── TAG CLOUD (all screens) — marquee rows ── */}
      <div className="mt-6 overflow-hidden -mt-[24%]">
        {TAG_ROWS.map((row, rowIdx) => {
          const animation = rowIdx % 2 === 0 ? "animate-marquee" : "animate-marqueeReverse";
          return (
            <div key={rowIdx} className="overflow-hidden mb-3">
              <div className={`flex w-max gap-3 ${animation} hover:[animation-play-state:paused]`}>
                {[...row, ...row].map((tag, idx) => (
                  <UseCaseTag key={`${tag}-${idx}`} label={tag} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}