"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ROUTE_POINTS } from "@/lib/data";

const D = "M60,60 C260,60 260,200 480,200 S720,380 940,340";

/** A route line draws itself as you scroll; stops light up along it. */
export default function Route() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      const dots = gsap.utils.toArray<SVGCircleElement>(".route-dot");
      const items = gsap.utils.toArray<HTMLElement>(".route-item");
      dots.forEach((d, i) => {
        const pt = p.getPointAtLength((len * i) / (dots.length - 1));
        d.setAttribute("cx", String(pt.x));
        d.setAttribute("cy", String(pt.y));
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 55%", end: "bottom 75%", scrub: 0.6 },
      });
      tl.to(p, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
      dots.forEach((d, i) => {
        const at = i / (dots.length - 1);
        tl.fromTo(d, { attr: { r: 0 } }, { attr: { r: 9 }, duration: 0.08, ease: "back.out(3)" }, Math.max(0, at - 0.04));
        tl.fromTo(items[i], { opacity: 0.25, y: 14 }, { opacity: 1, y: 0, duration: 0.1 }, Math.max(0, at - 0.04));
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative overflow-hidden bg-cream px-page py-28 md:py-44">
      <div className="mb-16 max-w-3xl">
        <p className="fine-text mb-6 opacity-60">Location</p>
        <h2 className="h-display text-[clamp(2.6rem,6vw,6rem)]">Easy to reach. Hard to leave.</h2>
      </div>
      <div className="relative">
        <svg viewBox="0 0 1000 400" className="w-full" aria-hidden>
          <path d={D} fill="none" stroke="rgba(16,40,58,0.15)" strokeWidth="2" strokeDasharray="4 8" />
          <path ref={path} d={D} fill="none" stroke="#e07a5f" strokeWidth="3" strokeLinecap="round" />
          {ROUTE_POINTS.map((r) => (
            <circle key={r.label} className="route-dot" r="0" fill="#10283a" />
          ))}
        </svg>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {ROUTE_POINTS.map((r, i) => (
            <li key={r.label} className="route-item border-t border-ink/30 pt-4">
              <p className="fine-text opacity-50">0{i + 1}</p>
              <p className="h-display mt-2 text-3xl">{r.label}</p>
              <p className="mt-2 text-sm opacity-70">
                {r.time} · {r.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
