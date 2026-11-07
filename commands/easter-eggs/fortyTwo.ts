import React from "react";
import { CommandDefinition } from "@/commands/types";
import { FORTY_TWO_RESPONSE } from "@/data/easterEggs";

export const fortyTwoCommand: CommandDefinition = {
  command: "42",
  description: "Query the Ultimate Answer to Life, the Universe, and Everything",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "div",
      { className: "font-mono text-xs text-cyan-300 space-y-1" },
      React.createElement("div", null, FORTY_TWO_RESPONSE)
    ),
  }),
};
