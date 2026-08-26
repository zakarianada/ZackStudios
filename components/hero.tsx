"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { Bot, Film, Palette, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const floating = [
  { title: "VIDEO EDIT", image: "/work/afterlight.webp", position: "left-[2%] top-[13%]", rotate: -5 },
  { title: "AI PERSONA", image: "/work/iridescent-avatar.webp", position: "right-[1%] top-[16%]", rotate: 5 },
  { title: "PACKAGING", image: "/work/maison-elise.webp", position: "bottom-[14%] right-0", rotate: 4 },
  { title: "POSTER", image: "/work/chroma-flux.webp", position: "bottom-[11%] left-[4%]", rotate: -4 },
] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const imageX = useTransform(smx, [-1, 1], [-12, 12]);
  const imageY = useTransform(smy, [-1, 1], [-8, 8]);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden border-b border-white/8 pt-16" ref={ref} onMouseMove={onMove}>
      <div className="site-grid absolute inset-0 opacity-60" />

      <div className="relative z-30 mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1500px] items-center px-5 py-16 md:px-9 lg:grid-cols-[.82fr_1.18fr]">
        <div className="max-w-[620px] self-center">
          <div className="mb-5 inline-flex items-center gap-3 border-l border-[#ff262c] pl-3 text-[10px] font-semibold uppercase tracking-[.22em] text-white/65">
            Video editing &amp; motion · graphic design &amp; AI · web
          </div>
          <h1 className="display-font text-[clamp(4.2rem,9.2vw,9rem)] font-black uppercase leading-[.76] text-white">
            EDIT.<br />
            <span className="text-[#ff262c]">DESIGN.</span><br />
            AMPLIFY<span className="text-[#ff262c]">.</span>
          </h1>
          <p className="mt-7 max-w-[500px] text-base leading-7 text-white/58 md:text-lg">
            I&apos;m Zack — a multidisciplinary creative turning footage, ideas and interfaces into work that earns attention.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#motion">View work</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">Contact me</MagneticButton>
          </div>
          <div className="mt-9 flex max-w-[540px] flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.14em] text-white/48">
            <span className="flex items-center gap-2"><Film className="size-3.5 text-[#ff3439]" /> Video editing</span>
            <span className="flex items-center gap-2"><Palette className="size-3.5 text-[#ff3439]" /> Design</span>
            <span className="flex items-center gap-2"><Bot className="size-3.5 text-[#ff3439]" /> AI imagery</span>
            <span className="flex items-center gap-2"><Sparkles className="size-3.5 text-[#ff3439]" /> Web design</span>
          </div>

          <motion.div style={{ x: imageX, y: imageY }} className="relative mx-auto mt-12 aspect-[3/4] w-full max-w-[430px] overflow-hidden rounded-2xl border border-[#ff3439]/35 shadow-[0_30px_90px_rgba(0,0,0,.65)] lg:hidden">
            <Image src="/profile/zack-hero.png" alt="Zack, multidisciplinary creative" fill priority className="object-cover" sizes="(max-width: 1024px) 90vw, 430px" />
          </motion.div>
        </div>

        <div className="relative hidden min-h-[min(82vh,800px)] lg:block">
          <div className="orbit-line absolute left-1/2 top-1/2 h-[66%] w-[96%] -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <div className="orbit-line absolute left-1/2 top-1/2 h-[82%] w-[74%] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] opacity-30" />

          <div className="absolute left-1/2 top-1/2 h-[min(76vh,760px)] w-[min(68%,520px)] -translate-x-1/2 -translate-y-1/2">
            <motion.div style={{ x: imageX, y: imageY }} className="relative size-full overflow-hidden rounded-[28px] border border-[#ff3439]/35 bg-[#090909] shadow-[0_35px_100px_rgba(0,0,0,.72),0_0_70px_rgba(255,38,44,.14)]">
              <Image src="/profile/zack-hero.png" alt="Zack, multidisciplinary creative" fill priority className="object-cover" sizes="(max-width: 1280px) 38vw, 520px" />
            </motion.div>
          </div>

          {floating.map((card, index) => (
            <motion.div
              key={card.title}
              className={`absolute z-20 w-[132px] overflow-hidden rounded-lg border border-[#ff3439]/45 bg-black/78 p-2 shadow-[0_18px_45px_rgba(0,0,0,.62)] backdrop-blur-md xl:w-[150px] ${card.position}`}
              style={{ rotate: card.rotate }}
              animate={{ y: [0, index % 2 ? -10 : 9, 0], rotate: [card.rotate, card.rotate + (index % 2 ? 1.5 : -1.5), card.rotate] }}
              transition={{ duration: 5 + index * .7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 40 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Image src={card.image} alt="" fill className="object-cover" sizes="150px" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] font-semibold tracking-[.14em] text-white/75">
                {card.title}<span className="size-1.5 rounded-full bg-[#ff3439] shadow-[0_0_10px_#ff3439]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-30 hidden rounded-full border border-white/12 bg-black/25 px-4 py-3 text-[9px] uppercase tracking-[.18em] text-white/55 backdrop-blur-md md:block">
        Move your cursor · explore
      </div>
    </section>
  );
}
