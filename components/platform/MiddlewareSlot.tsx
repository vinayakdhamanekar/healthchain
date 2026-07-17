"use client";

import { useEffect, useMemo, useRef, useState, type JSX } from "react";

const SOURCE_TAGS = [
  "Epic", "Cerner", "Athena", "Lab feeds",
  "eClinicalWorks", "Greenway", "HIEs",
  "Claims clearinghouses", "PBMs",
  "State Medicaid", "SDOH surveys",
  "Databricks", "Snowflake",
];

const CENTER_FEATURES = [
  "FHIR R4 normalization & terminology validation",
  "EMPI & duplication",
  "Data quality, observability & lineage",
  "Canonical data model (FHIR, OMOP, PCORnet)",
  "Ingestion across SFTP, FHIR/REST, MLLP, SQL, streaming",
];

const DEST_TAGS = [
  "Snowflake", "Databricks", "BigQuery",
  "Cotiviti", "Inovalon", "Milliman",
  "Tableau", "Power BI", "ML pipelines",
  "Care management apps", "Member portals",
];

function NumberCircle({ n, active }: { n: number; active: boolean }): JSX.Element {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-medium shrink-0 transition-all duration-500 ${
        active
          ? "bg-[#6E7A3A] text-white"
          : "border border-[#CFC8BE] text-[#6B665D]"
      }`}
    >
      {n}
    </div>
  );
}

function DashedArrow({ active }: { active: boolean }): JSX.Element {
  return (
    <div
      className={`hidden md:flex shrink-0 items-center justify-center w-12 font-mono text-[13px] tracking-[2px] transition-colors duration-500 ${
        active ? "text-[#9FB06E]" : "text-[#C2BBAC]"
      }`}
    >
      --→
    </div>
  );
}

export default function MiddlewareSlot(): JSX.Element {
  const [activeCards, setActiveCards] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute("data-index"));

          setActiveCards((prev) => {
            if (prev[index]) return prev;

            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-10% 0px",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const progress = useMemo(() => {
    if (activeCards[2]) return 100;
    if (activeCards[1]) return 66;
    return 33;
  }, [activeCards]);

  return (
    <section className="px-7 md:px-14 py-[66px] bg-[#F7F3EF] border-t border-[#F7F3EF]">

      {/* Headline */}
      <div className="mb-10 text-center">
        <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-[18px]">
          How We Fit
        </div>
        <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.05] tracking-[-0.025em] text-[#34332C]">
          We slot in. Nothing rips out.
        </h2>
        <p className="max-w-[560px] mx-auto text-[17px] leading-[1.55] text-[#6B665D] mt-5">
          Health Chain sits between the systems you already pay for and the tools your teams already use. No warehouse migration. No vendor consolidation. No new platform to learn.
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative h-[3px] bg-[#E0D9C9] rounded-full mb-10 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#E9B6A6] to-[#E3A18C] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Three-column integration diagram */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0">

        {/* Card 1: Source systems */}
        <div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          data-index={0}
          className={`flex-1 border rounded-2xl p-6 flex flex-col transition-all duration-700 ease-out ${
            activeCards[0]
              ? "bg-[#F7F3EF] border-[#E1DACB] opacity-100 scale-100 shadow-sm"
              : "bg-[#F3EFE7] border-[#E6DFD1] opacity-60 scale-[0.97]"
          }`}
        >
          <div className="mb-4 absolute -top-4">
            <NumberCircle n={1} active={activeCards[0]} />
          </div>
          <div
            className={`mt-8 font-mono font-semibold text-[11px] tracking-[1.2px] uppercase mb-3 transition-colors duration-500 ${
              activeCards[0] ? "text-[#A8543C]" : "text-[#B9AE9C]"
            }`}
          >
            What You Have
          </div>
          <h3
            className={`text-[22px] font-semibold leading-[1.15] tracking-[-0.01em] mb-auto pb-8 transition-colors duration-500 ${
              activeCards[0] ? "text-[#34332C]" : "text-[#8A857A]"
            }`}
          >
            Your existing source systems
          </h3>
          <div className="flex flex-wrap gap-[6px]">
            {SOURCE_TAGS.map((tag, index) => (
              <span
                key={tag}
                className={`font-mono text-[11px] py-[5px] px-[10px] rounded-[6px] bg-[#EDE8DF] text-[#4A463F] border border-[#D9D2C7] transition-all duration-700 ${
                  activeCards[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <DashedArrow active={activeCards[1]} />

        {/* Card 2: Health Chain middleware */}
        <div
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
          data-index={1}
          className={`flex-1 border rounded-2xl p-6 flex flex-col transition-all duration-700 ease-out ${
            activeCards[1]
              ? "bg-[#F7F3EF] border-[#E1DACB] opacity-100 scale-100 shadow-sm"
              : "bg-[#F8F4EC] border-[#E6DFD1] opacity-60 scale-[0.97]"
          }`}
        >
          <div className="mb-4 absolute -top-4">
            <NumberCircle n={2} active={activeCards[1]} />
          </div>
          <div
            className={`mt-8 font-mono font-semibold text-[11px] tracking-[1.2px] uppercase mb-3 transition-colors duration-500 ${
              activeCards[1] ? "text-[#A8543C]" : "text-[#B9AE9C]"
            }`}
          >
            Where We Live
          </div>
          <h3
            className={`text-[22px] font-semibold leading-[1.15] tracking-[-0.01em] mb-6 transition-colors duration-500 ${
              activeCards[1] ? "text-[#34332C]" : "text-[#8A857A]"
            }`}
          >
            Health Chain - the data readiness layer
          </h3>
          <div className="flex flex-col gap-[7px]">
            {CENTER_FEATURES.map((feature, index) => (
              <div
                key={feature}
                className={`bg-[#F1EDE5] border border-[#E1DACB] rounded-[8px] px-4 py-[10px] font-mono text-[12px] leading-[1.45] text-[#4A463F] transition-all duration-700 ${
                  activeCards[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <DashedArrow active={activeCards[2]} />

        {/* Card 3: Downstream systems */}
        <div
          ref={(el) => {
            cardRefs.current[2] = el;
          }}
          data-index={2}
          className={`flex-1 border rounded-2xl p-6 flex flex-col transition-all duration-700 ease-out ${
            activeCards[2]
              ? "bg-[#F7F3EF] border-[#E1DACB] opacity-100 scale-100 shadow-sm"
              : "bg-[#F3EFE7] border-[#E6DFD1] opacity-60 scale-[0.97]"
          }`}
        >
          <div className="mb-4 absolute -top-4">
            <NumberCircle n={3} active={activeCards[2]} />
          </div>
          <div
            className={`mt-8 font-mono font-semibold text-[11px] tracking-[1.2px] uppercase mb-3 transition-colors duration-500 ${
              activeCards[2] ? "text-[#A8543C]" : "text-[#B9AE9C]"
            }`}
          >
            Where It Goes
          </div>
          <h3
            className={`text-[22px] font-semibold leading-[1.15] tracking-[-0.01em] mb-auto pb-8 transition-colors duration-500 ${
              activeCards[2] ? "text-[#34332C]" : "text-[#8A857A]"
            }`}
          >
            Your existing downstream systems
          </h3>
          <div className="flex flex-wrap gap-[6px]">
            {DEST_TAGS.map((tag, index) => (
              <span
                key={tag}
                className={`font-mono text-[11px] py-[5px] px-[10px] rounded-[6px] bg-[#EDE8DF] text-[#4A463F] border border-[#D9D2C7] transition-all duration-700 ${
                  activeCards[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
