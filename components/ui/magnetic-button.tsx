"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: sx, y: sy }}>
      <Link
        href={href}
        onMouseMove={move}
        onMouseLeave={reset}
        className={
          variant === "primary"
            ? "group inline-flex items-center gap-4 rounded-sm bg-[#ff262c] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_36px_rgba(255,38,44,.24)] transition hover:bg-[#ff3a40]"
            : "group inline-flex items-center gap-4 rounded-sm border border-white/15 bg-white/[.025] px-6 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[.05]"
        }
      >
        {children}
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
