import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { MotionShowcase } from "@/components/motion-showcase";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { WebShowcase } from "@/components/web-showcase";
import { ClientReviews } from "@/components/client-reviews";
import { clientReviews } from "@/lib/testimonials";

export default function HomePage() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <MotionShowcase />

      <section id="design" className="relative overflow-hidden py-24 md:py-32">
        <div className="site-grid absolute inset-0 opacity-25" />
        <div className="absolute -left-48 top-0 size-[520px] rounded-full bg-[#ff262c]/7 blur-[110px]" />
        <div className="relative mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">02 / Graphic Design &amp; AI</p>
              <h2 className="display-font mt-4 text-[clamp(4rem,8vw,7.5rem)] font-black uppercase leading-[.8]">Ideas made<br /><span className="text-[#ff3439]">visible.</span></h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-2xl text-sm leading-7 text-white/52">Campaigns, packaging, editorial systems, fashion, product visualization, posters, photo manipulation, food, sports and AI imagery — each project gets the visual language it needs.</p>
              <Link href="/work" className="mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white/70 transition hover:text-white">Open design archive <ArrowUpRight className="size-4 text-[#ff3439]" /></Link>
            </div>
          </div>
          <PortfolioGrid compact scope="graphic" />
        </div>
      </section>

      <WebShowcase />

      <div className="overflow-hidden border-y border-white/8 bg-[#ff262c] py-4 text-black">
        <div className="marquee-track flex w-max items-center gap-9 whitespace-nowrap text-[11px] font-black uppercase tracking-[.16em]">
          {[...Array(2)].flatMap((_, pass) => ["Video Editing & Motion", "Graphic Design & AI", "Web Design", "Social Campaigns", "Packaging", "Editorial", "Fashion", "Product Visualization", "Posters", "AI Imagery"].map((item, i) => <span key={`${pass}-${i}`} className="flex items-center gap-9"><span>{item}</span><span>✦</span></span>))}
        </div>
      </div>

      <AboutSection />
      <ClientReviews />
      <ContactSection sectionNumber={clientReviews.length > 0 ? 6 : 5} />

      <footer className="border-t border-white/8 bg-[#060606]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-8 text-xs text-white/38 md:flex-row md:items-center md:justify-between md:px-9">
          <div><span className="display-font text-xl font-black text-white">ZACK <span className="text-[#ff262c]">STUDIOS</span></span><span className="ml-4">Motion · Graphic + AI · Web</span></div>
          <p>© 2026 Zack. Creative portfolio.</p>
          <a href="mailto:zfiverrpro@gmail.com" className="text-white/65 hover:text-white">zfiverrpro@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}
