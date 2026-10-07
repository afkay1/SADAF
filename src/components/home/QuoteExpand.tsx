"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Small image expands to full-bleed while a quote fades in over it. */
export default function QuoteExpand() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", scrub: 0.8, pin: ".qe-stage" },
      });
      tl.fromTo(".qe-frame", { width: "26vw", height: "34vh" }, { width: "100vw", height: "100vh", ease: "none" }, 0)
        .fromTo(".qe-img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".qe-quote", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.55)
        .fromTo(".qe-shade", { opacity: 0 }, { opacity: 1, ease: "none" }, 0.5);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="light" className="relative bg-cream">
      <div className="qe-stage relative flex h-screen items-center justify-center overflow-hidden">
        <div className="qe-frame relative overflow-hidden" style={{ width: "26vw", height: "34vh", minWidth: 200 }}>
          <img src="/images/quote-pool.jpg" alt="Evening at the lagoon pool" loading="lazy" className="qe-img h-full w-full object-cover" />
          <div className="qe-shade absolute inset-0 bg-black/40 opacity-0" />
          <blockquote className="qe-quote absolute inset-0 flex flex-col items-center justify-center px-page text-center text-white opacity-0">
            <p className="h-display max-w-4xl text-[clamp(2rem,5.5vw,5.5rem)]">
              “We came for a weekend. We stayed because the house felt like it had always been ours.”
            </p>
            <footer className="fine-text mt-8 opacity-80">Layla &amp; Omar, Residents of Marjan Garden</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
