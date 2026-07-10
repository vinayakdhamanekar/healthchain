import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "PLATFORM",
     links: [
      { label: "Capture", href: "#" },
      { label: "Curate", href: "#" },
      { label: "Consume", href: "#" },
    ],
  },
  {
    heading: "SOLUTIONS",
     links: [
      {
        label: "Interoperability & Compliance",
        href: "/solutions",
      },
      {
        label: "Longitudinal Data Enablement",
        href: "/longitudinal-data-enablement",
      },
      {
        label: "Benefit Design & Intelligence",
        href: "/benefit-design-and-intelligence",
      },
    ],
  },
  {
    heading: "RESOURCES",
     links: [
      { label: "Regulatory Briefs", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Whitepapers", href: "#" },
      { label: "Documentation", href: "#" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL_LINKS = ["Privacy", "Terms", "Security"];

function LinkColumn({ column }: { column: FooterColumn }): JSX.Element {
  return (
    <div>
      <div className="font-mono text-[13px] tracking-[1px] text-[#A8543C] mb-[18px]">
        {column.heading}
      </div>
      <div className="flex flex-col gap-[11px]">
        {column.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[15px] text-[#3A352E] hover:text-[#A8543C] transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="border-t bg-[#F7F3EF] border-[#E5DECF] pt-[60px] px-7 md:px-14 pb-[56px]">

      {/* Top row: large logo left, tagline right */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-[54px]">
        <div className="flex items-center gap-2 md:gap-[10px]">
          {/* <svg
            width="42"
            height="42"
            viewBox="0 0 100 100"
            className="md:w-[62px] md:h-[62px] shrink-0"
            aria-hidden="true"
          >
            <path
              d="M50,2 L56.9,33.4 L83.9,16.1 L66.6,43.1 L98,50 L66.6,56.9 L83.9,83.9 L56.9,66.6 L50,98 L43.1,66.6 L16.1,83.9 L33.4,56.9 L2,50 L33.4,43.1 L16.1,16.1 L43.1,33.4 Z"
              fill="#A8543C"
            />
          </svg> */}

           <Image
                      src="/logo.png"
                      alt="Health Chain Logo"
                      width={62}
                      height={62}
                      className="object-contain"
                    />
          <span className="text-[36px] md:text-[62px] font-normal tracking-[-0.02em] text-[#34332C]">
            Health Chain
          </span>
        </div>
        <p className="text-[16px] md:text-[18px] leading-[1.45] text-[#57534C] md:text-right max-w-[280px]">
          The data readiness layer healthcare has been missing.
        </p>
      </div>

      {/* Bottom grid: legal col + 4 link columns */}
      <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 md:gap-8">

        {/* Col 1: copyright + legal links */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-[13px] text-[#6B665D] mb-[18px]">
            © 2026 Health Chain. All rights reserved.
          </div>
          <div className="flex gap-[26px]">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[15px] text-[#3A352E] no-underline hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Cols 2–5: nav link columns */}
        {COLUMNS.map((column) => (
          <LinkColumn key={column.heading} column={column} />
        ))}
      </div>
    </footer>
  );
}
