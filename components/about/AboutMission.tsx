"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { JSX } from "react";
import Image from "next/image";

/* ─── Text content ───────────────────────────────────────────── */

interface Para {
  text: string;
  /** Tailwind class applied to highlighted words */
  activeColor: string;
  /** Tailwind class applied to highlighted words (font weight) */
  activeWeight: string;
}

const PARAGRAPHS: Para[] = [
  {
    text: "After witnessing the reality that the organizations responsible for America's health were making critical decisions on top of fragmented and untrustworthy data, Sudheen Kumar founded Health Chain in 2019.",
    activeColor: "text-[#34332C]",
    activeWeight: "font-medium",
  },
  {
    text: "What began as an interoperability platform designed to help payers meet CMS mandates has since evolved into a comprehensive health data management platform that unifies every type of health data into one trusted foundation.",
    activeColor: "text-[#57534C]",
    activeWeight: "font-normal",
  },
  {
    text: "Today, Health Chain serves as the data infrastructure that health systems run on. We replace fragmented systems and manual processes with a governed, real-time data foundation that powers everything from regulatory compliance to actuarial forecasting.",
    activeColor: "text-[#57534C]",
    activeWeight: "font-normal",
  },
  {
    text: "We're just getting started with our mission:",
    activeColor: "text-[#57534C]",
    activeWeight: "font-normal",
  },
  {
    text: "To build the data infrastructure that health systems run on-unifying clinical, financial, and regulatory data so the organizations responsible for care can operate with the speed and clarity that the people they serve deserve.",
    activeColor: "text-[#57534C]",
    activeWeight: "font-normal",
  },
];

/* Pre-compute flat word list with global indices */
interface WordEntry {
  word: string;
  paraIndex: number;
  localIndex: number;
}

const WORD_LIST: WordEntry[] = PARAGRAPHS.flatMap((para, paraIndex) =>
  para.text.split(" ").map((word, localIndex) => ({ word, paraIndex, localIndex }))
);

const TOTAL_WORDS = WORD_LIST.length;

/* ─── Word span ──────────────────────────────────────────────── */

function WordSpan({
  word,
  lit,
  activeColor,
  activeWeight,
}: {
  word: string;
  lit: boolean;
  activeColor: string;
  activeWeight: string;
}): JSX.Element {
  return (
    <span
      className={`transition-colors duration-300 ease-out ${
        lit
          ? `${activeColor} ${activeWeight}`
          : "text-[#C8C0B4]"
      }`}
    >
      {word}{" "}
    </span>
  );
}

/* ─── Paragraph renderer ─────────────────────────────────────── */

function AnimatedPara({
  para,
  paraIndex,
  wordOffset,
  litCount,
  className,
}: {
  para: Para;
  paraIndex: number;
  wordOffset: number;
  litCount: number;
  className?: string;
}): JSX.Element {
  const words = para.text.split(" ");
  return (
    <p className={`text-[15px] md:text-[16px] leading-[1.75] ${className ?? ""}`}>
      {words.map((word, i) => {
        const globalIdx = wordOffset + i;
        return (
          <WordSpan
            key={`${paraIndex}-${i}`}
            word={word}
            lit={globalIdx < litCount}
            activeColor={para.activeColor}
            activeWeight={para.activeWeight}
          />
        );
      })}
    </p>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export default function AboutMission(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [litCount, setLitCount] = useState(0);

  const onScroll = useCallback(() => {
  if (rafRef.current !== null) return;

  rafRef.current = requestAnimationFrame(() => {
    rafRef.current = null;

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewport = window.innerHeight;

    const start = viewport * 0.8;
    const end = -rect.height * 0.2;

    const progress =
      (start - rect.top) / (start - end);

    const clamped = Math.max(0, Math.min(1, progress));

    setLitCount(Math.floor(clamped * TOTAL_WORDS));
  });
}, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* Word offsets per paragraph */
  const offsets: number[] = [];
  let running = 0;
  PARAGRAPHS.forEach((p) => {
    offsets.push(running);
    running += p.text.split(" ").length;
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F7F3EF] px-7 md:px-14 py-[40px] md:py-[80px] overflow-hidden"
    >
      {/* Decorative warm circles - top right */}
      {/* Decorative image */}
      <div className="absolute top-0 right-0 pointer-events-none select-none">
        <Image
          src="/Union.png"
          alt=""
          width={520}
          height={520}
          className="opacity-80"
          priority
        />
      </div>

      {/* Label */}
      <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-[#A8543C] mb-7">
        Our Origins
      </p>

      {/* Headline - always dark, no animation */}
      <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[680px] mb-12">
        The path to trustworthy data foundations.
      </h2>

      {/* Two-column animated body copy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">

        {/* Left column - paragraphs 0, 1 */}
        <div className="space-y-6">
          <AnimatedPara
            para={PARAGRAPHS[0]}
            paraIndex={0}
            wordOffset={offsets[0]}
            litCount={litCount}
          />
          <AnimatedPara
            para={PARAGRAPHS[1]}
            paraIndex={1}
            wordOffset={offsets[1]}
            litCount={litCount}
          />
        </div>

        {/* Right column - paragraphs 2, 3, 4 */}
        <div className="space-y-6">
          <AnimatedPara
            para={PARAGRAPHS[2]}
            paraIndex={2}
            wordOffset={offsets[2]}
            litCount={litCount}
          />
          <AnimatedPara
            para={PARAGRAPHS[3]}
            paraIndex={3}
            wordOffset={offsets[3]}
            litCount={litCount}
          />
          <AnimatedPara
            para={PARAGRAPHS[4]}
            paraIndex={4}
            wordOffset={offsets[4]}
            litCount={litCount}
          />
        </div>

      </div>
    </section>
  );
}
