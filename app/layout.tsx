import type { Metadata } from "next";
import type { JSX } from "react";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

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
  title: "Health Chain",
  description: "The data readiness layer healthcare has been missing.",
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