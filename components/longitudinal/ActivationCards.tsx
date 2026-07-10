import type { JSX } from "react";

interface ActivationCard {
  label: string;
  labelColorClass: string;
  chipBgClass: string;
  title: string;
  description: string;
  iconSrc: string; 
  iconColor: string; 
}

const CARDS: ActivationCard[] = [
  {
    label: "Risk Adjustment",
    labelColorClass: "text-[#A15549]",
    chipBgClass: "bg-[#F6E3DC]",
    title: "Capture more, defend it easily",
    description:
      "Find missed conditions using complete clinical records, not just billing data. Every update links back to the original documentation, so audits are simple.",
    iconSrc: "/icons/Settings-Horizontal--Streamline-Ultimate.svg",
    iconColor: "#A15549",
  },
  {
    label: "Quality & Stars",
    labelColorClass: "text-[#4559B0]",
    chipBgClass: "bg-[#E4E7F7]",
    title: "Close measures in real time",
    description:
      "Quality measures update within hours of the source event, and supplemental data arrives validated and ready to submit.",
    iconSrc: "/icons/Certified-Ribbon--Streamline-Ultimate.svg",
    iconColor: "#4559B0",
  },
  {
    label: "Care management",
    labelColorClass: "text-[#6F7A42]",
    chipBgClass: "bg-[#EAEEDD]",
    title: "One screen, not seven",
    description:
      "Care managers see encounters, meds, labs, claims, and SDOH on a single timeline. Outreach is informed, not interrogative.",
    iconSrc: "/icons/Give-Medical--Streamline-Ultimate.svg",
    iconColor: "#6F7A42",
  },
  {
    label: "Actuarial",
    labelColorClass: "text-[#4559B0]",
    chipBgClass: "bg-[#E4E7F7]",
    title: "Build bids on real history",
    description:
      "Years of clean, accurate utilization data tied to the right members. Bids and reserves no longer depend on data pulls that don't add up.",
    iconSrc: "/icons/Accounting-Calculator-1--Streamline-Ultimate.svg",
    iconColor: "#4559B0",
  },
  {
    label: "Member Experience",
    labelColorClass: "text-[#6F7A42]",
    chipBgClass: "bg-[#EAEEDD]",
    title: "Patient-based personalization",
    description:
      "Portal, app, and concierge all draw from the same record. No more 'we don't see that on file' moments.",
    iconSrc: "/icons/Medical-Data-Clipboard-Cross--Streamline-Ultimate.svg",
    iconColor: "#6F7A42",
  },
  {
    label: "Data Science & AI",
    labelColorClass: "text-[#A15549]",
    chipBgClass: "bg-[#F6E3DC]",
    title: "Features ready for modeling",
    description:
      "Curated, versioned, traceable features feed risk and intervention models without weeks of cleanup first.",
    iconSrc: "/icons/Ai-Chip-Spark--Streamline-Ultimate.svg",
    iconColor: "#A15549",
  },
];

const SM_COLS = 2;
const LG_COLS = 3;

function cellBorderClasses(idx: number, total: number): string {
  const isLastSmCol = (idx + 1) % SM_COLS === 0;
  const isLastSmRow = idx >= total - SM_COLS;

  const isLastLgCol = (idx + 1) % LG_COLS === 0;
  const isLastLgRow = idx >= total - LG_COLS;

  return [
    // Mobile
    idx !== total - 1 && "border-b",

    // Tablet
    !isLastSmCol && "sm:border-r",
    !isLastSmRow && "sm:border-b",

    // Desktop
    !isLastLgCol && "lg:border-r",
    !isLastLgRow && "lg:border-b",

    "border-[#928b86]",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Renders a monochrome SVG file as a colored icon.
 *
 * A plain <img src="icon.svg" /> can't be recolored with CSS — the browser
 * paints it exactly as the file defines. To get a different color per card
 * from the same *type* of icon file, we instead use the SVG as a CSS mask
 * and paint the color in with `background-color`. This only works if the
 * source SVG is monochrome (a single shape/stroke with no colors baked in) —
 * exactly like the inline icons this replaces.
 */
function ColorIcon({
  src,
  color,
  size = 22,
}: {
  src: string;
  color: string;
  size?: number;
}): JSX.Element {
  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export default function ActivationCards(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 pt-[0px] pb-[40px]">
      <div className="">
        {/* Headline + subtext */}
        <div className=" border-[#928b86] px-6 md:px-10 py-10 md:py-12">
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
            Activation
          </div>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] max-w-[740px] text-[#1A1A1A] mb-4">
            One record, working for every downstream endeavor.
          </h2>
          <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[540px]">
            No migration or parallel platform required. Deliver a single source of truth into the teams and tools already running your business.
          </p>
        </div>

        {/* 3×2 bordered grid */}
        <div className="border border-[#928b86]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, idx) => (
            <div
              key={card.title}
              className={`p-6 md:p-8 flex flex-col gap-4 ${cellBorderClasses(idx, CARDS.length)}`}
            >
              {/* Icon + label row */}
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 ${card.chipBgClass}`}>
                  <ColorIcon src={card.iconSrc} color={card.iconColor} />
                </div>
                <span className={`text-[12px] font-bold tracking-[0.12em] uppercase ${card.labelColorClass}`}>
                  {card.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-semibold leading-snug text-[#1A1A1A]">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-[#57534C] leading-[1.7]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}