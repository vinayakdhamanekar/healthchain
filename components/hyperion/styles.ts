/*
 * Shared Tailwind class strings for the Hyperion page, converted from
 * D:\HC\Hyperion\assets\css\styles.css. Breakpoints mirror that stylesheet
 * exactly (mobile first): base = up to 720px, min-[721px] = tablet,
 * min-[1025px] = desktop.
 */

export const EASE = "ease-[cubic-bezier(.22,.61,.36,1)]";

/*
 * Glyphs the brand fonts don't contain (→ and ─). The HTML lets these fall
 * through to its system stacks; the app's fonts would otherwise hand them to a
 * size-adjusted Arial and draw them too wide. Applied only to those glyphs.
 */
export const SYSTEM_SANS_GLYPH =
  "font-[family-name:ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,sans-serif]";
export const SYSTEM_MONO_GLYPH =
  "font-[family-name:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

/** Horizontal page gutter: 20px / 40px / 56px. */
export const GUTTER = "px-5 min-[721px]:px-10 min-[1025px]:px-14";

/*
 * No scroll-margin on Hyperion sections: SmoothScrollProvider already clears
 * the fixed navbar by 100px (the HTML used scroll-padding-top: 104px), and a
 * scroll-margin would be counted twice (once by Lenis, once by the provider).
 */

/** Standard section band. Pair with SECTION_CANVAS or SECTION_FRAME. */
export const SECTION = `border-t border-[#E5DECF] py-[72px] min-[721px]:py-24 ${GUTTER}`;
export const SECTION_CANVAS = "bg-[#F7F3EF]";
export const SECTION_FRAME = "bg-[#F4EFE8]";
export const SECTION_HEAD = "mb-9 min-[721px]:mb-12";

/* ── Type ──────────────────────────────────────────────────────────── */

export const EYEBROW = "font-mono font-semibold text-[13px] uppercase mb-[18px] tracking-[1.5px] text-[#A8543C]";
// In the HTML `.dark__head p` outranks `.eyebrow`, so the dark-band eyebrow
// renders at 17px / 1.6 in the band's body colour. Reproduced as rendered.
export const EYEBROW_DARK =
  "font-mono font-semibold uppercase mb-[18px] tracking-[2px] text-[17px] leading-[1.6] text-[rgba(244,241,234,.78)]";

export const STRONG = "font-semibold text-[#34332C]";

export const H_DISPLAY =
  "text-[length:clamp(38px,5.2vw,60px)] leading-[1.04] tracking-[-0.025em] font-semibold text-[#34332C]";

/** Section heading — colour is added at the call site (light vs dark band). */
export const H_SECTION =
  "text-[length:clamp(30px,3.6vw,42px)] leading-[1.08] tracking-[-0.02em] font-semibold max-w-[20ch]";

export const LEDE_SM = "text-[17px] leading-[1.55] text-[#57534C] max-w-[62ch] mt-[18px]";

/** Highlighted word pill — Health Chain signature. */
export const HL =
  "inline-block bg-[#F1D9D1] text-[#AE5740] px-[.28em] pb-[.1em] rounded-[9px] whitespace-nowrap";
export const HL_DARK =
  "inline-block bg-[rgba(241,217,209,.14)] text-[#F0B9A6] px-[.28em] pb-[.1em] rounded-[9px] whitespace-nowrap";

/* ── Tags ──────────────────────────────────────────────────────────── */

const TAG_BASE =
  "inline-flex items-center font-mono text-[12px] tracking-[.3px] leading-[1.4] whitespace-nowrap";

export type TagTone = "terra" | "olive" | "indigo";

const TAG_TONES: Record<TagTone, string> = {
  terra: "bg-[#E9C5BC] text-[#9C4A37]",
  olive: "bg-[#D2E3AC] text-[#51602F]",
  indigo: "bg-[#CBCDF1] text-[#3C3E8C]",
};

export function tag(tone: TagTone): string {
  return `${TAG_BASE} font-medium px-[11px] py-[5px] rounded-[6px] ${TAG_TONES[tone]}`;
}

export const TAG_PLAIN = `${TAG_BASE} font-normal px-[14px] py-[8px] rounded-[8px] bg-[#FBF9F4] text-[#4A463F] border border-[#E4DED0] shadow-[0_3px_9px_rgba(60,45,30,.05)] transition-[transform,box-shadow,border-color] duration-300 ${EASE} hover:-translate-y-0.5 hover:border-[#C7BFB0] hover:shadow-[0_8px_18px_rgba(60,45,30,.10)]`;

/* ── Buttons ───────────────────────────────────────────────────────── */

export type BtnSize = "md" | "sm";

const BTN_BASE = `inline-flex items-center gap-[14px] font-sans font-medium no-underline rounded-[42px] cursor-pointer border whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-300 ${EASE}`;

export function btnPrimary(size: BtnSize = "md"): string {
  const sizing = size === "sm" ? "text-[15px] py-[10px] pr-[10px] pl-[20px]" : "text-[16px] py-[14px] pr-[14px] pl-[26px]";
  return `group ${BTN_BASE} ${sizing} border-transparent bg-[#A8543C] text-[#FBF9F4] hover:bg-[#9C4A37] hover:shadow-[0_10px_22px_rgba(168,84,60,.22)]`;
}

export function btnOutline(size: BtnSize = "md"): string {
  const sizing = size === "sm" ? "text-[15px] py-[11px] px-[22px]" : "text-[16px] py-[14px] px-[26px]";
  return `${BTN_BASE} ${sizing} bg-transparent text-[#34332C] border-[#CFC7B8] hover:bg-white`;
}

/**
 * The pill-shaped arrow chip inside a button. On a primary button it holds
 * "→" (a system-font glyph) and inverts on hover; the outline hero button
 * holds "↓", which the brand font does contain.
 */
export function btnArrow(size: BtnSize = "md", onPrimary = true): string {
  const sizing = size === "sm" ? "w-[30px] h-[22px] text-[13px]" : "w-[50px] h-[30px] text-[15px]";
  const primary = onPrimary
    ? `${SYSTEM_SANS_GLYPH} group-hover:bg-white group-hover:text-[#A8543C] group-hover:border-white`
    : "";
  return `inline-flex items-center justify-center rounded-full border border-white/40 leading-none transition-[background-color,color,border-color] duration-300 ${EASE} ${sizing} ${primary}`;
}

/* ── Code ──────────────────────────────────────────────────────────── */

export const CONSOLE_DOTS = "flex gap-[6px]";
export const CONSOLE_DOT_LIGHT = "block w-[10px] h-[10px] rounded-full bg-[#CFC7B8]";
export const CONSOLE_DOT_DARK = "block w-[10px] h-[10px] rounded-full bg-[rgba(255,255,255,.18)]";

export const CODE_CARD_BAR =
  "flex items-center gap-[10px] px-4 py-3 border-b border-[rgba(255,255,255,.14)]";
export const CODE_CARD_TAB = "font-mono text-[12px] text-[rgba(244,241,234,.62)] tracking-[.3px]";

/** Syntax colours — light console (hero) and dark cards (mapping, terminal). */
export const SYNTAX = {
  kw: "text-[#A8543C] font-medium",
  fn: "text-[#4346A0]",
  str: "text-[#6E7A3A]",
  com: "text-[#8A857A] italic",
  id: "text-[#34332C]",
  dKey: "text-[#F0B9A6]",
  dStr: "text-[#C7D69A]",
  dPun: "text-[rgba(244,241,234,.55)]",
  dCom: "text-[rgba(244,241,234,.55)]",
  dRule: `text-[rgba(244,241,234,.28)] ${SYSTEM_MONO_GLYPH}`,
  dKw: "text-[#F0B9A6]",
  dFlag: "text-[#C7D69A]",
} as const;

export type SyntaxToken = keyof typeof SYNTAX;

/** One line of highlighted code: plain strings, or [token, text] pairs. */
export type CodeLine = (string | [SyntaxToken, string])[];

/** Card hover lift shared by feature and flow cards. */
export const CARD_HOVER =
  "hover:-translate-y-[3px] hover:border-[#C7BFB0] hover:shadow-[0_20px_44px_rgba(60,45,30,.12)]";

export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export const GITHUB_URL = "https://github.com/Health-Chain-Inc/hyperion";
export const DOCS_URL = "https://github.com/Health-Chain-Inc/hyperion/tree/main/docs";
export const QUERIES_URL = "https://github.com/Health-Chain-Inc/hyperion/blob/main/docs/queries.md";
