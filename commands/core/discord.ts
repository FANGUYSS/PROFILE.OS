import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const discordCommand: CommandDefinition = {
  command: "discord",
  description: "Inspect live Discord presence via Lanyard",
  category: "core",
  execute: (_, ctx) => {
    const { connected, status, username, customStatus, activities, spotify } =
      ctx.discordStatus;

    if (!connected) {
      return {
        panel: "discord",
        output: React.createElement(
          "div",
          {
            className:
              "font-mono text-xs sm:text-sm text-amber-300 border border-amber-900/50 bg-zinc-950/80 p-3.5 rounded-xl max-w-md",
          },
          "Discord connection unavailable."
        ),
      };
    }

    const dotColor =
      status === "online"
        ? "bg-emerald-400"
        : status === "idle"
        ? "bg-amber-400"
        : status === "dnd"
        ? "bg-rose-500"
        : "bg-zinc-500";

    return {
      panel: "discord",
      output: React.createElement(
        "div",
        {
          className:
            "font-mono text-xs sm:text-sm text-zinc-300 space-y-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-md",
        },
        React.createElement(
          "div",
          { className: "text-cyan-400 font-semibold" },
          "┌─ DISCORD ─────────────────────────────┐"
        ),
        React.createElement(
          "div",
          { className: "pl-2 space-y-2 py-1" },
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement("span", {
              className: `inline-block w-2.5 h-2.5 rounded-full ${dotColor}`,
            }),
            React.createElement(
              "span",
              { className: "uppercase font-semibold text-zinc-100" },
              status
            )
          ),
          React.createElement(
            "div",
            { className: "text-zinc-100 font-bold" },
            username || PROFILE_DATA.brand
          ),
          customStatus
            ? React.createElement(
                "div",
                { className: "text-zinc-400 italic" },
                `“${customStatus}”`
              )
            : null,
          ...activities.map((act, idx) =>
            React.createElement(
              "div",
              { key: idx, className: "pt-1" },
              React.createElement("div", { className: "text-zinc-500 text-xs" }, "Playing"),
              React.createElement("div", { className: "text-cyan-300 font-medium" }, act.name),
              act.details
                ? React.createElement(
                    "div",
                    { className: "text-zinc-400 text-xs" },
                    act.details
                  )
                : null
            )
          ),
          spotify
            ? React.createElement(
                "div",
                { className: "pt-1" },
                React.createElement(
                  "div",
                  { className: "text-zinc-500 text-xs" },
                  "Listening to"
                ),
                React.createElement(
                  "div",
                  { className: "text-emerald-300 font-medium" },
                  `${spotify.artist} — ${spotify.song}`
                )
              )
            : null
        ),
        React.createElement(
          "div",
          { className: "text-cyan-400 font-semibold" },
          "└────────────────────────────────────────┘"
        )
      ),
    };
  },
};
