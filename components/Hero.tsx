"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { HYPERION_ANNOUNCEMENT } from "@/data/hyperion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────
   Hyperion announcement — a modal alert that slides in from the bottom-right
   over a dimmed backdrop. Once dismissed (close, Escape, backdrop click) or
   followed (Download), it stays hidden for the rest of that day and shows
   again on the visitor's next calendar day (their local time).
──────────────────────────────────────────────────────────────────────── */

const HYPERION_ANNOUNCEMENT_KEY = "hc-hyperion-announcement-dismissed";

/** Visitor's local calendar date, e.g. "2026-09-30". Stored on dismissal. */
function todayKey(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// localStorage read through useSyncExternalStore: the server snapshot says
// "dismissed", so SSR and hydration render nothing and there's no mismatch;
// the real value is read on the client right after hydration.
function subscribeToStorage(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// Dismissed only if it was dismissed today. Anything else (no value, an
// earlier date, or the old "1" flag) means show it again.
function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(HYPERION_ANNOUNCEMENT_KEY) === todayKey();
  } catch {
    return true; // storage blocked: don't nag on every visit
  }
}

function HyperionAnnouncement(): JSX.Element {
  const storedDismissed = useSyncExternalStore(subscribeToStorage, readDismissed, () => true);
  const [dismissed, setDismissed] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = !storedDismissed && !dismissed;

  const dismiss = useCallback((): void => {
    try {
      window.localStorage.setItem(HYPERION_ANNOUNCEMENT_KEY, todayKey());
    } catch {
      // storage unavailable: still hide it for this visit
    }
    setDismissed(true);
  }, []);

  // While open: lock page scroll, move focus into the dialog, keep Tab inside
  // it, close on Escape, and hand focus back when it closes.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    root.classList.add("overflow-hidden");
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 650);

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      root.classList.remove("overflow-hidden");
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        // data-lenis-prevent: stops the site's smooth-scroll from moving the
        // page behind the modal.
        <div data-lenis-prevent className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 bg-[#24251F]/45 backdrop-blur-[2px]"
          />

          {/* Dialog: bottom-right on tablet/desktop, bottom sheet on mobile */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hyperion-announcement-title"
            aria-describedby="hyperion-announcement-summary"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, y: 32 }}
            animate={{ opacity: 1, x: 0, y: 0, transition: { duration: 0.5, delay: 0.4, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 16, transition: { duration: 0.2, ease: "easeOut" } }}
            className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 sm:w-[440px] max-h-[calc(100vh-24px)] overflow-y-auto rounded-[20px] bg-[#FBF9F4] border border-[#E5DECF] shadow-[0_30px_80px_rgba(36,37,31,0.35)]"
          >
            {/* Header band — Hyperion's dark brand panel */}
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#2E2F28_0%,#24251F_55%,#2A2A24_100%)] px-6 pt-6 pb-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(420px_180px_at_100%_0%,rgba(168,84,60,.35),transparent_70%),radial-gradient(320px_160px_at_0%_100%,rgba(110,122,58,.25),transparent_70%)]"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FBF9F4] shrink-0">
                    <Image src="/logo.png" alt="" width={26} height={26} className="w-[26px] h-[26px] object-contain" />
                  </span>
                  <p className="font-mono font-semibold text-[11.5px] leading-[1.45] tracking-[1.2px] uppercase text-[rgba(244,241,234,.78)]">
                    {HYPERION_ANNOUNCEMENT.section}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={dismiss}
                  aria-label="Close Hyperion announcement"
                  className="-mt-1 -mr-2 w-9 h-9 shrink-0 rounded-full inline-flex items-center justify-center text-[rgba(244,241,234,.78)] hover:bg-white/10 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B9A6]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              <span className="relative mt-4 inline-flex items-center font-mono text-[12px] font-medium tracking-[.3px] leading-[1.4] px-[11px] py-[5px] rounded-[6px] bg-[#D2E3AC] text-[#51602F]">
                {HYPERION_ANNOUNCEMENT.label}
              </span>
            </div>

            {/* Body */}
            <div className="px-6 pt-5 pb-6">
              <h2
                id="hyperion-announcement-title"
                className="text-[22px] leading-[1.22] font-semibold tracking-[-0.015em] text-[#34332C]"
              >
                {HYPERION_ANNOUNCEMENT.title}
              </h2>
              <p id="hyperion-announcement-summary" className="mt-3 text-[15px] leading-[1.6] text-[#57534C]">
                {HYPERION_ANNOUNCEMENT.summary}
              </p>
              <div className="mt-6">
                <a
                  href={HYPERION_ANNOUNCEMENT.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[15px] font-medium py-[12px] pl-[22px] pr-[12px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8543C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F4]"
                >
                  {HYPERION_ANNOUNCEMENT.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="w-[40px] h-[26px] rounded-full border border-white/40 inline-flex items-center justify-center text-[13px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Hero(): JSX.Element {
  return (
    <section className="relative px-7 md:px-14 pt-[100px] md:pt-[110px] pb-[40px] bg-[#f7f3EF]">
      <div className="grid grid-cols-1 md:grid-cols-[1.04fr_0.96fr] gap-12 items-center h-full">

        {/* Left: headline + subtext + CTAs */}
        <div>
          <div className="leading-[1.04]">
            <span className="inline-block whitespace-nowrap bg-[#F1D9D1] text-[#AE5740] px-[15px] pt-[1px] pb-[5px] rounded-[9px] text-[36px] md:text-[51px] font-semibold tracking-[-0.025em]">
              Your data,
            </span>
            <div className="text-[36px] md:text-[51px] font-semibold tracking-[-0.025em] text-[#34332C] mt-2">
              made ready for action.
            </div>
          </div>

          <p className="max-w-[580px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[30px]">
            Health Chain captures, curates, and delivers clean longitudinal
            member data, so payers can act on it, not wrestle with it.
          </p>

          <div className="flex flex-wrap gap-[14px] mt-[42px]">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
            >
              Request a Demo

              <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
                →
              </span>
            </Link>
            <a
              href="/platform"
              className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white transition-colors duration-300"
            >
              Explore Platform
            </a>
          </div>
        </div>

        {/* Right: portrait with pattern + glow + photo stacked */}
        <div className="relative hidden md:block self-start w-full max-w-[440px] ml-auto">

          {/*
           * LAYER 1 — Pattern image (furthest back).
           * -top-[110px] cancels the section's md:pt-[110px] so this layer
           * starts flush with the top of the page, behind the fixed Navbar,
           * matching the design where the striped pattern peeks out above
           * and around the floating nav pill.
           */}
          <div
            className="absolute -top-[110px] -right-[50px] -bottom-[40px] left-[24px] overflow-hidden"
            style={{
              backgroundImage: "url('/Patterns/pattern1.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          />

          {/* LAYER 2 — Portrait photo */}
          <div className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Home_banner.png"
              alt="Health Chain - healthcare team reviewing member data"
              className="w-full h-full object-cover object-top"
            />
          </div>

        </div>
      </div>

      <HyperionAnnouncement />
    </section>
  );
}
