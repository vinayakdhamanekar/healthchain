import type { JSX } from "react";
import Image from "next/image";

interface Advisor {
  name: string;
  initials: string;
  image: string;
  linkedin: string;
}

const ADVISORS: Advisor[] = [
  {
    name: "Gene Huang",
    initials: "GH",
    image: "/team/GeneHuang.jpg",
    linkedin: "https://www.linkedin.com/in/gene-huang-757282/",
  },
  {
    name: "Satish Padiyar",
    initials: "SP",
    image: "/team/SatishPadiyar.jpg",
    linkedin: "https://www.linkedin.com/in/satishpadiyar/",
  },
  {
    name: "Charles Spence",
    initials: "CS",
    image: "/team/CharlesSpence.jpg",
    linkedin: "https://www.linkedin.com/in/charlesspence/",
  },
  {
    name: "Fred Eck",
    initials: "FE",
    image: "/team/FrederickEck.jpg",
    linkedin: "https://www.linkedin.com/in/frederick-eck-12755a42/",
  },
];

function LinkedInBadge({ href, name }: { href: string; name: string }): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-[6px] bg-[#A8543C] hover:bg-[#97492F] transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 6H5.3V13H3.5V6ZM4.4 5.1a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2ZM7 6h1.85v.95c.37-.65 1.1-1.15 2.15-1.15 2.3 0 2.73 1.52 2.73 3.5V13H11.9V9.6c0-1-.02-2.27-1.38-2.27-1.38 0-1.59 1.08-1.59 2.2V13H7V6Z"
          fill="white"
        />
      </svg>
    </a>
  );
}

export default function AdvisorsGrid(): JSX.Element {
  return (
    <section className="bg-[#F7F3EF]">
      {/* Header */}
      <div className="px-7 md:px-14 pt-[64px] pb-[56px]">
        <p className="font-mono font-semibold text-[13px] tracking-[0.16em] uppercase text-[#A8543C] mb-5">
          Strategic Advisory Team
        </p>
        <h2 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#1A1A1A] mb-5">
          Guidance from across the industry.
        </h2>
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#6B6B6B] max-w-[560px]">
          We collaborate with leading experts across the industry to ensure that our work is
          characterized by customer-centric ideas and solutions.
        </p>
      </div>

      {/* Card row */}
      <div className="border-t border-b border-[#928b86]">
        <div className="flex flex-col sm:flex-row">
          {ADVISORS.map((advisor, i) => (
            <div
              key={advisor.name}
              className={`flex-1 px-6 py-8 ${
                i < ADVISORS.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-[#928b86]"
                  : ""
              }`}
            >
              {/* Photo + LinkedIn row */}
              <div className="flex items-start justify-between mb-5">
                {/* Circular avatar */}
                <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={88}
                    height={88}
                    className="w-[88px] h-[88px] rounded-full object-cover border border-[#E5DECF]"
                  />
                <LinkedInBadge href={advisor.linkedin} name={advisor.name} />
              </div>

              {/* Name */}
              <p className="text-[16px] font-semibold text-[#1A1A1A] leading-tight mb-1">
                {advisor.name}
              </p>

              {/* Title */}
              <p className="text-[13px] text-[#6B6B6B]">Strategic Advisor</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
