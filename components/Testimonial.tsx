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
    <div className="bg-[rgba(30,32,30,0.30)] backdrop-blur-xl border border-white/[.32] rounded-[22px] pt-9 px-9 md:pt-10 md:px-10 pb-10 text-[#F4F1EA]">
      {/* Header: attribution left, logo right */}
      <div className="flex items-center justify-between mb-7">
        {/* Avatar + name/title */}
        <div className="flex items-center gap-[14px]">
          <div className="w-[52px] h-[52px] shrink-0 rounded-full bg-[linear-gradient(135deg,#9aa0a8,#6f7680)] flex items-end justify-center overflow-hidden border border-white/40">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.85)"
              aria-hidden="true"
            >
              <circle cx="12" cy="9" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
          <div>
            <div className="text-[16px] font-medium text-[#F7F4EE]">
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
      <p className="text-[21px] md:text-[27px] leading-[1.42] font-medium tracking-[-0.01em] text-[#F8F5EF] m-0">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonial(): JSX.Element {
  const pinRef = useRef<HTMLDivElement>(null); // element ScrollTrigger pins (holds the fixed gradient)
  const windowRef = useRef<HTMLDivElement>(null); // the clipped "viewport" — a plain, fixed height (see JSX)
  const columnRef = useRef<HTMLDivElement>(null); // the card list that actually moves
  const firstCardRef = useRef<HTMLDivElement>(null); // first card — gets its own one-time entrance fade

  useLayoutEffect(() => {
    // Scoped to md+ (mobile uses the static list below). GSAP pins with
    // `position: fixed`, which — unlike `position: sticky` — is NOT broken by
    // the `overflow-hidden` wrapper around the whole page in app/page.tsx. That
    // is why the gradient stays put while only the cards scroll.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const windowEl = windowRef.current;
        const columnEl = columnRef.current;
        if (!windowEl || !columnEl) return;

        // First card fades/rises in as the section approaches the viewport —
        // plays ONCE, before the pin ever engages. The pin's own trigger
        // starts at "top top" (section's top hits the viewport's top); this
        // trigger fires earlier, at "top 85%" (section's top is 85% down the
        // viewport, i.e. just starting to enter from below), so the fade-in
        // is fully finished by the time scrolling reaches the pin/crossfade.
        if (firstCardRef.current) {
          gsap.set(firstCardRef.current, { opacity: 0, y: 30 });
          gsap.to(firstCardRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top 85%",
              once: true,
            },
          });
        }

        // How far the list must travel = how much taller it is than the
        // window's fixed height (set directly in CSS below — no JS sizing
        // math to get wrong). Still fully scroll-driven, 1:1 with page
        // scroll, so each card slides fully into place before the next one
        // starts peeking in.
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

        // Re-measure if card content reflows (font load, text change) —
        // scrollHeight can change even though the window's own height never
        // does now. Debounced via rAF so a burst of resize events doesn't
        // fight the scrub mid-scroll.
        let frame: number;
        const resync = () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        };
        const observer = new ResizeObserver(resync);
        observer.observe(columnEl);
        window.addEventListener("resize", resync);

        return () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          window.removeEventListener("resize", resync);
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
        {/* The clipped "peek window" — a plain, fixed height (80% of the
             viewport) so the card area reliably fills most of the pinned
             screen, with no JS math involved in sizing it. Bottom edge fades
             softly so the peeking card dissolves into the backdrop instead
             of hard-cutting. Tune the 80vh value directly if you want the
             card area larger or smaller relative to the gradient margin. */}
        <div
          ref={windowRef}
          className="relative w-full max-w-[600px] h-[70vh] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 88%, transparent 100%)",
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