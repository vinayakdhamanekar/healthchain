import type { JSX } from "react";

export default function JobOpenings(): JSX.Element {
  return (
    <section
      className="relative  px-7 md:px-14 pt-[60px] pb-[72px] text-center"
      style={{
        backgroundImage: "url('/Patterns/pattern8.png')", // change filename
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",       // or "contain"
        backgroundPosition: "center",
      }}
    >
      {/* Label */}
      <div className="max-w-[900px] mx-auto text-center">
      <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-white/40 mb-7">
        Job Openings / Applications
      </p>

      {/* Headline */}
      <h2 className="text-[32px] md:text-[42px]  lg:text-[60px] font-semibold tracking-[-0.03em] leading-[1.07] text-white mb-7">
        We're hiring across engineering, data, and go-to-market.
      </h2>

      {/* Subtext */}
      <p className="text-[15px]  md:text-[17px] leading-[1.72] text-white/55 mb-10">
        We don't have a public job board yet, but we're always looking for people
        who want to help solve the hardest data problems in healthcare. Reach out
        and tell us where you'd fit.
      </p>
      </div>

      {/* CTA */}
      {/* <a
        href="#"
        className="inline-flex items-center gap-[14px] border border-white/30 text-white text-[14px] font-medium py-[13px] pl-[22px] pr-[14px] rounded-[42px] hover:bg-white/10 transition-colors"
      >
        Explore Open Positions
        
      </a> */}
    </section>
  );
}
