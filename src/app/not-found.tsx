import TLink from "@/components/TLink";

export default function NotFound() {
  return (
    <section data-nav-theme="dark" className="px-page flex min-h-screen flex-col items-start justify-center gap-8">
      <p className="h-script text-7xl">Lost at sea?</p>
      <p className="max-w-md opacity-70">That page doesn’t exist. Let’s get you back to shore.</p>
      <TLink href="/" className="fine-text rounded-full border border-ink px-8 py-4 hover:bg-ink hover:text-cream">
        Back home
      </TLink>
    </section>
  );
}
