import type { JSX } from "react";
import Image from "next/image";
import { EASE, EXTERNAL, GITHUB_URL, DOCS_URL, GUTTER } from "./styles";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Hyperion",
    links: [
      { label: "Why Hyperion", href: "#why" },
      { label: "How it maps", href: "#mapping" },
      { label: "Under the hood", href: "#powered-by" },
      { label: "Quickstart", href: "#quickstart" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: "Documentation", href: DOCS_URL, external: true },
      { label: "License (Apache 2.0)", href: `${GITHUB_URL}/blob/main/LICENSE`, external: true },
      { label: "Powered by StarRocks", href: "https://github.com/StarRocks/starrocks", external: true },
    ],
  },
  {
    heading: "Health Chain",
    links: [
      { label: "Platform", href: "https://www.healthchain.com/platform", external: true },
      { label: "About", href: "https://www.healthchain.com/about", external: true },
      { label: "Contact", href: "https://www.healthchain.com/contact", external: true },
    ],
  },
];

/** Hyperion's own footer from hyperion-healthchain-branded.html. */
export default function HyperionFooter(): JSX.Element {
  return (
    <footer className={`bg-[#F7F3EF] border-t border-[#E5DECF] pt-[60px] pb-12 ${GUTTER}`}>
      <div className="flex flex-col items-start justify-between gap-6 flex-wrap mb-[52px] min-[721px]:flex-row min-[721px]:items-center">
        <a
          {...EXTERNAL}
          href="https://www.healthchain.com"
          aria-label="Health Chain website"
          className="flex items-center gap-3 no-underline"
        >
          <Image src="/logo.png" alt="" width={56} height={56} className="w-14 h-14 object-contain" />
          <span className="text-[length:clamp(34px,5vw,58px)] font-normal tracking-[-0.02em] text-[#34332C] leading-none">
            Health Chain
          </span>
        </a>
        <p className="text-[17px] leading-[1.45] text-[#57534C] max-w-[330px] text-left min-[721px]:text-right">
          Hyperion is an open-source project created and maintained by Health Chain.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 min-[721px]:grid-cols-3 min-[1025px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-full min-[1025px]:col-span-1 text-[15px] leading-[1.6] text-[#6B665D] max-w-[34ch]">
          <strong className="block text-[17px] font-semibold text-[#34332C] mb-[6px]">Hyperion</strong>
          FHIR-native analytics powered by StarRocks. HL7 FHIR R4 in, plain SQL out.
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <p className="font-mono text-[13px] tracking-[1px] text-[#A8543C] mb-[18px]">{column.heading}</p>
            <div className="flex flex-col gap-[11px]">
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? EXTERNAL : {})}
                  className={`text-[15px] text-[#3A352E] no-underline transition-colors duration-300 ${EASE} hover:text-[#A8543C]`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        ))}
      </div>

      <div className="mt-[52px] pt-7 border-t border-[#E5DECF] grid grid-cols-1 gap-y-4 gap-x-10 items-start min-[721px]:grid-cols-[1fr_auto]">
        <p className="text-[13.5px] leading-[1.6] text-[#6B665D] max-w-[88ch]">
          Hyperion is data-engineering infrastructure for analytics. It is not a medical device and is not intended
          for clinical decision-making or patient care. Deploying it does not by itself satisfy HIPAA, SOC&nbsp;2, or
          other regulatory obligations. Those remain the responsibility of the deploying organization.
        </p>
        <p className="font-mono text-[12px] text-[#6B665D] whitespace-nowrap">© 2026 Health Chain · Apache 2.0</p>
      </div>
    </footer>
  );
}
