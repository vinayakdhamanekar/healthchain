import type { JSX } from "react";

interface Layer {
  label: string;
  heading: string;
  connector: string;
  accent: string;
  chipClass: string;
  chips: string[];
}

const LAYERS: Layer[] = [
  {
    label: "CAPTURE",
    heading: "Data ingestion",
    connector: "Audit & queue raw records",
    accent: "bg-[#C9DCA5]",
    chipClass:
      "bg-[#D2E3AC] text-[#51602F]",
    chips: [
      "SFTP / S3 listeners",
      "FHIR & REST clients",
      "MLLP / HL7v2 endpoints",
      "X12 EDI parsers",
      "SQL CDC connectors",
      "Kafka / event streams",
    ],
  },
  {
    label: "CURATE",
    heading: "Transformation engine",
    connector: "Govern canonical records",
    accent: "bg-[#C9CBF5]",
    chipClass:
      "bg-[#CBCDF1] text-[#3C3E8C]",
    chips: [
      "Schema inference & mapping",
      "EMPI & deduplication",
      "Terminology validation",
      "FHIR R4 conformance",
      "Quality scoring",
      "Lineage capture",
    ],
  },
  {
    label: "CONSUME",
    heading: "Serving layer",
    connector: "Deliver to teams & tools",
    accent: "bg-[#E9C5BC]",
    chipClass:
      "bg-[#E9C5BC] text-[#9C4A37]",
    chips: [
      "OMOP / Common Data Models",
      "Payer-Ready Data Products",
      "Warehouse writebacks",
      "FHIR R4 API",
      "Bulk export",
      "Semantic SQL layer",
      "Streaming subscriptions",
    ],
  },
];

function LayerSection({
  layer,
}: {
  layer: Layer;
}): JSX.Element {
  return (
    <div className="mb-5">

      <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start">

        {/* LEFT COLUMN */}
        <div>
          <div
            className={`font-mono font-semibold text-[13px] tracking-[1.5px] uppercase mb-3 ${layer.label === "CAPTURE"
                ? "text-[#76834B]"
                : layer.label === "CURATE"
                  ? "text-[#4D56C0]"
                  : "text-[#B35C46]"
              }`}
          >
            {layer.label}
          </div>

          <h3 className="text-[38px] md:text-[32px] leading-[1.02] tracking-[-0.03em] font-medium text-[#2C2925]">
            {layer.heading}
          </h3>
        </div>

        {/* RIGHT COLUMN */}
        <div>

          <div className="border border-[#CFC8BE] rounded-[8px] p-6 md:p-7 bg-transparent">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {layer.chips.map((chip) => (
                <div
                  key={chip}
                  className="bg-[#F4F1EB] rounded-[6px] p-[8px]"
                >
                  <div
                    className={`font-mono text-[12px] rounded-[5px] px-3 py-2 inline-flex ${layer.chipClass}`}
                  >
                    {chip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONNECTOR */}
          <div className="flex items-center gap-4 mt-4 ml-10">

            <div className="flex flex-col items-center">
              <span
                className={`w-[5px] h-[5px] rounded-full ${layer.accent}`}
              />
              <span
                className={`w-[5px] h-[5px] rounded-full ${layer.accent} my-[3px]`}
              />
              <span
                className={`w-[5px] h-[5px] rounded-full ${layer.accent}`}
              />
            </div>

            <div className="text-[18px] text-[#4A463F]">
              →
            </div>

            <div className="text-[17px] text-[#4A463F]">
              {layer.connector}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrustedData(): JSX.Element {
  return (
    <section className="px-6 md:px-12 lg:px-16 bg-[#F7F3EF]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
        <div>
          <div className="font-mono font-semibold text-[13px] tracking-[1.5px] text-[#A8543C] uppercase mb-2">
            Architecture
          </div>

          <h2 className="mb-1 text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#34332C] max-w-[720px]">
            Trusted data for every initiative.
          </h2>
          <p className="max-w-[600px] text-[17px] md:text-[19px] leading-[1.55] text-[#57534C] mt-[20px]">
            Our approach to data readiness fills the gap between data access and usability. We normalize at the platform level for 50+ pre-built data sources—including clinical, claims, administrative, and SDOHs.
          </p>
        </div>

      </div>
      {LAYERS.map((layer) => (
        <LayerSection
          key={layer.label}
          layer={layer}
        />
      ))}

    </section>
  );
}