import type { JSX } from "react";
import Reveal, { type RevealDelay } from "./Reveal";
import { EYEBROW, HL, H_SECTION, SECTION, SECTION_FRAME, SECTION_HEAD } from "./styles";

interface ScopeItem {
  title: string;
  body: string;
  delay: RevealDelay;
  /** Per-position padding and divider rules for the 1 / 2 / 4 column layouts. */
  layout: string;
}

const PAD = "pt-[26px] pb-7 px-0 min-[721px]:pt-[30px] min-[721px]:pb-8 min-[1025px]:pt-8 min-[1025px]:pb-[34px]";

const ITEMS: ScopeItem[] = [
  {
    title: "Not a FHIR server",
    body: "It consumes a FHIR API; it does not serve one.",
    delay: 0,
    layout: "min-[721px]:pl-0 min-[721px]:pr-7",
  },
  {
    title: "Not an EHR",
    body: "It's an analytics layer downstream of your clinical systems.",
    delay: 60,
    layout: "border-t min-[721px]:border-t-0 min-[721px]:border-l min-[721px]:pl-7 min-[721px]:pr-0 min-[1025px]:pr-7",
  },
  {
    title: "Not a validator",
    body: "No terminology service. Resources are ingested as-is.",
    delay: 120,
    layout: "border-t min-[721px]:pl-0 min-[721px]:pr-7 min-[1025px]:border-t-0 min-[1025px]:border-l min-[1025px]:pl-7",
  },
  {
    title: "Not a transactional store",
    body: "The engine is columnar, built for analytics, not CRUD.",
    delay: 180,
    layout: "border-t min-[721px]:border-l min-[721px]:pl-7 min-[721px]:pr-0 min-[1025px]:border-t-0",
  },
];

export default function HyperionScope(): JSX.Element {
  return (
    <section id="scope" aria-labelledby="scope-title" className={`${SECTION} ${SECTION_FRAME}`}>
      <div className={SECTION_HEAD}>
        <p className={EYEBROW}>Scope</p>
        <h2 id="scope-title" className={`${H_SECTION} text-[#34332C]`}>
          What Hyperion is <span className={HL}>not</span>
        </h2>
      </div>
      <ul className="grid grid-cols-1 border-y border-[#E5DECF] min-[721px]:grid-cols-2 min-[1025px]:grid-cols-4">
        {ITEMS.map((item) => (
          <Reveal key={item.title} as="li" delay={item.delay} className={`border-[#E5DECF] ${PAD} ${item.layout}`}>
            <h3 className="text-[21px] tracking-[-0.01em] mb-[10px] font-semibold text-[#34332C]">{item.title}</h3>
            <p className="text-[15px] leading-[1.55] text-[#6B665D]">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
