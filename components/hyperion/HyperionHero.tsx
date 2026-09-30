import type { JSX } from "react";
import Reveal from "./Reveal";
import { CodeLines, ConsoleDots, GitHubIcon } from "./primitives";
import {
  CONSOLE_DOT_LIGHT,
  EXTERNAL,
  EYEBROW,
  GITHUB_URL,
  GUTTER,
  HL,
  H_DISPLAY,
  STRONG,
  btnArrow,
  btnOutline,
  btnPrimary,
  tag,
  type CodeLine,
  type TagTone,
} from "./styles";

interface HeroChip {
  label: string;
  tone: TagTone;
}

interface ResultRow {
  gender: string;
  patients: string;
}

const CHIPS: HeroChip[] = [
  { label: "Apache 2.0", tone: "olive" },
  { label: "FHIR R4 · 146 resources", tone: "terra" },
  { label: "MySQL wire protocol", tone: "indigo" },
  { label: "StarRocks engine", tone: "terra" },
];

const QUERY: CodeLine[] = [
  [["com", "-- Population breakdown, straight from FHIR R4"]],
  [["kw", "SELECT"], "   ", ["id", "gender"], ", ", ["fn", "COUNT"], "(*) ", ["kw", "AS"], " ", ["id", "patients"]],
  [["kw", "FROM"], "     ", ["id", "_hyperion_core_.patient"]],
  [["kw", "WHERE"], "    ", ["id", "birth_date"], " < ", ["str", "'1990-01-01'"]],
  [["kw", "GROUP BY"], " ", ["id", "gender"], ";"],
];

const RESULTS: ResultRow[] = [
  { gender: "female", patients: "1,284" },
  { gender: "male", patients: "1,197" },
  { gender: "unknown", patients: "23" },
];

const TH = "text-left font-medium text-[#6B665D] px-2 py-[6px] border-b border-[#E5DECF]";
const TD = "px-2 py-[7px] text-[#34332C] border-b border-[#E5DECF]";

export default function HyperionHero(): JSX.Element {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`relative bg-[#F7F3EF] ${GUTTER} pt-[120px] pb-14 min-[721px]:pt-[125px] min-[721px]:pb-[72px]`}
    >
      <div className="grid grid-cols-1 gap-16 items-center min-[1025px]:grid-cols-[1.04fr_.96fr] min-[1025px]:gap-14">
        {/* Copy */}
        <div className="min-w-0">
          <Reveal as="p" className={EYEBROW}>
            FHIR-native analytics · Powered by StarRocks
          </Reveal>
          <Reveal as="h1" id="hero-title" delay={80} className={H_DISPLAY}>
            <span className="block">Query FHIR with</span>
            <span className={`${HL} mt-2`}>plain SQL.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="max-w-[580px] text-[length:clamp(17px,1.5vw,19px)] leading-[1.55] text-[#57534C] mt-7"
          >
            Pull HL7&nbsp;FHIR&nbsp;R4 from any compliant API into a columnar, MySQL-compatible database
            and write <strong className={STRONG}>plain SQL</strong> for population analytics. No FHIRPath,
            no JSON-flattening pipelines, no proprietary driver.
          </Reveal>
          <Reveal delay={240} className="flex flex-wrap gap-[14px] mt-[38px]">
            <a
              {...EXTERNAL}
              href={GITHUB_URL}
              className={`${btnPrimary()} flex-auto justify-between min-[721px]:flex-initial min-[721px]:justify-normal`}
            >
              <GitHubIcon /> View on GitHub
              <span className={btnArrow()} aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#quickstart"
              className={`${btnOutline()} flex-auto justify-center min-[721px]:flex-initial min-[721px]:justify-normal`}
            >
              Quickstart Guide{" "}
              <span className={btnArrow("md", false)} aria-hidden="true">
                ↓
              </span>
            </a>
          </Reveal>
          <Reveal as="ul" delay={320} aria-label="At a glance" className="flex flex-wrap gap-2 mt-[34px]">
            {CHIPS.map((chip) => (
              <li key={chip.label} className={tag(chip.tone)}>
                {chip.label}
              </li>
            ))}
          </Reveal>
        </div>

        {/* Visual: SQL console */}
        <Reveal delay={200} className="relative min-w-0 max-w-[620px] min-[1025px]:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-[-14px_-10px_-14px_14px] min-[721px]:inset-[-28px_-28px_-28px_36px]"
          />
          {/* mx-10 my-4 reproduces the browser's default <figure> margin, which the HTML keeps */}
          <figure
            aria-label="Example: a SQL query against Hyperion's FHIR-shaped tables"
            className="relative mx-10 my-4 bg-[#FBF9F4] border border-[#E4DED0] rounded-[14px] shadow-[0_20px_60px_rgba(60,45,30,.18)] overflow-hidden"
          >
            <div className="flex items-center gap-[10px] px-4 py-3 border-b border-[#E5DECF] bg-white">
              <ConsoleDots dotClass={CONSOLE_DOT_LIGHT} />
              <span className="font-mono text-[12px] text-[#6B665D] tracking-[.3px] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                mysql&gt; _hyperion_core_
              </span>
              <span className={`${tag("olive")} ml-auto`}>Example</span>
            </div>
            <pre className="m-0 p-4 text-[12.5px] min-[721px]:px-5 min-[721px]:pt-5 min-[721px]:pb-[18px] min-[721px]:text-[13.5px] leading-[1.7] text-[#4A463F] overflow-x-auto">
              <CodeLines lines={QUERY} />
            </pre>
            <div className="border-t border-dashed border-[#CFC7B8] px-5 pt-4 pb-5">
              <p className="font-mono text-[11px] tracking-[1.2px] uppercase text-[#6B665D] mb-[10px]">
                Illustrative output
              </p>
              <table className="w-full border-collapse font-mono text-[13px]">
                <thead>
                  <tr>
                    <th scope="col" className={TH}>
                      gender
                    </th>
                    <th scope="col" className={`${TH} text-right`}>
                      patients
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child_td]:border-b-0">
                  {RESULTS.map((row) => (
                    <tr key={row.gender}>
                      <td className={TD}>{row.gender}</td>
                      <td className={`${TD} text-right`}>{row.patients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="flex items-baseline gap-2 px-5 py-3 bg-[#F4EFE8] border-t border-[#E5DECF] font-mono text-[11.5px] text-[#6B665D]">
              <span
                aria-hidden="true"
                className="inline-block w-[7px] h-[7px] rounded-full bg-[#9FB06E] flex-none -translate-y-px"
              />
              Standard SQL · any MySQL client · no FHIRPath
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
