"use client";

import { useState } from "react";
import { CREDITS } from "@/lib/data";

/** Accordion; the + rotates into a × when open. */
export default function Credits() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section data-nav-theme="dark" className="bg-aqua px-page py-24 md:py-40">
      <p className="fine-text mb-10 opacity-60">The team</p>
      <ul>
        {CREDITS.map((c, n) => {
          const isOpen = open === n;
          return (
            <li key={c.role} className="border-t border-ink/30">
              <button
                onClick={() => setOpen(isOpen ? null : n)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              >
                <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-10">
                  <span className="fine-text w-48 opacity-60">{c.role}</span>
                  <span className="h-display text-[clamp(2rem,4.5vw,4.5rem)]">{c.name}</span>
                </span>
                <span className={`h-display text-5xl leading-none transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] pb-8 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="overflow-hidden text-sm leading-relaxed opacity-80 md:ml-[calc(12rem+2.5rem)] md:max-w-lg">{c.text}</p>
              </div>
            </li>
          );
        })}
        <li className="border-t border-ink/30" />
      </ul>
    </section>
  );
}
