"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import type { JSX } from "react";
import Image from "next/image";

interface Leader {
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  image: string;
}

const LEADERS: Leader[] = [
  {
    name: "Sudheen Kumar",
    title: "Founder & CEO",
    bio: "2+ decades of experience at the intersection of healthcare, data, and enterprise technology, with deep domain expertise in payer operations, government programs, and CMS regulatory frameworks.",
    linkedin: "https://www.linkedin.com/in/sudheenk/",
    image: "/team/sudheen_kumar.jpg",
  },
  {
    name: "Thameem Ansari",
    title: "Chief Technology Offcier",
    bio: "Designed and shipped FHIR-native platforms at scale. Deep expertise in interoperability standards, real-time pipelines, and the compliance surface that payers operate on.",
    linkedin: "https://www.linkedin.com/in/thameem/",
   image: "/team/Thameem-Ansari.jpg",
  },
  {
    name: "Vinay Solapurkar",
    title: "Chief Architect",
    bio: "Owns the architectural foundation of the Health Chain platform across clinical, claims, and pharmacy data.",
    linkedin: "https://www.linkedin.com/in/vinaysolapurkar/",
    image: "/team/VinaySolapurkar.jpg",
  },
  // {
  //   name: "Scott Rich",
  //   title: "Vice President of Finance",
  //   bio: "Oversees finance and operations, scaling the business alongside customer growth.",
  //   linkedin: "https://www.linkedin.com/in/scott-rich-a420052/",
  //   image: "/team/ScottRich.jpg",
  // },
  {
    name: "Nikita Ravindran",
    title: "Vice President of Product",
    bio: "Leads product strategy and execution across the Health Chain platform.",
    linkedin: "https://www.linkedin.com/in/nikita-ravi/",
   image: "/team/nikitar.jpg",
  },
  {
    name: "Mason Burr",
    title: "Vice President of Strategic Accounts",
    bio: "Partners with payer customers to deliver outcomes across their data and compliance programs.",
    linkedin: "https://www.linkedin.com/in/mason-burr-1b35b5126",
    image: "/team/mason.jpg",
  },
];

/* ─── LinkedIn icon ──────────────────────────────────────────── */


function LinkedInButton({ href, name }: { href: string; name: string }): JSX.Element {
  return (
    <a
    href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      onClick={(e) => e.stopPropagation()}
      className="shrink-0 flex items-center justify-center w-[30px] h-[30px] rounded-[6px] text-[#004182] bg-[#fff] hover:bg-[#fff] transition-colors"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M3.2 5.5H5V12H3.2V5.5ZM4.1 4.75a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1ZM6.5 5.5h1.75v.9c.35-.6 1.05-1.1 2.05-1.1 2.2 0 2.6 1.45 2.6 3.3V12H11.1V9c0-.95-.02-2.15-1.3-2.15-1.3 0-1.5 1.02-1.5 2.08V12H6.5V5.5Z"
          fill="#004182"
        />
      </svg>
    </a>
  );
}

export default function LeadershipCards(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingCards = useRef(false);
  const isDraggingThumb = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const startThumbX = useRef(0);

  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(40);

  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = el.clientWidth / el.scrollWidth;
    const tw = Math.max(10, ratio * 100);
    const tl = max > 0 ? (el.scrollLeft / max) * (100 - tw) : 0;
    setThumbWidth(tw);
    setThumbLeft(tl);
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  /* ── Card drag (mouse) ─────────────────────────────────────── */
  const onCardMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingCards.current = true;
    startX.current = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  };

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingCards.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.4;
    recalc();
  };

  const stopCardDrag = () => {
    isDraggingCards.current = false;
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  /* ── Card drag (touch) ─────────────────────────────────────── */
  const onCardTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingCards.current = true;
    startX.current = e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0);
    startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  };

  const onCardTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingCards.current || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    containerRef.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.4;
    recalc();
  };

  const stopCardTouchDrag = () => {
    isDraggingCards.current = false;
  };

  /* ── Progress bar track click ──────────────────────────────── */
  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingThumb.current) return;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const rect = track.getBoundingClientRect();
    const clickPct = (e.clientX - rect.left) / rect.width;
    const max = container.scrollWidth - container.clientWidth;
    container.scrollLeft = clickPct * max;
    recalc();
  };

  /* ── Thumb drag (mouse) ────────────────────────────────────── */
  const onThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingThumb.current = true;
    startThumbX.current = e.clientX;
    startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  };

  /* ── Thumb drag (touch) ────────────────────────────────────── */
  const onThumbTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingThumb.current = true;
    startThumbX.current = e.touches[0].clientX;
    startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  };

  useEffect(() => {
    const moveFromClientX = (clientX: number) => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      const delta = clientX - startThumbX.current;
      const trackW = track.clientWidth;
      const max = container.scrollWidth - container.clientWidth;
      container.scrollLeft = startScrollLeft.current + (delta / trackW) * max;
      recalc();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingThumb.current) return;
      moveFromClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingThumb.current) return;
      moveFromClientX(e.touches[0].clientX);
    };
    const onEnd = () => {
      isDraggingThumb.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [recalc]);

  return (
    <section
      className="relative px-7 md:px-14 py-[72px] overflow-hidden"
      style={{
        backgroundImage: "url('/Patterns/pattern7.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[#1A1005]/60" />
      <div className="relative z-10">
        <div className="text-center m-auto">
          <p className="font-mono font-semibold text-[13px] tracking-[0.16em] text-white uppercase mb-5">
            Our Team
          </p>
          <div className="mb-10">
            <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-3">
              Health Chain Leadership
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.65] text-white">
              Investing in and advocating for our mission since 2019.
            </p>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-2 cursor-grab select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
          onMouseDown={onCardMouseDown}
          onMouseMove={onCardMouseMove}
          onMouseUp={stopCardDrag}
          onMouseLeave={stopCardDrag}
          onTouchStart={onCardTouchStart}
          onTouchMove={onCardTouchMove}
          onTouchEnd={stopCardTouchDrag}
          onScroll={recalc}
        >
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="shrink-0 w-[255px] bg-[#F7F3EF]/20 rounded-[14px] p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border border-[#E5E7EB]"
                />
                <LinkedInButton href={leader.linkedin} name={leader.name} />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#fff] leading-tight">
                  {leader.name}
                </p>
                <p className="text-[12px] text-[#fff] mt-[3px]">{leader.title}</p>
              </div>
              <p className="text-[12px] text-[#fff] leading-[1.65]">{leader.bio}</p>
            </div>
          ))}
        </div>

        {/* Progress bar / scrollbar */}
        <div
          ref={trackRef}
          className="relative mt-6 h-[3px] bg-white/15 rounded-full w-[180px] cursor-pointer"
          onClick={onTrackClick}
        >
          <div
            className="absolute top-0 h-full bg-white/80 rounded-full cursor-ew-resize"
            style={{
              left: `${thumbLeft}%`,
              width: `${thumbWidth}%`,
              transition: isDraggingThumb.current ? "none" : "left 0.08s ease-out",
              touchAction: "none",
            }}
            onMouseDown={onThumbMouseDown}
            onTouchStart={onThumbTouchStart}
          />
        </div>
      </div>
    </section>
  );
}
