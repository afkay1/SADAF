"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import RevealText from "../RevealText";
import Badge from "../Badge";
import TLink from "../TLink";

const HOTSPOTS = [
  { x: "27%", y: "58%", title: "The lagoon", text: "A 60 m saltwater pool at the heart of the community.", href: "/apartments?type=Garden" },
  { x: "52%", y: "42%", title: "Terrace residences", text: "Wide sea-facing terraces on the upper floors.", href: "/apartments?type=Terrace" },
  { x: "74%", y: "55%", title: "Courtyard homes", text: "Quiet inner courtyards with carved screens.", href: "/apartments?type=Courtyard" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-img", { scale: 1.18 }, { scale: 1.04, duration: 3.2, ease: "power2.out", delay: 0.2 });
      gsap.to(".hero-media", {
        scale: 1.12,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".hero-fade", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, delay: 1.1, stagger: 0.12, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="light" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-lagoon text-white">
      <div className="hero-media absolute inset-0">
        <img src="/images/hero-day.jpg" alt="SADAF Residences by day" className="hero-img absolute inset-0 h-full w-full object-cover" />
        <img
          src="/images/hero-night.jpg"
          alt="SADAF Residences by night"
          className={`hero-img absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${night ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/30" />

      {HOTSPOTS.map((h) => (
        <div key={h.title} className="group absolute z-20 hidden md:block" style={{ left: h.x, top: h.y }}>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/10 backdrop-blur-sm" aria-label={h.title}>
            <span className="absolute inset-0 rounded-full border border-white animate-pulse-ring" />
            <span className="h-2 w-2 rounded-full bg-white" />
          </button>
          <div className="pointer-events-none absolute left-1/2 top-12 w-60 -translate-x-1/2 translate-y-2 rounded-sm bg-cream p-5 text-ink opacity-0 shadow-xl transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <p className="h-display text-2xl">{h.title}</p>
            <p className="mt-2 text-xs leading-relaxed opacity-75">{h.text}</p>
            <TLink href={h.href} className="fine-text mt-3 inline-block border-b border-ink pb-0.5">
              View homes
            </TLink>
          </div>
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col justify-end px-page pb-14 md:pb-16">
        <p className="hero-fade fine-text mb-5 opacity-0">Al Shuaibah Coast · Red Sea</p>
        <RevealText
          as="h1"
          immediate
          delay={0.9}
          text="Where the palms meet the Red Sea"
          className="h-display max-w-[14ch] text-[clamp(3.2rem,10vw,9.5rem)]"
        />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="hero-fade flex items-center gap-1 rounded-full border border-white/50 p-1 opacity-0 backdrop-blur-sm">
            {(["By day", "By night"] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => setNight(i === 1)}
                className={`fine-text rounded-full px-5 py-2.5 transition-colors duration-500 ${night === (i === 1) ? "bg-white text-ink" : "text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="hero-fade opacity-0">
            <Badge size={120} />
          </div>
        </div>
      </div>
    </section>
  );
}
