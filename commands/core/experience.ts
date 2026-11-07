import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const experienceCommand: CommandDefinition = {
  command: "experience",
  description: "Show engineering focus and experience timeline",
  category: "core",
  execute: () => ({
    output: React.createElement(
      "div",
      {
        className:
          "space-y-3 border border-zinc-800/90 bg-zinc-950/75 p-4 rounded-xl max-w-xl font-mono text-xs sm:text-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider uppercase" },
        `ENGINEERING EXPERIENCE // ${PROFILE_DATA.brand}`
      ),
      React.createElement(
        "div",
        { className: "space-y-3 pt-1" },
        ...PROFILE_DATA.experience.map((exp, idx) =>
          React.createElement(
            "div",
            {
              key: idx,
              className: "border-l-2 border-cyan-500/70 pl-3.5 space-y-1",
            },
            React.createElement(
              "div",
              { className: "flex items-center justify-between gap-2" },
              React.createElement("span", { className: "text-zinc-100 font-semibold" }, exp.role),
              React.createElement(
                "span",
                {
                  className:
                    "text-[11px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300",
                },
                exp.period
              )
            ),
            React.createElement("p", { className: "text-zinc-400 text-xs leading-relaxed" }, exp.focus)
          )
        )
      )
    ),
  }),
};
