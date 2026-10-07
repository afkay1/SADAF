"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Ctx {
  go: (href: string) => void;
}
const TransitionCtx = createContext<Ctx>({ go: () => {} });
export const useTransition = () => useContext(TransitionCtx);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const pending = useRef(false);

  const go = useCallback(
    (href: string) => {
      if (busy.current) return;
      const target = href.split("#")[0].split("?")[0] || "/";
      if (target === window.location.pathname) {
        // Same page: scroll to the anchor, or back to the top.
        const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
        const node = hash ? document.querySelector<HTMLElement>(hash) : null;
        if (window.__lenis) window.__lenis.scrollTo(node ?? 0, { offset: node ? -80 : 0 });
        else if (node) node.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        if (hash) window.history.replaceState(null, "", href);
        return;
      }
      const el = overlay.current;
      if (!el || document.hidden) {
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = true;
      gsap.set(el, { yPercent: 100, display: "flex" });
      gsap.to(el, { yPercent: 0, duration: 0.7, ease: "power3.inOut" });
      // Navigate on a timer so a link can never get stuck waiting on the animation.
      window.setTimeout(() => router.push(href), 750);
      // Safety net: always release the lock and hide the overlay.
      window.setTimeout(() => {
        busy.current = false;
        pending.current = false;
        gsap.set(el, { display: "none" });
      }, 4000);
      gsap.fromTo(label.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
    },
    [router]
  );

  useEffect(() => {
    // Runs after each route change: reset scroll and lift the overlay.
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      const node = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (node) window.__lenis?.scrollTo(node, { offset: -80, duration: 1.2 });
    }, 900);
    const el = overlay.current;
    if (pending.current && el) {
      pending.current = false;
      gsap.to(el, {
        yPercent: -100,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(el, { display: "none" });
          busy.current = false;
        },
      });
    }
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        className="fixed inset-0 z-[90] hidden items-center justify-center bg-lagoon text-cream"
      >
        <span ref={label} className="h-script text-6xl md:text-8xl">
          Sadaf
        </span>
      </div>
    </TransitionCtx.Provider>
  );
}
