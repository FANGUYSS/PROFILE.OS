import React from "react";
import { CommandDefinition } from "@/commands/types";

export const stackCommand: CommandDefinition = {
  command: "stack",
  description: "Render architectural stack blueprint",
  category: "core",
  execute: () => ({
    output: React.createElement(
      "pre",
      {
        className:
          "font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed bg-zinc-950/75 border border-zinc-800/90 p-4 rounded-xl max-w-xl",
      },
      `┌─ STACK ──────────────────────────────────────┐

LANGUAGES
  JavaScript   TypeScript   Python

WEB
  React        Next.js      Node.js
  Express      Tailwind

INFRASTRUCTURE
  Linux        Git          Vercel
  Netlify

DISCORD
  Discord.js   Lavalink     Kazagumo
  Shoukaku

EXPLORING
  AI           Cloud        DevOps
  WebSockets   Automation

└──────────────────────────────────────────────┘`
    ),
  }),
};
