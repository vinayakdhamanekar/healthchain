import type { JSX } from "react";

interface Benefit {
  iconColor: string;
  iconStroke: string;
  // TODO: Replace title and description with real content
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    iconColor: "#FDECEA",
    iconStroke: "#C05A3A",
    // TODO: Replace with real benefit title
    title: "Lorem ipsum dolor sit amet.",
    // TODO: Replace with real benefit description
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut felis eget praesent duis elit. Dolor sit aliquet orci orbi nullam pulvinar nec.",
  },
  {
    iconColor: "#FEF3E8",
    iconStroke: "#C47820",
    // TODO: Replace with real benefit title
    title: "Lorem ipsum dolor sit amet.",
    // TODO: Replace with real benefit description
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut felis eget praesent duis elit. Dolor sit aliquet orci orbi nullam pulvinar nec.",
  },
  {
    iconColor: "#EAF0FD",
    iconStroke: "#3A62C0",
    // TODO: Replace with real benefit title
    title: "Lorem ipsum dolor sit amet.",
    // TODO: Replace with real benefit description
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut felis eget praesent duis elit. Dolor sit aliquet orci orbi nullam pulvinar nec.",
  },
  {
    iconColor: "#EAF5EC",
    iconStroke: "#3A8C50",
    // TODO: Replace with real benefit title
    title: "Lorem ipsum dolor sit amet.",
    // TODO: Replace with real benefit description
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut felis eget praesent duis elit. Dolor sit aliquet orci orbi nullam pulvinar nec.",
  },
];

function BenefitIcon({ color, stroke }: { color: string; stroke: string }): JSX.Element {
  return (
    <div
      className="w-10 h-10 rounded-[8px] flex items-center justify-center mb-5 shrink-0"
      style={{ backgroundColor: color }}
    >
      {/* TODO: Replace with real benefit icon SVG */}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke={stroke} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function CultureBenefits(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] border-t border-gray-200">
      {/* Header */}
      <div className="px-7 md:px-14 pt-[72px] pb-[56px]">
        <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-[#A8543C] mb-5">
          Culture, Benefits
        </p>

        {/* TODO: Replace with real headline */}
        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[640px] mb-5">
          Lorem ipsum dolor sit amet consectetur.
        </h2>

        {/* TODO: Replace with real subtext */}
        <p className="text-[15px] md:text-[17px] leading-[1.72] text-[#6B6B6B] max-w-[580px]">
          Lorem ipsum dolor sit amet consectetur. Ut felis eget praesent duis elit praesent
          duis elit. Dolor sit aliquet orci orbi nullam pulvinar nec.
        </p>
      </div>

      {/* 4-column benefit cards */}
      {/*
        Border strategy (all relative to grid):
          mobile  (1-col): border-b on cards 0-2
          sm      (2-col): border-r on col 0 (i=0,2), border-b on row 0 (i=0,1)
          lg      (4-col): border-r on cards 0-2, no border-b
      */}
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className={[
                "px-7 py-9",
                // mobile bottom border (all except last)
                i < 3 ? "border-b border-gray-200" : "",
                // sm: remove bottom on last row (i 2,3), add right on col 0 (i 0,2)
                i >= 2 ? "sm:border-b-0" : "",
                i % 2 === 0 ? "sm:border-r sm:border-gray-200" : "",
                // lg: right on 0-2 only, no bottom
                i < 3 ? "lg:border-r lg:border-gray-200" : "",
                i % 2 === 0 ? "lg:border-r" : "",
                "lg:border-b-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <BenefitIcon color={benefit.iconColor} stroke={benefit.iconStroke} />
              {/* TODO: Replace with real benefit title */}
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-snug mb-3">
                {benefit.title}
              </h3>
              {/* TODO: Replace with real benefit description */}
              <p className="text-[14px] leading-[1.72] text-[#6B6B6B]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
