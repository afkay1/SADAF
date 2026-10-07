"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { APARTMENTS, TYPES, formatSAR } from "@/lib/data";
import TLink from "./TLink";

export default function ApartmentsList() {
  const params = useSearchParams();
  const initial = params.get("type");
  const [type, setType] = useState<(typeof TYPES)[number]>(
    TYPES.includes(initial as (typeof TYPES)[number]) ? (initial as (typeof TYPES)[number]) : "All"
  );
  const grid = useRef<HTMLDivElement>(null);

  const list = useMemo(() => (type === "All" ? APARTMENTS : APARTMENTS.filter((a) => a.type === type)), [type]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".apt-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
    }, grid);
    return () => ctx.revert();
  }, [type]);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-3" role="tablist" aria-label="Filter by type">
        {TYPES.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={type === t}
            onClick={() => setType(t)}
            className={`fine-text rounded-full border border-ink px-6 py-3 transition-colors ${type === t ? "bg-ink text-cream" : "hover:bg-ink/10"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div ref={grid} className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <TLink key={a.slug} href={`/apartments/${a.slug}`} className="apt-card group block">
            <div className="aspect-[4/5] overflow-hidden bg-aqua">
              <img src={a.image} alt={a.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="fine-text opacity-50">{a.type} · Floor {a.floor}</p>
                <p className="h-display mt-1 text-3xl">{a.name}</p>
              </div>
              <p className="fine-text mt-1 whitespace-nowrap">{formatSAR(a.price)}</p>
            </div>
            <p className="mt-2 text-sm opacity-60">
              {a.beds} bed · {a.baths} bath · {a.size} m² + {a.terrace} m² terrace
            </p>
          </TLink>
        ))}
      </div>
      {list.length === 0 && <p className="opacity-60">No residences match this filter.</p>}
    </>
  );
}
