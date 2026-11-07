"use client";

import React from "react";
import { Pause, Play, SkipBack, SkipForward, Shuffle, Volume2, VolumeX, Repeat2 } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function MusicPlayer() {
  const music = useMusic();
  const progress = music.duration > 0 ? (music.currentTime / music.duration) * 100 : 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#08090f]/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl" aria-label="Local music player">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(34,211,238,0.08),transparent_40%)] pointer-events-none" />

      <div className="relative flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={music.currentTrack.artwork} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">LOCAL AUDIO // PLAYER</p>
          <h2 className="mt-1 truncate text-sm font-semibold text-zinc-100">{music.currentTrack.title}</h2>
          <p className="truncate text-xs text-zinc-500">{music.currentTrack.artist}</p>
        </div>
        <span className={`h-2 w-2 rounded-full ${music.isPlaying ? "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" : "bg-zinc-700"}`} />
      </div>

      <div className="relative mt-4">
        <input
          aria-label="Seek track"
          type="range"
          min={0}
          max={music.duration || 0}
          step={0.1}
          value={Math.min(music.currentTime, music.duration || 0)}
          onChange={(e) => music.seek(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
          <span>{formatTime(music.currentTime)}</span>
          <span>{formatTime(music.duration)}</span>
        </div>
      </div>

      <div className="relative mt-3 flex items-center justify-between gap-2">
        <button type="button" aria-label="Previous track" onClick={music.previous} className="control-button"><SkipBack /></button>
        <button type="button" aria-label={music.isPlaying ? "Pause" : "Play"} onClick={music.togglePlay} className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 transition hover:bg-cyan-300/20">
          {music.isPlaying ? <Pause /> : <Play className="ml-0.5" />}
        </button>
        <button type="button" aria-label="Next track" onClick={music.next} className="control-button"><SkipForward /></button>
        <button type="button" aria-label="Toggle shuffle" onClick={music.toggleShuffle} className={`control-button ${music.shuffle ? "text-cyan-300" : ""}`}><Shuffle /></button>
        <button type="button" aria-label="Cycle repeat" onClick={music.cycleRepeat} className={`control-button ${music.repeat !== "off" ? "text-cyan-300" : ""}`}><Repeat2 /></button>
        <button type="button" aria-label={music.muted ? "Unmute" : "Mute"} onClick={music.toggleMute} className="control-button">{music.muted ? <VolumeX /> : <Volume2 />}</button>
      </div>

      <div className="relative mt-3 flex items-center gap-2">
        <VolumeX className="h-3 w-3 text-zinc-600" />
        <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={music.muted ? 0 : music.volume} onChange={(e) => music.setVolume(Number(e.target.value))} className="w-full accent-cyan-400" />
        <span className="w-7 text-right font-mono text-[9px] text-zinc-600">{Math.round((music.muted ? 0 : music.volume) * 100)}%</span>
      </div>

      {music.error && <p className="relative mt-3 rounded-lg border border-red-400/10 bg-red-400/[0.04] px-3 py-2 font-mono text-[10px] text-red-300/80">{music.error}</p>}
      <p className="relative mt-3 truncate font-mono text-[9px] text-zinc-700">{music.currentTrack.album} · {Math.round(progress)}%</p>
    </section>
  );
}

export default MusicPlayer;
