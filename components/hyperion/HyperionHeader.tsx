"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { EASE, EXTERNAL, GITHUB_URL, btnArrow, btnPrimary } from "./styles";

interface NavLink {
  id: string;
  label: string;
}

// Desktop nav (the HTML's .site-nav__links); the mobile menu adds Scope.
const NAV_LINKS: NavLink[] = [
  { id: "why", label: "Why" },
  { id: "mapping", label: "How it maps" },
  { id: "powered-by", label: "Under the hood" },
  { id: "quickstart", label: "Quickstart" },
  { id: "docs", label: "Docs" },
];

const MOBILE_LINKS: NavLink[] = [
  { id: "why", label: "Why" },
  { id: "mapping", label: "How it maps" },
  { id: "powered-by", label: "Under the hood" },
  { id: "scope", label: "Scope" },
  { id: "quickstart", label: "Quickstart" },
  { id: "docs", label: "Docs" },
];

/** "Hyperion" wordmark + divider: shown above 1140px, hidden 901–1140px, shown 341–900px, hidden ≤340px. */
const BRAND_PRODUCT_VISIBILITY = "hidden min-[341px]:inline-block min-[901px]:hidden min-[1141px]:inline-block";

/**
 * Hyperion's own header from hyperion-healthchain-branded.html: floating pill,
 * border/shadow once scrolled, section scroll-spy, and a mobile menu below 900px.
 */
export default function HyperionHeader(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scrolled state
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close on Escape (returning focus) and when widening past 900px
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = (): void => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Active nav link: the section crossing the middle of the viewport
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id], #top");
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className={`absolute left-4 -top-[60px] z-[100] bg-[#34332C] text-[#FBF9F4] px-4 py-[10px] rounded-[8px] no-underline font-medium transition-[top] duration-200 ${EASE} focus:top-4`}
      >
        Skip to content
      </a>

      <header className="fixed top-0 inset-x-0 z-50 pt-3 px-3 pb-[6px] min-[721px]:pt-4 min-[721px]:px-7 pointer-events-none">
        <div className="max-w-[1216px] mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between gap-4 bg-[#FBF9F4] rounded-[44px] border py-2 pr-2 pl-4 min-[721px]:py-[10px] min-[721px]:pr-[10px] min-[721px]:pl-5 transition-[border-color,box-shadow] duration-300 ${EASE} ${
              scrolled
                ? "border-[#E5DECF] shadow-[0_20px_44px_rgba(60,45,30,.12)]"
                : "border-transparent shadow-[0_14px_34px_rgba(60,45,30,.07)]"
            }`}
          >
            <a
              href="#top"
              aria-label="Health Chain Hyperion, back to top"
              className="inline-flex items-center gap-[6px] no-underline min-w-0"
            >
              <Image src="/logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain flex-none" />
              <span className="text-[17px] min-[721px]:text-[20px] font-semibold tracking-[-0.01em] text-[#34332C] whitespace-nowrap">
                Health Chain
              </span>
              <span aria-hidden="true" className={`w-px h-[22px] bg-[#CFC7B8] flex-none ${BRAND_PRODUCT_VISIBILITY}`} />
              <span
                className={`font-mono text-[16px] font-semibold tracking-[1.5px] uppercase text-[#A8543C] whitespace-nowrap ${BRAND_PRODUCT_VISIBILITY}`}
              >
                Hyperion
              </span>
            </a>

            <nav aria-label="Primary" className="flex items-center gap-[30px]">
              <div className="hidden min-[901px]:flex items-center gap-5 min-[1141px]:gap-7">
                {NAV_LINKS.map((link) => {
                  const active = activeId === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      aria-current={active ? "true" : undefined}
                      className={`group relative text-[15px] no-underline py-[6px] transition-colors duration-200 ${EASE} ${
                        active ? "text-[#A8543C]" : "text-[#3A352E] hover:text-[#34332C]"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-px bg-[#A8543C] origin-left transition-transform duration-300 ${EASE} ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
              <a {...EXTERNAL} href={GITHUB_URL} className={`${btnPrimary("sm")} hidden min-[901px]:inline-flex`}>
                View on GitHub
                <span className={btnArrow("sm")} aria-hidden="true">
                  →
                </span>
              </a>
              <button
                ref={toggleRef}
                type="button"
                aria-controls="hyperion-mobile-menu"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
                className={`inline-flex min-[901px]:hidden w-[42px] h-[42px] rounded-full border-0 bg-transparent text-[#34332C] cursor-pointer items-center justify-center hover:bg-black/5 transition-colors duration-200 ${EASE}`}
              >
                <svg
                  className="w-[22px] h-[22px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d={menuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
                </svg>
              </button>
            </nav>
          </div>

          <div
            id="hyperion-mobile-menu"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
            }}
            className={`${menuOpen ? "block" : "hidden"} min-[901px]:hidden mt-2 bg-[#FBF9F4] border border-[#E5DECF] rounded-[22px] shadow-[0_20px_44px_rgba(60,45,30,.12)] p-[10px]`}
          >
            {MOBILE_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="block px-4 py-[13px] rounded-[12px] no-underline text-[#3A352E] text-[16px] hover:bg-[#F4EFE8]"
              >
                {link.label}
              </a>
            ))}
            <a {...EXTERNAL} href={GITHUB_URL} className={`${btnPrimary("sm")} w-full justify-between mt-[6px]`}>
              View on GitHub
              <span className={btnArrow("sm")} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
