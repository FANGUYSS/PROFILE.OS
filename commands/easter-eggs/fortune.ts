import React from "react";
import { CommandDefinition } from "@/commands/types";
import { FORTUNES } from "@/data/easterEggs";

export const fortuneCommand: CommandDefinition = {
  command: "fortune",
  description: "Print a random engineering aphorism",
  category: "easter-egg",
  execute: () => {
    const pick = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    return {
      output: React.createElement(
        "div",
        { className: "font-mono text-xs text-purple-300 italic" },
        `“${pick}”`
      ),
    };
  },
};
