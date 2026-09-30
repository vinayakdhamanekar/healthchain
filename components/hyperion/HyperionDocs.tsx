import type { JSX } from "react";
import {
  DOCS_URL,
  EASE,
  EXTERNAL,
  EYEBROW,
  HL,
  H_SECTION,
  LEDE_SM,
  SECTION,
  SECTION_FRAME,
  SECTION_HEAD,
  btnOutline,
} from "./styles";

interface DocLink {
  meta: string;
  title: string;
  body: string;
  href: string;
  /** Per-position dividers (li) and padding (a) for the 1 / 2 / 3 column layouts. */
  cell: string;
  pad: string;
}

const BASE = "https://github.com/Health-Chain-Inc/hyperion/blob/main/docs";

// Column position drives the dividers: desktop is 3 columns, tablet 2, mobile 1.
const DOCS: DocLink[] = [
  {
    meta: "Guide · 01",
    title: "Architecture",
    body: "How the pieces fit: diagram, key design, operating modes, repo layout.",
    href: `${BASE}/architecture.md`,
    cell: "",
    pad: "min-[721px]:py-[30px] min-[721px]:pl-0 min-[721px]:pr-[30px] min-[1025px]:pb-8",
  },
  {
    meta: "Guide · 02",
    title: "Example queries",
    body: "SQL against the FHIR-shaped tables and the shared reference tables.",
    href: `${BASE}/queries.md`,
    cell: "min-[721px]:border-l",
    pad: "min-[721px]:pt-[30px] min-[721px]:pb-8 min-[721px]:pl-[30px] min-[721px]:pr-0 min-[1025px]:pr-[30px]",
  },
  {
    meta: "Reference · 03",
    title: "Configuration",
    body: "The complete environment-variable reference for local and Azure modes.",
    href: `${BASE}/configuration.md`,
    cell: "min-[1025px]:border-l",
    pad: "min-[721px]:py-[30px] min-[721px]:pl-0 min-[721px]:pr-[30px] min-[1025px]:pb-8 min-[1025px]:pl-[30px] min-[1025px]:pr-0",
  },
  {
    meta: "Guide · 04",
    title: "Development",
    body: "Dev workflow, common operations, tests, and advanced compose usage.",
    href: `${BASE}/development.md`,
    cell: "min-[721px]:border-l min-[1025px]:border-l-0",
    pad: "min-[721px]:py-[30px] min-[721px]:pl-[30px] min-[721px]:pr-0 min-[1025px]:pb-8 min-[1025px]:pl-0 min-[1025px]:pr-[30px]",
  },
  {
    meta: "Deployment · 05",
    title: "Azure deployment",
    body: "Hybrid Azure walkthrough: FHIR, Service Bus, Blob/ADLS, scaling up.",
    href: `${BASE}/deployment-azure.md`,
    cell: "min-[1025px]:border-l",
    pad: "min-[721px]:pt-[30px] min-[721px]:pb-8 min-[721px]:pl-0 min-[721px]:pr-[30px] min-[1025px]:pl-[30px]",
  },
  {
    meta: "Support · 06",
    title: "Troubleshooting",
    body: "Symptoms and fixes for the most common setup and query issues.",
    href: `${BASE}/troubleshooting.md`,
    cell: "min-[721px]:border-l",
    pad: "min-[721px]:py-[30px] min-[721px]:pl-[30px] min-[721px]:pr-0 min-[1025px]:pb-8",
  },
];

export default function HyperionDocs(): JSX.Element {
  return (
    <section id="docs" aria-labelledby="docs-title" className={`${SECTION} ${SECTION_FRAME}`}>
      <div className={`${SECTION_HEAD} flex items-end justify-between gap-8 flex-wrap`}>
        <div>
          <p className={EYEBROW}>Documentation</p>
          <h2 id="docs-title" className={`${H_SECTION} text-[#34332C]`}>
            Dig <span className={HL}>deeper</span>
          </h2>
          <p className={LEDE_SM}>This page is the short version. Everything below lives in the repo.</p>
        </div>
        <a {...EXTERNAL} href={DOCS_URL} className={btnOutline("sm")}>
          All documentation
        </a>
      </div>

      <ul className="grid grid-cols-1 border-t border-[#E5DECF] min-[721px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {DOCS.map((doc) => (
          <li key={doc.title} className={`border-b border-[#E5DECF] ${doc.cell}`}>
            <a
              {...EXTERNAL}
              href={doc.href}
              className={`flex flex-col h-full no-underline pt-[26px] pb-7 px-0 ${doc.pad} transition-[background-color] duration-300 ${EASE} hover:bg-[rgba(251,249,244,.7)]`}
            >
              <span className="font-mono text-[12px] tracking-[1px] uppercase text-[#6B665D] mb-4">{doc.meta}</span>
              <h3 className="text-[23px] leading-[1.18] tracking-[-0.01em] mb-3 font-semibold text-[#34332C]">
                {doc.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-[#6B665D] mb-[22px]">{doc.body}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
