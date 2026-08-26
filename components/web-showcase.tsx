import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";

const webStudies = [
  {
    title: "Lumen Estates",
    type: "Luxury real estate website",
    image: "/work/web-real-estate.png",
  },
  {
    title: "Iron Method",
    type: "Bodybuilding platform",
    image: "/work/web-bodybuilding.png",
  },
  {
    title: "Éclat Skin",
    type: "Cosmetics ecommerce",
    image: "/work/web-cosmetics.png",
  },
  {
    title: "House of Oud",
    type: "Traditional Arabic products",
    image: "/work/web-arabic-heritage.png",
  },
] as const;

export function WebShowcase() {
  return (
    <section id="web" className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0c] py-24 md:py-32">
      <div className="site-grid absolute inset-0 opacity-20" />
      <div className="absolute right-[-12rem] top-1/2 size-[32rem] -translate-y-1/2 rounded-full bg-[#ff262c]/8 blur-[110px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-9">
        <div className="mb-10 grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">03 / Web Design</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[.15em] text-amber-200/75">
                <Clock3 className="size-3" /> Full archive coming soon
              </span>
            </div>
            <h2 className="display-font mt-4 text-[clamp(4rem,8vw,7.5rem)] font-black uppercase leading-[.8]">Digital work,<br /><span className="text-[#ff3439]">in progress.</span></h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-sm leading-7 text-white/52">The complete web-design archive is being prepared. For now, explore a few distinct website directions spanning luxury real estate, bodybuilding, cosmetics ecommerce and heritage Arabic products.</p>
            <a href="mailto:zfiverrpro@gmail.com?subject=Web%20design%20project" className="mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.14em] text-white/70 transition hover:text-white">Discuss a web project <ArrowUpRight className="size-4 text-[#ff3439]" /></a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {webStudies.map((study, index) => (
            <article key={study.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-black transition hover:-translate-y-1 hover:border-[#ff3439]/45">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={study.image} alt={`${study.title} web design study`} fill className="object-cover transition duration-700 group-hover:scale-[1.025]" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/60 px-2.5 py-1 text-[8px] tracking-[.15em] text-white/65 backdrop-blur-md">0{index + 1}</span>
              </div>
              <div className="p-5">
                <p className="text-[9px] uppercase tracking-[.16em] text-[#ff3439]">{study.type}</p>
                <h3 className="mt-1 text-lg font-semibold">{study.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
