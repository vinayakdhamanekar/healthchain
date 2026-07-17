import type { JSX } from "react";

interface ActivationCard {
  label: string;
  title: string;
  description: string;
  titleColor: string;
  iconSrc: string;
  iconColor: string;
  labelColorClass: string;
  chipBgClass: string;
}

const CARDS: ActivationCard[] = [
  {
    label: "Actuarial",
    title: "Pricing you can stand behind",
    titleColor: "#6F7A42",
    description:
      "Base your numbers on data that actually checks out. Every assumption is documented and ready to drop straight into the bid file.",
    iconSrc: "/icons/Accounting-Calculator-1--Streamline-Ultimate.svg",
    iconColor: "#6F7A42",
    labelColorClass: "text-[#6F7A42]",
    chipBgClass: "",
  },
  {
    label: "Product",
    title: "Try out plan designs in hours",
    titleColor: "#A15549",
    description:
      "Line up three plans or thirty against the same members and see cost, member friction, and Stars impact side by side-before you file.",
    iconSrc: "/icons/Analytics-Bars--Streamline-Ultimate.svg",
    iconColor: "#A15549",
    labelColorClass: "text-[#A15549]",
    chipBgClass: "",
  },
  {
    label: "Network",
    title: "See how network changes land",
    titleColor: "#4559B0",
    description:
      "Toggle changes to see how it affects access, cost, or creates disruption for your members.",
    iconSrc: "/icons/Server-Edit--Streamline-Ultimate.svg",
    iconColor: "#4559B0",
    labelColorClass: "text-[#4559B0]",
    chipBgClass: "",
  },
  {
    label: "Pharmacy",
    title: "Test formulary changes first",
    titleColor: "#A15549",
    description:
      "See how members are likely to react before you change what drugs are covered and how they're priced.",
    iconSrc: "/icons/Prescription-Px-Drug--Streamline-Ultimate.svg",
    iconColor: "#A15549",
    labelColorClass: "text-[#A15549]",
    chipBgClass: "",
  },
  {
    label: "Stars & quality",
    title: "Spend where it actually counts",
    titleColor: "#4559B0",
    description:
      "Spot the members and programs most likely to move your Stars and quality scores.",
    iconSrc: "/icons/Certified-Ribbon--Streamline-Ultimate.svg",
    iconColor: "#4559B0",
    labelColorClass: "text-[#4559B0]",
    chipBgClass: "",
  },
  {
    label: "Growth & retention",
    title: "Build plans members stick with",
    titleColor: "#6F7A42",
    description:
      "See which trade-offs members are fine with and which ones make them leave, so you can build plans they actually want to stay in.",
    iconSrc: "/icons/Customer-Retention-Cycle--Streamline-Ultimate.svg",
    iconColor: "#6F7A42",
    labelColorClass: "text-[#6F7A42]",
    chipBgClass: "",
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

export default function WhoItServes(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[40px]">
      {/* Label */}

      <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-5">
        Who It Serves
      </div>

      {/* Headline + subtext */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 items-end mb-12">
        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] max-w-[840px] text-[#1A1A1A]">
          A voice for every stakeholder.
        </h2>
        <p className="text-[15px] md:text-[17px] leading-[1.65] text-[#57534C] max-w-[540px]">
          See what happens when actuarial, product, network, pharmacy, Stars, and growth teams work from the same members, assumptions, and scenarios.
        </p>
      </div>

      {/* 3×2 card grid */}

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

    </section>
  );
}
