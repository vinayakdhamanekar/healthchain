import type { JSX } from "react";
import Link from "next/link";

const CONTACT_HREF = "/contact?interest=riskrev-pro";

export default function ClosingCTA(): JSX.Element {
  return (
    <section className="px-7 md:px-14 py-[90px] bg-[#F7F3EF] border-t border-[#E5DECF]">
      <div className="max-w-[820px] mx-auto text-center">
        {/* Pull statement */}
        <p className="text-[24px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.3] text-[#34332C]">
          Your members&apos; full risk picture is already out there — in
          charts, claims, and CMS files that don&apos;t talk to each other
          yet.
        </p>

        {/* Body */}
        <p className="text-[17px] leading-[1.6] text-[#57534C] mt-6 max-w-[560px] mx-auto">
          RiskRev Pro makes them talk. See what it finds in your first batch.
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link
            href={CONTACT_HREF}
            className="group inline-flex items-center gap-[14px] bg-[#A8543C] text-[#FBF9F4] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
          >
            Get a walkthrough of RiskRev Pro
            <span className="w-[50px] h-[30px] rounded-full border border-white/40 inline-flex items-center justify-center text-[14px] shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
