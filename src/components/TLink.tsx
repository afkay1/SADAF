"use client";

import { useTransition } from "./TransitionProvider";

interface Props extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

export default function TLink({ href, onClick, children, ...rest }: Props) {
  const { go } = useTransition();
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
        e.preventDefault();
        go(href);
      }}
    >
      {children}
    </a>
  );
}
