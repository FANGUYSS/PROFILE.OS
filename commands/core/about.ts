import React from "react";
import { CommandDefinition } from "@/commands/types";
import { PROFILE_DATA } from "@/data/profile";

export const aboutCommand: CommandDefinition = {
  command: "about",
  description: "Display identity, bio, and engineering philosophy",
  category: "core",
  execute: () => ({
    panel: "about",
    output: React.createElement(
      "div",
      {
        className:
          "border border-zinc-800/90 bg-zinc-950/75 rounded-xl p-4 space-y-3 max-w-xl font-mono text-xs sm:text-sm",
      },
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider" },
        `┌─ ABOUT // ${PROFILE_DATA.brand} ─────────────────────────┐`
      ),
      React.createElement(
        "div",
        { className: "space-y-2 pl-1" },
        React.createElement(
          "div",
          { className: "text-zinc-100 font-semibold text-sm sm:text-base" },
          `“${PROFILE_DATA.headline}”`
        ),
        React.createElement(
          "p",
          { className: "text-zinc-400 leading-relaxed" },
          PROFILE_DATA.subheadline
        ),
        React.createElement(
          "p",
          { className: "text-zinc-300 leading-relaxed pt-2 border-t border-zinc-900" },
          PROFILE_DATA.bio
        ),
        React.createElement(
          "div",
          {
            className:
              "grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-zinc-400 border-t border-zinc-900/80",
          },
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "text-zinc-500 block" }, "IDENTITY"),
            React.createElement("span", { className: "text-zinc-200 font-medium" }, PROFILE_DATA.brand)
          ),
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "text-zinc-500 block" }, "FOCUS"),
            React.createElement("span", { className: "text-cyan-400 font-medium" }, "Web • Bots • Automation")
          ),
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "text-zinc-500 block" }, "CONTACT"),
            React.createElement("span", { className: "text-zinc-200 font-medium" }, PROFILE_DATA.email)
          )
        )
      ),
      React.createElement(
        "div",
        { className: "text-cyan-400 font-semibold tracking-wider" },
        "└────────────────────────────────────────────────┘"
      )
    ),
  }),
};
