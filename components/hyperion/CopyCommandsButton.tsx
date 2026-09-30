"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { EASE } from "./styles";

type CopyState = "idle" | "copied" | "failed";

function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.className = "fixed opacity-0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

/** "Copy" button on the quickstart terminal, with a polite status for screen readers. */
export default function CopyCommandsButton({ text }: { text: string }): JSX.Element {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function done(ok: boolean): void {
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  function handleClick(): void {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => done(true),
        () => done(fallbackCopy(text))
      );
    } else {
      done(fallbackCopy(text));
    }
  }

  const label = state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C" : "Copy";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Copy quickstart commands"
        className={`ml-auto inline-flex items-center gap-[6px] font-mono text-[12px] bg-transparent border rounded-full px-3 py-[5px] cursor-pointer transition-[background-color,color,border-color] duration-200 ${EASE} hover:bg-[rgba(255,255,255,.08)] hover:text-[#F7F4EE] ${
          state === "copied"
            ? "border-[#9FB06E] text-[#C7D69A]"
            : "border-[rgba(255,255,255,.14)] text-[rgba(244,241,234,.78)]"
        }`}
      >
        <svg
          className="w-[13px] h-[13px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Commands copied to clipboard" : ""}
      </span>
    </>
  );
}
