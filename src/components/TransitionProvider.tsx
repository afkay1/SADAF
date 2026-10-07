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
        router.push(href);
        return;
      }
      busy.current = true;
      pending.current = true;
      const el = overlay.current;
      if (!el) {
        router.push(href);
        return;
      }
      gsap.set(el, { yPercent: 100, display: "flex" });
      gsap.to(el, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
        },
      });
      gsap.fromTo(label.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
    },
    [router]
  );

  useEffect(() => {
    // Runs after each route change: reset scroll and lift the overlay.
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
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
