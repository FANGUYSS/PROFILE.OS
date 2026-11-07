import React from "react";
import { CommandDefinition } from "@/commands/types";

export const statusCommand: CommandDefinition = {
  command: "status",
  description: "Check real-time subsystem telemetry",
  category: "system",
  execute: (_, ctx) => ({
    output: React.createElement(
      "div",
      {
        className:
          "font-mono text-xs sm:text-sm space-y-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider mb-1" },
        "SYSTEM STATUS"
      ),
      ...[
        ["Portfolio", "ONLINE", "text-emerald-400"],
        ["Terminal", "READY", "text-emerald-400"],
        [
          "Discord",
          ctx.discordStatus.connected ? "CONNECTED" : "UNAVAILABLE",
          ctx.discordStatus.connected ? "text-emerald-400" : "text-amber-400",
        ],
        [
          "Music",
          ctx.music.error ? "DEGRADED" : "READY",
          ctx.music.error ? "text-amber-400" : "text-emerald-400",
        ],
        ["GitHub", "AVAILABLE", "text-cyan-400"],
      ].map(([label, state, colorClass]) =>
        React.createElement(
          "div",
          {
            key: label,
            className: "flex items-center justify-between border-b border-zinc-900/80 pb-1",
          },
          React.createElement("span", { className: "text-zinc-300" }, `● ${label}`),
          React.createElement("span", { className: `font-semibold ${colorClass}` }, state)
        )
      )
    ),
  }),
};
