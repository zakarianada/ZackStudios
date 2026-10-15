"use client";

import { LoaderCircle, Maximize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { enterLandscapeFullscreen } from "@/lib/video-fullscreen";

const mobileQuery = "(max-width: 767px), (hover: none) and (pointer: coarse)";
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
export const useMobileVideo = () => useSyncExternalStore(subscribe, () => window.matchMedia(mobileQuery).matches, () => false);

const timestamp = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const buttonClass = "grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/70 text-white";

export function MobileVideoPlayer({ src, poster, title, loop = false, onClose }: {
  src: string;
  poster: string;
  title: string;
  loop?: boolean;
  onClose?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const keyboardInteraction = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [error, setError] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current !== null) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  }, []);

  const revealControls = useCallback(() => {
    clearHideTimer();
    setVisible(true);
    if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended && videoRef.current.readyState >= 3) {
      hideTimer.current = setTimeout(() => {
        const focused = document.activeElement;
        // Keep controls available while someone operates them with a keyboard.
        if (keyboardInteraction.current && controlsRef.current?.contains(focused)) return;
        setVisible(false);
      }, 2000);
    }
  }, [clearHideTimer]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || onClose) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }, { threshold: .3 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [onClose]);

  const pauseChrome = () => {
    clearHideTimer();
    setVisible(true);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { setBuffering(false); pauseChrome(); });
    } else video.pause();
  };

  return (
    <div ref={containerRef} onKeyDownCapture={() => { keyboardInteraction.current = true; }} onPointerDownCapture={() => { keyboardInteraction.current = false; }} className="relative size-full bg-black fullscreen:h-[100dvh] fullscreen:w-screen">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={title}
        className="size-full object-contain"
        playsInline
        loop={loop}
        preload="metadata"
        controls={false}
        onPlaying={() => { setPlaying(true); setBuffering(false); revealControls(); }}
        onPause={() => { setPlaying(false); setBuffering(false); pauseChrome(); }}
        onEnded={() => { setPlaying(false); pauseChrome(); }}
        onWaiting={() => { setBuffering(true); pauseChrome(); }}
        onSeeking={pauseChrome}
        onSeeked={revealControls}
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onError={() => { setError(true); setBuffering(false); pauseChrome(); }}
      />
      <button type="button" aria-label="Show video controls" onClick={revealControls} onFocus={revealControls} className="absolute inset-0 size-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white" />
      <div ref={controlsRef} inert={!visible} onPointerDown={revealControls} onFocusCapture={revealControls} onBlurCapture={() => { if (keyboardInteraction.current) revealControls(); }} className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/65 transition-opacity duration-150 ${visible ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="pointer-events-auto absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 pt-[max(.75rem,env(safe-area-inset-top))]">
          {onClose && <p className="min-w-0 self-center text-sm font-semibold leading-5 text-white">{title}</p>}
          <div className="ml-auto flex shrink-0 gap-2">
            <button type="button" className={buttonClass} aria-label="View video in wide screen" onClick={() => { void enterLandscapeFullscreen(containerRef.current, videoRef.current); revealControls(); }}><Maximize2 className="size-4" /></button>
            {onClose && <button type="button" className={buttonClass} aria-label="Close video" onClick={onClose}><X className="size-4" /></button>}
          </div>
        </div>
        {(!playing || buffering) && !error && (
          <div className="absolute inset-0 grid place-items-center">
            {buffering ? <LoaderCircle role="status" aria-label="Loading video" className="size-8 animate-spin text-white" /> : <button type="button" onClick={togglePlayback} className="pointer-events-auto grid size-16 place-items-center rounded-full border border-white/25 bg-black/70 text-white" aria-label="Start video"><Play className="ml-1 size-6 fill-current" /></button>}
          </div>
        )}
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))]">
          {error && <p role="alert" className="mb-3 text-sm text-white">The video could not load. Please try again.</p>}
          <div className="flex items-center gap-2">
            <button type="button" onClick={togglePlayback} className={buttonClass} aria-label={playing ? "Pause video" : "Play video"}>{playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}</button>
            <input aria-label="Seek video" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(time, duration)} disabled={!duration} className="h-11 min-w-0 flex-1 accent-[#ff3439]" onPointerDown={(event) => { event.stopPropagation(); clearHideTimer(); }} onPointerUp={revealControls} onPointerCancel={revealControls} onInput={(event) => { if (videoRef.current) videoRef.current.currentTime = Number(event.currentTarget.value); }} onChange={revealControls} />
            <span className="shrink-0 text-[10px] tabular-nums text-white/80">{timestamp(time)} / {timestamp(duration)}</span>
            <button type="button" className={buttonClass} aria-label={muted ? "Unmute video" : "Mute video"} onClick={() => { if (videoRef.current) videoRef.current.muted = !videoRef.current.muted; revealControls(); }}>{muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
