import type { JSX } from "react";
import Link from "next/link";

export default function ContactCTA(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF] px-7 md:px-14 py-[90px] border-t border-[#E5DECF]">
      <div className="max-w-[900px] mx-auto text-center">

        {/* Headline */}
        <div className="leading-[1.04]">
          <span className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] text-[#34332C]">
            Ready to make{" "}
          </span>

          <span className="inline-block bg-[#F1D9D1] text-[#AE5740] px-[18px] pb-[6px] rounded-[10px] text-[36px] md:text-[51px] font-semibold tracking-[-0.03em]">
            your data
          </span>

          <span className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] text-[#34332C]">
            {" "}work?
          </span>
        </div>

        {/* Description */}
        <p className="text-[17px] leading-[1.6] text-[#57534C] mt-8 max-w-[620px] mx-auto">
           See how Health Chain can unify member data, automate compliance, and get you AI-ready-in weeks, not quarters. 
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

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
    </section>
  );
}