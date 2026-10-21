import { NextResponse } from "next/server";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "meghnabosesupport@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

// Best-effort per-instance rate limit (serverless instances don't share memory,
// so this slows bursts but is not a hard guarantee).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  if (!name || !message || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
  }

  const subject = `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`;

  try {
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: email,
          subject,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } else {
      // Fallback: forward to FormSubmit from the server. Its AJAX endpoint
      // can answer HTTP 200 with success:"false", so check the body too.
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meghna-portfolio-eta.vercel.app",
        },
        body: JSON.stringify({ name, email, message, _subject: subject, _template: "table" }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== "true") throw new Error("FormSubmit rejected the message");
    }
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return NextResponse.json({ error: "Could not send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
