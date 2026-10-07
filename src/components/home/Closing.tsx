"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import Ring from "../Ring";

export default function Closing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cl-img", { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1.05, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="light" className="relative flex min-h-[100svh] items-center overflow-hidden bg-lagoon text-white">
      <img src="/images/closing-terrace.jpg" alt="Terrace at sunset" className="cl-img absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="px-page relative z-10 flex w-full flex-col items-start justify-between gap-12 py-28 md:flex-row md:items-end">
        <RevealText as="h2" text="Your place on the Red Sea is waiting." className="h-display max-w-[11ch] text-[clamp(3rem,8.5vw,8.5rem)]" />
        <Ring href="/contact#book" label="Book a call" size={176} />
      </div>
    </section>
  );
}
