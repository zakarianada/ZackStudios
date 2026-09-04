"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Globe2, X } from "lucide-react";
import { useState } from "react";
import { useDialog } from "@/lib/use-dialog";

type WebStudy = {
  title: string;
  type: string;
  image: string;
  preview: string;
  descriptor: string;
};

const webStudies: WebStudy[] = [
  {
    title: "AYOUR",
    type: "Skincare · Ecommerce",
    image: "/work/web-ayour.webp",
    preview: "/web-design/ayour",
    descriptor: "A multilingual Moroccan skincare experience shaped by ritual, science and warm editorial art direction.",
  },
  {
    title: "NAFAS Casablanca",
    type: "Fashion · Ecommerce",
    image: "/work/web-nafas.webp",
    preview: "/web-design/nafas/index.html",
    descriptor: "A restrained fashion storefront pairing Moroccan identity with a quiet, contemporary commerce system.",
  },
  {
    title: "Punch Morocco",
    type: "Fitness · Membership",
    image: "/work/web-punch.webp",
    preview: "/web-design/punch/index.html",
    descriptor: "A high-impact bilingual gym platform spanning programs, clubs, memberships and lead conversion.",
  },
];

function launchPopup(study: WebStudy) {
  const width = Math.min(1440, Math.max(760, window.screen.availWidth - 120));
  const height = Math.min(920, Math.max(620, window.screen.availHeight - 120));
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
  window.open(
    study.preview,
    `zack-web-${study.title.toLowerCase().replace(/\s+/g, "-")}`,
    `popup=yes,width=${Math.round(width)},height=${Math.round(height)},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes,noopener,noreferrer`,
  );
}

export function WebShowcase() {
  const [active, setActive] = useState<WebStudy | null>(null);
  const dialogRef = useDialog(Boolean(active), () => setActive(null));

  return (
    <section id="web" className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0c] py-24 md:py-32">
      <div className="site-grid absolute inset-0 opacity-20" />
      <div className="absolute right-[-12rem] top-1/2 size-[32rem] -translate-y-1/2 rounded-full bg-[#ff262c]/8 blur-[110px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-9">
        <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">03 / Web Design</p>
            <h2 className="display-font mt-4 text-[clamp(4rem,8vw,7.5rem)] font-black uppercase leading-[.8]">Designed to<br /><span className="text-[#ff3439]">be used.</span></h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-sm leading-7 text-white/52">Three complete website directions across skincare, fashion and fitness. Select any project to explore the working site in a floating preview.</p>
            <a href="mailto:zfiverrpro@gmail.com?subject=Web%20design%20project" className="mt-5 inline-flex min-h-11 items-center gap-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white/70 transition hover:text-white">Discuss a web project <ArrowUpRight className="size-4 text-[#ff3439]" /></a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {webStudies.map((study, index) => (
            <button key={study.title} type="button" onClick={() => setActive(study)} className="group overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition duration-300 hover:-translate-y-1 hover:border-[#ff3439]/45" aria-label={`Open ${study.title} website preview`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={study.image} alt={`${study.title} website home page`} fill unoptimized className="object-cover transition duration-700 group-hover:scale-[1.025]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/60 px-2.5 py-1 text-[8px] tracking-[.15em] text-white/65 backdrop-blur-md">0{index + 1}</span>
                <span className="absolute right-4 top-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-black/65 px-4 text-[9px] font-semibold uppercase tracking-[.12em] text-white backdrop-blur-md transition group-hover:border-[#ff3439]/60 group-hover:bg-[#ff262c]"><Globe2 className="size-3.5" /> Explore site</span>
              </div>
              <div className="p-5">
                <p className="text-[9px] uppercase tracking-[.16em] text-[#ff3439]">{study.type}</p>
                <h3 className="mt-1 text-lg font-semibold">{study.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/43">{study.descriptor}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-0 backdrop-blur-xl md:p-5" role="dialog" aria-modal="true" aria-label={`${active.title} website preview`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div ref={dialogRef} className="flex h-[100svh] w-full max-w-[1500px] flex-col overflow-hidden bg-[#090909] shadow-[0_35px_120px_rgba(0,0,0,.78)] md:h-[calc(100svh-2.5rem)] md:rounded-2xl md:border md:border-white/14" initial={{ opacity: 0, y: 24, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .99 }} transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
              <div className="flex min-h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#0d0d0e] px-3 md:px-5">
                <div className="hidden gap-1.5 sm:flex" aria-hidden="true"><span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" /></div>
                <div className="min-w-0 flex-1 rounded-md border border-white/8 bg-black/35 px-3 py-2 text-center text-[9px] uppercase tracking-[.12em] text-white/48"><span className="truncate">Preview · {active.title}</span></div>
                <button type="button" onClick={() => launchPopup(active)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-[#ff3439]/55 hover:text-white" aria-label={`Open ${active.title} in a new floating browser window`}><ExternalLink className="size-4" /></button>
                <button type="button" onClick={() => setActive(null)} className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-[#ff3439]/55 hover:text-white" aria-label="Close website preview"><X className="size-4" /></button>
              </div>
              <iframe
                key={active.preview}
                src={active.preview}
                title={`${active.title} interactive website`}
                className="min-h-0 flex-1 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                onLoad={(event) => {
                  try {
                    event.currentTarget.contentWindow?.addEventListener("keydown", (keyEvent) => {
                      if (keyEvent.key === "Escape") setActive(null);
                    });
                  } catch {
                    // External pages opened inside a preview manage their own keyboard events.
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
