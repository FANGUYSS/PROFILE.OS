"use client";
import { useEffect, useRef } from "react";
import { WALLPAPERS, WallpaperId } from "@/lib/wallpapers";

export default function Wallpaper({ id, active, dim = 0, customSrc }: { id: WallpaperId; active: boolean; dim?: number; customSrc?: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wallpaper = WALLPAPERS.find(w => w.id === id) ?? WALLPAPERS[0];
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const start = async () => {
      if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
        return;
      }
      try {
        if (video.readyState < 2) await new Promise<void>(resolve => {
          const done = () => resolve();
          video.addEventListener("loadeddata", done, { once: true });
          video.addEventListener("error", done, { once: true });
          video.load();
        });
        if (!cancelled) await video.play();
      } catch {
        // Poster/fallback remains visible when autoplay is blocked.
      }
    };
    void start();
    return () => { cancelled = true; video.pause(); };
  }, [active, id, customSrc, wallpaper.video]);
  return <div className="wallpaper" aria-hidden="true">
    <video ref={videoRef} className="wallpaperVideo" src={customSrc || wallpaper.video} poster={wallpaper.poster}
      autoPlay={false} muted loop playsInline preload={active ? "auto" : "none"} />
    <div className="wallpaperFallback" data-wallpaper={id} />
    <div className="wallpaperDim" style={{ opacity: dim }} />
  </div>;
}
