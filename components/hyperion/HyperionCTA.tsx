import type { JSX } from "react";
import { EXTERNAL, GITHUB_URL, GUTTER, HL, btnArrow, btnOutline, btnPrimary } from "./styles";

const MOBILE_FULL = "flex-auto justify-center min-[721px]:flex-initial min-[721px]:justify-normal";

export default function HyperionCTA(): JSX.Element {
  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className={`grid grid-cols-1 gap-10 items-center py-[72px] min-[721px]:py-[88px] ${GUTTER} bg-[#F7F3EF] border-t border-[#E5DECF] min-[1025px]:grid-cols-[1.2fr_.8fr]`}
    >
      <div>
        <h2
          id="cta-title"
          className="text-[length:clamp(32px,4vw,48px)] leading-[1.08] tracking-[-0.02em] font-semibold text-[#34332C]"
        >
          Your FHIR data,
          <br />
          <span className={`${HL} mt-2`}>ready for SQL.</span>
        </h2>
        <p className="text-[17px] leading-[1.6] text-[#57534C] mt-5 max-w-[46ch]">
          Free and open source under the Apache&nbsp;2.0 license. Clone the repo, point it at a FHIR endpoint, and
          start querying in minutes.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 justify-start min-[1025px]:justify-end">
        <a href="#quickstart" className={`${btnPrimary()} ${MOBILE_FULL}`}>
          Quickstart Guide
          <span className={btnArrow()} aria-hidden="true">
            →
          </span>
        </a>
        <a {...EXTERNAL} href={GITHUB_URL} className={`${btnOutline()} ${MOBILE_FULL}`}>
          View on GitHub
        </a>
      </div>
    </section>
  );
}
