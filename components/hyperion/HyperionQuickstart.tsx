import type { JSX } from "react";
import Reveal from "./Reveal";
import CopyCommandsButton from "./CopyCommandsButton";
import { ConsoleDots } from "./primitives";
import {
  CODE_CARD_BAR,
  CODE_CARD_TAB,
  CONSOLE_DOT_DARK,
  EXTERNAL,
  EYEBROW,
  GITHUB_URL,
  HL,
  H_SECTION,
  LEDE_SM,
  QUERIES_URL,
  SECTION,
  SECTION_CANVAS,
  SYNTAX,
  btnArrow,
  btnOutline,
  btnPrimary,
} from "./styles";

interface Requirement {
  key: string;
  value: string;
}

const REQUIREMENTS: Requirement[] = [
  { key: "Runtime", value: "Docker 24+" },
  { key: "Disk", value: "~10 GB" },
  { key: "Memory", value: "~8 GB RAM" },
  { key: "First run", value: "~5–10 min" },
];

const COMMENT = "# Clone, configure, launch the full local demo";
const COMMANDS: string[] = [
  "git clone https://github.com/Health-Chain-Inc/hyperion.git",
  "cd hyperion",
  "cp .env.example .env",
  "docker compose up --build",
];

// Same text the HTML copied: every line's text, without the "$ " prompts.
const COPY_TEXT = [COMMENT, ...COMMANDS].join("\n");

const PROMPT_LINE = "block before:content-['$_'] before:text-[#C05A3A] before:select-none";

export default function HyperionQuickstart(): JSX.Element {
  return (
    <section id="quickstart" aria-labelledby="quick-title" className={`${SECTION} ${SECTION_CANVAS}`}>
      <div className="grid grid-cols-1 gap-10 items-start min-[1025px]:grid-cols-[.85fr_1.15fr] min-[1025px]:gap-14 [&>*]:min-w-0">
        <div>
          <p className={EYEBROW}>Quickstart</p>
          <h2 id="quick-title" className={`${H_SECTION} text-[#34332C]`}>
            Up and running in <span className={HL}>one command</span>
          </h2>
          <p className={LEDE_SM}>
            Clone, configure, and launch the full local demo with Docker Compose. First run is ~5&ndash;10&nbsp;min.
          </p>
          <dl aria-label="Requirements" className="grid grid-cols-1 min-[341px]:grid-cols-2 gap-3 mt-7">
            {REQUIREMENTS.map((req) => (
              <div key={req.key} className="bg-[#FBF9F4] border border-[#E5DECF] rounded-[12px] px-[18px] py-4">
                <dt className="font-mono text-[11.5px] tracking-[1.2px] uppercase text-[#6B665D] mb-1">{req.key}</dt>
                <dd className="m-0 text-[17px] font-semibold text-[#34332C]">{req.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 mt-8">
            <a {...EXTERNAL} href={GITHUB_URL} className={btnPrimary()}>
              Read the docs
              <span className={btnArrow()} aria-hidden="true">
                →
              </span>
            </a>
            <a {...EXTERNAL} href={QUERIES_URL} className={btnOutline()}>
              Example queries
            </a>
          </div>
        </div>

        <Reveal className="bg-[#24251F] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(60,45,30,.18)] border border-[#1B1C17]">
          <div className={`${CODE_CARD_BAR} bg-[rgba(255,255,255,.04)]`}>
            <ConsoleDots dotClass={CONSOLE_DOT_DARK} />
            <span className={CODE_CARD_TAB}>bash</span>
            <CopyCommandsButton text={COPY_TEXT} />
          </div>
          <pre
            role="region"
            aria-label="Quickstart shell commands"
            tabIndex={0}
            className="m-0 p-[18px] text-[12.5px] min-[721px]:pt-6 min-[721px]:px-6 min-[721px]:pb-[26px] min-[721px]:text-[14px] leading-[1.9] text-[#E9E4DA] overflow-x-auto"
          >
            <code>
              <span className="block">
                <span className={SYNTAX.dCom}>{COMMENT}</span>
              </span>
              <span className={PROMPT_LINE}>{COMMANDS[0]}</span>
              <span className={PROMPT_LINE}>
                <span className={SYNTAX.dKw}>cd</span> hyperion
              </span>
              <span className={PROMPT_LINE}>{COMMANDS[2]}</span>
              <span className={PROMPT_LINE}>
                docker compose up <span className={SYNTAX.dFlag}>--build</span>
              </span>
            </code>
          </pre>
        </Reveal>
      </div>
    </section>
  );
}
