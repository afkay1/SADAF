"use client";

import { useRef } from "react";
import { APARTMENTS, formatSAR } from "@/lib/data";
import RevealText from "../RevealText";
import TLink from "../TLink";

/** Apartment-type slider: drag / scroll / arrow buttons. */
export default function Types() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section data-nav-theme="dark" className="bg-cream py-24 md:py-40">
      <div className="px-page mb-14 flex flex-wrap items-end justify-between gap-6">
        <RevealText as="h2" text="Find your residence" className="h-display max-w-[10ch] text-[clamp(2.8rem,7vw,7rem)]" />
        <div className="flex gap-3">
          <button onClick={() => scroll(-1)} className="fine-text h-14 w-14 rounded-full border border-ink transition-colors hover:bg-ink hover:text-cream" aria-label="Scroll left">
            ←
          </button>
          <button onClick={() => scroll(1)} className="fine-text h-14 w-14 rounded-full border border-ink transition-colors hover:bg-ink hover:text-cream" aria-label="Scroll right">
            →
          </button>
        </div>
      </div>

      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-page pb-4" data-lenis-prevent-wheel>
        {APARTMENTS.map((a) => (
          <TLink key={a.slug} href={`/apartments/${a.slug}`} className="group w-[78vw] shrink-0 snap-start md:w-[26vw] md:min-w-[320px]">
            <div className="aspect-[4/5] overflow-hidden bg-aqua">
              <img src={a.image} alt={a.name} className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="fine-text opacity-50">{a.type}</p>
                <p className="h-display mt-1 text-3xl">{a.name}</p>
              </div>
              <p className="fine-text mt-1 whitespace-nowrap">{formatSAR(a.price)}</p>
            </div>
            <p className="mt-2 text-sm opacity-60">
              {a.beds} bed · {a.baths} bath · {a.size} m²
            </p>
          </TLink>
        ))}
      </div>

      <div className="px-page mt-12">
        <TLink href="/apartments" className="fine-text border-b border-ink pb-1">
          See all residences
        </TLink>
      </div>
    </section>
  );
}
