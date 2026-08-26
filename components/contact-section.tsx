"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail } from "lucide-react";

const EMAIL = "zfiverrpro@gmail.com";

export function ContactSection() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Unable to send message.");
      if (data.mode === "mailto") {
        const subject = encodeURIComponent(`Portfolio inquiry — ${payload.projectType || "Creative project"}`);
        const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\nProject: ${payload.projectType}\n\n${payload.message}`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setMessage("Your email app has been opened with the inquiry pre-filled.");
      } else {
        setMessage("Message sent. I’ll get back to you as soon as possible.");
        event.currentTarget.reset();
      }
      setState("sent");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/8 py-24 md:py-32">
      <div className="absolute -right-32 top-8 size-[520px] rounded-full bg-[#ff262c]/10 blur-[100px]" />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 md:px-9 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">05 / Contact</p>
          <h2 className="display-font mt-4 text-[clamp(4rem,8.5vw,7.4rem)] font-black uppercase leading-[.8]">Let&apos;s make<br /><span className="text-[#ff3439]">something iconic.</span></h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/52">Tell me what you&apos;re building, what you need and where the work will live. For selected projects, reaching out directly by email can unlock a discounted quote.</p>
          <a href={`mailto:${EMAIL}`} className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white"><Mail className="size-4 text-[#ff3439]" /> {EMAIL} <ArrowUpRight className="size-4 text-white/40" /></a>
        </div>
        <form onSubmit={submit} className="relative rounded-2xl border border-white/10 bg-[#0d0d0e] p-5 md:p-7">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-[9px] uppercase tracking-[.14em] text-white/45">Name<input required name="name" maxLength={100} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff3439]/70" placeholder="Your name" /></label>
            <label className="text-[9px] uppercase tracking-[.14em] text-white/45">Email<input required name="email" type="email" maxLength={160} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff3439]/70" placeholder="you@email.com" /></label>
          </div>
          <label className="mt-4 block text-[9px] uppercase tracking-[.14em] text-white/45">Project type<select name="projectType" defaultValue="Graphic Design + AI" className="mt-2 w-full rounded-md border border-white/10 bg-[#090909] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff3439]/70"><option>Video Editing + Motion</option><option>Graphic Design + AI</option><option>Web Design</option><option>Social-media campaign</option><option>Packaging</option><option>Fashion campaign</option><option>AI avatars</option><option>Product visualization</option><option>Other</option></select></label>
          <label className="mt-4 block text-[9px] uppercase tracking-[.14em] text-white/45">Project brief<textarea required name="message" maxLength={3000} rows={6} className="mt-2 w-full resize-none rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-[#ff3439]/70" placeholder="Tell me about the project, deliverables, deadline and references..." /></label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className={`text-xs ${state === "error" ? "text-red-400" : "text-white/45"}`}>{message || "Server-side delivery via Resend when configured; email fallback otherwise."}</p>
            <button disabled={state === "sending"} className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-sm bg-[#ff262c] px-5 py-3 text-xs font-semibold uppercase tracking-[.12em] text-white transition hover:bg-[#ff3a40] disabled:opacity-60">{state === "sending" ? <Loader2 className="size-4 animate-spin" /> : state === "sent" ? <CheckCircle2 className="size-4" /> : <ArrowUpRight className="size-4" />} {state === "sending" ? "Sending" : state === "sent" ? "Sent" : "Send inquiry"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
