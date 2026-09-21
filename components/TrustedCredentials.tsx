import type { JSX } from "react";
import Image from "next/image";

interface Credential {
  code: string;
  label: string;
  logo: string;
  href: string;
  external: boolean;
}

/**
 * Gartner and Microsoft entries point to the platforms' general pages
 * until Health Chain's actual listing URLs are available - swap `href`
 * once those exist so this never links to a fabricated listing.
 */
const CREDENTIALS: Credential[] = [
  {
    code: "HIPAA",
    label: "Fully Compliant",
    logo: "/hipaa.png",
    href: "#",
    external: true,
  },
  {
    code: "CMS-0057-F",
    label: "Jan 2027 Ready",
    logo: "/cms.png",
    href: "#",
    external: true,
  },
  {
    code: "NCQA",
    label: "Certified Data Aggregator",
    logo: "/ncqa.png",
    href: "#",
    external: true,
  },
  {
    code: "DA VINCI",
    label: "Certified Data Partner",
    logo: "/Daa-vinchi.png",
    href: "#",
    external: true,
  },
  {
    code: "Gartner",
    label: "Discover Health Chain on Gartner",
    logo: "/gartner.png",
    href: "#n",
    external: true,
  },
  {
    code: "Microsoft",
    label: "Available on Microsoft Marketplace",
    logo: "/mircosoft-marketplace.png",
    href: "#",
    external: true,
  },
];

function ChevronRight(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[#928b86] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#A8543C]"
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CredentialItem({ credential }: { credential: Credential }): JSX.Element {
  return (
    <a
      href={credential.href}
      target={credential.external ? "_blank" : undefined}
      rel={credential.external ? "noopener noreferrer" : undefined}
      aria-label={`${credential.code}: ${credential.label}`}
      className="group flex items-center gap-3 border-b border-r border-[#E5DECF] p-5 transition-colors hover:bg-[#FBF9F4]"
    >
      <Image
        src={credential.logo}
        alt={`${credential.code} logo`}
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 object-contain"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-[#1A1A1A]">{credential.code}</p>
        <p className=" text-[12px] text-[#57534C]">{credential.label}</p>
      </div>
      <ChevronRight />
      {credential.external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export default function TrustedCredentials(): JSX.Element {
  return (
    <section
      id="platform-credentials"
      className="border-b border-[#E5DECF] bg-[#F7F3EF]"
      aria-label="Health Chain credentials"
    >
      <div className="px-5 pt-8 md:px-5">
        <p className="mb-5 font-mono text-[13px] font-semibold uppercase tracking-[1.5px] text-[#A8543C]">
          Trusted at every step
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-l border-[#E5DECF] sm:grid-cols-2 lg:grid-cols-6">
        {CREDENTIALS.map((credential) => (
          <CredentialItem key={credential.code} credential={credential} />
        ))}
      </div>
    </section>
  );
}
