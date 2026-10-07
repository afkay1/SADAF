import { Suspense } from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import RevealText from "@/components/RevealText";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a call — SADAF",
  description: "Speak to the SADAF sales team and arrange a private viewing.",
};

export default function ContactPage() {
  return (
    <>
      <section data-nav-theme="dark" className="px-page pb-28 pt-36 md:pt-48">
        <p className="fine-text mb-6 opacity-60">Contact</p>
        <RevealText as="h1" immediate delay={0.2} text="Let’s find your home by the sea." className="h-display mb-20 max-w-[12ch] text-[clamp(3rem,8vw,8rem)]" />
        <div id="book" className="grid scroll-mt-28 gap-16 md:grid-cols-[1.4fr_1fr]">
          <Suspense fallback={<div className="h-96" />}>
            <ContactForm />
          </Suspense>
          <aside className="flex flex-col gap-8 text-sm">
            <div>
              <p className="fine-text mb-2 opacity-50">Call</p>
              <a href={BRAND.phoneHref} className="h-display text-4xl">{BRAND.phone}</a>
            </div>
            <div>
              <p className="fine-text mb-2 opacity-50">Email</p>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </div>
            <div>
              <p className="fine-text mb-2 opacity-50">Sales gallery</p>
              <p>{BRAND.address}</p>
              <p className="mt-1 opacity-70">Open daily 10:00 – 20:00</p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
