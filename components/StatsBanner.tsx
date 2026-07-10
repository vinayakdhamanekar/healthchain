import type { JSX } from "react";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  {
    value: "95%",
    suffix: "↓",
    label: "in launch timeline from 12-18 months to days",
  },
  {
    value: "50+",
    label: "data sources unified",
  },
  {
    value: "FHIR",
    label: "-ready data output",
  },
];

export default function StatsBanner(): JSX.Element {
  return (
    <section className="relative overflow-hidden px-7 md:px-14">

      {/* Colour gradient base layer */}
      <div className="absolute inset-0 bg-[linear-gradient(95deg,#3f5a4a_0%,#6b7a5e_18%,#94977c_34%,#cdb78f_50%,#8b9389_64%,#5e6f78_80%,#454a5e_100%)]" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,40,34,0.72),rgba(30,34,30,0.78))]" />

      {/* Inner wrapper with side borders */}
      <div className="relative ">

        {/* Top: label + headline + subtext */}
        <div className="px-7 md:px-11 pt-11 pb-[52px] border-b border-white/[.18]">
          <div className="font-mono font-semibold text-[13px] tracking-[2px] text-[rgba(244,241,234,0.72)] uppercase mb-7">
            Proven in Production
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.32fr_0.68fr] gap-10 md:gap-12 items-center">
            <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-semibold leading-[1.02] tracking-[-0.025em] text-[#F7F4EE] m-0">
              What used to take months now takes days.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.55] text-[rgba(244,241,234,0.82)] m-0">
              A Regional Blue Plan went live with Health Chain, transforming
              12–18 month integrations into days, not months.
            </p>
          </div>
        </div>

        {/* Bottom: three stats */}
        <div className="px-7 md:px-11 pt-[50px] pb-[54px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <div className="flex items-center gap-1.5 leading-none text-[#F7F4EE]">
                  <span className="text-[60px] md:text-[80px] lg:text-[90px] font-semibold tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-[42px] md:text-[56px] lg:text-[62px] font-normal">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[12px] tracking-[0.5px] text-[rgba(244,241,234,0.7)] mt-[22px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
