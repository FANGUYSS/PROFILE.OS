"use client";

import React from "react";
import { Github, Mail, Radio, UserRound, Wrench } from "lucide-react";
import { useTerminal } from "@/hooks/useTerminal";
import { PROFILE_DATA } from "@/data/profile";

const PANEL_META = {
  about: {
    title: "ABOUT",
    icon: UserRound,
    description: PROFILE_DATA.bio,
  },
  skills: {
    title: "SKILLS",
    icon: Wrench,
    description: "Technical capabilities are available through the PROFILE.OS skills command.",
  },
  github: {
    title: "GITHUB",
    icon: Github,
    description: "Source of truth for public code, experiments, and shipped work.",
  },
  discord: {
    title: "DISCORD",
    icon: Radio,
    description: "Live Discord presence is powered by Lanyard.",
  },
  music: {
    title: "MUSIC",
    icon: Radio,
    description: "Local audio library and playback controls.",
  },
  socials: {
    title: "SOCIALS",
    icon: Mail,
    description: "Public contact and social links.",
  },
} as const;

export function Panels() {
  const { activePanel } = useTerminal();

  if (!activePanel || !(activePanel in PANEL_META)) return null;

  const panel = PANEL_META[activePanel as keyof typeof PANEL_META];
  const Icon = panel.icon;

  return (
    <aside className="w-full rounded-2xl border border-white/[0.07] bg-[#08090f]/80 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05]">
          <Icon className="h-4 w-4 text-cyan-300" />
        </span>
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
            PANEL // ACTIVE
          </div>
          <h2 className="font-mono text-sm font-semibold tracking-wider text-zinc-100">
            {panel.title}
          </h2>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
        {panel.description}
      </p>

      <div className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-[10px] text-zinc-600">
        Use the terminal to navigate. Try <span className="text-cyan-400">help</span>.
      </div>
    </aside>
  );
}

export default Panels;
