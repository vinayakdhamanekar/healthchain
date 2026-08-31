import type { JSX } from "react";

interface Benefit {
  iconColor: string;
  iconStroke: string;
  icon: string;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    iconColor: "#FDECEA",
    iconStroke: "#C05A3A",
    icon: "/icons/Give-Medical--Streamline-Ultimate.svg",
    title: "Comprehensive health coverage",
    description:
      "Medical, dental, and vision plans for you and your family, plus a wellness stipend to support your wellbeing outside of work.",
  },
  {
    iconColor: "#FEF3E8",
    iconStroke: "#C47820",
    icon: "/icons/Calendar--Streamline-Ultimate.svg",
    title: "Flexible time off",
    description:
      "Take the time you need to rest and recharge with a flexible PTO policy, plus paid company holidays throughout the year.",
  },
  {
    iconColor: "#EAF0FD",
    iconStroke: "#3A62C0",
    icon: "/icons/Network-And-Content-Delivery--Streamline-Ultimate.svg",
    title: "Remote-first culture",
    description:
      "Work from wherever you do your best work. We're a distributed team that comes together in person a few times a year.",
  },
  {
    iconColor: "#EAF5EC",
    iconStroke: "#3A8C50",
    icon: "/icons/Accounting-Calculator-1--Streamline-Ultimate.svg",
    title: "Real equity and ownership",
    description:
      "Every employee holds equity in the company, because you should share in the value you help create.",
  },
];

// SVG-as-CSS-mask: lets one monochrome icon file be recolored per card via
// `backgroundColor`, instead of a browser painting the file's own colors.
function BenefitIcon({ icon, color, stroke }: { icon: string; color: string; stroke: string }): JSX.Element {
  return (
    <div
      className="w-10 h-10 rounded-[8px] flex items-center justify-center mb-5 shrink-0"
      style={{ backgroundColor: color }}
    >
      <span
        role="img"
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: 20,
          height: 20,
          backgroundColor: stroke,
          WebkitMaskImage: `url(${icon})`,
          maskImage: `url(${icon})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
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

        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1A1A1A] max-w-[640px] mb-5">
          Built by people who care about getting this right.
        </h2>

        <p className="text-[15px] md:text-[17px] leading-[1.72] text-[#6B6B6B] max-w-[580px]">
          We're a small, senior team solving one of the hardest data problems in
          healthcare. Here's what that comes with.
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
              <BenefitIcon icon={benefit.icon} color={benefit.iconColor} stroke={benefit.iconStroke} />
              <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-snug mb-3">
                {benefit.title}
              </h3>
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
