import type { JSX } from "react";
import Link from "next/link";

export default function CareersHero(): JSX.Element {
  return (
    <>
    <section className="relative px-7 md:px-14 pt-[100px] md:pt-[110px] pb-[20px] bg-[#F7F3EF]">
          <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.08fr] gap-8 items-start">
            {/* Left: portrait with blurred glow */}
    
            <div className="relative hidden md:block self-start w-full max-w-[440px]">
    
              <div className="absolute -top-[110px] left-0 right-0">
                <div className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,0.18)]">
                  <img
                    src="/careers.png"
                    alt="Careers"
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
                Careers
              </div>
    
              <div className="leading-[1.04]">
                
                <div className="text-[36px] md:text-[48px] lg:text-[51px] font-semibold tracking-[-0.025em] text-[#34332C] mt-2">
                  Health Chain Careers
                </div>
              </div>
    
              <p className="max-w-[566px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[30px]">
                Join the only team that owns the biggest gap in the healthcare data world - providing complete data readiness for payers.
              </p>
    
              <div className="flex flex-wrap gap-[14px] mt-[42px]">
                
                <a
                  href="#"
                  className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#34332C] text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white transition-colors duration-300"
                >
                  Explore Open Positions
                </a>
              </div>
            </div>
          </div>
        </section>

    
    </>
  );
}
