"use client";

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { JSX } from "react";
import Image from "next/image";

interface StepCard {
  number: string;
  title: string;
  description: string;
  chipLabel: string;
  chips: string[];
  chipClass: string;
  icon: string;
}

function CaptureIcon(): JSX.Element {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2B2B27"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 8v8M8 6h4a4 4 0 0 1 4 4M8 18h4a4 4 0 0 0 4-4" />
    </svg>
  );
}

function CurateIcon(): JSX.Element {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2B2B27"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M7 11l10-4M7 13l10 4" />
    </svg>
  );
}

function ConsumeIcon(): JSX.Element {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2B2B27"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M8 11l8-5M8 13l8 5" />
    </svg>
  );
}

const STEPS: StepCard[] = [
  {
    number: "1",
    title: "Capture",
    description:
      "50+ pre-built connectors ingest claims, clinical, pharmacy, and SDOH data from any source including EHR, HIE, Databricks, flat file, and direct database connection, without rip-and-replace.",
    chipLabel: "PULL",
    chips: [
      "EHR",
      "HIE",
      "Claims",
      "Pharmacy",
      "SDOH",
      "Flat Files",
    ],
    chipClass: "bg-[#D2E3AC] text-[#51602F]",
    icon: "/icons/Icon-Capture.svg",
  },
  {
    number: "2",
    title: "Curate",
    description:
      "AI-powered FHIR transformation normalizes, deduplicates, and enriches messy payer data into a single longitudinal health record.",
    chipLabel: "TRANSFORM",
    chips: [
      "Normalize",
      "Deduplicate",
      "Enrich",
      "FHIR Map",
    ],
    chipClass: "bg-[#CBCDF1] text-[#3C3E8C]",
    icon: "/icons/Icon-Curate.svg",
  },
  {
    number: "3",
    title: "Consume",
    description:
      "Deliver analytics and AI-ready data into any downstream system, powering use cases from risk adjustment to quality measures to predictive modeling.",
    chipLabel: "INTEGRATE",
    chips: [
      "Snowflake",
      "Databricks",
      "Cotiviti",
      "APIs",
    ],
    chipClass: "bg-[#E9C5BC] text-[#9C4A37]",
    icon: "/icons/Icon-Consume.svg",
  },
];

interface CardProps {
  step: StepCard;
  active: boolean;
}

function Card({ step, active }: CardProps): JSX.Element {
  return (
    <div
      className={`flex-1 min-w-0 rounded-lg border p-[24px_26px_28px] sm:mb-[15%] flex flex-col transition-all duration-700 ease-out ${active
          ? "bg-[#f7f3EF] border-[#E1DACB] opacity-100 scale-100 shadow-sm"
          : "bg-[#F3EFE7] border-[#E6DFD1] opacity-60 scale-[0.97]"
        }`}
    >
      {/* Step Number */}
      <div
        className={`absolute -top-4 left-6 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-500 ${active
            ? "bg-[#6E7A3A] text-white border-4 border-[#EFEAE1]"
            : "bg-[#F7F3EB] border border-[#C9C1B1] text-[#8A857A]"
          }`}
      >
        {step.number}
      </div>

      {/* Icon + Title */}
      <div className="flex items-center bg-[#f7f3EF] gap-[10px] mb-[14px]">
        <div
          className={`transition-all duration-700 ${active ? "opacity-100" : "opacity-50"
            }`}
        >
          <Image
            src={step.icon}
            alt={step.title}
            width={24}
            height={24}
            className="shrink-0"
          />
        </div>

        <h3
          className={`text-[25px] font-semibold tracking-[-0.01em] transition-all duration-700 ${active ? "text-[#34332C]" : "text-[#7A746A]"
            }`}
        >
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className={`text-[15px] leading-[1.55] mb-[26px] transition-all duration-700 ${active ? "text-[#5E594F]" : "text-[#9A948A]"
          }`}
      >
        {step.description}
      </p>

      {/* Chips */}
      <div className="mt-auto">
        <div className="font-mono text-[12px] tracking-[1px] uppercase text-[#6E6A60] mb-3">
          {step.chipLabel}
        </div>

        <div className="flex flex-wrap gap-2">
          {step.chips.map((chip, index) => (
            <span
              key={chip}
              className={`font-mono text-[12px] py-[5px] px-[11px] rounded-md transition-all duration-700 ${step.chipClass} ${active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
                }`}
              style={{
                transitionDelay: `${index * 70}ms`,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ConnectorProps {
  active: boolean;
}

function Connector({ active }: ConnectorProps): JSX.Element {
  return (
    <div className="hidden md:flex w-12 shrink-0 items-center justify-center">
      <div className="relative w-full h-[8px] flex items-center">
        {/* Base Line */}
        <div className="absolute inset-0 h-[2px] my-auto bg-[#D8D1C3]" />

        {/* Completed Line */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#9FB06E] transition-all duration-700 ${active ? "w-full" : "w-0"
            }`}
        />

        {/* Moving Dots */}

      </div>
    </div>
  );
}

export default function PlatformSteps(): JSX.Element {
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

          const index = Number(
            entry.target.getAttribute("data-index")
          );

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
    <section className="bg-[#f7f3EF] md:pt-16 px-7 md:px-14 pb-[70px]">
      <style jsx>{`
  @keyframes dotFlow {
    0% {
      transform: translateX(-8px);
      opacity: 0;
    }

    15% {
      opacity: 1;
    }

    100% {
      transform: translateX(48px);
      opacity: 1;
    }
  }

  .animate-dotFlow {
    animation: dotFlow 0.8s linear forwards;
  }
`}</style>
      {/* Label */}
      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-[18px]">
        Platform
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-12">
        <div className="max-w-[520px]">
          <h2 className="text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
            Three steps to data you can use (and trust).
          </h2>

          <p className="text-[17px] leading-[1.5] text-[#6B665D] mt-[22px] max-w-[540px]">
            A three-stage pipeline that transforms fragmented payer data into
            clean, actionable intelligence-in days, not months.
          </p>
        </div>

        <a
          href="#"
          className="self-start md:self-auto whitespace-nowrap inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[15px] py-[13px] px-6 rounded-[40px] hover:bg-white transition-all duration-300"
        >
          Explore Documentation
        </a>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="h-[4px] w-full rounded-full bg-[#DDD5C8] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#E9B6A6] to-[#D88368] transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      {/* Cards */}
      <div className="flex flex-col md:flex-row items-stretch">
        {STEPS.map((step, idx) => (
          <Fragment key={step.title}>
            <div
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              data-index={idx}
              className="flex-1 flex flex-col"
            >
              <Card
                step={step}
                active={activeCards[idx]}
              />
            </div>

            {idx < STEPS.length - 1 && (
              <Connector
                active={activeCards[idx + 1]}
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}