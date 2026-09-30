import type { JSX, ReactNode } from "react";
import { CONSOLE_DOTS, SYNTAX, type CodeLine } from "./styles";

/** Renders highlighted code lines inside a <pre>, preserving exact whitespace. */
export function CodeLines({ lines }: { lines: CodeLine[] }): JSX.Element {
  return (
    <code>
      {lines.map((line, i) => (
        <span key={i}>
          {line.map((part, j) =>
            typeof part === "string" ? (
              part
            ) : (
              <span key={j} className={SYNTAX[part[0]]}>
                {part[1]}
              </span>
            )
          )}
          {i < lines.length - 1 ? "\n" : null}
        </span>
      ))}
    </code>
  );
}

/** Inline `code` chip (`:not(pre) > code` in the HTML), light or dark band. */
export function InlineCode({ children, dark = false }: { children: ReactNode; dark?: boolean }): JSX.Element {
  const tone = dark
    ? "bg-[rgba(255,255,255,.08)] border-[rgba(255,255,255,.14)] text-[#F7F4EE]"
    : "bg-[#FBF9F4] border-[#E4DED0] text-[#4A463F]";
  return (
    <code className={`font-mono text-[.88em] border px-[6px] py-px rounded-[5px] whitespace-nowrap ${tone}`}>
      {children}
    </code>
  );
}

/** The three window-chrome dots on console and code cards. */
export function ConsoleDots({ dotClass }: { dotClass: string }): JSX.Element {
  return (
    <span className={CONSOLE_DOTS} aria-hidden="true">
      <i className={dotClass} />
      <i className={dotClass} />
      <i className={dotClass} />
    </span>
  );
}

export function GitHubIcon(): JSX.Element {
  return (
    <svg className="flex-none" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

/** Right arrow used between the mapping cards and the flow steps. */
export function ArrowRightIcon({ size }: { size?: number }): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  );
}
