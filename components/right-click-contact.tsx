"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

const EMAIL = "zfiverrpro@gmail.com";

export function RightClickContact() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const width = 290;
      const height = 165;
      setMenu({
        x: Math.min(event.clientX, window.innerWidth - width - 12),
        y: Math.min(event.clientY, window.innerHeight - height - 12),
      });
      setCopied(false);
    };
    const close = () => setMenu(null);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("scroll", close);
    };
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
  };

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          className="fixed z-[100] w-[290px] overflow-hidden rounded-xl border border-[#ff3439]/45 bg-[#0a0a0b]/96 p-4 shadow-[0_24px_70px_rgba(0,0,0,.7)] backdrop-blur-xl"
          style={{ left: menu.x, top: menu.y }}
          initial={{ opacity: 0, scale: .92, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }}
        >
          <button onClick={() => setMenu(null)} className="absolute right-3 top-3 grid size-7 place-items-center rounded-full border border-white/10 text-white/55 hover:text-white" aria-label="Close"><X className="size-3" /></button>
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.18em] text-[#ff3439]"><Mail className="size-3.5" /> Like what you see?</div>
          <p className="mt-3 pr-6 text-sm font-semibold">Let&apos;s create something together.</p>
          <p className="mt-1 text-xs text-white/45">Email inquiries may receive a project discount.</p>
          <button onClick={copy} className="mt-4 flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-left text-xs transition hover:border-white/20">
            <span>{EMAIL}</span>{copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-white/45" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
