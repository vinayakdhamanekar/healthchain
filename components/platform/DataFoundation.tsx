import type { JSX } from "react";
import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

function IconOneRecord(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="7" y="3" width="14" height="19" rx="2" stroke="#A8543C" strokeWidth="1.5" />
      <line x1="10.5" y1="9" x2="17.5" y2="9" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10.5" y1="13" x2="17.5" y2="13" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10.5" y1="17" x2="14" y2="17" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="22" cy="23" r="4.5" fill="#FAF9F6" stroke="#A8543C" strokeWidth="1.4" />
      <line x1="22" y1="20.8" x2="22" y2="25.2" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="19.8" y1="23" x2="24.2" y2="23" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconCloud(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M9 22a6 6 0 0 1 0-12 8 8 0 0 1 15.5 2.5A5 5 0 1 1 22.5 22H9z" stroke="#A8543C" strokeWidth="1.5" />
      <circle cx="11" cy="26" r="1.5" stroke="#A8543C" strokeWidth="1.2" />
      <circle cx="17" cy="27" r="1.5" stroke="#A8543C" strokeWidth="1.2" />
      <circle cx="23" cy="26" r="1.5" stroke="#A8543C" strokeWidth="1.2" />
      <line x1="11" y1="22" x2="11" y2="24.5" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="17" y1="22" x2="17" y2="25.5" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="23" y1="22" x2="23" y2="24.5" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrace(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="3" width="16" height="16" rx="1.5" stroke="#A8543C" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="19" y2="9" stroke="#A8543C" strokeWidth="1.2" />
      <line x1="3" y1="15" x2="19" y2="15" stroke="#A8543C" strokeWidth="1.2" />
      <line x1="9" y1="3" x2="9" y2="19" stroke="#A8543C" strokeWidth="1.2" />
      <circle cx="23" cy="23" r="5.5" stroke="#A8543C" strokeWidth="1.5" />
      <line x1="26.8" y1="26.8" x2="29" y2="29" stroke="#A8543C" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconAlert(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="3" y="5" width="24" height="17" rx="2" stroke="#A8543C" strokeWidth="1.5" />
      <line x1="10" y1="22" x2="20" y2="22" stroke="#A8543C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="22" x2="15" y2="26" stroke="#A8543C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 10v4" stroke="#A8543C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="16.5" r="1" fill="#A8543C" />
    </svg>
  );
}

function IconConsent(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="13" cy="10" r="5" stroke="#A8543C" strokeWidth="1.5" />
      <path d="M4 27c0-5 4-9 9-9" stroke="#A8543C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="5.5" stroke="#A8543C" strokeWidth="1.5" />
      <path d="M19.5 22l2 2 3.5-3.5" stroke="#A8543C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLanguage(): JSX.Element {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="3.5" stroke="#A8543C" strokeWidth="1.5" />
      <circle cx="4" cy="15" r="2.5" stroke="#A8543C" strokeWidth="1.3" />
      <circle cx="26" cy="15" r="2.5" stroke="#A8543C" strokeWidth="1.3" />
      <circle cx="15" cy="4" r="2.5" stroke="#A8543C" strokeWidth="1.3" />
      <circle cx="15" cy="26" r="2.5" stroke="#A8543C" strokeWidth="1.3" />
      <line x1="6.5" y1="15" x2="11.5" y2="15" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="18.5" y1="15" x2="23.5" y2="15" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="6.5" x2="15" y2="11.5" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="18.5" x2="15" y2="23.5" stroke="#A8543C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    icon: "/icons/Medical-Data-Clipboard-Cross--Streamline-Ultimate.svg",
    title: "One member, one record",
    description: "Match the same member across every system—even when names, IDs, and addresses don't line up.",
  },
  {
    icon: "/icons/Network-And-Content-Delivery--Streamline-Ultimate.svg",
    title: "Lives in your cloud",
    description: "Runs inside your environment, on top of your infrastructure. Your data never leaves your perimeter.",
  },
  {
    icon: "/icons/Compare-Spreadsheet-Search--Streamline-Ultimate.svg",
    title: "Trace every field",
    description: "Every value links back to where it came from. Replay any member view to any point in time when audit, finance, or counsel asks.",
  },
  {
    icon: "/icons/Desktop-Monitor-Warning--Streamline-Ultimate.svg",
    title: "Know when data breaks",
    description: "See a complete view of every feed at a glance. Get alerted before a small failure becomes a downstream issue.",
  },
  {
    icon: "/icons/Technology-Contact-Access-Lock--Streamline-Ultimate.svg",
    title: "Enforced consent and access",
    description: "Member consent, role-based access, and purpose-of-use rules apply on every read. Not bolted on, not optional.",
  },
  {
    icon: "/icons/Help-Question-Network--Streamline-Ultimate.svg",
    title: "Ask in plain English",
    description: "Business teams query in natural language with shared definitions baked in—so two teams pulling the same number get the same answer.",
  },
];

const ROWS = [
  [FEATURES[0], FEATURES[1]],
  [FEATURES[2], FEATURES[3]],
  [FEATURES[4], FEATURES[5]],
];

export default function DataFoundation(): JSX.Element {
  return (
    <section className="px-7 md:px-14 py-[66px] border-t bg-[#F7F3EF] border-[#E5DECF]">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">

        {/* Left: label + heading + subtext */}
        <div className="lg:sticky lg:top-[90px]">
          <div className="font-mono font-semibold text-[12px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
            Capabilities
          </div>
          <h2 className="text-[36px] md:text-[44px] font-semibold leading-[1.06] tracking-[-0.025em] text-[#34332C]">
            A shared foundation for all health data.
          </h2>
          <p className="text-[16px] leading-[1.6] text-[#5E594F] mt-6">
            Fragmented platform solutions don&apos;t cut it in today&apos;s market. Health Chain delivers AI-ready, governed data into your existing systems without rip-and-replace.
          </p>
        </div>

        {/* Right: 2-col feature grid */}
        <div>
          {ROWS.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`grid grid-cols-1 sm:grid-cols-2 ${rowIdx === 0 ? "" : "border-t border-[#E5DECF]"}`}
            >
              {row.map((feature, colIdx) => (
                <div
                  key={feature.title}
                  className={`py-8 ${colIdx === 0 ? "sm:pr-10 sm:border-r sm:border-dashed sm:border-[#A8C4D8]" : "sm:pl-10"}`}
                >
                  <div className="mb-4"><Image
                      src={feature.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="shrink-0"
                    /></div>
                  <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-[#34332C] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-[#5E594F]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
