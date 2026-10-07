import { Suspense } from "react";
import type { Metadata } from "next";
import ApartmentsList from "@/components/ApartmentsList";
import RevealText from "@/components/RevealText";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Residences — SADAF",
  description: "Garden, courtyard, terrace and penthouse homes at SADAF, from SAR 1.19 million.",
};

export default function ApartmentsPage() {
  return (
    <>
      <section data-nav-theme="dark" className="px-page pb-28 pt-36 md:pt-48">
        <p className="fine-text mb-6 opacity-60">Residences</p>
        <RevealText as="h1" immediate delay={0.2} text="Six homes, four ways to live by the sea." className="h-display mb-16 max-w-[14ch] text-[clamp(3rem,8vw,8rem)]" />
        <Suspense fallback={<div className="h-96" />}>
          <ApartmentsList />
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
