"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { categories, projects, type CategoryId, type Project } from "@/lib/portfolio";
import { ProjectModal } from "@/components/project-modal";

type PortfolioScope = "all" | "graphic" | "web";

export function PortfolioGrid({ compact = false, scope = "all" }: { compact?: boolean; scope?: PortfolioScope }) {
  const [filter, setFilter] = useState<CategoryId>("all");
  const [active, setActive] = useState<Project | null>(null);

  const scopedProjects = useMemo(() => {
    if (scope === "web") return projects.filter((project) => project.category === "web");
    if (scope === "graphic") return projects.filter((project) => project.category !== "web");
    return projects;
  }, [scope]);

  const scopedCategories = useMemo(() => {
    if (scope === "web") return categories.filter((category) => category.id === "all" || category.id === "web");
    if (scope === "graphic") return categories.filter((category) => category.id !== "web");
    return categories;
  }, [scope]);

  const visible = useMemo(() => {
    const filtered = filter === "all" ? scopedProjects : scopedProjects.filter((project) => project.category === filter);
    return compact ? filtered.slice(0, 12) : filtered;
  }, [filter, compact, scopedProjects]);

  const navigate = useCallback((direction: -1 | 1) => {
    setActive((current) => {
      if (!current) return null;
      const index = scopedProjects.findIndex((project) => project.slug === current.slug);
      const next = (index + direction + scopedProjects.length) % scopedProjects.length;
      return scopedProjects[next];
    });
  }, [scopedProjects]);

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {scopedCategories.map((category) => (
          <button key={category.id} onClick={() => setFilter(category.id)} className={`shrink-0 rounded-full border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[.12em] transition ${filter === category.id ? "border-[#ff3439] bg-[#ff262c] text-white" : "border-white/10 bg-white/[.02] text-white/50 hover:border-white/20 hover:text-white"}`}>
            {category.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((project, index) => (
          <motion.button
            layout
            key={project.slug}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * .035 }}
            onClick={() => setActive(project)}
            className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0e] text-left transition hover:-translate-y-1 hover:border-white/22 ${index % 7 === 0 && !compact ? "sm:col-span-2" : ""}`}
          >
            <div className={`relative overflow-hidden bg-black ${index % 7 === 0 && !compact ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
              <Image src={project.cover} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent opacity-70" />
              <span className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/55 px-2.5 py-1 text-[8px] uppercase tracking-[.14em] text-white/70 backdrop-blur-md">{String(index + 1).padStart(2, "0")}</span>
              <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-white/12 bg-black/55 opacity-0 backdrop-blur-md transition group-hover:opacity-100"><ArrowUpRight className="size-3.5" /></span>
            </div>
            <div className="p-4">
              <p className="text-[9px] uppercase tracking-[.16em] text-[#ff3439]">{project.categoryLabel}</p>
              <div className="mt-1 flex items-end justify-between gap-3"><h3 className="text-lg font-semibold tracking-[-.02em]">{project.title}</h3><span className="text-[9px] text-white/35">{project.year}</span></div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/43">{project.summary}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
      {compact && <div className="mt-8 text-center"><Link href="/work" className="inline-flex items-center gap-3 rounded-sm border border-white/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.13em] text-white/70 transition hover:border-[#ff3439]/60 hover:text-white">View full design archive <ArrowUpRight className="size-4" /></Link></div>}
      <ProjectModal project={active} onClose={() => setActive(null)} onNavigate={navigate} />
    </>
  );
}
