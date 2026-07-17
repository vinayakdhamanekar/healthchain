import type { JSX } from "react";

export default function ReadyCTA(): JSX.Element {
  return (
    <section className="bg-[#f7f3EF]">
      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr]">

        {/* Left: full-bleed photo */}
        <div className="relative h-[280px] md:h-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/iStock-2166223621 1.png"
            alt="Health Chain customer reviewing insights on a laptop"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: headline, badge, copy, CTA */}
        <div className="flex flex-col justify-center px-7 md:px-14 lg:px-20 py-14 md:py-20">
          <div className="leading-[1.08]">
            <div className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
              Your data is ready.
            </div>
            <span className="inline-block whitespace-nowrap bg-[#F1D9D1] text-[#AE5740] px-[15px] pt-[1px] pb-[5px] rounded-[9px] text-[32px] md:text-[42px] lg:text-[48px] font-semibold tracking-[-0.02em] mt-2">
              Are you?
            </span>
          </div>

          <p className="max-w-[430px] text-[16px] md:text-[17px] leading-[1.6] text-[#57534C] mt-6">
            See how Health Chain turns fragmented payer data into clean,
            actionable intelligence-in days, not months.
          </p>

          <a
            href="#"
            className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300 mt-9 w-fit"
          >
            Request a Demo
            <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
