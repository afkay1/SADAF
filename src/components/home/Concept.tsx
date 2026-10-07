"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import { STATS } from "@/lib/data";

/** Concept copy with flower cut-outs drifting at different parallax speeds. */
export default function Concept() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = parseFloat(el.dataset.speed || "0");
        gsap.fromTo(
          el,
          { yPercent: -s * 40 },
          { yPercent: s * 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
      gsap.fromTo(
        ".stat",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative overflow-hidden bg-cream px-page py-28 md:py-48">
      <img src="/images/flower-branch.png" alt="" aria-hidden data-speed="1.2" className="pointer-events-none absolute -left-10 top-10 w-40 md:left-4 md:w-72" />
      <img src="/images/flower-cluster.png" alt="" aria-hidden data-speed="-0.9" className="pointer-events-none absolute -right-6 top-1/3 w-36 md:right-10 md:w-64" />
      <img src="/images/palm-frond.png" alt="" aria-hidden data-speed="0.6" className="pointer-events-none absolute -bottom-6 left-1/3 w-56 md:w-[26rem]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="fine-text mb-8 opacity-60">The concept</p>
        <RevealText
          as="h2"
          text="A small seaside village, designed for slow mornings and long evenings."
          className="h-display text-[clamp(2.6rem,6.5vw,6.5rem)]"
        />
        <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed opacity-75">
          SADAF brings together 96 homes in four collections, each shaped by the coastal architecture of the Hejaz and arranged around a shared lagoon, gardens and a community majlis.
        </p>
      </div>

      <div className="stats relative z-10 mx-auto mt-24 grid max-w-5xl grid-cols-2 gap-y-10 border-t border-ink/20 pt-12 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <p className="h-display text-6xl md:text-7xl">{s.value}</p>
            <p className="fine-text mt-3 opacity-60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
