import type { JSX } from "react";
import Link from "next/link";

export default function AboutHero(): JSX.Element {
  return (
    <section className="relative bg-[#F7F3EF] px-7 md:px-14 pt-[100px] md:pt-[110px] pb-[20px]">
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 items-start">

        {/* Left */}
        <div className="md:mt-8">
          {/* Tag */}
          <p className="text-[13px] font-semibold tracking-[0.13em] uppercase text-[#A8543C] mb-6">
            About Health Chain
          </p>

          {/* Headline */}
          <h1 className="text-[36px] md:text-[51px]  font-semibold tracking-[-0.03em] leading-[1.06] text-[#1A1A1A]">
            Your partner in<br />
            making health data<br />
            <span className="inline-block whitespace-nowrap bg-[#F1D9D1] text-[#AE5740] px-[15px] pt-[1px] pb-[5px] rounded-[9px] text-[36px] md:text-[51px] font-semibold tracking-[-0.025em]">
              that works.
            </span>

          </h1>

          {/* Subtext */}
          <p className="mt-7 text-[15px] md:text-[17px] leading-[1.7] text-[#57534C] max-w-[540px]">
            Building a world where organizations responsible for health make
            every critical decision from one trusted foundation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-9">
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

        {/* Right: photo */}
        {/* Right: Hero Image */}
        <div className="relative hidden md:block self-start w-full max-w-[480px] ml-auto">

          {/* Pull image to top of page */}
          <div className="absolute -top-[110px] left-0 right-0">
            <div className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,0.18)]">
              <img
                src="/about_us.png" // Replace with your image
                alt="About Health Chain"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Spacer */}
          

        </div>

      </div>
    </section>
  );
}
