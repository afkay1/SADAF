"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PANELS = [
  { img: "/images/facade-low-angle.jpg", title: "Stone & shade", text: "Limestone façades and deep loggias keep every home naturally cool." },
  { img: "/images/majlis-corner.jpg", title: "The majlis", text: "A room for gathering, softly lit through carved screens." },
  { img: "/images/terrace-tall.jpg", title: "The terrace", text: "Where breakfast, sunset and the sea all happen in one place." },
  { img: "/images/apartment-courtyard.jpg", title: "The courtyard", text: "A private pocket of shade and water at the centre of the home." },
];

/** Pinned section: vertical scroll drives a horizontal track. */
export default function HScroll() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const t = track.current;
      if (!t) return;
      const dist = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>(".hs-img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} data-nav-theme="dark" className="relative overflow-hidden bg-aqua">
      <div ref={track} className="flex flex-col gap-10 px-page py-20 md:h-screen md:flex-row md:items-center md:gap-[6vw] md:py-0 md:pr-[20vw]">
        <div className="shrink-0 md:w-[34vw]">
          <p className="fine-text mb-6 opacity-60">Life at SADAF</p>
          <h2 className="h-display text-[clamp(2.8rem,6vw,6rem)]">Rooms that open to the outside.</h2>
        </div>
        {PANELS.map((p) => (
          <figure key={p.title} className="shrink-0 md:w-[28vw]">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={p.img} alt={p.title} className="hs-img h-full w-full scale-[1.25] object-cover" />
            </div>
            <figcaption className="mt-5">
              <p className="h-display text-3xl">{p.title}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed opacity-70">{p.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
