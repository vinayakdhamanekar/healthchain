import type { Metadata } from "next";

export const SITE_URL = "https://www.healthchain.com";
export const SITE_NAME = "Health Chain";
const DEFAULT_OG_IMAGE = "/hclogo.png";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  image?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1800, height: 500, alt: SITE_NAME }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
