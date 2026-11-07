import React from "react";
import { CommandDefinition } from "@/commands/types";

export const konamiCommand: CommandDefinition = {
  command: "konami",
  description: "Unlock overdrive protocol visual surprise",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "div",
      {
        className:
          "font-mono text-xs text-emerald-400 space-y-1 border border-emerald-800/60 bg-emerald-950/20 p-3 rounded-lg",
      },
      React.createElement("div", { className: "font-bold" }, "★ OVERDRIVE PROTOCOL UNLOCKED ★"),
      React.createElement(
        "div",
        { className: "text-zinc-300" },
        "All telemetry limiters bypassed. Welcome to the inner circle, builder."
      )
    ),
  }),
};
