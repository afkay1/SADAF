import { BRAND } from "@/lib/data";
import TLink from "./TLink";

/** Lagoon-coloured footer with an oversized phone number. */
export default function Footer() {
  return (
    <footer data-nav-theme="light" className="bg-lagoon px-page pb-10 pt-24 text-cream md:pt-36">
      <p className="fine-text mb-6 opacity-60">Speak to our sales team</p>
      <a href={BRAND.phoneHref} className="h-display block whitespace-nowrap text-[clamp(2.6rem,9.2vw,10rem)] transition-opacity hover:opacity-70">
        {BRAND.phone}
      </a>
      <div className="mt-16 grid gap-10 border-t border-cream/20 pt-10 text-sm md:grid-cols-4">
        <div>
          <p className="h-script text-4xl">Sadaf</p>
          <p className="mt-3 max-w-[22ch] opacity-70">{BRAND.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="fine-text mb-2 opacity-50">Explore</p>
          <TLink href="/" className="opacity-80 hover:opacity-100">Home</TLink>
          <TLink href="/apartments" className="opacity-80 hover:opacity-100">Apartments</TLink>
          <TLink href="/contact" className="opacity-80 hover:opacity-100">Contact</TLink>
        </div>
        <div className="flex flex-col gap-2">
          <p className="fine-text mb-2 opacity-50">Visit</p>
          <p className="opacity-80">{BRAND.address}</p>
          <p className="opacity-80">Sales gallery open daily 10:00 – 20:00</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="fine-text mb-2 opacity-50">Write</p>
          <a href={`mailto:${BRAND.email}`} className="opacity-80 hover:opacity-100">{BRAND.email}</a>
        </div>
      </div>
      <p className="mt-14 text-xs opacity-50">© 2026 SADAF Development Co. Concept project. Images are AI-generated illustrations; prices and details are illustrative.</p>
    </footer>
  );
}
