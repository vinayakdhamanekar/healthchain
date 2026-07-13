import type { JSX } from "react";
import Link from "next/link";

export default function PlatformHero(): JSX.Element {
  return (
    <section className="relative px-7 md:px-14 pt-[100px] md:pt-[110px] pb-[0px] bg-[#F7F3EF]">
      <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.08fr] gap-8 items-start">
        {/* Left: portrait with blurred glow */}

        <div className="relative hidden md:block self-start w-full max-w-[440px]">

          <div className="absolute -top-[110px] left-0 right-0">
            <div className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,0.18)]">
              <img
                src="/platform.png"
                alt="Health Chain Platform"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Spacer so the grid keeps its height */}
          <div className="aspect-[3/4]" />

        </div>

        {/* Right: label + headline + subtext + CTAs */}
        <div className="md:mt-8">
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-4">
            The Platform
          </div>

          <div className="leading-[1.04]">
            <span className="inline-block bg-[#F1D9D1] text-[#AE5740] px-[15px] pt-[1px] pb-[5px] rounded-[9px] text-[36px] md:text-[48px] lg:text-[51px] font-semibold tracking-[-0.025em] whitespace-nowrap">
              The data layer
            </span>
            <div className="text-[36px] md:text-[48px] lg:text-[51px] font-semibold tracking-[-0.025em] text-[#34332C] mt-2">
              healthcare runs on.
            </div>
          </div>

          <p className="max-w-[566px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[30px]">
            Health Chain pulls together every piece of member data you already pay for and turns it into one trustworthy record your teams can actually use.
          </p>

          <div className="flex flex-wrap gap-[14px] mt-[42px]">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
            >
              Request a Demo

              <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
                →
              </span>
            </Link>
            <a
              href="#"
              className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white transition-colors duration-300"
            >
              Explore Platform
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
