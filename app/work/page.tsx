import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { WebShowcase } from "@/components/web-showcase";

export const metadata = {
  title: "Work — Zack",
  description: "Zack's graphic design, AI and web portfolio archive.",
};

export default function WorkArchivePage() {
  return (
    <main className="min-h-screen">
      <div className="site-grid fixed inset-0 -z-10 opacity-25" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070707]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-9">
          <Link href="/" className="display-font text-2xl font-black">ZACK <span className="text-[#ff262c]">STUDIOS</span></Link>
          <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[.14em] text-white/55 hover:text-white"><ArrowLeft className="size-3.5" /> Back home</Link>
          <a href="mailto:zfiverrpro@gmail.com" className="hidden items-center gap-2 text-[10px] uppercase tracking-[.14em] text-white/65 hover:text-white md:flex"><Mail className="size-3.5 text-[#ff3439]" /> Contact</a>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 pb-28 pt-14 md:px-9 md:pt-20">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">Portfolio archive / Graphic Design &amp; AI</p>
            <h1 className="display-font mt-4 text-[clamp(4.6rem,10vw,9rem)] font-black uppercase leading-[.78]">Work that<br />changes <span className="text-[#ff3439]">language.</span></h1>
          </div>
          <div className="relative hidden aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c] lg:block">
            <div className="absolute left-1/2 top-[10%] size-[72%] -translate-x-1/2 rounded-full bg-[#ff262c]" />
            <Image src="/profile/zack.webp" alt="Zack" fill className="object-contain object-bottom" sizes="35vw" priority />
          </div>
        </div>
        <PortfolioGrid scope="graphic" />
      </section>
      <WebShowcase />
    </main>
  );
}
