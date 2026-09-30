import type { JSX } from "react";
import type { Metadata } from "next";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import HyperionHeader from "@/components/hyperion/HyperionHeader";
import HyperionFooter from "@/components/hyperion/HyperionFooter";
import HyperionHero from "@/components/hyperion/HyperionHero";
import HyperionTrust from "@/components/hyperion/HyperionTrust";
import HyperionWhy from "@/components/hyperion/HyperionWhy";
import HyperionMapping from "@/components/hyperion/HyperionMapping";
import HyperionPoweredBy from "@/components/hyperion/HyperionPoweredBy";
import HyperionScope from "@/components/hyperion/HyperionScope";
import HyperionQuickstart from "@/components/hyperion/HyperionQuickstart";
import HyperionDocs from "@/components/hyperion/HyperionDocs";
import HyperionCTA from "@/components/hyperion/HyperionCTA";
import { HYPERION_FONTS } from "@/components/hyperion/fonts";

const PAGE_PATH = "/hyperion";

export const metadata: Metadata = pageMetadata({
  title: "Hyperion: FHIR-native analytics powered by StarRocks",
  description:
    "Hyperion is FHIR-native analytics powered by StarRocks -an open-source project created and maintained by Health Chain that transforms HL7 FHIR R4 data into analytics-ready relational tables, queryable with standard SQL. No FHIRPath, no JSON unnesting.",
  path: PAGE_PATH,
  keywords: [
    "FHIR analytics",
    "FHIR to SQL",
    "HL7 FHIR R4",
    "StarRocks",
    "open-source FHIR analytics",
  ],
});

// Structured data carried over from hyperion-healthchain-branded.html.
const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hyperion",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Docker (Linux, macOS, Windows)",
  datePublished: "2026-06-09",
  dateModified: "2026-06-10",
  softwareVersion: "0.1.0",
  description:
    "Hyperion is FHIR-native analytics powered by StarRocks: an open-source project created and maintained by Health Chain that transforms HL7 FHIR R4 healthcare data into a columnar, MySQL-compatible SQL database, one table per resource type, columns that mirror FHIR R4.",
  url: `${SITE_URL}${PAGE_PATH}`,
  codeRepository: "https://github.com/Health-Chain-Inc/hyperion",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  isAccessibleForFree: true,
  creator: { "@type": "Organization", name: "Health Chain", url: "https://www.healthchain.com" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      q: "What is Hyperion?",
      a: "An open-source platform that pulls HL7 FHIR R4 resources into a columnar, MySQL-compatible SQL database, with one table per resource type and columns mirroring FHIR R4, so you can run population analytics with plain SQL.",
    },
    {
      q: "Is Hyperion a FHIR server?",
      a: "No. Hyperion consumes a FHIR API (such as HAPI or Azure Health Data Services); it does not serve one. It is an analytics layer downstream of your clinical systems.",
    },
    {
      q: "How do I connect Hyperion to my FHIR server?",
      a: "Point Hyperion at any FHIR R4-compliant HTTP API (for example HAPI or Azure Health Data Services). It fetches resources and persists them as flattened tables in the columnar engine. The Docker Compose quickstart wires up a full local demo in one command.",
    },
    {
      q: "Which FHIR version does Hyperion support?",
      a: "HL7 FHIR R4 (4.0.1). The schema is generated mechanically from the FHIR R4 JSON Schema and covers all 146 resource types.",
    },
    {
      q: "What does Hyperion cost?",
      a: "Nothing. It is free and open source under the Apache License 2.0.",
    },
    {
      q: "Can I use Hyperion in production?",
      a: "Yes. It runs locally for evaluation and supports an Azure deployment for real workloads. As infrastructure software it is provided without warranty, and HIPAA/SOC 2 obligations remain the responsibility of the deploying organization.",
    },
  ].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HyperionPage(): JSX.Element {
  return (
    // Base type + focus ring from the Hyperion HTML's body / :focus-visible rules.
    // This page uses its own header and footer, not the shared Navbar/Footer.
    <div
      className={`min-h-screen bg-[#F7F3EF] ${HYPERION_FONTS} text-[16px] leading-[1.55] text-[#57534C] antialiased [&_:focus-visible]:outline [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-[#A8543C] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:rounded-[6px]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <HyperionHeader />
      <div className="max-w-[1280px] mx-auto border-x border-[#E5DECF] overflow-hidden bg-[#F4EFE8]">
        <main id="main">
          <HyperionHero />
          <HyperionTrust />
          <HyperionWhy />
          <HyperionMapping />
          <HyperionPoweredBy />
          <HyperionScope />
          <HyperionQuickstart />
          <HyperionDocs />
          <HyperionCTA />
        </main>
        <HyperionFooter />
      </div>
    </div>
  );
}
