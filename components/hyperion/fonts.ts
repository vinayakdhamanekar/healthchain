import { JetBrains_Mono } from "next/font/google";

/*
 * Hyperion-only JetBrains Mono instance that adds weight 600 (eyebrows and
 * labels), which the site-wide instance in app/layout.tsx doesn't load. Its
 * font files are only requested on the Hyperion route.
 */
export const hyperionMono = JetBrains_Mono({
  variable: "--font-hyperion-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** Points Tailwind's font-mono at the Hyperion instance for everything inside. */
export const HYPERION_FONTS = `${hyperionMono.variable} [--font-jetbrains-mono:var(--font-hyperion-mono)]`;
