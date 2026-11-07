import React from "react";
import { CommandDefinition } from "@/commands/types";
import { SOCIAL_LINKS } from "@/data/socials";

export const projectsCommand: CommandDefinition = {
  command: "projects",
  description: "View project philosophy and GitHub source of truth",
  category: "core",
  execute: () => ({
    panel: "github",
    output: React.createElement(
      "div",
      {
        className:
          "font-mono text-xs sm:text-sm text-zinc-300 space-y-2 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-lg",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "┌─ PROJECTS ───────────────────────────────────┐"
      ),
      React.createElement(
        "div",
        { className: "pl-2 space-y-2.5 py-1" },
        React.createElement("p", { className: "text-zinc-200" }, "I could list every project here..."),
        React.createElement(
          "p",
          { className: "text-zinc-400 leading-relaxed" },
          "But everything worth exploring lives",
          React.createElement("br"),
          "where the code actually does."
        ),
        React.createElement(
          "div",
          { className: "pt-1 flex flex-wrap items-center gap-3" },
          React.createElement(
            "a",
            {
              href: SOCIAL_LINKS.github.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/50 text-purple-300 hover:bg-purple-600/30 hover:text-white transition-colors text-xs font-semibold",
            },
            "→ github.com/FANGUYSS"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold" },
        "└──────────────────────────────────────────────┘"
      )
    ),
  }),
};
