"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bot, Film, Layers3, Palette, Sparkles } from "lucide-react";

const capabilities = [
  [Film, "Video editing", "Cinematic edits, commercial, travel, property and social video."],
  [Palette, "Graphic design", "Campaigns, editorial, posters, packaging and digital visuals."],
  [Bot, "AI art direction", "Virtual models, character systems, fashion imagery and concepts."],
  [Layers3, "Product visualization", "Advertising-ready product images and key visuals."],
] as const;

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/8 py-24 md:py-32">
      <div className="site-grid absolute inset-0 opacity-25" />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 md:px-9 lg:grid-cols-[.7fr_1.3fr]">
        <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c]">
          <div className="relative min-h-[500px] flex-1 overflow-hidden">
            <Image src="/profile/zack-hero.png" alt="Zack" fill className="object-contain object-bottom" sizes="(max-width:1024px) 100vw, 40vw" />
          </div>
          <div className="flex items-center justify-between border-t border-white/10 bg-black/65 p-4 backdrop-blur-md">
            <div><p className="text-[9px] uppercase tracking-[.18em] text-[#ff3439]">Zack</p><p className="mt-1 text-sm font-semibold">Multidisciplinary creative</p></div><span className="flex items-center gap-2 text-[9px] uppercase tracking-[.14em] text-white/50"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" /> Available</span>
          </div>
        </motion.div>
        <div className="self-center">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">04 / About</p>
          <h2 className="display-font mt-4 text-[clamp(3.8rem,8vw,7rem)] font-black uppercase leading-[.82]">One creative.<br /><span className="text-[#ff3439]">Many visual languages.</span></h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">
            I work across motion, graphic design, AI and emerging web experiences instead of forcing every project into one visual signature. The through-line is clear thinking, strong pacing and visual direction that fits the brief.
          </p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {capabilities.map(([Icon, title, body], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="rounded-xl border border-white/10 bg-white/[.025] p-5">
                <Icon className="size-5 text-[#ff3439]" /><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-white/43">{body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-7 flex items-center gap-3 text-[10px] uppercase tracking-[.14em] text-white/48"><Sparkles className="size-4 text-[#ff3439]" /> Discounts are available for selected projects initiated by email.</div>
        </div>
      </div>
    </section>
  );
}
