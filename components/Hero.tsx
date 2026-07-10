import type { JSX } from "react";
import Link from "next/link";

export default function Hero(): JSX.Element {
  return (
    <section className="relative min-h-screen px-7 md:px-14 pt-[100px] md:pt-[110px] pb-[40px] bg-[#f7f3EF]">
      <div className="grid grid-cols-1 md:grid-cols-[1.04fr_0.96fr] gap-12 items-center h-full">

        {/* Left: headline + subtext + CTAs */}
        <div>
          <div className="leading-[1.04]">
            <span className="inline-block whitespace-nowrap bg-[#F1D9D1] text-[#AE5740] px-[15px] pt-[1px] pb-[5px] rounded-[9px] text-[36px] md:text-[51px] font-semibold tracking-[-0.025em]">
              Your data,
            </span>
            <div className="text-[36px] md:text-[51px] font-semibold tracking-[-0.025em] text-[#34332C] mt-2">
              made ready for action.
            </div>
          </div>

          <p className="max-w-[580px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[30px]">
            Health Chain captures, curates, and delivers clean longitudinal
            member data, so payers can act on it, not wrestle with it.
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

        {/* Right: portrait with pattern + glow + photo stacked */}
        <div className="relative hidden md:block self-start w-full max-w-[440px] ml-auto">

          {/*
           * LAYER 1 — Pattern image (furthest back).
           * -top-[110px] cancels the section's md:pt-[110px] so this layer
           * starts flush with the top of the page, behind the fixed Navbar,
           * matching the design where the striped pattern peeks out above
           * and around the floating nav pill.
           */}
          <div
            className="absolute -top-[110px] -right-[50px] -bottom-[40px] left-[24px] overflow-hidden"
            style={{
              backgroundImage: "url('/Patterns/pattern1.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          />

          {/* LAYER 2 — Portrait photo */}
          <div className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Home_banner.png"
              alt="Health Chain — healthcare team reviewing member data"
              className="w-full h-full object-cover object-top"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
