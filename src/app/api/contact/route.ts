import { NextResponse } from "next/server";
import { APARTMENTS } from "@/lib/data";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const time = clean(body.time, 20);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1500) : "";
  const slug = clean(body.residence, 60);
  const apt = APARTMENTS.find((a) => a.slug === slug);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  if (phone.replace(/\D/g, "").length < 8) return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 422 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });

  const residence = apt ? apt.name : "Not specified";

  // Optional email delivery through Resend
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (key && to && from) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject: `SADAF enquiry: ${name} (${residence})`,
          html: `<p><b>Name:</b> ${esc(name)}</p><p><b>Phone:</b> ${esc(phone)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Residence:</b> ${esc(residence)}</p><p><b>Preferred time:</b> ${esc(time)}</p><p><b>Message:</b><br/>${esc(message).replace(/\n/g, "<br/>")}</p>`,
        }),
      });
      if (!r.ok) return NextResponse.json({ ok: false, error: "We could not send your request. Please call us instead." }, { status: 502 });
    } catch {
      return NextResponse.json({ ok: false, error: "We could not send your request. Please call us instead." }, { status: 502 });
    }
  }

  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  const whatsapp = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello SADAF, I am ${name}. I'd like a call about: ${residence}. Preferred time: ${time}.`)}`
    : "";

  return NextResponse.json({ ok: true, whatsapp });
}
