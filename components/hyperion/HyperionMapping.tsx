import type { JSX } from "react";
import Reveal from "./Reveal";
import { ArrowRightIcon, CodeLines, ConsoleDots, InlineCode } from "./primitives";
import {
  CODE_CARD_BAR,
  CODE_CARD_TAB,
  CONSOLE_DOT_DARK,
  EYEBROW_DARK,
  GUTTER,
  HL_DARK,
  H_SECTION,
  type CodeLine,
} from "./styles";

const PATIENT_JSON: CodeLine[] = [
  [["dPun", "{"]],
  ["  ", ["dKey", '"resourceType"'], ": ", ["dStr", '"Patient"'], ","],
  ["  ", ["dKey", '"id"'], ": ", ["dStr", '"a1b2"'], ","],
  ["  ", ["dKey", '"gender"'], ": ", ["dStr", '"female"'], ","],
  ["  ", ["dKey", '"birthDate"'], ": ", ["dStr", '"1984-03-11"'], ","],
  ["  ", ["dKey", '"name"'], ": ", ["dPun", "[{"], " ", ["dKey", '"family"'], ": ", ["dStr", '"Reyes"'], " ", ["dPun", "}]"]],
  [["dPun", "}"]],
];

const PATIENT_TABLE: CodeLine[] = [
  [["dCom", "id    gender  birth_date  name_family"]],
  // Only the rule runs take the system mono stack; the gaps stay in JetBrains
  // Mono so the columns line up exactly as in the HTML.
  [["dRule", "────"], "  ", ["dRule", "──────"], "  ", ["dRule", "──────────"], "  ", ["dRule", "───────────"]],
  ['a1b2  female  1984-03-11  ["Reyes"]'],
];

const CODE_CARD =
  "min-w-0 bg-[rgba(20,21,17,.55)] border border-[rgba(255,255,255,.14)] rounded-[14px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,.25)]";
const CODE_PRE = "m-0 p-[22px] text-[13.5px] leading-[1.75] text-[#E9E4DA] overflow-x-auto";

export default function HyperionMapping(): JSX.Element {
  return (
    <section
      id="mapping"
      aria-labelledby="mapping-title"
      className={`relative ${GUTTER} py-[72px] min-[721px]:py-24 bg-[linear-gradient(135deg,#2E2F28_0%,#24251F_55%,#2A2A24_100%)] text-[rgba(244,241,234,.78)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(900px_380px_at_88%_0%,rgba(168,84,60,.16),transparent_70%),radial-gradient(700px_320px_at_0%_100%,rgba(110,122,58,.14),transparent_70%)] [&>*]:relative`}
    >
      <div className="grid grid-cols-1 gap-5 items-end pb-11 border-b border-[rgba(255,255,255,.14)] mb-12 min-[1025px]:grid-cols-[1.3fr_.7fr] min-[1025px]:gap-12 [&>*]:min-w-0">
        <div>
          <p className={EYEBROW_DARK}>One table per resource</p>
          <h2 id="mapping-title" className={`${H_SECTION} text-[#F7F4EE]`}>
            Nested FHIR in. <span className={HL_DARK}>Flat columns</span> out.
          </h2>
        </div>
        <p className="text-[17px] leading-[1.6] text-[rgba(244,241,234,.78)]">
          Hyperion flattens each FHIR&nbsp;R4 resource into a table in <InlineCode dark>_hyperion_core_</InlineCode>.
          Columns mirror the resource, so the shape you query is the shape you already know.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 items-center min-[721px]:grid-cols-[1fr_auto_1fr]">
        <Reveal className={CODE_CARD}>
          <div className={`${CODE_CARD_BAR} bg-[rgba(255,255,255,.03)]`}>
            <ConsoleDots dotClass={CONSOLE_DOT_DARK} />
            <span className={CODE_CARD_TAB}>Patient · FHIR R4 JSON</span>
          </div>
          <pre role="region" aria-label="Patient resource as FHIR R4 JSON" tabIndex={0} className={CODE_PRE}>
            <CodeLines lines={PATIENT_JSON} />
          </pre>
        </Reveal>

        <div
          aria-hidden="true"
          className="min-w-0 w-[44px] h-[44px] mx-auto rotate-90 min-[721px]:rotate-0 min-[721px]:mx-0 min-[721px]:w-[52px] min-[721px]:h-[52px] rounded-full flex items-center justify-center bg-[#A8543C] text-white shadow-[0_10px_24px_rgba(168,84,60,.35)]"
        >
          <ArrowRightIcon size={22} />
        </div>

        <Reveal delay={120} className={CODE_CARD}>
          <div className={`${CODE_CARD_BAR} bg-[rgba(255,255,255,.03)]`}>
            <ConsoleDots dotClass={CONSOLE_DOT_DARK} />
            <span className={CODE_CARD_TAB}>_hyperion_core_.patient</span>
          </div>
          <pre role="region" aria-label="Flattened patient table in the engine" tabIndex={0} className={CODE_PRE}>
            <CodeLines lines={PATIENT_TABLE} />
          </pre>
        </Reveal>
      </div>

      <p className="mt-7 text-[15px] text-[rgba(244,241,234,.78)] flex flex-col gap-2 items-baseline min-[721px]:flex-row min-[721px]:gap-[10px]">
        <span>
          Repeating FHIR elements (like <InlineCode dark>name</InlineCode>) become <InlineCode dark>ARRAY</InlineCode>{" "}
          columns: one row per resource, no exploding.
        </span>
      </p>
    </section>
  );
}
