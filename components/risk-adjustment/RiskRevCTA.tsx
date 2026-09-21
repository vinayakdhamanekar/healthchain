import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=longitudinal&product=riskrev";

export default function RiskRevCTA(): JSX.Element {
  return (
    <section className="px-7 md:px-14 py-[90px] bg-[#F7F3EF] border-t border-[#E5DECF]">
      <div className="max-w-[900px] mx-auto text-center">
        {/* Headline */}
        <div className="leading-[1.04]">
          <span className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] text-[#34332C]">
            See RiskRev Pro in {" "}
 
          </span>
          <span className="inline-block bg-[#F1D9D1] text-[#AE5740] px-[18px] pb-[6px] rounded-[10px] text-[36px] md:text-[51px] font-semibold tracking-[-0.03em]">
            your workflow
          </span>
          <span className="text-[36px] md:text-[51px] font-semibold tracking-[-0.03em] text-[#34332C]">
            .
          </span>
        </div>

        {/* Description */}
        <p className="text-[17px] leading-[1.6] text-[#57534C] mt-8 max-w-[620px] mx-auto">
          Tell us about your programs, review volume and current coding process. We will focus the demonstration on the workflow your team needs
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link
            href={CONTACT_HREF}
            className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
          >
            Request a RiskRev Pro Demo
            <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
