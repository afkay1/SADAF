"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { REASONS } from "@/lib/data";
import RevealText from "../RevealText";

/** Three reasons, each a slider panel: image crossfades, text slides. */
export default function Reasons() {
  const [i, setI] = useState(0);
  const first = useRef(true);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(".reason-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".reason-img-active", { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [i]);

  const go = (n: number) => setI((n + REASONS.length) % REASONS.length);

  return (
    <section ref={root} data-nav-theme="dark" className="px-page py-24 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <RevealText as="h2" text="Three reasons to live here" className="h-display max-w-[12ch] text-[clamp(2.8rem,7vw,7rem)]" />
        <div className="flex gap-3">
          <button onClick={() => go(i - 1)} className="fine-text h-14 w-14 rounded-full border border-ink transition-colors hover:bg-ink hover:text-cream" aria-label="Previous reason">
            ←
          </button>
          <button onClick={() => go(i + 1)} className="fine-text h-14 w-14 rounded-full border border-ink transition-colors hover:bg-ink hover:text-cream" aria-label="Next reason">
            →
          </button>
        </div>
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-aqua md:aspect-auto md:min-h-[560px]">
          {REASONS.map((r, n) => (
            <img
              key={r.image}
              src={r.image}
              alt={r.title}
             
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${n === i ? "reason-img-active opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <div className="reason-text flex flex-col justify-between bg-aqua p-8 md:p-12">
          <span className="h-display text-7xl opacity-60">0{i + 1}</span>
          <div>
            <h3 className="h-display text-4xl md:text-6xl">{REASONS[i].title}</h3>
            <p className="mt-6 max-w-md text-base leading-relaxed opacity-80">{REASONS[i].text}</p>
          </div>
          <div className="mt-10 flex gap-2">
            {REASONS.map((_, n) => (
              <button key={n} onClick={() => setI(n)} aria-label={`Reason ${n + 1}`} className={`h-px flex-1 transition-all ${n === i ? "bg-ink" : "bg-ink/25"}`} style={{ height: 2 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
