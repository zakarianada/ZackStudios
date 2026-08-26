import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const projectType = String(body.projectType || "Creative project").trim();
    const message = String(body.message || "").trim();
    const honeypot = String(body.website || "").trim();

    if (honeypot) return NextResponse.json({ ok: true });
    if (!name || name.length > 100) return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
    if (!EMAIL_RE.test(email) || email.length > 160) return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
    if (!message || message.length > 3000) return NextResponse.json({ message: "Please add a project brief." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "zfiverrpro@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !from) {
      return NextResponse.json({ ok: true, mode: "mailto" });
    }

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio inquiry — ${projectType}`,
        text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
      }),
    });

    if (!resend.ok) {
      const detail = await resend.text();
      console.error("Resend error", detail);
      return NextResponse.json({ message: "The message could not be delivered. Please email directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: "resend" });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
