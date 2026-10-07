"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { APARTMENTS } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("residence") || "";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [wa, setWa] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = Object.fromEntries(fd.entries());
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    if (name.length < 2) return fail("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 8) return fail("Please enter a valid phone number.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("Please enter a valid email address.");

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = (await res.json()) as { ok?: boolean; error?: string; whatsapp?: string };
      if (!res.ok || !data.ok) return fail(data.error || "Something went wrong. Please try again.");
      setWa(data.whatsapp || "");
      setStatus("sent");
      form.reset();
    } catch {
      fail("Network error. Please try again.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="bg-aqua p-10 md:p-14">
        <p className="h-display text-5xl">Thank you.</p>
        <p className="mt-4 max-w-md opacity-80">Our sales team will call you within one working day to confirm a time.</p>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="fine-text mt-8 inline-block rounded-full border border-ink px-6 py-3 hover:bg-ink hover:text-cream">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const field = "w-full border-b border-ink/40 bg-transparent py-3 text-base outline-none transition-colors placeholder:opacity-40 focus:border-ink";
  const label = "fine-text block opacity-60";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid gap-8 md:grid-cols-2">
        <label className={label}>Full name<input name="name" required className={`${field} mt-2`} placeholder="Your name" autoComplete="name" /></label>
        <label className={label}>Phone<input name="phone" required type="tel" className={`${field} mt-2`} placeholder="+966 …" autoComplete="tel" /></label>
      </div>
      <label className={label}>Email<input name="email" required type="email" className={`${field} mt-2`} placeholder="you@email.com" autoComplete="email" /></label>
      <div className="grid gap-8 md:grid-cols-2">
        <label className={label}>
          Residence of interest
          <select name="residence" defaultValue={preset} className={`${field} mt-2`}>
            <option value="">Not sure yet</option>
            {APARTMENTS.map((a) => (
              <option key={a.slug} value={a.slug}>{a.name}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Preferred time
          <select name="time" defaultValue="Morning" className={`${field} mt-2`}>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>
      <label className={label}>Message<textarea name="message" rows={4} className={`${field} mt-2 resize-none`} placeholder="Anything we should know?" /></label>
      {status === "error" && <p role="alert" className="text-sm text-coral">{error}</p>}
      <button disabled={status === "sending"} className="fine-text self-start rounded-full bg-ink px-10 py-5 text-cream transition-opacity hover:opacity-80 disabled:opacity-50">
        {status === "sending" ? "Sending…" : "Request a call"}
      </button>
    </form>
  );
}
