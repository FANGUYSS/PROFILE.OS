import React from "react";
import { CommandDefinition } from "@/commands/types";
import { CUSTOM_ASCII_BANNER } from "@/data/easterEggs";

export const asciiCommand: CommandDefinition = {
  command: "ascii",
  description: "Render full FANGUYSS ASCII banner",
  category: "easter-egg",
  execute: () => ({
    output: React.createElement(
      "pre",
      {
        className:
          "font-mono text-[10px] sm:text-xs text-cyan-400 overflow-x-auto leading-tight",
      },
      CUSTOM_ASCII_BANNER
    ),
  }),
};
