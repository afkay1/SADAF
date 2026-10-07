import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { APARTMENTS, formatSAR } from "@/lib/data";
import TLink from "@/components/TLink";
import Footer from "@/components/Footer";
import Ring from "@/components/Ring";

export function generateStaticParams() {
  return APARTMENTS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = APARTMENTS.find((x) => x.slug === params.slug);
  return a ? { title: `${a.name} — SADAF`, description: a.blurb } : {};
}

export default function ApartmentPage({ params }: { params: { slug: string } }) {
  const a = APARTMENTS.find((x) => x.slug === params.slug);
  if (!a) notFound();
  const idx = APARTMENTS.indexOf(a);
  const next = APARTMENTS[(idx + 1) % APARTMENTS.length];

  const specs = [
    ["Type", a.type],
    ["Bedrooms", String(a.beds)],
    ["Bathrooms", String(a.baths)],
    ["Interior", `${a.size} m²`],
    ["Terrace", `${a.terrace} m²`],
    ["Floor", a.floor],
  ];

  return (
    <>
      <section data-nav-theme="light" className="relative h-[85svh] min-h-[560px] overflow-hidden bg-lagoon text-white">
        <img src={a.image} alt={a.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="px-page relative z-10 flex h-full flex-col justify-end pb-14">
          <p className="fine-text mb-4 opacity-80">{a.type} residence</p>
          <h1 className="h-display max-w-[14ch] text-[clamp(3rem,8vw,8rem)]">{a.name}</h1>
        </div>
      </section>

      <section data-nav-theme="dark" className="px-page grid gap-16 py-24 md:grid-cols-[1.2fr_1fr] md:py-36">
        <div>
          <p className="h-display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-tight">{a.blurb}</p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {a.details.map((d) => (
              <li key={d} className="border-t border-ink/25 pt-3 text-sm opacity-80">{d}</li>
            ))}
          </ul>
        </div>
        <aside className="self-start bg-aqua p-8 md:p-10">
          <p className="fine-text opacity-60">Price from</p>
          <p className="h-display mt-2 text-5xl">{formatSAR(a.price)}</p>
          <dl className="mt-8 grid grid-cols-2 gap-y-5">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt className="fine-text opacity-50">{k}</dt>
                <dd className="mt-1 text-lg">{v}</dd>
              </div>
            ))}
          </dl>
          <TLink
            href={`/contact?residence=${a.slug}#book`}
            className="fine-text mt-10 block rounded-full bg-ink px-6 py-4 text-center text-cream transition-opacity hover:opacity-80"
          >
            Enquire about this home
          </TLink>
        </aside>
      </section>

      <section data-nav-theme="dark" className="px-page grid gap-6 pb-24 md:grid-cols-3 md:pb-36">
        {a.gallery.map((g) => (
          <div key={g} className="aspect-[4/3] overflow-hidden bg-aqua">
            <img src={g} alt={`${a.name} interior`} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </section>

      <section data-nav-theme="light" className="px-page flex flex-col items-start justify-between gap-10 bg-lagoon py-24 text-cream md:flex-row md:items-center">
        <div>
          <p className="fine-text mb-4 opacity-60">Next residence</p>
          <TLink href={`/apartments/${next.slug}`} className="h-display text-[clamp(2.4rem,6vw,6rem)] hover:opacity-70">
            {next.name}
          </TLink>
        </div>
        <Ring href={`/contact?residence=${a.slug}#book`} label="Book a call" />
      </section>
      <Footer />
    </>
  );
}
