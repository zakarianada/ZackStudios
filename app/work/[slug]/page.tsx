import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";
import { getProject, getRelatedProjects, projects } from "@/lib/portfolio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — Zack`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = getRelatedProjects(project);

  return (
    <main className="min-h-screen bg-[#070707]">
      <div className="site-grid fixed inset-0 -z-10 opacity-20" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070707]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-9">
          <Link href="/work" className="flex items-center gap-2 text-[10px] uppercase tracking-[.14em] text-white/55 hover:text-white"><ArrowLeft className="size-3.5" /> Projects</Link>
          <Link href="/" className="display-font text-2xl font-black">ZACK <span className="text-[#ff262c]">STUDIOS</span></Link>
          <a href="mailto:zfiverrpro@gmail.com" className="flex items-center gap-2 text-[10px] uppercase tracking-[.14em] text-white/65 hover:text-white"><Mail className="size-3.5 text-[#ff3439]" /><span className="hidden sm:inline">Let&apos;s talk</span></a>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 pb-28 pt-10 md:px-9 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">{project.categoryLabel} / {project.year}</p>
            <h1 className="display-font mt-4 text-[clamp(4.4rem,9vw,8.5rem)] font-black uppercase leading-[.78]">{project.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/55">{project.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-2 text-[9px] uppercase tracking-[.12em] text-white/54">{tag}</span>)}</div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c]">
            <Image src={project.cover} alt={project.title} fill priority className={project.orientation === "portrait" ? "object-contain" : "object-cover"} sizes="(max-width:1024px) 100vw, 60vw" />
          </div>
        </div>

        <div className="my-14 grid gap-8 border-y border-white/10 py-10 md:grid-cols-[.55fr_1.45fr]">
          <div><p className="text-[10px] uppercase tracking-[.18em] text-[#ff3439]">Project overview</p><h2 className="display-font mt-2 text-4xl font-black uppercase">The direction</h2></div>
          <div><p className="max-w-4xl text-base leading-8 text-white/58">{project.concept}</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{project.services.map((service) => <div key={service} className="flex items-center gap-3 border-t border-white/8 py-3 text-xs text-white/55"><Check className="size-3.5 text-[#ff3439]" /> {service}</div>)}</div></div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div key={`${image}-${index}`} className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c] ${index === 0 || index % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
              <Image src={image} alt={`${project.title} visual ${index + 1}`} fill className="object-contain" sizes={index === 0 ? "100vw" : "50vw"} />
              <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/58 px-2.5 py-1 text-[8px] tracking-[.16em] text-white/62 backdrop-blur">0{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.18em] text-[#ff3439]">Continue exploring</p><h2 className="display-font mt-2 text-4xl font-black uppercase">Related projects</h2></div><Link href="/work" className="hidden items-center gap-2 text-[10px] uppercase tracking-[.14em] text-white/50 hover:text-white sm:flex">All projects <ArrowRight className="size-4" /></Link></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="group overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0d] transition hover:border-white/22">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={item.cover} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="25vw" /></div>
                <div className="flex items-center justify-between p-4"><div><p className="text-[8px] uppercase tracking-[.13em] text-[#ff3439]">{item.categoryLabel}</p><p className="mt-1 text-sm font-semibold">{item.title}</p></div><ArrowUpRight className="size-4 text-white/35" /></div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-2xl border border-[#ff3439]/25 bg-[radial-gradient(circle_at_80%_50%,rgba(255,38,44,.17),transparent_30rem),#0b0b0c] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div><p className="text-[10px] uppercase tracking-[.18em] text-[#ff3439]">Start a project</p><h2 className="display-font mt-2 text-5xl font-black uppercase">Need this energy for your brand?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/48">Reach out by email with your brief. Selected email inquiries can receive a discounted project quote.</p></div>
          <a href="mailto:zfiverrpro@gmail.com" className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#ff262c] px-6 py-4 text-xs font-semibold uppercase tracking-[.12em]">Email Zack <ArrowUpRight className="size-4" /></a>
        </div>
      </section>
    </main>
  );
}
