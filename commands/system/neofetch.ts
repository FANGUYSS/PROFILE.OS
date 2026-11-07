import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";
import { NEOFETCH_ASCII } from "@/data/easterEggs";

export const neofetchCommand: CommandDefinition = {
  command: "neofetch",
  description: "Display system information and custom ASCII emblem",
  category: "system",
  execute: (_, ctx) => ({
    output: React.createElement(
      "div",
      {
        className:
          "flex flex-col sm:flex-row gap-4 sm:gap-6 items-start font-mono text-xs leading-tight py-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-2xl",
      },
      React.createElement(
        "pre",
        { className: "text-cyan-400 font-bold select-none overflow-x-auto leading-tight" },
        NEOFETCH_ASCII
      ),
      React.createElement(
        "div",
        { className: "space-y-1.5 text-zinc-300 min-w-[210px]" },
        React.createElement(
          "div",
          { className: "text-purple-400 font-bold text-sm" },
          `${PROFILE_DATA.brand}@${PROFILE_DATA.host}`
        ),
        React.createElement("div", { className: "text-zinc-700" }, "─────────────────────"),
        ...[
          ["OS", PROFILE_DATA.osName],
          ["VERSION", PROFILE_DATA.version],
          ["SHELL", PROFILE_DATA.shell],
          ["HOST", PROFILE_DATA.host],
          ["THEME", ctx.theme],
          ["STATUS", "ONLINE"],
        ].map(([k, v]) =>
          React.createElement(
            "div",
            { key: k },
            React.createElement(
              "span",
              { className: "text-cyan-400 font-semibold inline-block w-20" },
              k
            ),
            React.createElement(
              "span",
              { className: k === "STATUS" ? "text-emerald-400 font-semibold" : "text-zinc-200" },
              v
            )
          )
        ),
        React.createElement(
          "div",
          { className: "pt-2 flex gap-1.5" },
          ...[
            "bg-zinc-900 border border-zinc-700",
            "bg-purple-600",
            "bg-blue-500",
            "bg-cyan-400",
            "bg-emerald-400",
            "bg-amber-400",
            "bg-rose-500",
          ].map((swatch, idx) =>
            React.createElement("span", {
              key: idx,
              className: `w-3.5 h-3.5 rounded-sm inline-block ${swatch}`,
            })
          )
        )
      )
    ),
  }),
};
