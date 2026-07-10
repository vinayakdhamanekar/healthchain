import type { JSX } from "react";

interface Value {
  number: string;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    number: "01",
    title: "Data is infrastructure, not a feature.",
    description:
      "Point solutions are a dime a dozen. Instead of providing another dashboard, we build a foundation.",
  },
  {
    number: "02",
    title: "Earn trust through transparency.",
    description:
      "Every output is auditable, every transformation is traceable, and every decision is defensible.",
  },
  {
    number: "03",
    title: "Operate with urgency, deliver with precision.",
    description:
      "We know that the stakes are high. Healthcare doesn't wait, so neither do we.",
  },
  {
    number: "04",
    title: "Build for the organization, measure by the member.",
    description:
      "Our buyer is the health system, but our benchmark is the person they serve. We make sure both are taken care of.",
  },
];

function ValueCell({
  value,
  className,
}: {
  value: Value;
  className?: string;
}): JSX.Element {
  return (
    <div className={`p-8 md:p-10 flex flex-col ${className ?? ""}`}>
      {/* Large number */}
      <div className="text-[72px] md:text-[88px] font-normal leading-[0.9] tracking-[-0.02em] text-[#A8543C] mb-6">
        {value.number}
      </div>

      {/* Title */}
      <h3 className="text-[18px] md:text-[20px] font-semibold leading-snug text-[#1A1A1A] mb-3">
        {value.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] md:text-[15px] leading-[1.72] text-[#6B6B6B]">
        {value.description}
      </p>
    </div>
  );
}

export default function AboutValues(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] border-t border-[#928b86]">
      {/*
        Desktop grid:
          col 1 (left)  → label + headline + subtext, spans 2 rows
          col 2 + 3     → 2 × 2 value cells
      */}
      <div className="grid grid-cols-1 md:grid-cols-3">

        {/* ── Left column ── */}
        <div className="p-8 md:p-12 flex flex-col gap-5 border-b md:border-b-0 md:border-r border-[#928b86] md:[grid-row:1/3]">
          <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-[#A8543C]">
            Core Values
          </p>
          <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#1A1A1A]">
            The rules we build by.
          </h2>
          <p className="text-[15px] md:text-[17px] leading-[1.75] text-[#57534C]">
            While we work to equip your organization with complete data readiness, these values are infused into everything we do.
          </p>
        </div>

        {/* ── Value 01 — col 2, row 1 ── */}
        <ValueCell
          value={VALUES[0]}
          className="border-b border-[#928b86]"
        />

        {/* ── Value 02 — col 3, row 1 ── */}
        <ValueCell
          value={VALUES[1]}
          className="border-b border-[#928b86] md:border-l md:border-l-[#928b86]"
        />

        {/* ── Value 03 — col 2, row 2 ── */}
        <ValueCell value={VALUES[2]} className="border-b md:border-b-0 border-[#928b86]" />

        {/* ── Value 04 — col 3, row 2 ── */}
        <ValueCell
          value={VALUES[3]}
          className="md:border-l md:border-l-[#928b86]"
        />

      </div>
    </section>
  );
}
