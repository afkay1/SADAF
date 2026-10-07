"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Giant ARCHITECTURE word. A cream layer with black text sits on top of the image
 * using mix-blend-mode: screen, so the letters act as windows onto the photo,
 * and the photo grows beneath them as you scroll.
 */
export default function Architecture() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=130%", scrub: 0.8, pin: ".ar-stage" },
      });
      tl.fromTo(".ar-img", { scale: 1.0 }, { scale: 1.7, ease: "none" }, 0).fromTo(".ar-word", { scale: 1 }, { scale: 1.06, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative bg-cream">
      <div className="ar-stage relative h-screen overflow-hidden">
        <img src="/images/facade-low-angle.jpg" alt="SADAF façade in limestone" className="ar-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-cream" style={{ mixBlendMode: "screen" }}>
          <span className="ar-word h-display select-none text-center font-medium text-black" style={{ fontSize: "clamp(3rem, 15.5vw, 17rem)", lineHeight: 1 }}>
            ARCHITECTURE
          </span>
        </div>
      </div>
      <div className="px-page py-24 md:py-36">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="h-display text-[clamp(2rem,4.8vw,4.6rem)]">
            Built from local limestone and shaped by shade, each home is designed to feel cool without trying.
          </p>
          <footer className="fine-text mt-8 opacity-60">Studio Salma Al-Qahtani, Lead architect</footer>
        </blockquote>
      </div>
    </section>
  );
}
