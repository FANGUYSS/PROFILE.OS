import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const contactCommand: CommandDefinition = {
  command: "contact",
  description: "Display direct email contact card",
  category: "core",
  execute: () => ({
    output: React.createElement(
      "div",
      {
        className:
          "font-mono text-xs sm:text-sm text-zinc-300 space-y-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "┌─ CONTACT ───────────────────────┐"
      ),
      React.createElement(
        "div",
        { className: "pl-2 space-y-2.5 py-1" },
        React.createElement(
          "div",
          null,
          React.createElement("div", { className: "text-zinc-500 text-xs" }, "EMAIL"),
          React.createElement(
            "a",
            {
              href: `mailto:${PROFILE_DATA.email}`,
              className: "text-zinc-100 hover:text-cyan-400 transition-colors font-medium",
            },
            PROFILE_DATA.email
          )
        ),
        React.createElement(
          "div",
          { className: "pt-1" },
          React.createElement(
            "a",
            {
              href: `mailto:${PROFILE_DATA.email}`,
              className:
                "inline-block px-3.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/25 transition-colors text-xs font-semibold",
            },
            "[ SEND EMAIL ]"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "└─────────────────────────────────┘"
      )
    ),
  }),
};
