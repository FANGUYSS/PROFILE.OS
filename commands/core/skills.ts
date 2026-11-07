import React from "react";
import { CommandDefinition } from "@/commands/types";
import { SKILLS_DATA } from "@/data/skills";
import { PROFILE_DATA } from "@/data/profile";

export const skillsCommand: CommandDefinition = {
  command: "skills",
  description: "Display categorized technology stack and capabilities",
  category: "core",
  execute: () => ({
    panel: "skills",
    output: React.createElement(
      "div",
      {
        className:
          "space-y-3 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-2xl font-mono text-xs sm:text-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider uppercase" },
        `SKILLS MATRIX // ${PROFILE_DATA.brand}`
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5" },
        ...SKILLS_DATA.map((group) =>
          React.createElement(
            "div",
            {
              key: group.category,
              className: "space-y-1.5 border border-zinc-900 bg-zinc-950/60 p-3 rounded-lg",
            },
            React.createElement(
              "div",
              { className: "flex items-center justify-between text-xs font-semibold" },
              React.createElement(
                "span",
                { className: group.isExploring ? "text-purple-400" : "text-cyan-400" },
                group.category.toUpperCase()
              ),
              group.isExploring
                ? React.createElement(
                    "span",
                    {
                      className:
                        "text-[10px] px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-700/50 text-purple-300",
                    },
                    "Exploring"
                  )
                : null
            ),
            React.createElement(
              "div",
              { className: "flex flex-wrap gap-1.5 pt-1" },
              ...group.items.map((skill) =>
                React.createElement(
                  "span",
                  {
                    key: skill,
                    className: group.isExploring
                      ? "px-2 py-0.5 rounded text-xs bg-purple-950/30 border border-purple-800/40 text-purple-200"
                      : "px-2 py-0.5 rounded text-xs bg-zinc-900 border border-zinc-800 text-zinc-200",
                  },
                  skill
                )
              )
            )
          )
        )
      )
    ),
  }),
};
