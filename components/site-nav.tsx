"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const items = [
  ["Home", "/#home"],
  ["Video & motion", "/#motion"],
  ["Graphic & AI", "/#design"],
  ["Web design", "/#web"],
  ["Contact", "/#contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#070707]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-9">
        <Link href="/#home" className="display-font text-2xl font-black uppercase tracking-[-.04em]">
          ZACK <span className="text-[#ff262c]">STUDIOS</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {items.map(([label, href]) => (
            <Link key={label} href={href} className="text-xs font-medium uppercase tracking-[.16em] text-white/65 transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="mailto:zfiverrpro@gmail.com" className="hidden min-h-11 items-center rounded-sm border border-[#ff262c]/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[.12em] text-white transition hover:bg-[#ff262c] lg:flex">
          Let&apos;s talk
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="grid size-11 place-items-center border border-white/10 lg:hidden" aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/8 bg-[#080808] lg:hidden">
            <div className="flex flex-col px-5 py-4">
              {items.map(([label, href]) => (
                <Link key={label} href={href} onClick={() => setOpen(false)} className="border-b border-white/8 py-4 text-sm uppercase tracking-[.14em] text-white/75">
                  {label}
                </Link>
              ))}
              <a href="mailto:zfiverrpro@gmail.com" onClick={() => setOpen(false)} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-sm border border-[#ff262c]/60 px-5 text-xs font-semibold uppercase tracking-[.12em] text-white transition hover:bg-[#ff262c]">
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
