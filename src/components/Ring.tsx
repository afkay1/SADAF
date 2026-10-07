"use client";

import TLink from "./TLink";

interface Props {
  href: string;
  label: string;
  size?: number;
  dark?: boolean;
}

/** Circular ring CTA with a pulsing halo. */
export default function Ring({ href, label, size = 168, dark = false }: Props) {
  const col = dark ? "border-ink text-ink hover:bg-ink hover:text-cream" : "border-cream text-cream hover:bg-cream hover:text-lagoon";
  return (
    <TLink
      href={href}
      style={{ width: size, height: size }}
      className={`group relative inline-flex items-center justify-center rounded-full border text-center transition-colors duration-500 ${col}`}
    >
      <span className="absolute inset-0 rounded-full border border-current opacity-40 animate-pulse-ring" />
      <span className="fine-text px-6 leading-relaxed">{label}</span>
    </TLink>
  );
}
