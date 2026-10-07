"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  start?: string;
  immediate?: boolean;
}

/** Word-by-word masked reveal. Words rise out of a clipped line. */
export default function RevealText({ text, as = "div", className = "", delay = 0, start = "top 85%", immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>(".mask > span");
    gsap.set(inner, { yPercent: 115 });
    const tween = gsap.to(inner, {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.06,
      delay,
      paused: true,
    });
    if (immediate) {
      tween.play();
      return () => {
        tween.kill();
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween.play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    void start;
    return () => {
      io.disconnect();
      tween.kill();
    };
  }, [text, delay, start, immediate]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="mask">
          <span>{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
