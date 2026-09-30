import type { JSX } from "react";
import Image from "next/image";
import Reveal, { type RevealDelay } from "./Reveal";
import { ArrowRightIcon } from "./primitives";
import {
  CARD_HOVER,
  EXTERNAL,
  EYEBROW,
  HL,
  H_SECTION,
  LEDE_SM,
  SECTION,
  SECTION_CANVAS,
  SECTION_HEAD,
  STRONG,
  tag,
  type TagTone,
} from "./styles";

interface FlowStep {
  idx: string;
  label: string;
  sub: string;
  healthChain?: boolean;
  delay: RevealDelay;
}

interface Attribution {
  tag: string;
  tone: TagTone;
  title: string;
  body: string;
  delay: RevealDelay;
}

const STEPS: FlowStep[] = [
  { idx: "Source", label: "FHIR R4 data", sub: "Any compliant FHIR API", delay: 0 },
  {
    idx: "Health Chain",
    label: "Hyperion",
    sub: "Health Chain's FHIR analytics layer - schema, ingestion, mapping",
    healthChain: true,
    delay: 80,
  },
  { idx: "Engine", label: "StarRocks", sub: "Analytical database engine - unmodified upstream", delay: 160 },
  { idx: "Consume", label: "Standard SQL / BI / AI", sub: "Power BI, Tableau, dbt, JDBC/ODBC, notebooks", delay: 240 },
];

const ATTRIBUTIONS: Attribution[] = [
  {
    tag: "Health Chain",
    tone: "terra",
    title: "What Health Chain built",
    body: "The FHIR R4-derived schema, the ingestion & mapping pipeline, live/batch loading, and everything that turns FHIR resources into queryable SQL tables.",
    delay: 0,
  },
  {
    tag: "StarRocks",
    tone: "indigo",
    title: "What StarRocks provides",
    body: "The columnar, shared-data analytical engine underneath - storage/compute separation, the MySQL wire protocol, and query performance at scale. Run unmodified, as a container image pulled at runtime.",
    delay: 80,
  },
];

function FlowCard({ step }: { step: FlowStep }): JSX.Element {
  const hc = step.healthChain === true;
  return (
    <Reveal
      as="li"
      delay={step.delay}
      className={`border rounded-[14px] pt-[22px] px-[22px] pb-6 flex flex-col gap-2 ${CARD_HOVER} ${
        hc ? "bg-[#A8543C] border-[#A8543C]" : "bg-[#FBF9F4] border-[#E5DECF]"
      }`}
    >
      <span
        className={`font-mono text-[12px] tracking-[1.2px] uppercase ${
          hc ? "text-[rgba(251,249,244,.75)]" : "text-[#6B665D]"
        }`}
      >
        {step.idx}
      </span>
      <span
        className={`text-[20px] font-semibold tracking-[-0.01em] ${
          hc ? "text-[#FBF9F4] flex items-center gap-[10px]" : "text-[#34332C]"
        }`}
      >
        {hc && (
          <Image
            src="/logo.png"
            alt=""
            width={22}
            height={22}
            className="block w-[22px] h-[22px] bg-[#FBF9F4] rounded-full p-[2px]"
          />
        )}
        {step.label}
      </span>
      <span className={`text-[14.5px] leading-[1.5] ${hc ? "text-[rgba(251,249,244,.88)]" : "text-[#5E594F]"}`}>
        {step.sub}
      </span>
    </Reveal>
  );
}

function FlowArrow(): JSX.Element {
  return (
    <li aria-hidden="true" className="hidden min-[1025px]:flex items-center justify-center text-[#CFC7B8] [&_svg]:w-[22px] [&_svg]:h-[22px]">
      <ArrowRightIcon />
    </li>
  );
}

export default function HyperionPoweredBy(): JSX.Element {
  return (
    <section id="powered-by" aria-labelledby="powered-title" className={`${SECTION} ${SECTION_CANVAS}`}>
      <div className={SECTION_HEAD}>
        <p className={EYEBROW}>Built by Health Chain · Powered by StarRocks</p>
        <h2 id="powered-title" className={`${H_SECTION} text-[#34332C]`}>
          Two technologies, <span className={HL}>one clear line.</span>
        </h2>
        <p className={LEDE_SM}>
          Hyperion is an open-source project created and maintained by{" "}
          <strong className={STRONG}>Health&nbsp;Chain</strong>. It runs on{" "}
          <a {...EXTERNAL} href="https://github.com/StarRocks/starrocks" className="underline">
            StarRocks
          </a>
          , a world-class open-source analytical database - we haven&apos;t modified the StarRocks codebase. What
          Health Chain built is everything above it: the FHIR&nbsp;R4 schema, the ingestion pipeline, and the
          healthcare data model that makes it queryable.
        </p>
      </div>

      <ol
        aria-label="Data flow from FHIR to SQL"
        className="grid grid-cols-1 items-stretch gap-3 mb-10 min-[721px]:grid-cols-2 min-[1025px]:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]"
      >
        {STEPS.map((step, i) => (
          <FlowStepWithArrow key={step.idx} step={step} last={i === STEPS.length - 1} />
        ))}
      </ol>

      <div className="grid grid-cols-1 border-y border-[#E5DECF] min-[721px]:grid-cols-2">
        {ATTRIBUTIONS.map((col, i) => (
          <Reveal
            key={col.tag}
            delay={col.delay}
            className={
              i === 0
                ? "pt-7 pb-[30px] min-[721px]:pt-[34px] min-[721px]:pb-9 min-[721px]:pr-10"
                : "pt-7 pb-[30px] border-t border-[#E5DECF] min-[721px]:pt-[34px] min-[721px]:pb-9 min-[721px]:pl-10 min-[721px]:border-t-0 min-[721px]:border-l"
            }
          >
            <span className={tag(col.tone)}>{col.tag}</span>
            <h3 className="text-[24px] tracking-[-0.01em] mt-[14px] mb-3 font-semibold text-[#34332C]">{col.title}</h3>
            <p className="text-[16px] leading-[1.6] text-[#5E594F] max-w-[56ch]">{col.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlowStepWithArrow({ step, last }: { step: FlowStep; last: boolean }): JSX.Element {
  return (
    <>
      <FlowCard step={step} />
      {!last && <FlowArrow />}
    </>
  );
}
