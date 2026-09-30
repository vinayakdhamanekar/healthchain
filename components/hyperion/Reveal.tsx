"use client";

import { createElement, useEffect, useState } from "react";
import type { HTMLAttributes, JSX, ReactNode } from "react";
import { EASE } from "./styles";

type RevealTag = "div" | "p" | "h1" | "li" | "ul" | "figure";

/** Stagger delays used by the Hyperion HTML (`style="--d:…"`). */
export type RevealDelay = 0 | 60 | 80 | 120 | 160 | 180 | 200 | 240 | 320;

// Literal class names so Tailwind's JIT can see every one of them.
const DELAY_CLASS: Record<RevealDelay, string> = {
  0: "",
  60: "delay-[60ms]",
  80: "delay-[80ms]",
  120: "delay-[120ms]",
  160: "delay-[160ms]",
  180: "delay-[180ms]",
  200: "delay-[200ms]",
  240: "delay-[240ms]",
  320: "delay-[320ms]",
};

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag;
  delay?: RevealDelay;
  className?: string;
  children: ReactNode;
}

/**
 * Scroll reveal from the Hyperion HTML (`.reveal` / `.is-in`): fades and lifts
 * 16px into place once 8% of the element is visible, then stops observing.
 * Stays visible and static when the visitor prefers reduced motion.
 */
export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }: RevealProps): JSX.Element {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  // Reduced motion needs no JS: the motion-reduce: classes below keep the
  // element visible and static regardless of `shown`.
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el]);

  const motion = `transition-[opacity,transform] duration-700 ${EASE} ${DELAY_CLASS[delay]} motion-reduce:transition-none ${
    shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
  }`;

  return createElement(as, { ...rest, ref: setEl, className: `${className} ${motion}` }, children);
}
