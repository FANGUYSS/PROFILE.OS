"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { useDiscord } from "@/context/DiscordContext";

interface HeroProps {
  onCommand?: (command: string) => void;
}

export function Hero({ onCommand }: HeroProps) {
  const discord = useDiscord();

  return (
    <section className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -left-24 top-0 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#08090f]/75 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
          <span>PROFILE.OS // ONLINE</span>
          <span className="flex items-center gap-2">
            <Circle className={`h-2 w-2 fill-current ${discord.connected ? "text-emerald-400" : "text-zinc-600"}`} />
            {discord.connected ? "live" : "standby"}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-cyan-400/80">
            HELLO, I&apos;M
          </p>

          <h1 className="text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
            {PROFILE_DATA.brand}
            <span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-xl font-medium leading-tight tracking-tight text-zinc-200 sm:text-3xl">
            {PROFILE_DATA.headline}
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            {PROFILE_DATA.subheadline}
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ["about", "About"],
            ["skills", "Skills"],
            ["github", "GitHub"],
            ["discord", "Discord"],
          ].map(([command, label]) => (
            <button
              key={command}
              type="button"
              onClick={() => onCommand?.(command)}
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 font-mono text-xs text-zinc-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
            >
              {label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
