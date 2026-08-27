"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, LoaderCircle, Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { drivePreviewUrl, motionProjects, type MotionProject } from "@/lib/motion";

function VideoFrame({ project, className = "" }: { project: MotionProject; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadingFallback = window.setTimeout(() => setLoaded(true), 8000);
    return () => window.clearTimeout(loadingFallback);
  }, [project.driveId]);

  return (
    <div className={`relative size-full ${className}`}>
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black" role="status">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-white/60">
            <LoaderCircle className="size-4 animate-spin text-[#ff3439]" /> Loading video
          </div>
        </div>
      )}
      <iframe
        title={project.title}
        src={drivePreviewUrl(project.driveId)}
        className="size-full border-0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}

type WebkitFullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type WebkitFullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

async function enterLandscapeFullscreen(element: HTMLElement | null, fallbackVideo?: HTMLVideoElement | null) {
  if (!element) return;

  let enteredFullscreen = false;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
      enteredFullscreen = true;
    } else {
      const webkitElement = element as WebkitFullscreenElement;
      if (webkitElement.webkitRequestFullscreen) {
        await webkitElement.webkitRequestFullscreen();
        enteredFullscreen = true;
      }
    }
  } catch {
    // The native iOS video fullscreen fallback below is more reliable on iPhones.
  }

  if (!enteredFullscreen && fallbackVideo) {
    (fallbackVideo as WebkitFullscreenVideo).webkitEnterFullscreen?.();
    return;
  }

  const orientation = screen.orientation as ScreenOrientation & {
    lock?: (orientation: "landscape") => Promise<void>;
  };
  try {
    await orientation.lock?.("landscape");
  } catch {
    // Some mobile browsers require the user to rotate after entering fullscreen.
  }
}

function FeaturedVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [nativeControls, setNativeControls] = useState(false);
  const [mobileChromeVisible, setMobileChromeVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setPaused(true));
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateControls = () => setNativeControls(mobileQuery.matches);
    updateControls();
    mobileQuery.addEventListener("change", updateControls);
    return () => mobileQuery.removeEventListener("change", updateControls);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPaused(false)).catch(() => setPaused(true));
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const openFullscreen = () => {
    void enterLandscapeFullscreen(containerRef.current, videoRef.current);
  };

  return (
    <div ref={containerRef} className="group relative size-full bg-black fullscreen:h-screen fullscreen:w-screen">
      <video
        ref={videoRef}
        className="size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={nativeControls}
        preload="metadata"
        poster="/media/thumbnails/showreel-03.jpg"
        aria-label="Zack video editing and motion showreel"
        onPlay={() => setPaused(false)}
        onPause={() => {
          setPaused(true);
          setMobileChromeVisible(true);
        }}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onClick={() => {
          if (nativeControls) setMobileChromeVisible((visible) => !visible);
        }}
      >
        <source src="/media/zack-showreel.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 transition-opacity ${mobileChromeVisible ? "opacity-100" : "opacity-0 sm:opacity-100"}`} />
      <button onClick={openFullscreen} className={`absolute right-3 top-3 inline-flex h-10 items-center gap-2 rounded-full border border-white/18 bg-black/75 px-3 text-[9px] font-semibold uppercase tracking-[.1em] text-white backdrop-blur-md transition-opacity sm:hidden ${mobileChromeVisible ? "opacity-100" : "invisible pointer-events-none opacity-0"}`} aria-label="View showreel in wide screen">
        <Maximize2 className="size-3.5" /> Wide screen
      </button>
      <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-3 p-3 sm:flex md:p-6">
        <div className="pointer-events-none">
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">Featured showreel</p>
          <p className="mt-1 hidden text-xs text-white/60 sm:block">Autoplaying silently</p>
        </div>
        <div className="flex shrink-0 gap-1.5 sm:gap-2">
          <button onClick={togglePlayback} className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-white/18 bg-black/70 text-[9px] font-semibold uppercase tracking-[.12em] text-white backdrop-blur-md transition hover:border-[#ff3439]/70 sm:h-11 sm:w-auto sm:px-4" aria-label={paused ? "Play showreel" : "Pause showreel"}>
            {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
            <span className="hidden sm:inline">{paused ? "Play" : "Pause"}</span>
          </button>
          <button onClick={toggleSound} className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-white/18 bg-black/70 text-[9px] font-semibold uppercase tracking-[.12em] text-white backdrop-blur-md transition hover:border-[#ff3439]/70 sm:h-11 sm:w-auto sm:px-4" aria-label={muted ? "Unmute showreel" : "Mute showreel"}>
            {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            <span className="hidden sm:inline">{muted ? "Sound on" : "Mute"}</span>
          </button>
          <button onClick={openFullscreen} className="inline-flex size-10 items-center justify-center gap-2 rounded-full border border-white/18 bg-black/70 text-[9px] font-semibold uppercase tracking-[.12em] text-white backdrop-blur-md transition hover:border-[#ff3439]/70 sm:h-11 sm:w-auto sm:px-4" aria-label="View showreel fullscreen">
            <Maximize2 className="size-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function MotionShowcase() {
  const [active, setActive] = useState<MotionProject | null>(null);
  const [widePlayer, setWidePlayer] = useState(false);
  const [projectChromeVisible, setProjectChromeVisible] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !projectChromeVisible) return;
    const autoHideChrome = window.setTimeout(() => setProjectChromeVisible(false), 3000);
    return () => window.clearTimeout(autoHideChrome);
  }, [active, projectChromeVisible]);

  const openProjectFullscreen = () => {
    setWidePlayer(true);
    void enterLandscapeFullscreen(playerRef.current);
  };

  const closeProject = () => {
    setActive(null);
    setWidePlayer(false);
    setProjectChromeVisible(true);
  };

  return (
    <section id="motion" className="relative overflow-hidden border-b border-white/8 bg-[#090909]">
      <div className="site-grid absolute inset-0 opacity-30" />
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#ff3439]">01 / Video Editing &amp; Motion</p>
            <h2 className="display-font mt-4 text-[clamp(3rem,16vw,3.8rem)] font-black uppercase leading-[.84] sm:text-[clamp(3.8rem,8vw,7.2rem)]">Cut for <span className="text-[#ff3439]">impact.</span></h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/52">Showreels, commercial edits, social campaigns, lifestyle, travel and property films — paced to hold attention and built for the screen they live on.</p>
          </div>
        }
      >
        <FeaturedVideo />
      </ContainerScroll>

      <div className="relative z-10 mx-auto mt-12 max-w-[1500px] px-5 pb-20 md:-mt-32 md:px-9 md:pb-24">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {motionProjects.slice(1).map((project, index) => (
            <button key={project.id} onClick={() => { setActive(project); setProjectChromeVisible(true); }} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0e] p-0 text-left transition hover:border-[#ff3439]/55">
              <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(255,38,44,.18),transparent_46%),#080808]">
                <Image src={project.thumbnail} alt={`${project.title} video thumbnail`} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
                <div className="site-grid absolute inset-0 opacity-20" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full border border-white/15 bg-black/65 transition group-hover:scale-110 group-hover:border-[#ff3439]/70 group-hover:bg-[#ff262c]"><Play className="ml-1 size-5 fill-current" /></span>
                </div>
                <span className="absolute left-4 top-4 text-[10px] font-semibold tracking-[.2em] text-white/44">{String(index + 2).padStart(2, "0")}</span>
                <span className="absolute bottom-4 right-4 text-[10px] tracking-[.14em] text-white/48">{project.duration}</span>
              </div>
              <div className="flex items-end justify-between gap-3 p-4">
                <div><p className="text-[10px] uppercase tracking-[.16em] text-[#ff3439]">{project.type}</p><h3 className="mt-1 text-base font-semibold">{project.title}</h3></div>
                <span className="text-xs text-white/36">Play ↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className={`fixed inset-0 z-[80] grid place-items-center bg-black/92 backdrop-blur-xl ${widePlayer ? "p-0" : "p-3 sm:p-4"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeProject}>
            <motion.div className={`flex w-full max-w-6xl flex-col overflow-hidden border border-white/12 bg-[#090909] ${widePlayer ? "h-[100svh] rounded-none" : "max-h-[calc(100svh-1.5rem)] rounded-xl sm:rounded-2xl"}`} initial={{ scale: .94, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: 18 }} transition={{ type: "spring", damping: 24 }} onClick={(e) => e.stopPropagation()}>
              <div className={`${projectChromeVisible ? "flex" : "hidden sm:flex"} shrink-0 items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-4`}><div className="min-w-0"><p className="truncate text-[9px] uppercase tracking-[.16em] text-[#ff3439] sm:text-[10px] sm:tracking-[.18em]">{active.type}</p><h3 className="truncate text-sm font-semibold sm:text-base">{active.title}</h3></div><div className="ml-2 flex shrink-0 gap-1.5 sm:gap-2"><a href={`https://drive.google.com/file/d/${active.driveId}/view`} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-full border border-white/12 hover:bg-white/5" aria-label="Open video directly"><ExternalLink className="size-4" /></a><button onClick={openProjectFullscreen} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-3 text-[9px] font-semibold uppercase tracking-[.08em] hover:bg-white/5" aria-label="View video in wide screen"><Maximize2 className="size-4" /><span className="hidden min-[360px]:inline">Wide screen</span></button><button onClick={closeProject} className="grid size-10 place-items-center rounded-full border border-white/12 hover:bg-white/5" aria-label="Close video"><X className="size-4" /></button></div></div>
              <div ref={playerRef} className={`${widePlayer ? "min-h-0 flex-1" : "aspect-video"} w-full bg-black fullscreen:h-screen fullscreen:w-screen fullscreen:aspect-auto`}><VideoFrame key={active.id} project={active} /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
