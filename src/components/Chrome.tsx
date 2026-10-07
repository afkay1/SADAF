"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TLink from "./TLink";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/apartments", label: "Apartments" },
  { href: "/contact", label: "Contact" },
];

export default function Chrome() {
  const pathname = usePathname();
  const counter = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  // Fixed UI colour follows the section under it.
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.nav = "dark";
    const t = window.setTimeout(() => {
      const triggers = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (counter.current) counter.current.textContent = String(Math.round(self.progress * 100)).padStart(2, "0");
        },
      });
      const secs = gsap.utils.toArray<HTMLElement>("[data-nav-theme]");
      const sts = secs.map((s) =>
        ScrollTrigger.create({
          trigger: s,
          start: "top 40px",
          end: "bottom 40px",
          onToggle: (self) => {
            if (self.isActive) html.dataset.nav = s.dataset.navTheme === "light" ? "light" : "dark";
          },
        })
      );
      cleanup = () => {
        triggers.kill();
        sts.forEach((x) => x.kill());
      };
    }, 400);
    let cleanup = () => {};
    return () => {
      window.clearTimeout(t);
      cleanup();
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="chrome fixed inset-x-0 top-0 z-50 flex items-center justify-between px-page py-5 md:py-7">
        <TLink href="/" className="h-script text-3xl leading-none md:text-4xl" aria-label="SADAF Residences home">
          Sadaf
        </TLink>
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <TLink
              key={l.href}
              href={l.href}
              className={`fine-text group relative py-1 ${pathname === l.href ? "" : "opacity-80 hover:opacity-100"}`}
            >
              {l.label}
              <span
                className={`chrome-line absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500 ${
                  pathname === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </TLink>
          ))}
          <TLink
            href="/contact#book"
            className="fine-text rounded-full border border-current px-5 py-2.5 transition-opacity hover:opacity-70"
          >
            Book a call
          </TLink>
        </nav>
        <button
          className="fine-text md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-lagoon px-page text-cream md:hidden">
          {[...LINKS, { href: "/contact#book", label: "Book a call" }].map((l) => (
            <TLink key={l.href} href={l.href} className="h-display text-6xl">
              {l.label}
            </TLink>
          ))}
        </div>
      )}

      <div className="chrome pointer-events-none fixed bottom-6 right-[var(--pad)] z-40 hidden items-end gap-2 md:flex">
        <span ref={counter} className="h-display text-5xl leading-none tabular-nums">
          00
        </span>
        <span className="fine-text pb-1 opacity-70">/ 100</span>
      </div>
    </>
  );
}
