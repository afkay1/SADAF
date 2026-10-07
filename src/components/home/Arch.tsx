"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dome-shaped window that opens as you scroll, with text curving over its crown. */
export default function Arch() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", scrub: 0.8, pin: ".arch-stage" },
      });
      tl.fromTo(".arch-dome", { width: "34vw", height: "46vh" }, { width: "100vw", height: "100vh", ease: "none" }, 0)
        .fromTo(".arch-dome", { borderTopLeftRadius: "50% 100%", borderTopRightRadius: "50% 100%" }, { borderTopLeftRadius: "0% 0%", borderTopRightRadius: "0% 0%", ease: "none" }, 0.4)
        .fromTo(".arch-img", { scale: 1.3 }, { scale: 1, ease: "none" }, 0)
        .to(".arch-text", { opacity: 0, y: -60, ease: "none" }, 0.1)
        .fromTo(".arch-copy", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.65);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative bg-cream">
      <div className="arch-stage relative flex h-screen items-end justify-center overflow-hidden">
        <svg viewBox="0 0 1000 380" className="arch-text pointer-events-none absolute left-1/2 top-[8vh] w-[min(88vw,1100px)] -translate-x-1/2 text-ink" aria-hidden>
          <path id="arch-path" d="M20,370 C20,120 240,20 500,20 C760,20 980,120 980,370" fill="none" />
          <text fontSize="58" fill="currentColor" textAnchor="middle" style={{ fontFamily: "var(--font-display)" }}>
            <textPath href="#arch-path" startOffset="50%">
              A quiet harbour of sand, stone and sea
            </textPath>
          </text>
        </svg>
        <div
          className="arch-dome relative overflow-hidden"
          style={{ width: "34vw", height: "46vh", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", minWidth: 260 }}
        >
          <img src="/images/aerial-coast.jpg" alt="Aerial view of the SADAF coastline" className="arch-img h-full w-full object-cover" />
          <div className="arch-copy absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-page pb-14 pt-32 text-white opacity-0">
            <p className="h-display max-w-3xl text-4xl md:text-6xl">Ninety-six homes, one shoreline, and room to breathe.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
