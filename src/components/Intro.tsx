"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) {
      setDone(true);
      return;
    }
    const el = root.current;
    if (!el) return;
    const tl = gsap.timeline({
      onComplete: () => {
        html.classList.remove("intro");
        try {
          sessionStorage.setItem("sadaf-intro", "1");
        } catch {}
        setDone(true);
      },
    });
    tl.fromTo(".intro-word", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power4.out" })
      .fromTo(".intro-line", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.2)
      .to(".intro-word", { yPercent: -110, duration: 0.7, ease: "power3.in" }, 1.8)
      .to(el, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, 2.2);
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lagoon text-cream">
      <div className="overflow-hidden px-4 py-2">
        <div className="intro-word h-script text-7xl md:text-9xl">Sadaf</div>
      </div>
      <div className="intro-line mt-4 h-px w-40 origin-left bg-cream/60" />
      <p className="fine-text mt-4 text-cream/70">Residences · Red Sea</p>
    </div>
  );
}
