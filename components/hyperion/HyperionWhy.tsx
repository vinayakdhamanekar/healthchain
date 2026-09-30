import type { JSX, ReactNode } from "react";
import Reveal, { type RevealDelay } from "./Reveal";
import { InlineCode } from "./primitives";
import {
  CARD_HOVER,
  EYEBROW,
  HL,
  H_SECTION,
  LEDE_SM,
  SECTION,
  SECTION_CANVAS,
  SECTION_HEAD,
} from "./styles";

type FeatureSize = "lg" | "md" | "wide";

interface Feature {
  num: string;
  label: string;
  title: string;
  body: ReactNode;
  size: FeatureSize;
  delay: RevealDelay;
}

const FEATURES: Feature[] = [
  {
    num: "01",
    label: "Familiar by design",
    title: "It's just SQL",
    body: (
      <>
        Tables and columns map to FHIR&nbsp;R4 directly, so <InlineCode>JOIN</InlineCode>,{" "}
        <InlineCode>GROUP&nbsp;BY</InlineCode>, and your existing dbt models work unchanged. Nothing new to
        learn. The schema <em>is</em> the spec.
      </>
    ),
    size: "lg",
    delay: 0,
  },
  {
    num: "02",
    label: "Connectivity",
    title: "MySQL on the wire",
    body: "BI tools, JDBC/ODBC clients, ORMs, and migration runners connect with zero special handling.",
    size: "lg",
    delay: 80,
  },
  {
    num: "03",
    label: "Schema",
    title: "The schema generates itself",
    body: (
      <>
        Every table is derived mechanically from the FHIR&nbsp;R4 JSON Schema. New element? Re-bootstrap.
        Never hand-write DDL.
      </>
    ),
    size: "md",
    delay: 0,
  },
  {
    num: "04",
    label: "Profiles",
    title: "Profiled data, same tables",
    body: (
      <>
        US&nbsp;Core and other profiles constrain the same base R4 resources, so profiled data lands straight
        into existing columns.
      </>
    ),
    size: "md",
    delay: 80,
  },
  {
    num: "05",
    label: "Scale",
    title: "Compute & storage scale apart",
    body: "Built on shared-data StarRocks. Burst compute for a heavy window, shrink when idle; data lives in Blob, ADLS, S3, or MinIO.",
    size: "md",
    delay: 160,
  },
  {
    num: "06",
    label: "Ingestion",
    title: "Live or batch, your call",
    body: "Stream-load every change in real time in Azure mode via Service Bus, or run a single batch pass locally. Clone, point it at a FHIR endpoint, and start querying in minutes.",
    size: "wide",
    delay: 0,
  },
];

const CARD_SPAN: Record<FeatureSize, string> = {
  md: "min-[1025px]:col-span-2",
  lg: "min-[721px]:col-span-2 min-[1025px]:col-span-3",
  wide: "min-[721px]:col-span-2 min-[1025px]:col-span-6 min-[721px]:flex-row min-[721px]:items-start min-[721px]:gap-8",
};

function FeatureCard({ feature }: { feature: Feature }): JSX.Element {
  const lg = feature.size === "lg";
  const wide = feature.size === "wide";
  // `.feature p` outranks `.feature__label` in the HTML, so the label takes
  // the paragraph's size and colour. Reproduced as rendered.
  const textSize = lg ? "text-[16.5px]" : "text-[15.5px]";

  const content = (
    <>
      <p className={`font-mono font-semibold tracking-[1.2px] uppercase mb-[10px] leading-[1.6] text-[#5E594F] ${textSize}`}>
        {feature.label}
      </p>
      <h3
        className={`font-semibold text-[#34332C] leading-[1.2] tracking-[-0.01em] mb-3 ${lg ? "text-[27px]" : "text-[23px]"}`}
      >
        {feature.title}
      </h3>
      <p className={`leading-[1.6] text-[#5E594F] ${textSize}`}>{feature.body}</p>
    </>
  );

  return (
    <Reveal
      as="li"
      delay={feature.delay}
      className={`relative bg-[#FBF9F4] border border-[#E5DECF] rounded-[14px] pt-7 px-7 pb-[30px] flex flex-col ${CARD_HOVER} ${CARD_SPAN[feature.size]}`}
    >
      <span
        aria-hidden="true"
        className={`text-[56px] font-medium leading-[.8] tracking-[-0.02em] text-[#E3DCCD] mb-[26px] ${
          wide ? "min-[721px]:mb-0 min-[721px]:flex-none min-[721px]:w-[110px]" : ""
        }`}
      >
        {feature.num}
      </span>
      {wide ? <div>{content}</div> : content}
    </Reveal>
  );
}

export default function HyperionWhy(): JSX.Element {
  return (
    <section id="why" aria-labelledby="why-title" className={`${SECTION} ${SECTION_CANVAS}`}>
      <div className={SECTION_HEAD}>
        <p className={EYEBROW}>Why Hyperion</p>
        <h2 id="why-title" className={`${H_SECTION} text-[#34332C]`}>
          Stop wrestling FHIR. Just write <span className={HL}>SQL.</span>
        </h2>
        <p className={LEDE_SM}>
          FHIR is built for exchange: deeply nested JSON, one patient at a time. The moment you want a population
          answer, you&apos;re hand-rolling FHIRPath or flattening pipelines forever. Hyperion skips all of it.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 min-[721px]:grid-cols-2 min-[1025px]:grid-cols-6">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.num} feature={feature} />
        ))}
      </ul>
    </section>
  );
}
