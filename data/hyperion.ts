/**
 * Hyperion open-source announcement. Single source for the Home hero modal
 * (components/Hero.tsx) and the Resources page section, so both stay in sync.
 */
export interface HyperionAnnouncementContent {
  section: string;
  label: string;
  title: string;
  summary: string;
  ctaLabel: string;
  href: string;
}

export const HYPERION_ANNOUNCEMENT: HyperionAnnouncementContent = {
  section: "Hyperion – Health Chain Analytics Tool",
  label: "Open Source, Apache Licensed",
  title: "Health Chain Analytics Tool Hyperion is now Open Sourced",
  summary:
    "Hyperion flattens each FHIR R4 resource into a table. Columns mirror the resource, so the shape you query is the shape you already know.",
  ctaLabel: "Download Now",
  href: "https://github.com/Health-Chain-Inc/hyperion",
};
