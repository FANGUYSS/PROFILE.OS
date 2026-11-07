import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/socials";

export const githubCommand: CommandDefinition = {
  command: "github",
  description: "Open GitHub profile summary and repository link",
  category: "core",
  execute: () => ({
    panel: "github",
    output: React.createElement(
      "div",
      {
        className:
          "font-mono text-xs sm:text-sm text-zinc-300 space-y-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-md",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "┌─ GITHUB ─────────────────────────────┐"
      ),
      React.createElement(
        "div",
        { className: "pl-2 space-y-2.5 py-1" },
        React.createElement(
          "div",
          { className: "text-zinc-100 font-bold text-sm" },
          PROFILE_DATA.brand
        ),
        React.createElement(
          "p",
          { className: "text-zinc-400 leading-relaxed" },
          "Source code, experiments,",
          React.createElement("br"),
          "and projects."
        ),
        React.createElement(
          "div",
          { className: "text-cyan-400 font-medium" },
          `→ ${SOCIAL_LINKS.github.handle}`
        ),
        React.createElement(
          "div",
          { className: "pt-1" },
          React.createElement(
            "a",
            {
              href: SOCIAL_LINKS.github.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "inline-block px-3.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/25 transition-colors text-xs font-semibold",
            },
            "[ OPEN GITHUB ]"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "└───────────────────────────────────────┘"
      )
    ),
  }),
};
