"use client";

import { useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────────────
   Icons — small inline strokes, tinted with the same terracotta accent
   used for the CTA, sitting inside a soft cream chip. Kept monochrome and
   restrained so the icon reads as a label, not decoration.
──────────────────────────────────────────────────────────────────────── */

function IconTarget(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconStar(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3.5l2.47 5.4 5.78.58-4.36 3.98 1.24 5.74L12 16.9l-5.13 2.3 1.24-5.74-4.36-3.98 5.78-.58L12 3.5z" />
    </svg>
  );
}

function IconNetwork(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 7.3L11 16M17 7.3L13 16M7.5 6h9" />
    </svg>
  );
}

function IconPulse(): JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h3.5l2-6 3.5 12 2-9 1.5 3H21" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Data
──────────────────────────────────────────────────────────────────────── */

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  icon: () => JSX.Element;
}

interface NavItemProps {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const SOLUTIONS_ITEMS: DropdownItem[] = [
  {
    label: "Interoperability & Compliance",
    description: "A real compliance foundation.",
    href: "/solutions",
    icon: IconTarget,
  },
  {
    label: "Longitudinal Data Enablement",
    description: "Every source. One longitudinal health record.",
    href: "/longitudinal-data-enablement",
    icon: IconStar,
  },
  {
    label: "Benefit Design & Intelligence",
    description: "Design benefits with evidence, not guesswork.",
    href: "/benefit-design-and-intelligence",
    icon: IconNetwork,
  }
];

const NAV_LINKS: NavItemProps[] = [
  { label: "Platform", href: "/hch-platform" },
  { label: "Solutions", href: "/solutions", hasDropdown: true, dropdownItems: SOLUTIONS_ITEMS },
  { label: "Resources", href: "#" },
  { label: "Company", href: "/about" },
];

/* ────────────────────────────────────────────────────────────────────────
   Desktop: mega-menu dropdown for a single nav item
──────────────────────────────────────────────────────────────────────── */

function NavDropdown({ link }: { link: NavItemProps }): JSX.Element {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = link.dropdownItems;

  function openNow(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 130);
  }

  // Close on outside click and on Escape — dropdown behaves like a proper
  // disclosure, not just a hover artifact.
  useEffect(() => {
    function onPointerDown(e: MouseEvent): void {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!items || items.length === 0) {
    return <NavItem href={link.href} label={link.label} hasDropdown={link.hasDropdown} />;
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 cursor-pointer text-[#3A352E] text-[15px] hover:text-[#34332C] transition-colors select-none"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {link.label}
        <span
          className="text-[22px] opacity-50 leading-none transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+18px)] w-[min(400px,90vw)] origin-top"
          >
            <div className="bg-[#FBF9F4] rounded-[24px] shadow-[0_20px_44px_rgba(60,45,30,0.12)] border border-[#EAE3D5]/70 p-2.5">
              <div className="flex flex-col">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-start gap-3.5 rounded-[16px] px-3.5 py-3 hover:bg-[#F4EFE8] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-[11px] bg-[#F4EFE8] text-[#A8543C] shrink-0 group-hover:bg-[#EFE7D8] transition-colors">
                      <item.icon />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[14.5px] font-medium text-[#34332C]">
                        {item.label}
                      </span>
                      <span className="text-[13px] leading-[1.4] text-[#6B665D]">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Plain nav item (no dropdown content wired up yet)
──────────────────────────────────────────────────────────────────────── */

function NavItem({ label, href, hasDropdown = false }: NavItemProps): JSX.Element {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 cursor-pointer text-[#3A352E] text-[15px] hover:text-[#34332C] transition-colors select-none"
    >
      {label}
      {hasDropdown && (
        <span className="text-[10px] opacity-50 leading-none">▾</span>
      )}
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Mobile: accordion row (label navigates, chevron expands sub-items)
──────────────────────────────────────────────────────────────────────── */

function MobileNavRow({ link, onNavigate }: { link: NavItemProps; onNavigate: () => void }): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const items = link.dropdownItems;

  if (!items || items.length === 0) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="flex items-center justify-between text-[#3A352E] text-[16px] py-1"
      >
        {link.label}
        {link.hasDropdown && <span className="text-[10px] opacity-50">▾</span>}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-1">
        <Link href={link.href} onClick={onNavigate} className="text-[#3A352E] text-[16px]">
          {link.label}
        </Link>
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} menu`}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="p-1.5 -mr-1.5 rounded-full hover:bg-black/5 transition-colors"
        >
          <span
            className="block text-[11px] opacity-50 leading-none transition-transform duration-200"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pl-1 pt-1 pb-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-[14px] px-2.5 py-2.5 hover:bg-[#F4EFE8] transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-[9px] bg-[#F4EFE8] text-[#A8543C] shrink-0">
                    <item.icon />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium text-[#34332C]">{item.label}</span>
                    <span className="text-[12.5px] leading-[1.35] text-[#6B665D]">{item.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Navbar
──────────────────────────────────────────────────────────────────────── */

export default function Navbar(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 md:px-7 pt-4 pb-1.5">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="bg-[#FBF9F4] rounded-[44px] shadow-[0_14px_34px_rgba(60,45,30,0.07)] flex items-center justify-between py-3 pl-4 sm:pl-6 pr-3">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-[5px]">
              <Image
                src="/logo.png"
                alt="Health Chain Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.01em] text-[#34332C]">
                Health Chain
              </span>
            </div>
          </Link>

          {/* Right-hand cluster: desktop nav + CTA (hidden on mobile) and hamburger (hidden on desktop) */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* Desktop nav links + CTA — hidden below md */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-[34px]" aria-label="Main navigation">
                {NAV_LINKS.map((link) => (
                  <NavDropdown key={link.label} link={link} />
                ))}
              </nav>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[15px] font-medium py-[11px] pl-[22px] pr-[11px] rounded-[40px] transition-colors duration-300"
              >
                Request a Demo
                <span className="w-7 h-5 rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
                  →
                </span>
              </Link>
            </div>

            {/* Mobile hamburger — visible only below md; now a sibling, not nested in the hidden div */}
            <button
              type="button"
              className="md:hidden p-2 mr-1 rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34332C"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden mt-2 bg-[#FBF9F4] rounded-2xl shadow-[0_14px_34px_rgba(60,45,30,0.07)] p-5 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <MobileNavRow key={link.label} link={link} onNavigate={() => setMobileOpen(false)} />
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[15px] font-medium py-[11px] pl-[22px] pr-[11px] rounded-[40px] transition-colors duration-300 mt-2 justify-center"
              >
                Request a Demo
                <span className="w-7 h-5 rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
                  →
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}