"use client";

import { useLayoutEffect, type JSX, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mount this ONCE, wrapping the page content in app/layout.tsx — not inside
 * individual sections. Lenis hijacks the browser's native scroll globally; if
 * more than one component on the same page creates its own Lenis instance,
 * they fight each other and scrolling gets WORSE, not smoother (stutter,
 * momentum fighting momentum). One instance here, shared by every
 * ScrollTrigger-based section (Testimonial, IngestSection, Solutions,
 * EnterpriseSuccess, CompliancePath, HowWorks, etc.), is the correct setup.
 *
 * Usage in app/layout.tsx:
 *
 *   import SmoothScrollProvider from "@/components/SmoothScrollProvider";
 *
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <SmoothScrollProvider>{children}</SmoothScrollProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * If any individual section (e.g. an earlier version of IngestSection) still
 * creates its own `new Lenis(...)`, remove that — this provider replaces it.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }): JSX.Element {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth expo-out
    });

    const syncScrollTrigger = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(syncScrollTrigger);
    gsap.ticker.lagSmoothing(0); // Lenis already smooths; GSAP's own lag smoothing would double up and stutter

    return () => {
      gsap.ticker.remove(syncScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}