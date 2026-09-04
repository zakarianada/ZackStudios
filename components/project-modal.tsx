"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import type { Project } from "@/lib/portfolio";
import { useDialog } from "@/lib/use-dialog";

export function ProjectModal({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
}) {
  const dialogRef = useDialog(Boolean(project), onClose);
  useEffect(() => {
    if (!project) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onNavigate(-1);
      if (event.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, [project, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[75] bg-black/94 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="modal-scroll absolute inset-x-0 bottom-0 top-3 overflow-y-auto rounded-t-[26px] border border-white/12 bg-[#090909] shadow-[0_-30px_100px_rgba(0,0,0,.7)] md:inset-x-4 md:top-5 md:rounded-[28px]"
            initial={{ y: 80, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 70, scale: .985 }} transition={{ type: "spring", stiffness: 200, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#090909]/88 px-4 py-3 backdrop-blur-xl md:px-7">
              <div className="min-w-0"><p className="truncate text-[9px] font-semibold uppercase tracking-[.18em] text-[#ff3439]">{project.categoryLabel}</p><p className="truncate text-sm font-semibold">{project.title}</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate(-1)} className="grid size-9 place-items-center rounded-full border border-white/10 hover:bg-white/5" aria-label="Previous project"><ArrowLeft className="size-4" /></button>
                <button onClick={() => onNavigate(1)} className="grid size-9 place-items-center rounded-full border border-white/10 hover:bg-white/5" aria-label="Next project"><ArrowRight className="size-4" /></button>
                <button onClick={onClose} className="grid size-9 place-items-center rounded-full border border-white/10 hover:bg-white/5" aria-label="Close project"><X className="size-4" /></button>
              </div>
            </div>

            <div className="mx-auto max-w-[1380px] px-4 pb-20 pt-8 md:px-8 md:pt-12">
              <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[.22em] text-[#ff3439]">Project / {project.year}</p>
                  <h2 id="project-dialog-title" className="display-font mt-4 text-[clamp(4rem,9vw,8rem)] font-black uppercase leading-[.78]">{project.title}</h2>
                  <p className="mt-7 text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">The challenge</p>
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/55">{project.summary}</p>
                  <div className="mt-7 flex flex-wrap gap-2">{project.services.map((service) => <span key={service} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-2 text-[9px] uppercase tracking-[.12em] text-white/58">{service}</span>)}</div>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <Image src={project.cover} alt={project.title} fill className={project.orientation === "portrait" ? "object-contain" : "object-cover"} sizes="(max-width:1024px) 100vw, 60vw" priority />
                </div>
              </div>

              <div className="my-12 grid gap-6 border-y border-white/10 py-9 md:grid-cols-[.65fr_1.35fr]">
                <div><p className="text-[10px] uppercase tracking-[.18em] text-[#ff3439]">Creative direction</p><h3 className="display-font mt-2 text-4xl font-black uppercase">The approach</h3></div>
                <p className="max-w-3xl text-base leading-8 text-white/58">{project.concept}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <motion.div key={`${image}-${index}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .55 }} className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] ${index === 0 || index % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image src={image} alt={`${project.title} visual ${index + 1}`} fill className="object-contain" sizes={index === 0 ? "100vw" : "50vw"} />
                    <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/55 px-2.5 py-1 text-[8px] tracking-[.16em] text-white/65 backdrop-blur-md">0{index + 1}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,38,44,.12),transparent_28rem),#0d0d0e] p-6 md:flex-row md:items-center md:p-9">
                <div><p className="text-[10px] uppercase tracking-[.18em] text-[#ff3439]">Continue exploring</p><button type="button" onClick={() => onNavigate(1)} className="mt-2 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-white/75">Next project <ArrowRight className="size-4" /></button></div>
                <Link href={`/work/${project.slug}`} className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#ff262c] px-5 py-3 text-xs font-semibold uppercase tracking-[.11em]">Open case study <ArrowUpRight className="size-4" /></Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
