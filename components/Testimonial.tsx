"use client";

import { useLayoutEffect, useRef, type JSX } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialData {
  name: string;
  title: string;
  quote: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Sarah L.",
    title: "VP of Data & Analytics at Regional Blue Plan",
    quote:
      "Health Chain took integrations that used to take 12–18 months and delivered them in days. We finally have a single source of truth for our member data.",
  },
  {
    name: "Michael T.",
    title: "Director of IT at Coastal Health Network",
    quote:
      "What used to take a team of engineers months to map now happens automatically. Health Chain gave us back the time to focus on our members instead of our pipelines.",
    // TODO: placeholder testimonial — replace with real customer quote
  },
  {
    name: "Priya R.",
    title: "Chief Medical Information Officer at Midwest Care Alliance",
    quote:
      "We went from fragmented, siloed records to a longitudinal view of every member in weeks, not years. It's changed how our clinical teams make decisions.",
    // TODO: placeholder testimonial — replace with real customer quote
  },
];

// Single source for the gradient so the desktop (fixed) and mobile backdrops
// stay identical. Kept as a full literal string so Tailwind's JIT detects it.
const GRADIENT =
  "bg-[linear-gradient(120deg,#2f8076_0%,#3f8a7c_12%,#6f7a8e_26%,#9a6a55_42%,#b0703f_54%,#9a6450_66%,#566f6e_80%,#3c6f6a_100%)]";

function FrostedCard({ testimonial }: { testimonial: TestimonialData }): JSX.Element {
  return (
    <div className="bg-[rgba(30,32,30,0.26)] backdrop-blur-lg border border-white/[.28] rounded-2xl pt-[28px] px-[30px] pb-[30px] text-[#F4F1EA]">
      {/* Header: attribution left, logo right */}
      <div className="flex items-center justify-between mb-[22px]">
        {/* Avatar + name/title */}
        <div className="flex items-center gap-[13px]">
          <div className="w-[46px] h-[46px] shrink-0 rounded-full bg-[linear-gradient(135deg,#9aa0a8,#6f7680)] flex items-end justify-center overflow-hidden border border-white/40">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.85)"
              aria-hidden="true"
            >
              <circle cx="12" cy="9" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-medium text-[#F7F4EE]">
              {testimonial.name}
            </div>
            <div className="text-[13px] text-[rgba(244,241,234,0.78)]">
              {testimonial.title}
            </div>
          </div>
        </div>

        {/* Health Chain star mark */}
        <svg
          width="30"
          height="30"
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M50,2 L56.9,33.4 L83.9,16.1 L66.6,43.1 L98,50 L66.6,56.9 L83.9,83.9 L56.9,66.6 L50,98 L43.1,66.6 L16.1,83.9 L33.4,56.9 L2,50 L33.4,43.1 L16.1,16.1 L43.1,33.4 Z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      </div>

      {/* Quote */}
      <p className="text-[19px] md:text-[23px] leading-[1.4] font-medium text-[#F8F5EF] m-0">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonial(): JSX.Element {
  const pinRef = useRef<HTMLDivElement>(null); // element ScrollTrigger pins (holds the fixed gradient)
  const windowRef = useRef<HTMLDivElement>(null); // the clipped "viewport" — sized to 1 card + a peek of the next
  const columnRef = useRef<HTMLDivElement>(null); // the card list that actually moves
  const firstCardRef = useRef<HTMLDivElement>(null); // used to measure a representative card height

  // Fraction of the next card left visible below the current one.
  const PEEK = 0.5;

  useLayoutEffect(() => {
    // Scoped to md+ (mobile uses the static list below). GSAP pins with
    // `position: fixed`, which — unlike `position: sticky` — is NOT broken by
    // the `overflow-hidden` wrapper around the whole page in app/page.tsx. That
    // is why the gradient stays put while only the cards scroll.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cardEl = firstCardRef.current;
        const windowEl = windowRef.current;
        const columnEl = columnRef.current;
        if (!cardEl || !windowEl || !columnEl) return;

        // The visible window is sized to exactly one card plus a partial "peek"
        // of the next one — never the whole list — so only one testimonial (and
        // half of the next) is on screen at a time. Measured live (card height +
        // real flex gap) rather than hard-coded, so it stays correct at any
        // screen size or font-driven card height.
        const syncWindowHeight = () => {
          const cardHeight = cardEl.offsetHeight;
          const gap = parseFloat(getComputedStyle(columnEl).rowGap || "0") || 0;
          windowEl.style.height = `${cardHeight + gap + PEEK * cardHeight}px`;
        };
        syncWindowHeight();

        // How far the list must travel = how much taller it is than the
        // (now much shorter) visible window — still fully scroll-driven, 1:1
        // with page scroll, so each card slides fully into place before the
        // next one starts peeking in.
        const distance = () => Math.max(0, columnEl.scrollHeight - windowEl.offsetHeight);

        gsap.to(columnEl, {
          y: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => "+=" + Math.max(1, distance()),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Re-measure on resize/font-load — recomputing window height mid-scroll
        // would fight the scrub, so this only runs for genuine size changes.
        let frame: number;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            syncWindowHeight();
            ScrollTrigger.refresh();
          });
        });
        observer.observe(cardEl);

        return () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
        };
      }, pinRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    // No vertical padding and no cream fill anywhere, so the gradient meets the
    // neighbouring sections edge-to-edge — no white space above or below.
    <section className="relative bg-[#f7f3EF]">
      {/* ── DESKTOP (md+): FIXED gradient, only the card list scrolls ──
           overflow-hidden lives on this pinned element itself (safe — it clips
           the moving list to the viewport), never on an ancestor. */}
      <div
        ref={pinRef}
        className={`hidden md:flex relative h-screen w-full items-center justify-center overflow-hidden px-7 ${GRADIENT}`}
      >
        {/* The clipped "peek window" — height is set in px by the effect above
             (1 card + gap + half of the next card). Bottom edge fades softly so
             the peeking card dissolves into the backdrop instead of hard-cutting. */}
        <div
          ref={windowRef}
          className="relative w-full max-w-[600px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
          }}
        >
          <div ref={columnRef} className="flex flex-col gap-8 lg:gap-10 will-change-transform">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={testimonial.name} ref={index === 0 ? firstCardRef : undefined}>
                <FrostedCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: same gradient backdrop, cards stacked as a simple list ── */}
      <div className={`md:hidden relative flex flex-col gap-8 py-14 px-6 ${GRADIENT}`}>
        {TESTIMONIALS.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-[600px] mx-auto"
          >
            <FrostedCard testimonial={testimonial} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
