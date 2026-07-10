"use client";

import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";

interface Mandate {
  id: string;
  name: string;
  position: number;
  above: boolean;
  enforcementDate: string;
  status: "enacted" | "upcoming" | "future" | "live";
  ruleId: string;
  badge: string;
  title: string;
  description: string;
  requires: string[];
  coverage: string;
}

const MANDATES: Mandate[] = [
  {
    id: "tefca",
    name: "TEFCA",
    position: 8,
    above: true,
    enforcementDate: "Production exchange",
    status: "live",
    ruleId: "TEFCA",
    badge: "Live",
    title: "Cross-network data sharing",
    description:
      "National framework for health information exchange via Qualified Health Information Networks (QHINs). Production traffic is flowing today.",
   
   

   requires: [
      "QHIN onboarding",
      "Treatment & individual access",
      "Government benefits use case",
    ],
    coverage:
      "Health Chain ingests and serves QHIN traffic natively, with consent and purpose-of-use enforced on every read.",
  },
  {
    id: "uscdi-v4",
    name: "USCDI V4",
    position: 22,
    above: false,
    enforcementDate: "Required data classes",
    status: "enacted",
    ruleId: "USCDI V4",
    badge: "In effect",
    title: "U.S. core data for interoperability",
    description:
      "ONC's expanded baseline of standardized data classes that adds facility info, encounter diagnoses, and SDOH elements to v3.",
  
    requires: [
      "20 data classes",
      "USCDI+ extensions",
      "FHIR US Core 6.x alignment",
    ],
    coverage:
      "PDex, CRD, DTR, and PAS are shipped as first-class endpoints without any bespoke implementation work.",
  },
  {
    id: "davinci",
    name: "DA VINCI",
    position: 38,
    above: true,
    enforcementDate: "Production IGs available",
    status: "enacted",
    ruleId: "DA VINCI",
    badge: "In effect",
    title: "HL7 Da Vinci implementation guides",
    description:
      "Industry-led IGs for value-based care: PDex, CRD, DTR, PAS, ATR, and the Provider Data Exchange.",
    requires: [
      "PDex member history",
      "CRD coverage requirements",
      "DTR + PAS prior auth",
    ],
    coverage:
      "PDex, CRD, DTR, and PAS are shipped as first-class endpoints without any bespoke implementation work.",
  },
  {
    id: "onc-hti1",
    name: "ONC HTI-1",
    position: 57,
    above: false,
    enforcementDate: "Dec 31, 2024",
    status: "upcoming",
    ruleId: "ONC HTI-1",
    badge: "In effect",
    title: "Health data, tech & interop",
    description:
      "ONC final rule covering certified Health IT, decision support transparency (DSI), and information blocking enforcement.",
    requires: [
      "DSI source attribute requirements",
      "Real-world testing",
      "USCDI v3 → v4 migration",
    ],
    coverage:
      "Lineage and provenance required for DSI are built into every record Health Chain serves.",
  },
  {
    id: "cms-0057-f",
    name: "CMS-0057-F",
    position: 74,
    above: true,
    enforcementDate: "Jan 1, 2027",
    status: "upcoming",
    ruleId: "CMS-0057-F",
    badge: "Enforcement coming",
    title: "Trusted exchange framework",
    description:
      "Five required APIs (Patient Access, Provider Access, Payer-to-Payer, Prior Authorization, Provider Directory) plus prior authorization metrics reporting.",
    requires: [
      "Patient Access API",
      "Provider Access API",
      "Payer-to-Payer API",
      "Prior Authorization API (CRD, DTR, PAS)",
      "Provider Directory API",
    ],
    coverage:
      "All five APIs pre-built on Da Vinci IGs. API reporting and impacted-payer attestation included.",
  },
  {
    id: "tefca-fhir",
    name: "TEFCA FHIR",
    position: 93,
    above: false,
    enforcementDate: "Phased through 2028",
    status: "future",
    ruleId: "TEFCA FHIR",
    badge: "Future",
    title: "FHIR-based exchange via QHINs",
    description:
      "Migration of TEFCA exchange from IHE document-based flows to FHIR-based query and bulk exchange.",
   
    requires: [
      "FHIR query exchange",
      "Bulk export at the QHIN",
      "Subscription notifications",
    ],
    coverage:
      "Health Chain's FHIR R4 surface and bulk export are QHIN-ready when the standard turns on.",
  },
];

const YEAR_MARKERS = [
  { year: "2024", position: 5 },
  { year: "2025", position: 27 },
  { year: "2026", position: 50 },
  { year: "2027", position: 72 },
  { year: "2028", position: 93 },
];

const CMS_TARGET = new Date("2027-01-01T00:00:00");
const STEP_MS = 6500;
const TICK_MS = 60;
const RING_R = 12;
const RING_C = 2 * Math.PI * RING_R;

interface Countdown {
  months: number;
  days: number;
  hours: number;
  minutes: number;
}

function calcCountdown(target: Date): Countdown {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const months = Math.max(
    0,
    (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth())
  );
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { months, days, hours, minutes };
}

export default function MandatesTimeline(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  const progressRef = useRef(0);
  const activeRef = useRef(0);

  // Live countdown (client-only to avoid hydration mismatch)
  useEffect(() => {
    setCountdown(calcCountdown(CMS_TARGET));
    const id = setInterval(() => setCountdown(calcCountdown(CMS_TARGET)), 30000);
    return () => clearInterval(id);
  }, []);

  // Auto-advance through mandates
  useEffect(() => {
    const id = setInterval(() => {
      progressRef.current += (TICK_MS / STEP_MS) * 100;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        activeRef.current = (activeRef.current + 1) % MANDATES.length;
        setActiveIndex(activeRef.current);
        setProgress(0);
      } else {
        setProgress(progressRef.current);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const handleDotClick = (index: number) => {
    progressRef.current = 0;
    activeRef.current = index;
    setActiveIndex(index);
    setProgress(0);
  };

  const active = MANDATES[activeIndex];
  const ringOffset = RING_C * (1 - progress / 100);

  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[72px]">
      {/* Section label */}
      <p className="text-[13px] font-semibold tracking-[1.5px] uppercase text-[#A8543C] mb-6">
        On the Regulatory Clock
      </p>

      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14">
        {/* Headline + subtext */}
        <div className="max-w-[480px]">
          <h2 className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A]">
            Mandates aren't slowing down.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.65] text-[#57534C]">
            TEFCA, CMS-0057-F, USCDI—new rules keep landing. Health Chain makes sure you're already covered.
          </p>
        </div>

        {/* Countdown card */}
        <div className="bg-white border border-gray-200 rounded-[16px] px-7 py-5 shrink-0">
          <div className="flex items-center gap-2 mb-5">
           <Image
              src="/icons/Alarm-Clock--Streamline-Ultimate.svg"
              alt=""
              width={18}
              height={18}
              className="shrink-0"
            />
            <span className="text-[13px] font-semibold tracking-[0.1em] uppercase text-[#1A1A1A]">
              CMS-0057-F Enforcement In
            </span>
          </div>

           
          <div className="flex gap-5 md:gap-7">
            {countdown ? (
              (
                [
                  { label: "Months", value: countdown.months, pad: 2 },
                  { label: "Days", value: countdown.days, pad: 3 },
                  { label: "Hours", value: countdown.hours, pad: 2 },
                  { label: "Minutes", value: countdown.minutes, pad: 2 },
                ] as const
              ).map(({ label, value, pad }) => (
                <div key={label} className="text-center">
                  <div className="text-[32px] md:text-[36px] font-semibold text-[#1A1A1A] leading-none tabular-nums">
                    {String(value).padStart(pad, "0")}
                  </div>
                  <div className="text-[11px] text-[#6B6B6B] mt-1">{label}</div>
                </div>
              ))
            ) : (
              <div className="h-10 flex items-center text-[#6B6B6B] text-sm">
                Loading…
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline — scrollable on mobile */}
      <div className="overflow-x-auto pb-2 mb-10">
        <div className="relative min-w-[600px] h-[110px]">
          {/* Year labels */}
          {YEAR_MARKERS.map((m) => (
            <span
              key={m.year}
              className="absolute top-0 text-[12px] font-medium text-[#1A1A1A] -translate-x-1/2"
              style={{ left: `${m.position}%` }}
            >
              {m.year}
            </span>
          ))}

          {/* Above-line mandate names */}
          {MANDATES.filter((m) => m.above).map((m) => (
            <span
              key={m.id}
              className="absolute top-[22px] text-[10px] font-semibold tracking-[0.08em] uppercase text-[#6B6B6B] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${m.position}%` }}
            >
              {m.name}
            </span>
          ))}

          {/* Background track */}
          <div className="absolute top-[58px] left-0 right-0 h-[2px] bg-gray-200" />

          {/* Progress fill */}
          <div
            className="absolute top-[58px] left-0 h-[2px] bg-[#A8543C] transition-[width] duration-700 ease-out"
            style={{ width: `${MANDATES[activeIndex].position}%` }}
          />

          {/* Dots */}
          {MANDATES.map((mandate, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            return (
              <button
                key={mandate.id}
                className="absolute top-[58px] -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer group z-10"
                style={{ left: `${mandate.position}%` }}
                onClick={() => handleDotClick(index)}
                aria-label={`View ${mandate.name} mandate`}
              >
                {isActive ? (
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    {/* Progress ring */}
                    <svg
                      width="28"
                      height="28"
                      className="absolute inset-0"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r={RING_R}
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                      />
                      <circle
                        cx="14"
                        cy="14"
                        r={RING_R}
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        strokeDashoffset={ringOffset}
                      />
                    </svg>
                    <div className="w-[13px] h-[13px] rounded-full bg-[#4F46E5] z-10" />
                  </div>
                ) : (
                  <div
                    className={`w-[18px] h-[18px] rounded-full border-2 transition-all duration-200 group-hover:scale-110 ${
                      isPast
                        ? "bg-[#A8543C] border-[#A8543C]"
                        : "bg-white border-gray-300 group-hover:border-gray-400"
                    }`}
                  />
                )}
              </button>
            );
          })}

          {/* Below-line mandate names */}
          {MANDATES.filter((m) => !m.above).map((m) => (
            <span
              key={m.id}
              className="absolute top-[76px] text-[10px] font-semibold tracking-[0.08em] uppercase text-[#6B6B6B] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${m.position}%` }}
            >
              {m.name}
            </span>
          ))}
        </div>
      </div>

      {/* Mandate detail card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden border border-gray-200 shadow-sm">
        {/* Left panel */}
        <div className="bg-[#3D3C8F] p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[11px] font-medium px-3 py-[5px] rounded-full bg-white/15 text-white/80">
              {active.badge}
            </span>
            <div className="flex items-center gap-1.5 text-[13px] text-white/60">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect
                  x="1"
                  y="2"
                  width="11"
                  height="9.5"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M4 1v2.5M9 1v2.5M1 5h11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {active.enforcementDate}
            </div>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-1">
            {active.ruleId}
          </p>
          <h3 className="text-[26px] md:text-[34px] font-semibold text-white leading-[1.15] mb-5">
            {active.title}
          </h3>
          <p className="text-[14px] md:text-[15px] text-white/65 leading-[1.75]">
            {active.description}
          </p>
        </div>

        {/* Right panel */}
        <div className="bg-[#F7F3EF] border rounded-tr-[20px] rounded-br-[20px] border-[#928b86] p-8 md:p-10">
          {/* What it requires */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z"
                  stroke="#E8352A"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[15px] font-semibold text-[#1A1A1A]">
                What it requires
              </span>
            </div>
            <ul className="space-y-[10px]">
              {active.requires.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-3 text-[14px] text-[#34332C]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#6B6B6B] shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* How covered */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="#22A722"
                  strokeWidth="1.3"
                />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="#22A722"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[15px] font-semibold text-[#1A1A1A]">
                How Health Chain covers it
              </span>
            </div>
            <p className="text-[14px] text-[#57534C] leading-[1.7]">
              {active.coverage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
