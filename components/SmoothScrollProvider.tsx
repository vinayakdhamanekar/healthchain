"use client";

import { useEffect, useLayoutEffect, useRef, type JSX, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fallback clearance for anchor targets that don't declare their own
// `scroll-mt-*`. Sections that already set scroll-margin-top (e.g. the
// resources/platform pages use `scroll-mt-[100px]`) are respected instead.
const DEFAULT_ANCHOR_OFFSET = 100;

function resolveOffset(target: Element): number {
  const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop);
  return -(Number.isFinite(scrollMarginTop) && scrollMarginTop > 0 ? scrollMarginTop : DEFAULT_ANCHOR_OFFSET);
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
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth expo-out
    });
    lenisRef.current = lenis;

    const syncScrollTrigger = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(syncScrollTrigger);
    gsap.ticker.lagSmoothing(0); // Lenis already smooths; GSAP's own lag smoothing would double up and stutter

    return () => {
      gsap.ticker.remove(syncScrollTrigger);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis owns scroll position independently of the browser — it re-asserts
  // its own animatedScroll value on every raf tick, which silently undoes a
  // plain window.scrollTo() (or the browser's native hash-jump) on the very
  // next frame. Every scroll reset on route change has to go through
  // lenis.scrollTo() instead, or it gets clobbered.
  useEffect(() => {
    const scrollToHash = (hash: string, immediate: boolean) => {
      // wait for the new page's layout (and any scroll-mt-* it declares) to
      // settle before measuring the target's position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.querySelector<HTMLElement>(hash);
          const lenis = lenisRef.current;
          if (!lenis) return;
          if (target) {
            lenis.scrollTo(target, { offset: resolveOffset(target), immediate });
          } else {
            lenis.scrollTo(0, { immediate: true });
          }
        });
      });
    };

    const firstRender = isFirstRender.current;
    isFirstRender.current = false;

    if (firstRender) {
      // page loaded directly on a URL with a hash — jump straight there,
      // no animation, so it doesn't visibly scroll from top on refresh
      if (window.location.hash) scrollToHash(window.location.hash, true);
      return;
    }

    if (window.location.hash) {
      scrollToHash(window.location.hash, false);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // Smooth-scroll same-page anchor clicks (href="#id" or "/current-path#id")
  // through Lenis instead of the browser's instant native jump. Cross-page
  // anchor links (e.g. "/resources#whitepapers" clicked from another page)
  // are left to Next's normal navigation — the pathname effect above picks
  // up the hash once the destination page has mounted. Runs in the capture
  // phase so it fires before Next's own Link click handler.
  useEffect(() => {
    function onClick(e: MouseEvent): void {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const [path, hash] = href.split("#");
      if (!hash) return;
      if (path !== "" && path !== pathname) return;

      const target = document.getElementById(hash);
      if (!target) return;

      e.preventDefault();
      lenisRef.current?.scrollTo(target, { offset: resolveOffset(target) });
      window.history.pushState(null, "", `#${hash}`);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return <>{children}</>;
}