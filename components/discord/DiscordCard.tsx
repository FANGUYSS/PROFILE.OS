"use client";

import React from "react";

const DISCORD_ID = "1237229822371958908";
const LANYARD_URL = `https://lanyard.cnrad.dev/api/${DISCORD_ID}`;
const DISCORD_PROFILE_URL = `https://discord.com/users/${DISCORD_ID}`;

export function DiscordCard() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#08090f]/80 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      aria-label="Discord presence"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,rgba(124,58,237,0.08),transparent_40%)]" />

      <div className="relative overflow-hidden rounded-xl">
        <a
          href={DISCORD_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open FANGUYSS Discord profile"
          className="block transition-opacity duration-200 hover:opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LANYARD_URL}
            alt="FANGUYSS Discord Presence"
            className="block h-auto w-full"
          />
        </a>
      </div>
    </section>
  );
}

export default DiscordCard;
