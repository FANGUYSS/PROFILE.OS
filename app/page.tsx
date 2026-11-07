"use client";

import { Home } from "@/components/home/Home";
import { Panels } from "@/components/panels/Panels";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { DiscordCard } from "@/components/discord/DiscordCard";
import { Effects } from "@/components/effects/Effects";

export default function ProfileOSPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--os-bg)] text-zinc-100">
      <Effects />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1500px] px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full flex-col gap-4 lg:min-h-[calc(100vh-2.5rem)]">
          <Home />

          <Panels />

          <section
            className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            aria-label="Live PROFILE.OS modules"
          >
            <DiscordCard />
            <MusicPlayer />
          </section>

          <footer className="mt-auto flex flex-col gap-2 border-t border-white/[0.05] px-1 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
            <span>PROFILE.OS // v6.9.0</span>
            <span>FANGUYSS.ME // BUILT TO STAY OUT OF THE WAY</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
