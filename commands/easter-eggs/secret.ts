import React from "react";
import { CommandDefinition } from "@/commands/types";

export const secretCommand: CommandDefinition = {
  command: "secret",
  description: "Reveal classified Konami sequence hint",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs text-zinc-300 space-y-1" },
      React.createElement(
        "div",
        { className: "text-purple-400 font-semibold" },
        "[CLASSIFIED SECTOR // FANGUYSS.ME]"
      ),
      React.createElement(
        "div",
        null,
        "Try pressing the Konami sequence on your keyboard: ",
        React.createElement(
          "code",
          { className: "text-cyan-300" },
          "↑ ↑ ↓ ↓ ← → ← → B A"
        )
      )
    ),
  }),
};
