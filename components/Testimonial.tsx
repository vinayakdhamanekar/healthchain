"use client";

import { useRef, type JSX } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialData;
}): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <div
      ref={cardRef}
      className="sticky bg-[#F7F3EF] top-20 md:top-24 min-h-screen flex items-center justify-center py-10"
    >
      <motion.section
        style={{ scale, opacity, y }}
        className="relative overflow-hidden w-full py-[60px] px-7 md:px-10 bg-[linear-gradient(120deg,#2f8076_0%,#3f8a7c_12%,#6f7a8e_26%,#9a6a55_42%,#b0703f_54%,#9a6450_66%,#566f6e_80%,#3c6f6a_100%)]"
      >
        {/* Frosted glass card — centered */}
        <div className="max-w-[560px] mx-auto bg-[rgba(30,32,30,0.26)] backdrop-blur-lg border border-white/[.28] rounded-2xl pt-[28px] px-[30px] pb-[30px] text-[#F4F1EA]">
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
      </motion.section>
    </div>
  );
}

export default function Testimonial(): JSX.Element {
  return (
    <div className="relative">
      {TESTIMONIALS.map((testimonial) => (
        <TestimonialCard key={testimonial.name} testimonial={testimonial} />
      ))}
    </div>
  );
}
