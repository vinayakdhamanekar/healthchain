import type { JSX } from "react";
import Link from "next/link";

export default function BenefitdesignHero(): JSX.Element {
  return (
    <section
      className="relative px-7 md:px-14 pt-[60px] pb-[72px] text-center"
      style={{
        backgroundImage: "url('/Patterns/pattern8.png')", // change filename
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",       // or "contain"
        backgroundPosition: "center",
      }}
    >
      {/* Category breadcrumb */}
      <div className="mt-28 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.1em] uppercase text-[#fff] mb-6">
        <span>Solution</span>
        <span className="text-[#fff]">→</span>
        <span>Benefit Design & Intelligence</span>
      </div>

      {/* Headline */}
      <h1 className="text-[38px] md:text-[56px] lg:text-[68px] max-w-[880px]  font-semibold tracking-[-0.03em] leading-[1.05] text-[#fff] mx-auto">
        Design benefits with evidence, not guesswork.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-[17px] md:text-[19px] leading-[1.6] text-[#fff] max-w-[700px] mx-auto">
        MA and Medicaid bid windows are tight. Health Chain primes your member data for benefit design scenarios, so every decision is made with data-backed evidence.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-[14px] bg-white text-[#A8543C] text-[16px] font-medium py-[15px] pl-[26px] pr-[15px] rounded-[42px] transition-colors duration-300"
        >
          Request a Demo

          <span
            className="w-[50px] h-[30px] rounded-full border border-white/40 bg-white inline-flex items-center justify-center text-[14px] shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-[#A8543C]"
          >
            →
          </span>
        </Link>
        <a
          href="#"
          className="inline-flex items-center bg-transparent border border-[#CFC7B8] text-[#fff] text-[16px] py-[15px] px-7 rounded-[42px] hover:bg-white transition-colors duration-300"
        >
          Explore Platform
        </a>
      </div>
    </section>
  );
}
