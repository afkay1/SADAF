"use client";

import { useState } from "react";
import { AMENITIES } from "@/lib/data";

/** Amenity list; hovering/tapping an item crossfades the image. */
export default function Amenities() {
  const [i, setI] = useState(0);

  return (
    <section data-nav-theme="light" className="relative overflow-hidden bg-lagoon text-cream">
      <div className="absolute inset-0">
        {AMENITIES.map((a, n) => (
          <img
            key={a.image}
            src={a.image}
            alt=""
            aria-hidden
           
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${n === i ? "opacity-45" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-lagoon/50" />
      </div>
      <div className="relative z-10 px-page py-24 md:py-40">
        <p className="fine-text mb-10 opacity-70">Amenities</p>
        <ul>
          {AMENITIES.map((a, n) => (
            <li key={a.name} onMouseEnter={() => setI(n)} onFocus={() => setI(n)} onClick={() => setI(n)} className="border-t border-cream/25 py-6 md:py-8">
              <button className="flex w-full flex-col items-start gap-3 text-left md:flex-row md:items-baseline md:justify-between" aria-label={a.name}>
                <span className={`h-display text-[clamp(2.4rem,6vw,5.5rem)] transition-opacity duration-500 ${n === i ? "opacity-100" : "opacity-40"}`}>
                  {a.name}
                </span>
                <span className={`max-w-sm text-sm leading-relaxed transition-opacity duration-500 ${n === i ? "opacity-90" : "opacity-0 md:opacity-0"}`}>{a.text}</span>
              </button>
            </li>
          ))}
          <li className="border-t border-cream/25" />
        </ul>
      </div>
    </section>
  );
}
