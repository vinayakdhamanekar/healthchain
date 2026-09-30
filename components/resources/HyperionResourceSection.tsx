import type { JSX } from "react";
import { HYPERION_ANNOUNCEMENT } from "@/data/hyperion";

/**
 * Hyperion open-source announcement on the Resources page. Same shell as
 * ResourceCategorySection (padding, heading, background) with one wide card
 * styled like ResourceCard. Content is shared with the Home hero modal.
 */
export default function HyperionResourceSection(): JSX.Element {
  const { section, label, title, summary, ctaLabel, href } = HYPERION_ANNOUNCEMENT;

  return (
    <section id="hyperion" className="scroll-mt-[100px] px-7 md:px-14 py-14 md:py-16 bg-[#F7F3EF]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <h2 className="text-[28px] md:text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C]">
          {section}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 bg-[#FBF9F4] border border-[#E5DECF] rounded-[14px] p-7 md:p-10">
        <div className="max-w-[720px]">
          <span className="inline-block font-mono text-[11px] font-medium tracking-[0.06em] uppercase px-[11px] py-[5px] rounded-[6px] mb-5 bg-[#D2E3AC] text-[#51602F]">
            {label}
          </span>
          <h3 className="text-[22px] md:text-[26px] font-semibold leading-[1.22] tracking-[-0.015em] text-[#34332C] mb-3">
            {title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-[#6B665D]">{summary}</p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group self-start md:self-auto shrink-0 inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[15px] font-medium py-[13px] pl-[24px] pr-[13px] rounded-[42px] transition-colors duration-300 hover:bg-[#97492F]"
        >
          {ctaLabel}
          <span
            aria-hidden="true"
            className="w-[44px] h-[28px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
