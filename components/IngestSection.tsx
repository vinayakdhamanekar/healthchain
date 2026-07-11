"use client";
import type { JSX } from "react";
import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      className="font-mono text-[12px] tracking-[0.5px] text-[#4A463F] bg-[#FBF9F4] border border-[#E4DED0] rounded-[8px] py-[9px] px-[14px] shadow-[0_3px_9px_rgba(60,45,30,0.05)] whitespace-nowrap transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#C7BFB0] hover:shadow-[0_10px_22px_rgba(60,45,30,0.12)]"
    >
      {label}
    </motion.div>
  );
}

function UseCaseTag({ label }: { label: string }): JSX.Element {
  return (
    <div className="font-mono text-[13px] text-[#4A463F] bg-[#FBF9F4] border border-[#E4DED0] rounded-[8px] py-[9px] px-[16px] whitespace-nowrap transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-[#C7BFB0] hover:shadow-[0_8px_18px_rgba(60,45,30,0.10)]">
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
  const sectionRef = useRef<HTMLElement>(null); // gsap.context scope, and matchMedia boundary
  const pinRef = useRef<HTMLDivElement>(null); // the element ScrollTrigger pins directly — no manual height math needed
  const leftGroupRef = useRef<HTMLDivElement>(null);
  const rightGroupRef = useRef<HTMLDivElement>(null);
  const centerGroupRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null); // dotted connector lines — faded separately, see note below
  const section2Ref = useRef<HTMLDivElement>(null);

  // EXTRA_SCROLL is the scroll distance (px) the whole pin+stack+reveal plays
  // out over. Unlike native `position: sticky`, GSAP's `pin: true` inserts its
  // own spacer to hold this exact distance — so there's no need to measure
  // content height or derive a release offset; ScrollTrigger handles it.
  const EXTRA_SCROLL = 900;

  useLayoutEffect(() => {
    // gsap.matchMedia scopes the whole pin/timeline to md+ viewports (the
    // desktop visualization below is `hidden md:block`), and automatically
    // reverts/rebuilds the timeline on breakpoint changes for responsiveness.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Lenis smooths the raw scroll input into inertia-based motion before
      // ScrollTrigger ever sees it — this is what removes the last bit of
      // "trackpad notch" jitter from the scrub and gives the stack that
      // continuous, premium glide rather than stepping frame-to-frame with
      // the browser's native scroll. Scoped to md+ only: on touch devices,
      // native momentum scrolling already feels right, and layering Lenis on
      // top of touch input tends to fight it rather than help.
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth expo-out
      });
      const syncScrollTrigger = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(syncScrollTrigger);
      gsap.ticker.lagSmoothing(0); // Lenis already smooths; GSAP's own lag smoothing would double up and stutter

      const ctx = gsap.context(() => {
        // Explicit baseline: guarantees GSAP is animating opacity from a known
        // value of 1, rather than reading whatever the browser's current
        // computed style happens to be at mount time.
        gsap.set(linesRef.current, { opacity: 1 });

        // Section 2 starts hidden — set immediately so there's no flash of
        // visible content before the timeline reaches that point.
        gsap.set(section2Ref.current, { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top 110px",
            end: `+=${EXTRA_SCROLL}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true, // ← uncomment temporarily to see the start/end
            // trigger points drawn on the page. If you don't see them at all,
            // or the pin never engages, ScrollTrigger isn't attaching to this
            // element — check the console for a "gsap/ScrollTrigger" import
            // error first.
          },
        });

        // Dotted connector lines fade out first, before the tag clusters have
        // visibly moved — they're static SVG paths anchored to the tags'
        // *original* positions, so once the left/right groups start sliding
        // and scaling away (from 0), the lines would otherwise keep pointing
        // at empty space instead of following the tags. Fading them out fast
        // and early avoids that mismatch entirely.
        tl.to(linesRef.current, { opacity: 0, ease: "power1.out", duration: 0.16 }, 0);

        // Left tags cluster — recedes first, converges right/up toward center.
        // Rotation + progressive blur give the collapse a physical, fanned-deck
        // feel instead of three flat layers sliding to the same point.
        tl.to(
          leftGroupRef.current,
          { x: 90, y: -60, scale: 0.55, rotate: -3, filter: "blur(3px)", ease: "power3.out", duration: 0.3 },
          0
        );

        // Right tags cluster — starts receding slightly after left, overlapping it.
        tl.to(
          rightGroupRef.current,
          { x: -90, y: -60, scale: 0.55, rotate: 3, filter: "blur(3px)", ease: "power3.out", duration: 0.3 },
          0.1
        );

        // Both clusters settle into a dimmed, compacted layer (not fully gone)
        // until the stack is complete, then dissolve fully.
        tl.to([leftGroupRef.current, rightGroupRef.current], { opacity: 0.35, duration: 0.001 }, 0.3);
        tl.to([leftGroupRef.current, rightGroupRef.current], { opacity: 0, duration: 0.13, ease: "power1.in" }, 0.55);

        // Center heading + diagram — recedes last, sits on top of the compacted
        // stack, and only dissolves once the two clusters are fully gone.
        tl.to(centerGroupRef.current, { y: -40, scale: 0.82, ease: "power3.out", duration: 0.33 }, 0.22);
        tl.to(centerGroupRef.current, { opacity: 0, duration: 0.13, ease: "power1.in" }, 0.55);

        // Section 2 (downstream delivery) fades/rises in with a short overlap
        // against the stack's dissolve, so the handoff reads as continuous.
        tl.to(section2Ref.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.34 }, 0.58);
      }, sectionRef);

      return () => {
        ctx.revert();
        gsap.ticker.remove(syncScrollTrigger);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-12 pb-8 bg-[#f7f3EF]">

      {/* ── DESKTOP VISUALIZATION (md+) — GSAP-pinned scroll track ──
           NOTE: no overflow-hidden on this <section> or any ancestor of the
           `pinRef` element below — ScrollTrigger's `pin: true` still relies on
           the pinned element being able to sit fixed relative to the viewport,
           and clipping an ancestor causes the same class of bugs as it would
           with native `position: sticky`. Overflow containment instead happens
           on the aspect-ratio box itself (a descendant of the pinned element,
           which is safe). */}
      <div className="hidden md:block relative">
        <div ref={pinRef} className="relative w-full max-w-[1100px] mx-auto aspect-[1100/1010] overflow-hidden">

            {/* Section 1 — center group: heading, connector lines, floating squares.
                 Recedes last, so it sits on top of the two tag clusters (z-20) as
                 they converge and compact beneath it. */}
            <div
              ref={centerGroupRef}
              className="absolute inset-0 z-20 will-change-transform"
            >
              {/* SVG dashed connection lines — fade in as section enters view,
                   fade out on scroll via linesRef (see timeline comment above) */}
              <svg
                ref={linesRef}
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
            </div>

            {/* Section 1 — left source tags: fly in from left on entry, then stack-recede
                 (converge right, move up, scale down, dim) first on exit */}
            <div ref={leftGroupRef} className="absolute inset-0 z-10 will-change-transform">
              <div className="absolute left-[10%] top-[6.3%]">
                <SourceTag label="CLAIMS DATA" delay={0.3} fromX={-44} />
              </div>
              <div className="absolute left-[20.7%] top-[13.9%]">
                <SourceTag label="FLAT FILES" delay={0.42} fromX={-44} />
              </div>
              <div className="absolute left-[11.6%] top-[26%]">
                <SourceTag label="SDOH SOURCES" delay={0.54} fromX={-44} />
              </div>
            </div>

            {/* Section 1 — right source tags: fly in from right on entry, then stack-recede
                 (converge left, move up, scale down, dim) shortly after the left cluster */}
            <div ref={rightGroupRef} className="absolute inset-0 z-10 will-change-transform">
              <div className="absolute left-[73.3%] top-[4.2%]">
                <SourceTag label="PHARMACY DATA" delay={0.3} fromX={44} />
              </div>
              <div className="absolute left-[76.5%] top-[21%]">
                <SourceTag label="LAB RESULTS" delay={0.42} fromX={44} />
              </div>
              <div className="absolute left-[78%] top-[29.7%]">
                <SourceTag label="EHR / HIE" delay={0.54} fromX={44} />
              </div>
            </div>

            {/* Section 2 — heading only: reveals in the SAME screen zone Section 1
                 occupied, overlapping the tail end of the stack's dissolve (z-30, on top)
                 so the handoff reads as continuous rather than a hard cut. Top-anchored
                 at the exact same `top-[3.4%]` slot as Section 1's heading (not vertically
                 centered) — the box stays 1010px tall throughout (Section 1's diagram
                 needs that height), so centering here just pushed the heading down into
                 the middle and left a large blank gap below it once the pin released.
                 Matching Section 1's anchor keeps the leftover box height in the same
                 place both times, which is what the marquee's overlap margin below is
                 actually calibrated against. */}
            <div ref={section2Ref} className="absolute inset-0 z-30 will-change-transform">
              <div className="absolute top-[3.4%] left-1/2 -translate-x-1/2 w-[54%] text-center pointer-events-none">
                <RevealHeading
                  title="Deliver clean data to every downstream initiative"
                  description="Analytics-ready and AI-ready output to every system in your stack—powering every payer initiative"
                />
              </div>
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
      <div className="overflow-hidden -mt-[55%]">
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