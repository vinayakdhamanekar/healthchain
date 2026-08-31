import type { Metadata } from "next";
import type { JSX } from "react";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Health Chain | Payer Data Readiness Platform",
  description:
    "Health Chain captures, curates, and delivers clean longitudinal member data so payers can act on FHIR-ready data, not wrestle with it.",
  keywords: [
    "healthcare data interoperability",
    "payer data integration",
    "health plan data platform",
    "longitudinal member data",
    "FHIR data platform",
  ],
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: "/hclogo.png", width: 1800, height: 500, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}